"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import ResultCard from "@/components/ResultCard";
import type { SearchResult, TravelType } from "@/lib/types";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";
const DARK   = "#0a1628";

function getProviderName(r: SearchResult): string {
  if (r.type === "carhire") return (r as any).provider;
  if (r.type === "hotels")  return (r as any).provider;
  return (r as any).airline;
}

function getPrice(r: SearchResult): number {
  if (r.type === "flights") return (r as any).price;
  if (r.type === "hotels")  return (r as any).pricePerNight;
  return (r as any).totalPrice;
}

function FilterSidebar({
  results,
  minScore, setMinScore,
  maxPrice, setMaxPrice,
  freeCancellation, setFreeCancellation,
  debitAccepted, setDebitAccepted,
  selectedProviders, setSelectedProviders,
}: {
  results: SearchResult[];
  minScore: number; setMinScore: (v: number) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  freeCancellation: boolean; setFreeCancellation: (v: boolean) => void;
  debitAccepted: boolean; setDebitAccepted: (v: boolean) => void;
  selectedProviders: string[]; setSelectedProviders: (v: string[]) => void;
}) {
  const allProviders = [...new Set(results.map(getProviderName))].sort();
  const prices = results.map(getPrice);
  const maxPossible = prices.length ? Math.max(...prices) : 500;

  function toggleProvider(p: string) {
    setSelectedProviders(selectedProviders.includes(p)
      ? selectedProviders.filter(x => x !== p)
      : [...selectedProviders, p]
    );
  }

  const headingStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
    color: "#6b84b0", marginBottom: 10, marginTop: 20,
  };
  const labelStyle: React.CSSProperties = { fontSize: 13, color: "#374151", fontWeight: 500 };
  const valueStyle: React.CSSProperties = { fontSize: 12, color: NAVY, fontWeight: 700 };

  return (
    <aside style={{ width: 220, flexShrink: 0, padding: "20px 18px 24px", background: "#fff", border: "1px solid #dbe8fa", borderRadius: 12, alignSelf: "flex-start" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 2 }}>Filters</div>
      <div style={{ fontSize: 11, color: "#6b84b0", marginBottom: 4 }}>Refine your results</div>

      <div style={headingStyle}>Min. Transparency Score</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={labelStyle}>Score</span>
        <span style={valueStyle}>{minScore}+</span>
      </div>
      <input type="range" min={0} max={100} step={5} value={minScore} onChange={e => setMinScore(+e.target.value)}
        style={{ width: "100%", accentColor: NAVY }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 3 }}>
        <span>Any</span><span>100</span>
      </div>

      <div style={headingStyle}>Max Price</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={labelStyle}>Up to</span>
        <span style={valueStyle}>£{maxPrice}</span>
      </div>
      <input type="range" min={0} max={maxPossible} step={10} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
        style={{ width: "100%", accentColor: NAVY }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 3 }}>
        <span>£0</span><span>£{maxPossible}</span>
      </div>

      <div style={headingStyle}>Show only</div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
        <input type="checkbox" checked={freeCancellation} onChange={e => setFreeCancellation(e.target.checked)} style={{ accentColor: NAVY, width: 15, height: 15 }} />
        <span style={labelStyle}>Free cancellation</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <input type="checkbox" checked={debitAccepted} onChange={e => setDebitAccepted(e.target.checked)} style={{ accentColor: NAVY, width: 15, height: 15 }} />
        <span style={labelStyle}>Debit card accepted</span>
      </label>

      {allProviders.length > 0 && (
        <>
          <div style={headingStyle}>Provider</div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {allProviders.map(p => (
              <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={selectedProviders.includes(p)} onChange={() => toggleProvider(p)} style={{ accentColor: NAVY, width: 15, height: 15 }} />
                <span style={{ ...labelStyle, fontSize: 12 }}>{p}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {(minScore > 0 || maxPrice < maxPossible || freeCancellation || debitAccepted || selectedProviders.length > 0) && (
        <button
          onClick={() => { setMinScore(0); setMaxPrice(maxPossible); setFreeCancellation(false); setDebitAccepted(false); setSelectedProviders([]); }}
          style={{ marginTop: 20, width: "100%", background: "none", border: `1.5px solid #dbe8fa`, borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 600, color: "#6b84b0", cursor: "pointer" }}
        >
          Reset all filters
        </button>
      )}
    </aside>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("transparency");
  const [minScore, setMinScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [debitAccepted, setDebitAccepted] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const type  = (searchParams.get("type") || "carhire") as TravelType;
  const from  = searchParams.get("from") || "";
  const to    = searchParams.get("to")   || "";
  const date1 = searchParams.get("pickupDate") || searchParams.get("checkIn")  || "";
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
      const fetched = data.results || [];
      setResults(fetched);
      const prices = fetched.map(getPrice);
      if (prices.length) setMaxPrice(Math.max(...prices));
      setLoading(false);
    }
    search();
  }, [type, from, to, date1, date2]);

  const sorted = [...results].sort((a, b) => {
    if (sort === "price") return getPrice(a) - getPrice(b);
    return b.transparencyScore - a.transparencyScore;
  });

  const filtered = sorted
    .filter(r => r.transparencyScore >= minScore)
    .filter(r => getPrice(r) <= maxPrice)
    .filter(r => selectedProviders.length === 0 || selectedProviders.includes(getProviderName(r)))
    .filter(r => !freeCancellation || r.flags.some(f => f.label.toLowerCase().includes("cancel")))
    .filter(r => !debitAccepted || r.flags.some(f => f.label.toLowerCase().includes("debit")));

  const avgScore = results.length ? Math.round(results.reduce((s, r) => s + r.transparencyScore, 0) / results.length) : 0;
  const highRisk = results.filter(r => r.transparencyScore < 50).length;

  return (
    <div>
      {/* Compact search bar */}
      <div style={{ background: "#f1f6fe", borderBottom: "1px solid #dbe8fa", padding: "14px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SearchForm compact defaultType={type} />
        </div>
      </div>

      {/* Summary stats banner */}
      {!loading && results.length > 0 && (
        <div style={{ background: "#eff6ff", borderBottom: "1px solid #dbe8fa", padding: "11px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>📋 {results.length} results</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: avgScore >= 65 ? "#166534" : "#854d0e" }}>
              🏆 Avg score: {avgScore}/100
            </span>
            {highRisk > 0 && (
              <span style={{ fontSize: 13, fontWeight: 700, color: "#991b1b" }}>⚠️ {highRisk} high risk</span>
            )}
            <span style={{ fontSize: 12, color: "#6b84b0", marginLeft: "auto" }}>
              Showing {filtered.length} of {results.length}
            </span>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px 48px", display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Filter sidebar */}
        {!loading && results.length > 0 && (
          <FilterSidebar
            results={results}
            minScore={minScore} setMinScore={setMinScore}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            freeCancellation={freeCancellation} setFreeCancellation={setFreeCancellation}
            debitAccepted={debitAccepted} setDebitAccepted={setDebitAccepted}
            selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders}
          />
        )}

        {/* Results column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <div style={{ textAlign: "center" as const, padding: "80px 0", color: "#6b84b0" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
              <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: DARK }}>Analysing transparency scores…</p>
              <p style={{ fontSize: 13, margin: 0 }}>Checking {type === "carhire" ? "car hire" : type} terms for hidden restrictions</p>
            </div>
          ) : (
            <>
              {/* Sort bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap" as const, gap: 10 }}>
                <div style={{ fontSize: 14, color: "#374151" }}>
                  <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} — sorted by{" "}
                  <span style={{ color: NAVY, fontWeight: 700 }}>{sort}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[
                    { key: "transparency", label: "🏆 Transparency" },
                    { key: "price",        label: "💰 Price" },
                  ].map(({ key, label }) => (
                    <button key={key} onClick={() => setSort(key)} style={{
                      padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      border: sort === key ? `none` : "1.5px solid #dbe8fa",
                      background: sort === key ? NAVY : "#fff",
                      color: sort === key ? "#fff" : "#6b84b0",
                      transition: "all 0.15s",
                    }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {highRisk > 0 && (
                <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderLeft: `4px solid ${ACCENT}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#9a3412" }}>
                  ⚠️ <strong>{highRisk} result{highRisk > 1 ? "s" : ""}</strong> flagged as high risk. Sort by transparency to see the safest options first.
                </div>
              )}

              {filtered.length === 0 && (
                <div style={{ textAlign: "center" as const, padding: "48px 0", color: "#6b84b0" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔎</div>
                  <p style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px", color: DARK }}>No results match your filters</p>
                  <p style={{ fontSize: 13, margin: 0 }}>Try adjusting the transparency score or price range</p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                {filtered.map(result => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </div>

              {filtered.length > 0 && (
                <div style={{ marginTop: 28, padding: "20px 24px", background: DARK, borderRadius: 12, textAlign: "center" as const }}>
                  <p style={{ margin: "0 0 10px", fontSize: 14, color: "#6b84b0" }}>
                    Already have a booking? Paste your full confirmation for a complete AI analysis, complaint letter, and refund guidance.
                  </p>
                  <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer"
                    style={{ background: ACCENT, color: "#fff", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                    Analyse on RentalTruth →
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f6fe" }}>
      {/* Navy nav */}
      <nav style={{ background: NAVY, borderBottom: "1px solid #1d4499", padding: "0 28px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 58 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </span>
          </Link>
          <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 500 }}>
            Powered by RentalTruth →
          </a>
        </div>
      </nav>

      <Suspense fallback={
        <div style={{ padding: "80px 0", textAlign: "center" as const, color: "#6b84b0" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 15, fontWeight: 600, color: DARK }}>Loading results…</p>
        </div>
      }>
        <ResultsContent />
      </Suspense>
    </div>
  );
}
