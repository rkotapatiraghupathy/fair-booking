"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TravelType } from "@/lib/types";

const ACCENT = "#e8501a";
const BLUE_FOCUS = "#3b82f6";

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
  const [focused, setFocused] = useState<string | null>(null);

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
    { key: "hotels",  label: "Hotels",   icon: "🏨" },
    { key: "flights", label: "Flights",  icon: "✈️" },
  ];

  const inputStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    padding: compact ? "9px 12px" : "13px 14px",
    border: `1.5px solid ${focused === id ? BLUE_FOCUS : "#e2e8f0"}`,
    borderRadius: 9,
    fontSize: compact ? 13 : 14,
    outline: "none",
    fontFamily: "inherit",
    color: "#1f2937",
    boxSizing: "border-box",
    background: focused === id ? "#fff" : "#f8fafc",
    transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
    boxShadow: focused === id ? `0 0 0 3px rgba(59,130,246,0.12)` : "none",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.06em", color: "#6b7280", marginBottom: 6, display: "block",
  };

  const wrap = (id: string, label: string, child: React.ReactNode) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <div onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}>
        {child}
      </div>
    </div>
  );

  return (
    <div style={{ background: "transparent" }}>
      {/* Booking.com-style tabs */}
      <div style={{ display: "flex", borderBottom: `2px solid #e2e8f0`, marginBottom: compact ? 16 : 22 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setType(tab.key)}
            style={{
              padding: compact ? "8px 16px" : "11px 22px",
              border: "none",
              borderBottom: type === tab.key ? `3px solid ${ACCENT}` : "3px solid transparent",
              marginBottom: -2,
              background: "transparent",
              color: type === tab.key ? ACCENT : "#6b7280",
              fontSize: compact ? 13 : 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              transition: "color 0.15s",
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div style={{
        display: "grid",
        gridTemplateColumns: compact ? "repeat(auto-fit, minmax(140px, 1fr))" : "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12, marginBottom: compact ? 12 : 16,
      }}>
        {type === "carhire" && (<>
          {wrap("from", "Pick-up location",
            <input style={inputStyle("from")} placeholder="e.g. Liverpool Airport" value={from} onChange={e => setFrom(e.target.value)} />
          )}
          {wrap("date1", "Pick-up date",
            <input style={inputStyle("date1")} type="date" placeholder="Add date" value={date1} onChange={e => setDate1(e.target.value)} />
          )}
          {wrap("date2", "Return date",
            <input style={inputStyle("date2")} type="date" placeholder="Add date" value={date2} onChange={e => setDate2(e.target.value)} />
          )}
          {!compact && wrap("pax", "Drivers",
            <input style={inputStyle("pax")} type="number" min={1} max={4} value={passengers} onChange={e => setPassengers(+e.target.value)} />
          )}
        </>)}
        {type === "hotels" && (<>
          {wrap("to", "Destination",
            <input style={inputStyle("to")} placeholder="e.g. Liverpool" value={to} onChange={e => setTo(e.target.value)} />
          )}
          {wrap("date1", "Check-in",
            <input style={inputStyle("date1")} type="date" placeholder="Add date" value={date1} onChange={e => setDate1(e.target.value)} />
          )}
          {wrap("date2", "Check-out",
            <input style={inputStyle("date2")} type="date" placeholder="Add date" value={date2} onChange={e => setDate2(e.target.value)} />
          )}
          {!compact && wrap("pax", "Guests",
            <input style={inputStyle("pax")} type="number" min={1} max={8} value={passengers} onChange={e => setPassengers(+e.target.value)} />
          )}
        </>)}
        {type === "flights" && (<>
          {wrap("from", "From",
            <input style={inputStyle("from")} placeholder="e.g. Liverpool (LPL)" value={from} onChange={e => setFrom(e.target.value)} />
          )}
          {wrap("to", "To",
            <input style={inputStyle("to")} placeholder="e.g. London Gatwick" value={to} onChange={e => setTo(e.target.value)} />
          )}
          {wrap("date1", "Depart",
            <input style={inputStyle("date1")} type="date" placeholder="Add date" value={date1} onChange={e => setDate1(e.target.value)} />
          )}
          {wrap("date2", "Return",
            <input style={inputStyle("date2")} type="date" placeholder="Add date" value={date2} onChange={e => setDate2(e.target.value)} />
          )}
          {!compact && wrap("pax", "Passengers",
            <input style={inputStyle("pax")} type="number" min={1} max={9} value={passengers} onChange={e => setPassengers(+e.target.value)} />
          )}
        </>)}
      </div>

      <button
        onClick={handleSearch}
        style={{
          width: "100%", background: ACCENT, color: "#fff", border: "none",
          borderRadius: 10, padding: compact ? "11px" : "15px",
          fontSize: compact ? 14 : 16, fontWeight: 800,
          cursor: "pointer", letterSpacing: "-0.2px",
          transition: "filter 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.filter = "none")}
      >
        Search →
      </button>
    </div>
  );
}
