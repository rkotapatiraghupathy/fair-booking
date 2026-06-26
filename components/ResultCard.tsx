"use client";
import { useState } from "react";
import TransparencyScore from "./TransparencyScore";
import type { SearchResult, CarHireResult, HotelResult, FlightResult } from "@/lib/types";

const ACCENT = "#e8501a";

const BG_PALETTE  = ["#dbeafe", "#dcfce7", "#fef3c7", "#fce7f3", "#ede9fe", "#e0f2fe", "#fee2e2"];
const TXT_PALETTE = ["#1e40af", "#15803d", "#a16207", "#9d174d", "#6d28d9", "#0369a1", "#b91c1c"];

function ProviderLogo({ name }: { name: string }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const idx = name.charCodeAt(0) % BG_PALETTE.length;
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
      background: BG_PALETTE[idx], color: TXT_PALETTE[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 17, fontWeight: 900, letterSpacing: "-0.5px",
    }}>
      {initials}
    </div>
  );
}

function FlagChip({ label, severity }: { label: string; severity: "green" | "amber" | "red" }) {
  const c = {
    green: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    amber: { bg: "#fffbeb", text: "#92400e", border: "#fde68a" },
    red:   { bg: "#fff1f2", text: "#881337", border: "#fecdd3" },
  }[severity];
  const icon = severity === "green" ? "✅" : severity === "amber" ? "⚠️" : "🚫";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600,
      whiteSpace: "nowrap" as const,
    }}>
      <span style={{ fontSize: 10 }}>{icon}</span> {label}
    </span>
  );
}

function getCardInfo(result: SearchResult): {
  providerName: string; subtitle: string; badge?: string;
  price: number; priceLabel: string; trueCost: number;
} {
  if (result.type === "carhire") {
    const r = result as CarHireResult;
    return {
      providerName: r.provider,
      subtitle: `${r.vehicle} · ${r.category}`,
      badge: `📍 ${r.pickupLocation} · ${r.days} day${r.days !== 1 ? "s" : ""}`,
      price: r.totalPrice, priceLabel: "Total",
      trueCost: r.estimatedTrueCost,
    };
  }
  if (result.type === "hotels") {
    const r = result as HotelResult;
    return {
      providerName: r.name,
      subtitle: `${"★".repeat(r.stars)} · via ${r.provider}`,
      badge: `📍 ${r.location} · ${r.rating.toFixed(1)} (${r.reviewCount.toLocaleString()} reviews)`,
      price: r.pricePerNight, priceLabel: "Per night",
      trueCost: r.estimatedTrueCost,
    };
  }
  const r = result as FlightResult;
  return {
    providerName: r.airline,
    subtitle: `${r.departureTime} → ${r.arrivalTime} · ${r.duration}`,
    badge: `${r.from} → ${r.to} · ${r.stops === 0 ? "Direct" : `${r.stops} stop`}`,
    price: r.price, priceLabel: "Per person",
    trueCost: r.estimatedTrueCost,
  };
}

export default function ResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { providerName, subtitle, badge, price, priceLabel, trueCost } = getCardInfo(result);
  const saving = trueCost - price;
  const affiliateUrl = "affiliateUrl" in result ? result.affiliateUrl : "#";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1.5px solid #e2e8f0",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
    >
      {/* Main row */}
      <div style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Logo */}
        <ProviderLogo name={providerName} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{providerName}</span>
            <TransparencyScore score={result.transparencyScore} size="sm" />
          </div>
          <p style={{ margin: "0 0 2px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{subtitle}</p>
          {badge && <p style={{ margin: "0 0 10px", fontSize: 12, color: "#94a3b8" }}>{badge}</p>}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
            {result.flags.map((f, i) => <FlagChip key={i} label={f.label} severity={f.severity} />)}
          </div>
          {result.topWarning && (
            <div style={{ marginTop: 9, background: "#fff1f2", border: "1px solid #fecdd3", borderLeft: "3px solid #dc2626", borderRadius: 7, padding: "6px 10px", fontSize: 12, color: "#881337", fontWeight: 600 }}>
              ⚡ {result.topWarning}
            </div>
          )}
        </div>

        {/* Price */}
        <div style={{ textAlign: "right" as const, flexShrink: 0, minWidth: 110 }}>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{priceLabel}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>£{price}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8, marginBottom: 2 }}>Est. true cost</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: saving > 0 ? "#dc2626" : "#16a34a" }}>£{trueCost}</div>
          {saving > 0 && (
            <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, marginTop: 2 }}>+£{saving} hidden</div>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div style={{ padding: "11px 20px", background: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
        >
          {expanded ? "▲ Hide details" : "▼ Full breakdown"}
        </button>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: result.transparencyScore >= 65 ? ACCENT : "#6b7280",
            color: "#fff", borderRadius: 8, padding: "9px 18px",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            display: "inline-block", whiteSpace: "nowrap" as const,
          }}
        >
          Book direct on {providerName} →
        </a>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f1f5f9", background: "#fafafa" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b7280", marginBottom: 10 }}>
            Full Transparency Breakdown
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {result.flags.map((flag, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                background: flag.severity === "red" ? "#fff1f2" : flag.severity === "amber" ? "#fffbeb" : "#f0fdf4",
                border: `1px solid ${flag.severity === "red" ? "#fecdd3" : flag.severity === "amber" ? "#fde68a" : "#bbf7d0"}`,
                borderLeft: `4px solid ${flag.severity === "red" ? "#dc2626" : flag.severity === "amber" ? "#ca8a04" : "#16a34a"}`,
                borderRadius: 8, padding: "10px 12px",
              }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{flag.severity === "red" ? "🚫" : flag.severity === "amber" ? "⚠️" : "✅"}</span>
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
            💡 Powered by RentalTruth AI — <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "#1e40af", fontWeight: 700 }}>Paste your full terms</a> for a complete analysis and complaint letter.
          </div>
        </div>
      )}
    </div>
  );
}
