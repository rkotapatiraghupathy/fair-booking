"use client";
import NavBar from "@/components/NavBar";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";
const DARK   = "#0a1628";

const TRUST = [
  { icon: "🚗", title: "500+ suppliers",      sub: "Enterprise, Hertz, Sixt, Europcar & more" },
  { icon: "💰", title: "Save up to 70%",      sub: "Best rates compared instantly" },
  { icon: "🔍", title: "Transparency scores", sub: "Hidden fees surfaced before you book" },
  { icon: "✅", title: "Free cancellation",   sub: "Most deals cancellable up to 48 hours" },
];

const WHY = [
  { icon: "🏆", title: "Every deal scored 0–100", desc: "Our AI reads the terms of every car hire deal and assigns a transparency score before you see the price." },
  { icon: "💰", title: "True cost shown upfront",  desc: "Deposit holds, fuel policies, insurance extras — all estimated and shown alongside the advertised rate." },
  { icon: "🚫", title: "High-risk deals flagged",  desc: "Boarding pass requirements, credit-card-only policies and hidden airport surcharges are surfaced instantly." },
  { icon: "📄", title: "Complaint letter ready",   desc: "If something goes wrong at the desk, generate a legally-grounded complaint letter in 30 seconds." },
];

export default function CarHirePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f6fe", width: "100%" }}>
      <NavBar />

      {/* Trust bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="trust-bar-inner">
          {TRUST.map(({ icon, title, sub }) => (
            <div key={title} className="trust-item">
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{title}</div>
                <div style={{ fontSize: 11, color: "#6b84b0", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why FairBooking + DiscoverCars */}
      <section style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container section-pad">
          <div style={{ textAlign: "center" as const, marginBottom: "clamp(24px,4vw,40px)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: ACCENT, marginBottom: 10 }}>Why book here</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, color: DARK, margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              More than just the cheapest price.
            </h2>
            <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "#6b84b0", margin: 0, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
              We layer FairBooking transparency scores on every DiscoverCars result so you see the real story — not just the headline rate.
            </p>
          </div>
          <div className="features-grid">
            {WHY.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#f8faff", border: "1px solid #dbe8fa", borderTop: `3px solid ${NAVY}`, borderRadius: 12, padding: "22px 20px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 7 }}>{title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b84b0", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flight help CTA */}
      <section style={{ background: "#f1f6fe", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container" style={{ padding: "clamp(28px,4vw,48px) clamp(16px,4vw,80px)" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" as const, justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 4 }}>✈️ Flight go wrong on the way there?</div>
              <div style={{ fontSize: 13, color: "#6b84b0" }}>Get up to £520 per passenger under UK261 — free complaint letter in 3 minutes.</div>
            </div>
            <a href="/flight-help" style={{ background: NAVY, color: "#fff", borderRadius: 9, padding: "11px 24px", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
              Flight help →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: DARK, width: "100%" }}>
        <div className="container" style={{ padding: "clamp(24px,4vw,36px) clamp(16px,4vw,80px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                Fair<span style={{ color: ACCENT }}>Booking</span>
              </div>
              <p style={{ fontSize: 12, color: "#6b84b0", margin: 0 }}>Car hire search powered by DiscoverCars · Transparency by FairBooking</p>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const }}>
              <a href="/" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none" }}>Home</a>
              <a href="/flight-help" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none" }}>Flight help</a>
              <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none" }}>RentalTruth</a>
              <span style={{ fontSize: 12, color: "#374151" }}>© 2026 FairBooking Ltd</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
