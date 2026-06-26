import SearchForm from "@/components/SearchForm";

const ACCENT = "#e8501a";
const DARK = "#0f172a";

const STEPS = [
  { step: "1", icon: "🔍", title: "Search normally",       desc: "Enter your destination, dates, and preferences — just like any booking site." },
  { step: "2", icon: "🤖", title: "AI scores every result", desc: "Our RentalTruth engine reads the terms of every result and assigns a transparency score." },
  { step: "3", icon: "🏆", title: "See the full picture",   desc: "Results show advertised price, estimated true cost, and all hidden restrictions." },
  { step: "4", icon: "✅", title: "Book with confidence",   desc: "Choose the safest option, not just the cheapest. No surprises at the desk." },
];

const SCORE_TIERS = [
  { range: "80–100", label: "Excellent", color: "#15803d", bg: "#dcfce7", desc: "Book with confidence" },
  { range: "65–79",  label: "Good",      color: "#a16207", bg: "#fef9c3", desc: "Minor restrictions only" },
  { range: "50–64",  label: "Fair",      color: "#c2410c", bg: "#ffedd5", desc: "Review terms carefully" },
  { range: "0–49",   label: "Poor",      color: "#b91c1c", bg: "#fee2e2", desc: "High risk of surprise charges" },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Nav — white with subtle border ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>🔍</span>
            <span style={{ color: DARK, fontSize: 20, fontWeight: 800 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </span>
            <span style={{ background: ACCENT, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.04em" }}>BETA</span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#how"    style={{ color: "#374151", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>How it works</a>
            <a href="#scores" style={{ color: "#374151", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Our scores</a>
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "#374151", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Analyse booking</a>
            <a href="#search" style={{ background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>Search free →</a>
          </div>
        </div>
      </nav>

      {/* ── Hero — sky-blue to white gradient ── */}
      <div style={{ background: "linear-gradient(175deg, #e0f2fe 0%, #f0f9ff 45%, #f8fafc 100%)", padding: "72px 24px 60px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(232,80,26,0.09)", border: "1px solid rgba(232,80,26,0.22)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: ACCENT, marginBottom: 22, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            Travel Booking · Reimagined
          </div>
          <h1 style={{ color: DARK, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 18px", letterSpacing: "-2px" }}>
            Search travel with<br />
            <span style={{ color: ACCENT }}>full transparency.</span>
          </h1>
          <p style={{ color: "#475569", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Every result is scored for hidden fees and restrictions before you see it. No desk surprises. No hidden charges.
          </p>

          {/* Search form card with strong shadow */}
          <div id="search" style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.12)", padding: "28px 28px 24px", textAlign: "left" as const }}>
            <SearchForm />
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" as const }}>
            {[{ icon: "🚗", label: "Car Hire" }, { icon: "🏨", label: "Hotels" }, { icon: "✈️", label: "Flights" }].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13, fontWeight: 600, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "6px 14px" }}>
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust bar — light blue ── */}
      <div style={{ background: "#eff6ff", padding: "22px 24px", borderTop: "1px solid #bfdbfe", borderBottom: "1px solid #bfdbfe" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" as const }}>
          {[
            { icon: "🏆", stat: "Every result scored",       sub: "FairBooking transparency score" },
            { icon: "🔍", stat: "Hidden fees surfaced",       sub: "Before you click Book" },
            { icon: "🤖", stat: "Powered by RentalTruth",    sub: "AI fine-print analysis" },
            { icon: "✅", stat: "Free to use",               sub: "Always — no account needed" },
          ].map(({ icon, stat, sub }) => (
            <div key={stat} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a5f" }}>{stat}</div>
                <div style={{ fontSize: 11, color: "#3b82f6", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Comparison table ── */}
        <section style={{ padding: "72px 0 0" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.5px" }}>
            Not just cheaper. <span style={{ color: ACCENT }}>Clearer.</span>
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", textAlign: "center", margin: "0 0 40px" }}>
            Every booking platform shows you the price. Only FairBooking shows you the truth.
          </p>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid #e2e8f0", maxHeight: 420, overflowY: "auto" as const, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ position: "sticky" as const, top: 0, zIndex: 1 }}>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left" as const, color: "#6b7280", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Feature</th>
                  {["Booking.com", "Expedia", "Kayak", "FairBooking"].map(p => (
                    <th key={p} style={{ padding: "14px 20px", textAlign: "center" as const, color: p === "FairBooking" ? ACCENT : "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const }}>
                      {p === "FairBooking" ? `⚡ ${p}` : p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Shows advertised price",           "✅", "✅", "✅", "✅"],
                  ["Shows estimated TRUE cost",         "❌", "❌", "❌", "✅"],
                  ["Flags hidden restrictions",         "❌", "❌", "❌", "✅"],
                  ["Transparency score per result",     "❌", "❌", "❌", "✅"],
                  ["Flight arrival requirement warning","❌", "❌", "❌", "✅"],
                  ["Deposit hold amount shown",         "❌", "❌", "❌", "✅"],
                  ["Plain English restriction summary", "❌", "❌", "❌", "✅"],
                  ["Generates complaint letter",        "❌", "❌", "❌", "✅"],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "13px 20px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{feature}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{
                        padding: "13px 20px", textAlign: "center" as const, fontSize: 16,
                        fontWeight: j === 3 ? 800 : 400,
                        color: j === 3 ? (v === "✅" ? "#15803d" : "#dc2626") : (v === "✅" ? "#374151" : "#d1d5db"),
                        background: j === 3 ? "rgba(232,80,26,0.03)" : "transparent",
                      }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── How it works — horizontal stepper ── */}
        <section id="how" style={{ padding: "72px 0 0" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.5px" }}>How FairBooking works</h2>
          <p style={{ fontSize: 15, color: "#6b7280", textAlign: "center", margin: "0 0 52px" }}>Transparency built into every step</p>
          <div style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
            {/* Dotted connecting line */}
            <div style={{ position: "absolute" as const, top: 23, left: "calc(12.5% + 0px)", right: "calc(12.5% + 0px)", height: 0, borderTop: "2px dashed #cbd5e1", zIndex: 0 }} />
            {STEPS.map(({ step, icon, title, desc }) => (
              <div key={step} style={{ flex: 1, padding: "0 12px", textAlign: "center" as const, position: "relative" as const, zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 4px 16px rgba(232,80,26,0.35)", border: "3px solid #fff" }}>
                  {step}
                </div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 6 }}>{title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Score explainer — white card with shadow ── */}
        <section id="scores" style={{ padding: "72px 0 0" }}>
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9", padding: "44px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: ACCENT, marginBottom: 12 }}>The FairBooking Score</div>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: DARK, margin: "0 0 14px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>One number. The whole truth.</h2>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 24px" }}>
                Every result is scored 0–100 based on how many hidden restrictions it contains and how severe they are. Powered by the same AI engine as RentalTruth.
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {SCORE_TIERS.map(({ range, label, color, bg, desc }) => (
                  <div key={range} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: bg, color, border: `1px solid ${color}22`, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, minWidth: 54, textAlign: "center" as const, flexShrink: 0 }}>{range}</div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: DARK }}>{label}</span>
                      <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>— {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score preview cards */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {[
                { score: 91, name: "Enterprise",  vehicle: "Ford Focus · Economy", price: "£42", note: "✅ Debit accepted · ✅ Free cancellation" },
                { score: 68, name: "Hertz",        vehicle: "VW Golf · Compact",   price: "£38", note: "⚠️ £600 deposit · ✅ Debit accepted" },
                { score: 34, name: "Alamo",        vehicle: "Toyota Yaris · Mini", price: "£29", note: "🚫 Airport-only rate · 🚫 Credit card only" },
              ].map(({ score, name, vehicle, price, note }) => {
                const s = score >= 80 ? { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0", label: "Excellent" }
                         : score >= 65 ? { bg: "#fef9c3", text: "#a16207", border: "#fde047", label: "Good" }
                         : { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5", label: "Poor" };
                return (
                  <div key={name} style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: DARK }}>{name}</span>
                        <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>
                          {score} · {s.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{vehicle}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{note}</div>
                    </div>
                    <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: DARK }}>{price}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>total</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "72px 0 72px", textAlign: "center" as const }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, color: DARK, margin: "0 0 12px", letterSpacing: "-0.5px" }}>Ready to book without surprises?</h2>
          <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 28px" }}>Search car hire, hotels, or flights — with full transparency on every result.</p>
          <a href="#search" style={{ background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 16, padding: "16px 38px", borderRadius: 10, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 20px rgba(232,80,26,0.35)" }}>
            Start searching →
          </a>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 14 }}>
            Already have a booking?{" "}
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>Analyse it on RentalTruth →</a>
          </p>
        </section>

      </div>

      {/* ── Footer — light grey ── */}
      <div style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 4 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Transparent travel booking · Powered by RentalTruth AI</p>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" as const }}>
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>RentalTruth</a>
            <a href="mailto:hello@fairbooking.co.uk" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>Contact</a>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>© 2026 FairBooking Ltd</span>
          </div>
        </div>
      </div>

    </div>
  );
}
