"use client";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function TransparencyScore({ score, size = "md" }: Props) {
  const c = score >= 80
    ? { bg: "#dcfce7", text: "#166534", border: "#86efac", label: "Excellent" }
    : score >= 65
    ? { bg: "#fef9c3", text: "#854d0e", border: "#fde047", label: "Good" }
    : score >= 50
    ? { bg: "#ffedd5", text: "#9a3412", border: "#fdba74", label: "Fair" }
    : { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", label: "Poor" };

  const pad  = size === "lg" ? "5px 14px" : size === "sm" ? "2px 7px"  : "3px 10px";
  const nSz  = size === "lg" ? 15         : size === "sm" ? 11         : 13;
  const lSz  = size === "lg" ? 13         : size === "sm" ? 10         : 12;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: pad, fontWeight: 700,
      whiteSpace: "nowrap" as const, lineHeight: 1,
    }}>
      <span style={{ fontSize: nSz, fontWeight: 900 }}>{score}</span>
      <span style={{ fontSize: lSz - 1, opacity: 0.5 }}>·</span>
      <span style={{ fontSize: lSz }}>{c.label}</span>
    </span>
  );
}
