import SearchForm from "@/components/SearchForm";
import Link from "next/link";

const ACCENT = "#e8501a";
const DARK = "#1a1a2e";

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", background: "#f8f7f4" }}>

      {/* Nav */}
      <nav style={{ background: DARK, padding: "0 24px", borderBottom: `3px solid ${ACCENT}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>🔍</span>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </span>
            <span style={{ background: ACCENT, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>BETA</span>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="#how" style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>How it works</a>
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Analyse booking</a>
            <a href="#search" style={{ background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 7, textDecoration: "none" }}>Search now</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `radial-gradient(ellipse at 60% 50%, rgba(232,80,26,0.12) 0%, transparent 60%), ${DARK}`, padding: "72px 24px 64px", minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(232,80,26,0.15)", border: "1px solid rgba(232,80,26,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: ACCENT, marginBottom: 20, letterSpacing: "0.05em" }}>
                TRAVEL BOOKING · REIMAGINED
              </div>
              <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-2px" }}>
                Book travel.<br />
                <span style={{ color: ACCENT }}>No hidden fees.</span><br />
                No surprises.
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: "0 0 32px" }}>
                Every result is scored for transparency before you see it. Hidden charges, deposit traps, and fine-print restrictions — surfaced before you pay.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { icon: "🚗", label: "Car Hire" },
                  { icon: "🏨", label: "Hotels" },
                  { icon: "✈️", label: "Flights" },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13, fontWeight: 600 }}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Search form on hero */}
            <div id="search">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ background: "#16213e", padding: "20px 24px", borderBottom: "1px solid #1e2d45" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
          {[
            { stat: "Every result scored", label: "FairBooking transparency score" },
            { stat: "Hidden fees surfaced", label: "Before you click Book" },
            { stat: "Powered by RentalTruth", label: "AI fine-print analysis" },
            { stat: "Free to use", label: "Always" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>{stat}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* What makes us different */}
        <section style={{ padding: "64px 0 0" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.5px" }}>
            Not just cheaper. <span style={{ color: ACCENT }}>Clearer.</span>
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", textAlign: "center", margin: "0 0 48px" }}>
            Every booking platform shows you the price. Only FairBooking shows you the truth.
          </p>

          {/* Comparison table */}
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, overflow: "hidden", marginBottom: 48 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: DARK }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Feature</th>
                  {["Booking.com", "Expedia", "Kayak", "FairBooking"].map(p => (
                    <th key={p} style={{ padding: "14px 20px", textAlign: "center", color: p === "FairBooking" ? ACCENT : "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Shows advertised price", "✅", "✅", "✅", "✅"],
                  ["Shows estimated TRUE cost", "❌", "❌", "❌", "✅"],
                  ["Flags hidden restrictions", "❌", "❌", "❌", "✅"],
                  ["Transparency score per result", "❌", "❌", "❌", "✅"],
                  ["Flight arrival requirement warning", "❌", "❌", "❌", "✅"],
                  ["Deposit hold amount shown", "❌", "❌", "❌", "✅"],
                  ["Plain English restriction summary", "❌", "❌", "❌", "✅"],
                  ["Generates complaint letter", "❌", "❌", "❌", "✅"],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "12px 20px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{feature}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{ padding: "12px 20px", textAlign: "center", fontSize: 16, fontWeight: j === 3 ? 800 : 400, color: j === 3 && v === "✅" ? "#16a34a" : "inherit" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How it works */}
        <section id="how" style={{ padding: "0 0 64px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center" }}>How FairBooking works</h2>
          <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", margin: "0 0 36px" }}>Transparency built into every step</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { step: "1", icon: "🔍", title: "Search normally", desc: "Enter your destination, dates, and preferences just like any booking site." },
              { step: "2", icon: "🤖", title: "AI scores every result", desc: "Our RentalTruth engine analyses the terms of every result and assigns a transparency score." },
              { step: "3", icon: "🏆", title: "See the full picture", desc: "Results show advertised price, estimated true cost, and all hidden restrictions — before you click." },
              { step: "4", icon: "✅", title: "Book with confidence", desc: "Choose the safest option, not just the cheapest. No desk surprises. No hidden charges." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{step}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 6 }}>{title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Score explainer */}
        <section style={{ padding: "0 0 64px" }}>
          <div style={{ background: DARK, borderRadius: 16, padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: ACCENT, marginBottom: 12 }}>The FairBooking Score</div>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>One number. The whole truth.</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 20px" }}>
                Every result is scored 0-100 based on how many hidden restrictions it contains and how severe they are. Powered by the same AI engine as RentalTruth.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { range: "80–100", label: "Excellent", color: "#16a34a", desc: "Book with confidence" },
                  { range: "65–79", label: "Good", color: "#ca8a04", desc: "Minor restrictions only" },
                  { range: "50–64", label: "Fair", color: "#ea580c", desc: "Review terms carefully" },
                  { range: "0–49", label: "Poor", color: "#dc2626", desc: "High risk of surprise charges" },
                ].map(({ range, label, color, desc }) => (
                  <div key={range} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, minWidth: 52, textAlign: "center" }}>{range}</div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{label}</span>
                      <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>— {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 100, fontWeight: 900, color: ACCENT, lineHeight: 1 }}>82</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#16a34a", marginTop: 4 }}>GOOD — Book with confidence</div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "✅", text: "Debit card accepted", color: "#16a34a" },
                  { icon: "✅", text: "Free cancellation 24h", color: "#16a34a" },
                  { icon: "⚠️", text: "£400 deposit hold", color: "#ca8a04" },
                ].map(({ icon, text, color }) => (
                  <div key={text} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 14px", fontSize: 13, color, fontWeight: 600, textAlign: "left" }}>
                    {icon} {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 0 64px", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: DARK, margin: "0 0 12px" }}>Ready to book without surprises?</h2>
          <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 28px" }}>Search for car hire, hotels, or flights — with full transparency on every result.</p>
          <a href="#search" style={{ background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 16, padding: "16px 36px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>
            Start searching →
          </a>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
            Already have a booking? <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>Analyse it on RentalTruth →</a>
          </p>
        </section>

      </div>

      {/* Footer */}
      <div style={{ background: DARK, borderTop: "1px solid #1e2d45", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </div>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Transparent travel booking · Powered by RentalTruth AI</p>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#475569", textDecoration: "none" }}>RentalTruth</a>
            <a href="mailto:hello@fairbooking.co.uk" style={{ fontSize: 12, color: "#475569", textDecoration: "none" }}>Contact</a>
            <span style={{ fontSize: 11, color: "#334155" }}>© 2026 FairBooking Ltd</span>
          </div>
        </div>
      </div>

    </div>
  );
}
