"use client";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function TransparencyScore({ score, size = "md" }: Props) {
  const getColor = (s: number) => {
    if (s >= 80) return { bg: "#dcfce7", text: "#15803d", border: "#86efac", label: "Excellent" };
    if (s >= 65) return { bg: "#fef9c3", text: "#a16207", border: "#fde047", label: "Good" };
    if (s >= 50) return { bg: "#ffedd5", text: "#c2410c", border: "#fdba74", label: "Fair" };
    return { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5", label: "Poor" };
  };

  const c = getColor(score);
  const pad = size === "lg" ? "6px 16px" : size === "sm" ? "2px 8px" : "3px 11px";
  const numSize = size === "lg" ? 17 : size === "sm" ? 11 : 13;
  const lblSize = size === "lg" ? 14 : size === "sm" ? 11 : 12;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: pad,
      fontWeight: 700, whiteSpace: "nowrap" as const,
    }}>
      <span style={{ fontSize: numSize, fontWeight: 900, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: lblSize - 1, opacity: 0.55, lineHeight: 1 }}>·</span>
      <span style={{ fontSize: lblSize, lineHeight: 1 }}>{c.label}</span>
    </span>
  );
}
