"use client";
import { useState } from "react";
import TransparencyScore from "./TransparencyScore";
import type { SearchResult, CarHireResult, HotelResult, FlightResult } from "@/lib/types";

const ACCENT = "#e8501a";

function FlagPill({ label, severity }: { label: string; severity: "green" | "amber" | "red" }) {
  const colours = {
    green: { bg: "#f0fdf4", text: "#14532d", border: "#bbf7d0" },
    amber: { bg: "#fffbeb", text: "#92400e", border: "#fde68a" },
    red:   { bg: "#fff1f2", text: "#881337", border: "#fecdd3" },
  };
  const c = colours[severity];
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function CarHireCard({ result }: { result: CarHireResult }) {
  const saving = result.estimatedTrueCost - result.totalPrice;
  return (
    <>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>{result.provider}</span>
          <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{result.category}</span>
        </div>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6b7280" }}>{result.vehicle}</p>
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "#94a3b8" }}>
          📍 {result.pickupLocation} · {result.days} day{result.days !== 1 ? "s" : ""}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          {result.flags.map((f, i) => <FlagPill key={i} label={f.label} severity={f.severity} />)}
        </div>
        {result.topWarning && (
          <div style={{ marginTop: 10, background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 7, padding: "6px 10px", fontSize: 12, color: "#881337", fontWeight: 600 }}>
            ⚠️ {result.topWarning}
          </div>
        )}
      </div>
      <div style={{ textAlign: "right" as const, flexShrink: 0, minWidth: 130 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Advertised</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>£{result.totalPrice}</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, marginBottom: 2 }}>Est. true cost</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: saving > 0 ? "#dc2626" : "#16a34a" }}>
          £{result.estimatedTrueCost}
        </div>
        {saving > 0 && <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>+£{saving} hidden</div>}
      </div>
    </>
  );
}

function HotelCard({ result }: { result: HotelResult }) {
  const saving = result.estimatedTrueCost - result.totalPrice;
  return (
    <>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>{result.name}</span>
          <span style={{ color: "#f59e0b" }}>{"★".repeat(result.stars)}</span>
        </div>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>via {result.provider} · {result.location}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ background: "#1a1a2e", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 4 }}>{result.rating.toFixed(1)}</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>{result.reviewCount.toLocaleString()} reviews</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          {result.flags.map((f, i) => <FlagPill key={i} label={f.label} severity={f.severity} />)}
        </div>
        {result.topWarning && (
          <div style={{ marginTop: 10, background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 7, padding: "6px 10px", fontSize: 12, color: "#881337", fontWeight: 600 }}>
            ⚠️ {result.topWarning}
          </div>
        )}
      </div>
      <div style={{ textAlign: "right" as const, flexShrink: 0, minWidth: 130 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Per night</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>£{result.pricePerNight}</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, marginBottom: 2 }}>Est. true cost</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: saving > 0 ? "#dc2626" : "#16a34a" }}>£{result.estimatedTrueCost}</div>
        {saving > 0 && <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>+£{saving} hidden</div>}
      </div>
    </>
  );
}

function FlightCard({ result }: { result: FlightResult }) {
  const saving = result.estimatedTrueCost - result.price;
  return (
    <>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>{result.airline}</span>
          <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{result.stops === 0 ? "Direct" : `${result.stops} stop`}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{result.departureTime}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{result.from}</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" as const }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{result.duration}</div>
            <div style={{ height: 1, background: "#e2e8f0", position: "relative" as const }}>
              <div style={{ position: "absolute" as const, right: 0, top: -3, fontSize: 8, color: "#94a3b8" }}>▶</div>
            </div>
          </div>
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{result.arrivalTime}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{result.to}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          {result.flags.map((f, i) => <FlagPill key={i} label={f.label} severity={f.severity} />)}
        </div>
        {result.topWarning && (
          <div style={{ marginTop: 10, background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 7, padding: "6px 10px", fontSize: 12, color: "#881337", fontWeight: 600 }}>
            ⚠️ {result.topWarning}
          </div>
        )}
      </div>
      <div style={{ textAlign: "right" as const, flexShrink: 0, minWidth: 130 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Advertised</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>£{result.price}</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, marginBottom: 2 }}>Est. true cost</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: saving > 0 ? "#dc2626" : "#16a34a" }}>£{result.estimatedTrueCost}</div>
        {saving > 0 && <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>+£{saving} in extras</div>}
      </div>
    </>
  );
}

export default function ResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const scoreColour = result.transparencyScore >= 80 ? "#16a34a" : result.transparencyScore >= 65 ? "#ca8a04" : result.transparencyScore >= 50 ? "#ea580c" : "#dc2626";

  const affiliateUrl = "affiliateUrl" in result ? result.affiliateUrl : "#";
  const price = result.type === "flights" ? (result as FlightResult).price : result.type === "hotels" ? (result as HotelResult).pricePerNight : (result as CarHireResult).totalPrice;

  return (
    <div style={{
      background: "#fff", border: `1.5px solid ${result.transparencyScore >= 80 ? "#bbf7d0" : result.transparencyScore >= 50 ? "#e2e8f0" : "#fecdd3"}`,
      borderRadius: 14, overflow: "hidden",
      boxShadow: result.transparencyScore >= 80 ? "0 2px 12px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      {/* Score header bar */}
      <div style={{ background: result.transparencyScore >= 80 ? "#f0fdf4" : result.transparencyScore >= 65 ? "#fefce8" : result.transparencyScore >= 50 ? "#fff7ed" : "#fff1f2", padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>
            {result.transparencyScore >= 80 ? "🟢" : result.transparencyScore >= 65 ? "🟡" : result.transparencyScore >= 50 ? "🟠" : "🔴"}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: scoreColour }}>
            FairBooking Score: {result.transparencyScore}/100 — {result.transparencyLevel}
          </span>
        </div>
        {result.transparencyScore >= 80 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: 20 }}>
            ✅ Recommended
          </span>
        )}
        {result.transparencyScore < 50 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", background: "#fee2e2", padding: "2px 8px", borderRadius: 20 }}>
            ⚠️ High Risk
          </span>
        )}
      </div>

      {/* Main content */}
      <div style={{ padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0 }}>
          <TransparencyScore score={result.transparencyScore} size="md" />
        </div>
        <div style={{ flex: 1, display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" as const }}>
          {result.type === "carhire" && <CarHireCard result={result as CarHireResult} />}
          {result.type === "hotels" && <HotelCard result={result as HotelResult} />}
          {result.type === "flights" && <FlightCard result={result as FlightResult} />}
        </div>
      </div>

      {/* Action bar */}
      <div style={{ padding: "12px 20px", background: "#f8f9fb", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
        >
          {expanded ? "▲ Hide details" : "▼ Full transparency breakdown"}
        </button>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: result.transparencyScore >= 65 ? ACCENT : "#6b7280",
            color: "#fff", borderRadius: 8, padding: "9px 20px",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            display: "inline-block",
          }}
        >
          {result.transparencyScore >= 65 ? "Book with confidence →" : "Proceed with caution →"}
        </a>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f1f5f9", background: "#fafafa" }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b7280", marginBottom: 10 }}>
            Full Transparency Breakdown
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {result.flags.map((flag, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                background: flag.severity === "red" ? "#fff1f2" : flag.severity === "amber" ? "#fffbeb" : "#f0fdf4",
                border: `1px solid ${flag.severity === "red" ? "#fecdd3" : flag.severity === "amber" ? "#fde68a" : "#bbf7d0"}`,
                borderRadius: 8, padding: "10px 12px",
                borderLeft: `4px solid ${flag.severity === "red" ? "#dc2626" : flag.severity === "amber" ? "#ca8a04" : "#16a34a"}`,
              }}>
                <span style={{ fontSize: 14 }}>{flag.severity === "red" ? "🚫" : flag.severity === "amber" ? "⚠️" : "✅"}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1f2937" }}>{flag.label}</span>
              </div>
            ))}
          </div>
          {result.topWarning && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 8, fontSize: 13, color: "#881337", fontWeight: 600 }}>
              ⚡ Key risk: {result.topWarning}
            </div>
          )}
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af" }}>
            💡 Powered by RentalTruth AI — <a href="https://rentaltruth.co.uk" style={{ color: "#1e40af", fontWeight: 700 }}>Paste your full terms</a> for a complete analysis and complaint letter generator.
          </div>
        </div>
      )}
    </div>
  );
}
