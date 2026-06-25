"use client";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function TransparencyScore({ score, size = "md" }: Props) {
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#16a34a", text: "#14532d", bg: "#f0fdf4", label: "Excellent" };
    if (s >= 65) return { stroke: "#ca8a04", text: "#713f12", bg: "#fefce8", label: "Good" };
    if (s >= 50) return { stroke: "#ea580c", text: "#7c2d12", bg: "#fff7ed", label: "Fair" };
    return { stroke: "#dc2626", text: "#7f1d1d", bg: "#fef2f2", label: "Poor" };
  };

  const c = getColor(score);
  const sizes = { sm: 48, md: 64, lg: 88 };
  const dim = sizes[size];
  const radius = (dim / 2) - 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const fontSize = { sm: 12, md: 15, lg: 22 };
  const labelSize = { sm: 7, md: 8, lg: 10 };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ position: "relative", width: dim, height: dim }}>
        <svg width={dim} height={dim} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={dim/2} cy={dim/2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={size === "lg" ? 6 : 4} />
          <circle
            cx={dim/2} cy={dim/2} r={radius}
            fill="none" stroke={c.stroke}
            strokeWidth={size === "lg" ? 6 : 4}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: fontSize[size], fontWeight: 900, color: c.text, lineHeight: 1 }}>{score}</span>
        </div>
      </div>
      <span style={{ fontSize: labelSize[size], fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {c.label}
      </span>
    </div>
  );
}
