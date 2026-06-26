"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TravelType } from "@/lib/types";

const NAVY  = "#163a8e";
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
      pickupDate:  date1 || new Date().toISOString().split("T")[0],
      returnDate:  date2 || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      checkIn:     date1 || new Date().toISOString().split("T")[0],
      checkOut:    date2 || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      passengers:  passengers.toString(),
    });
    router.push(`/results?${params.toString()}`);
  }

  const tabs: { key: TravelType; icon: string; label: string }[] = [
    { key: "carhire", icon: "🚗", label: "Car Hire" },
    { key: "hotels",  icon: "🏨", label: "Hotels"   },
    { key: "flights", icon: "✈️", label: "Flights"  },
  ];

  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.06em", color: "#6b84b0", display: "block", marginBottom: 5,
  };
  const inputStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: "#0a1628",
    border: "none", outline: "none", width: "100%",
    background: "transparent", padding: 0, fontFamily: "inherit",
  };
  const cellStyle = (last = false): React.CSSProperties => ({
    padding: compact ? "10px 12px" : "14px 16px",
    borderRight: last ? "none" : "1px solid #f0f5ff",
    minWidth: 0,
  });

  const carhireFields = (
    <>
      <div style={cellStyle()}>
        <label style={labelStyle}>Pick-up location</label>
        <input style={inputStyle} placeholder="e.g. Liverpool Airport" value={from} onChange={e => setFrom(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Pick-up date</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Return date</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
      </div>
      <div style={cellStyle(true)}>
        <label style={labelStyle}>Drivers</label>
        <input style={inputStyle} type="number" min={1} max={4} value={passengers} onChange={e => setPassengers(+e.target.value)} />
      </div>
    </>
  );

  const hotelFields = (
    <>
      <div style={cellStyle()}>
        <label style={labelStyle}>Destination</label>
        <input style={inputStyle} placeholder="e.g. Liverpool" value={to} onChange={e => setTo(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Check-in</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Check-out</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
      </div>
      <div style={cellStyle(true)}>
        <label style={labelStyle}>Guests</label>
        <input style={inputStyle} type="number" min={1} max={8} value={passengers} onChange={e => setPassengers(+e.target.value)} />
      </div>
    </>
  );

  const flightFields = (
    <>
      <div style={cellStyle()}>
        <label style={labelStyle}>From</label>
        <input style={inputStyle} placeholder="e.g. Liverpool (LPL)" value={from} onChange={e => setFrom(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>To</label>
        <input style={inputStyle} placeholder="e.g. Gatwick (LGW)" value={to} onChange={e => setTo(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Depart</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date1} onChange={e => setDate1(e.target.value)} />
      </div>
      <div style={cellStyle()}>
        <label style={labelStyle}>Return</label>
        <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={date2} onChange={e => setDate2(e.target.value)} />
      </div>
      <div style={cellStyle(true)}>
        <label style={labelStyle}>Pax</label>
        <input style={inputStyle} type="number" min={1} max={9} value={passengers} onChange={e => setPassengers(+e.target.value)} />
      </div>
    </>
  );

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", background: "#f1f6fe", borderBottom: "1px solid #dbe8fa" }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setType(tab.key)}
            style={{
              padding: compact ? "8px 14px" : "11px 20px",
              border: "none",
              borderBottom: type === tab.key ? `2px solid ${ACCENT}` : "2px solid transparent",
              background: type === tab.key ? "#fff" : "transparent",
              color: type === tab.key ? NAVY : "#6b84b0",
              fontSize: compact ? 12 : 13, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.12s", marginBottom: -1,
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Fields grid — responsive via CSS class */}
      <div className={`search-fields-grid search-fields-grid-${type}`}>
        {type === "carhire" && carhireFields}
        {type === "hotels"  && hotelFields}
        {type === "flights" && flightFields}
      </div>

      {/* Search button */}
      <div style={{ background: "#f8faff", padding: compact ? "10px 12px" : "12px 16px" }}>
        <button
          onClick={handleSearch}
          style={{
            width: "100%", background: NAVY, color: "#fff", border: "none",
            borderRadius: 9, padding: compact ? "10px" : "13px",
            fontSize: compact ? 13 : 14, fontWeight: 700,
            cursor: "pointer", letterSpacing: "-0.1px",
            transition: "filter 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}
        >
          🔍 {compact ? "Search" : "Search — transparency included"}
        </button>
      </div>
    </div>
  );
}
