"use client";
import { useState } from "react";
import TransparencyScore from "./TransparencyScore";
import type { SearchResult, CarHireResult, HotelResult, FlightResult } from "@/lib/types";

const NAVY  = "#163a8e";
const ACCENT = "#e8501a";

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function FlagChip({ label, severity }: { label: string; severity: "green" | "amber" | "red" }) {
  const c = {
    green: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
    amber: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
    red:   { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  }[severity];
  const icon = severity === "green" ? "✅" : severity === "amber" ? "⚠️" : "🚫";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600,
      whiteSpace: "nowrap" as const,
    }}>
      <span style={{ fontSize: 9 }}>{icon}</span> {label}
    </span>
  );
}

function getInfo(result: SearchResult) {
  if (result.type === "carhire") {
    const r = result as CarHireResult;
    return {
      name: r.provider,
      subtitle: `${r.vehicle} · ${r.category}`,
      meta: `📍 ${r.pickupLocation} · ${r.days} day${r.days !== 1 ? "s" : ""}`,
      price: r.totalPrice, priceLabel: "Total",
      trueCost: r.estimatedTrueCost,
      affiliateUrl: r.affiliateUrl,
    };
  }
  if (result.type === "hotels") {
    const r = result as HotelResult;
    return {
      name: r.name,
      subtitle: `${"★".repeat(r.stars)} · via ${r.provider}`,
      meta: `📍 ${r.location} · ${r.rating.toFixed(1)} (${r.reviewCount.toLocaleString()} reviews)`,
      price: r.pricePerNight, priceLabel: "Per night",
      trueCost: r.estimatedTrueCost,
      affiliateUrl: r.affiliateUrl,
    };
  }
  const r = result as FlightResult;
  return {
    name: r.airline,
    subtitle: `${r.departureTime} → ${r.arrivalTime} · ${r.duration}`,
    meta: `${r.from} → ${r.to} · ${r.stops === 0 ? "Direct" : `${r.stops} stop`} · ${r.cabinClass}`,
    price: r.price, priceLabel: "Per person",
    trueCost: r.estimatedTrueCost,
    affiliateUrl: r.affiliateUrl,
  };
}

export default function ResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { name, subtitle, meta, price, priceLabel, trueCost, affiliateUrl } = getInfo(result);
  const score   = result.transparencyScore;
  const saving  = trueCost - price;
  const cashback = Math.round(price * 0.05);

  const isRecommended = score >= 80;
  const isHighRisk    = score < 50;

  const bannerBg   = score >= 80 ? "#dcfce7" : score >= 65 ? "#fef9c3" : score >= 50 ? "#fff7ed" : "#fee2e2";
  const bannerText = score >= 80 ? "#166534" : score >= 65 ? "#854d0e" : score >= 50 ? "#9a3412" : "#991b1b";
  const bannerIcon = score >= 80 ? "✅" : score >= 65 ? "⚠️" : score >= 50 ? "🟠" : "🔴";
  const bannerLabel = score >= 80 ? "Excellent — Low restriction risk"
                    : score >= 65 ? "Good — Minor restrictions apply"
                    : score >= 50 ? "Fair — Review terms carefully"
                    : "High Risk — Read before booking";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: isRecommended ? "1.5px solid #22c55e" : isHighRisk ? "1.5px solid #ef4444" : "1px solid #dbe8fa",
        borderRadius: 12, overflow: "hidden",
        boxShadow: hovered ? "0 6px 24px rgba(22,58,142,0.12)" : "0 1px 4px rgba(22,58,142,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
    >
      {/* Top banner */}
      <div style={{ background: bannerBg, padding: "7px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: bannerText }}>
          {bannerIcon} {bannerLabel}
        </span>
        <TransparencyScore score={score} size="sm" />
      </div>

      {/* Body — 3-col grid */}
      <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "42px 1fr auto", gap: 14, alignItems: "flex-start" }}>
        {/* Provider circle */}
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: "#f1f6fe", border: "1px solid #dbe8fa",
          color: NAVY, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, letterSpacing: "-0.5px",
        }}>
          {initials(name)}
        </div>

        {/* Info */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0a1628" }}>{name}</span>
          </div>
          <p style={{ margin: "0 0 3px", fontSize: 11, color: "#374151", fontWeight: 500 }}>{subtitle}</p>
          <p style={{ margin: "0 0 9px", fontSize: 10, color: "#6b84b0" }}>{meta}</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
            {result.flags.map((f, i) => <FlagChip key={i} label={f.label} severity={f.severity} />)}
          </div>
        </div>

        {/* Price */}
        <div style={{ textAlign: "right" as const, flexShrink: 0, minWidth: 108 }}>
          <div style={{ fontSize: 10, color: "#6b84b0", marginBottom: 1 }}>{priceLabel}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0a1628", lineHeight: 1.1 }}>£{price}</div>
          <div style={{ fontSize: 10, color: "#6b84b0", marginTop: 7, marginBottom: 1 }}>Est. true cost</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: saving > 0 ? "#dc2626" : "#166534", lineHeight: 1.1 }}>£{trueCost}</div>
          {saving > 0 && <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 700, marginTop: 1 }}>+£{saving} in extras</div>}
          <div style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 4, background: "#dcfce7", color: "#166534", border: "1px solid #86efac", borderRadius: 6, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>
            💰 FairBooking: £{cashback}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#f8faff", borderTop: "1px solid #f0f5ff", padding: "10px 16px" }}>
        {/* Notes row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 9, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 10, color: "#166534", fontWeight: 600 }}>
            💰 Est. £{cashback} cashback on this booking
          </span>
          {result.topWarning && (
            <span style={{ fontSize: 10, color: "#dc2626", fontWeight: 600 }}>
              ⚠️ {result.topWarning}
            </span>
          )}
        </div>
        {/* Buttons row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "#fff", border: `1.5px solid ${NAVY}`,
              color: NAVY, borderRadius: 7, padding: "7px 14px",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}
          >
            {expanded ? "▲ Hide details" : "▼ Full breakdown"}
          </button>
          <a
            href={affiliateUrl} target="_blank" rel="noopener noreferrer"
            style={{
              background: isHighRisk ? "#fff" : NAVY,
              color: isHighRisk ? "#dc2626" : "#fff",
              border: isHighRisk ? "1.5px solid #fecdd3" : "none",
              borderRadius: 7, padding: "7px 16px",
              fontSize: 12, fontWeight: 700, textDecoration: "none",
              display: "inline-block", whiteSpace: "nowrap" as const,
            }}
          >
            {isHighRisk ? "Proceed with caution →" : `Book on ${name} →`}
          </a>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: "14px 16px", borderTop: "1px solid #f0f5ff", background: "#fafcff" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b84b0", marginBottom: 10 }}>
            Full Transparency Breakdown
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
            {result.flags.map((flag, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                background: flag.severity === "red" ? "#fee2e2" : flag.severity === "amber" ? "#fef9c3" : "#dcfce7",
                border: `1px solid ${flag.severity === "red" ? "#fca5a5" : flag.severity === "amber" ? "#fde047" : "#86efac"}`,
                borderLeft: `4px solid ${flag.severity === "red" ? "#dc2626" : flag.severity === "amber" ? "#ca8a04" : "#16a34a"}`,
                borderRadius: 8, padding: "9px 12px",
              }}>
                <span style={{ fontSize: 12 }}>{flag.severity === "red" ? "🚫" : flag.severity === "amber" ? "⚠️" : "✅"}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1f2937" }}>{flag.label}</span>
              </div>
            ))}
          </div>
          {result.topWarning && (
            <div style={{ marginTop: 10, padding: "9px 12px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, fontSize: 12, color: "#991b1b", fontWeight: 600 }}>
              ⚡ Key risk: {result.topWarning}
            </div>
          )}
          <div style={{ marginTop: 10, padding: "9px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 11, color: "#1e40af" }}>
            💡 Powered by RentalTruth AI —{" "}
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: NAVY, fontWeight: 700 }}>
              Paste your full terms
            </a>{" "}
            for a complete analysis and complaint letter.
          </div>
        </div>
      )}
    </div>
  );
}
