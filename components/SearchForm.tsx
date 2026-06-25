"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TravelType } from "@/lib/types";

const ACCENT = "#e8501a";

interface Props {
  compact?: boolean;
  defaultType?: TravelType;
}

export default function SearchForm({ compact = false, defaultType = "carhire" }: Props) {
  const router = useRouter();
  const [type, setType] = useState<TravelType>(defaultType);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [passengers, setPassengers] = useState(1);

  function handleSearch() {
    const params = new URLSearchParams({
      type,
      from: from || "Liverpool Airport",
      to: to || from || "Liverpool Airport",
      pickupDate: date1 || new Date().toISOString().split("T")[0],
      returnDate: date2 || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      checkIn: date1 || new Date().toISOString().split("T")[0],
      checkOut: date2 || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      passengers: passengers.toString(),
    });
    router.push(`/results?${params.toString()}`);
  }

  const tabs: { key: TravelType; label: string; icon: string }[] = [
    { key: "carhire", label: "Car Hire", icon: "🚗" },
    { key: "hotels", label: "Hotels", icon: "🏨" },
    { key: "flights", label: "Flights", icon: "✈️" },
  ];

  const inputStyle = {
    width: "100%", padding: compact ? "10px 12px" : "13px 16px",
    border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: 14,
    outline: "none", fontFamily: "inherit", color: "#1f2937",
    boxSizing: "border-box" as const, background: "#fff",
  };

  const labelStyle = {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const,
    letterSpacing: "0.06em", color: "#6b7280", marginBottom: 5, display: "block",
  };

  return (
    <div style={{ background: compact ? "transparent" : "#fff", borderRadius: compact ? 0 : 16, padding: compact ? 0 : "28px 28px 24px", boxShadow: compact ? "none" : "0 4px 24px rgba(0,0,0,0.08)" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f8f7f4", borderRadius: 10, padding: 4 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setType(tab.key)}
            style={{
              flex: 1, padding: "9px 12px", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              background: type === tab.key ? "#fff" : "transparent",
              color: type === tab.key ? ACCENT : "#6b7280",
              boxShadow: type === tab.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 14 }}>
        {type === "carhire" && (
          <>
            <div>
              <label style={labelStyle}>Pick-up location</label>
              <input style={inputStyle} placeholder="e.g. Liverpool Airport" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Pick-up date</label>
              <input style={inputStyle} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Return date</label>
              <input style={inputStyle} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Drivers</label>
              <input style={inputStyle} type="number" min={1} max={4} value={passengers} onChange={e => setPassengers(+e.target.value)} />
            </div>
          </>
        )}
        {type === "hotels" && (
          <>
            <div>
              <label style={labelStyle}>Destination</label>
              <input style={inputStyle} placeholder="e.g. Liverpool" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Check-in</label>
              <input style={inputStyle} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Check-out</label>
              <input style={inputStyle} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Guests</label>
              <input style={inputStyle} type="number" min={1} max={8} value={passengers} onChange={e => setPassengers(+e.target.value)} />
            </div>
          </>
        )}
        {type === "flights" && (
          <>
            <div>
              <label style={labelStyle}>From</label>
              <input style={inputStyle} placeholder="e.g. Liverpool (LPL)" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>To</label>
              <input style={inputStyle} placeholder="e.g. London Gatwick" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Depart</label>
              <input style={inputStyle} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Return</label>
              <input style={inputStyle} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Passengers</label>
              <input style={inputStyle} type="number" min={1} max={9} value={passengers} onChange={e => setPassengers(+e.target.value)} />
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleSearch}
        style={{
          width: "100%", background: ACCENT, color: "#fff", border: "none",
          borderRadius: 10, padding: "14px", fontSize: 16, fontWeight: 800,
          cursor: "pointer", letterSpacing: "-0.3px",
        }}
      >
        Search with Transparency →
      </button>
    </div>
  );
}
