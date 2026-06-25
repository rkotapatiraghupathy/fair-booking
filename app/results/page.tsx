"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import ResultCard from "@/components/ResultCard";
import type { SearchResult, TravelType } from "@/lib/types";

const ACCENT = "#e8501a";

function SortBar({ count, sort, setSort, type }: { count: number; sort: string; setSort: (s: string) => void; type: TravelType }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap" as const, gap: 10 }}>
      <div style={{ fontSize: 14, color: "#374151" }}>
        <strong>{count}</strong> results — sorted by transparency
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["transparency", "price", "rating"].map(s => (
          <button key={s} onClick={() => setSort(s)} style={{
            padding: "6px 14px", border: "1.5px solid", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            borderColor: sort === s ? ACCENT : "#e2e8f0",
            background: sort === s ? ACCENT : "#fff",
            color: sort === s ? "#fff" : "#6b7280",
          }}>
            {s === "transparency" ? "🏆 Transparency" : s === "price" ? "💰 Price" : "⭐ Rating"}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("transparency");

  const type = (searchParams.get("type") || "carhire") as TravelType;
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date1 = searchParams.get("pickupDate") || searchParams.get("checkIn") || "";
  const date2 = searchParams.get("returnDate") || searchParams.get("checkOut") || "";

  useEffect(() => {
    async function search() {
      setLoading(true);
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, from, to, pickupDate: date1, returnDate: date2, checkIn: date1, checkOut: date2 }),
      });
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }
    search();
  }, [type, from, to, date1, date2]);

  const sorted = [...results].sort((a, b) => {
    if (sort === "price") {
      const aPrice = a.type === "flights" ? (a as any).price : a.type === "hotels" ? (a as any).pricePerNight : (a as any).totalPrice;
      const bPrice = b.type === "flights" ? (b as any).price : b.type === "hotels" ? (b as any).pricePerNight : (b as any).totalPrice;
      return aPrice - bPrice;
    }
    return b.transparencyScore - a.transparencyScore;
  });

  const avgScore = results.length ? Math.round(results.reduce((s, r) => s + r.transparencyScore, 0) / results.length) : 0;
  const highRisk = results.filter(r => r.transparencyScore < 50).length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 48px" }}>
      {/* Search bar */}
      <div style={{ background: "#1a1a2e", margin: "0 -16px", padding: "20px 16px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SearchForm compact defaultType={type} />
        </div>
      </div>

      <div style={{ paddingTop: 28 }}>
        {loading ? (
          <div style={{ textAlign: "center" as const, padding: "64px 0", color: "#6b7280" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px", color: "#374151" }}>Analysing transparency scores…</p>
            <p style={{ fontSize: 13, margin: 0 }}>Checking {type === "carhire" ? "car hire" : type} terms for hidden restrictions</p>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Results found", value: results.length.toString(), icon: "📋" },
                { label: "Avg transparency score", value: `${avgScore}/100`, icon: "🏆" },
                { label: "High risk results", value: highRisk.toString(), icon: "⚠️" },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", textAlign: "center" as const }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>{value}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {highRisk > 0 && (
              <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#9a3412" }}>
                ⚠️ <strong>{highRisk} result{highRisk > 1 ? "s" : ""}</strong> flagged as high risk. Consider sorting by transparency to see the safest options first.
              </div>
            )}

            <SortBar count={sorted.length} sort={sort} setSort={setSort} type={type} />

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              {sorted.map(result => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>

            <div style={{ marginTop: 28, padding: "20px", background: "#1a1a2e", borderRadius: 12, textAlign: "center" as const }}>
              <p style={{ margin: "0 0 10px", fontSize: 14, color: "#94a3b8" }}>
                Already have a booking? Paste your full confirmation for a complete AI analysis, complaint letter, and refund guidance.
              </p>
              <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ background: ACCENT, color: "#fff", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                Analyse on RentalTruth →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#f8f7f4" }}>
      <nav style={{ background: "#1a1a2e", padding: "0 24px", borderBottom: `3px solid ${ACCENT}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 52 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </span>
          </Link>
          <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none", fontWeight: 500 }}>
            Powered by RentalTruth →
          </a>
        </div>
      </nav>
      <Suspense fallback={<div style={{ padding: 40, textAlign: "center" as const }}>Loading…</div>}>
        <ResultsContent />
      </Suspense>
    </div>
  );
}
