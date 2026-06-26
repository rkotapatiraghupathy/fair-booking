import NavBar from "@/components/NavBar";
import SearchForm from "@/components/SearchForm";
import ResultCard from "@/components/ResultCard";
import type { CarHireResult } from "@/lib/types";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";
const YELLOW = "#f4be41";
const DARK   = "#0a1628";

const STEPS = [
  { step: "1", icon: "🔍", title: "Search normally",        desc: "Enter your destination, dates, and preferences — just like any booking site." },
  { step: "2", icon: "🤖", title: "AI scores every result", desc: "Our RentalTruth engine reads the terms of every result and assigns a transparency score." },
  { step: "3", icon: "🏆", title: "See the full picture",   desc: "Results show advertised price, estimated true cost, and all hidden restrictions." },
  { step: "4", icon: "✅", title: "Book with confidence",   desc: "Choose the safest option, not just the cheapest. No surprises at the desk." },
];

const FEATURES = [
  { icon: "🏆", title: "Transparency Scores",       desc: "Every result rated 0–100 for hidden fees and restrictions before you see it." },
  { icon: "💰", title: "True Cost Calculated",      desc: "See what you'll actually pay — deposits, surcharges and extras all included." },
  { icon: "🔍", title: "AI Fine-Print Analysis",    desc: "Our AI reads the T&Cs so you don't have to. Every restriction surfaced." },
  { icon: "🎯", title: "Book Direct — No Markup",   desc: "Go straight to the provider. No middleman, no inflated prices." },
  { icon: "💸", title: "Cashback on Every Booking", desc: "10% of our affiliate commission comes back to you. Always." },
  { icon: "✉️", title: "Auto Complaint Letter",     desc: "If things go wrong, we generate a legally-grounded refund request for you." },
];

const TRUST_ITEMS = [
  { icon: "🏆", title: "Every result scored",  sub: "0–100 transparency rating" },
  { icon: "🎯", title: "Book direct",           sub: "No middleman no markup" },
  { icon: "💸", title: "Cashback included",     sub: "10% of our commission yours" },
  { icon: "✅", title: "Always free",           sub: "No sign-up required" },
];

const SCORE_TIERS = [
  { range: "80–100", label: "Excellent", color: "#166534", bg: "#dcfce7", desc: "Book with confidence" },
  { range: "65–79",  label: "Good",      color: "#854d0e", bg: "#fef9c3", desc: "Minor restrictions only" },
  { range: "50–64",  label: "Fair",      color: "#9a3412", bg: "#ffedd5", desc: "Review terms carefully" },
  { range: "0–49",   label: "Poor",      color: "#991b1b", bg: "#fee2e2", desc: "High risk of surprise charges" },
];

const PREVIEW_RESULTS: CarHireResult[] = [
  {
    id: "p1", type: "carhire", provider: "Enterprise", providerLogo: "",
    vehicle: "Ford Focus or similar", category: "Economy",
    pickupLocation: "Liverpool Airport", dropoffLocation: "Liverpool Airport",
    pickupDate: "2026-07-10", dropoffDate: "2026-07-13",
    days: 3, pricePerDay: 22, totalPrice: 66, estimatedTrueCost: 82,
    transparencyScore: 91, transparencyLevel: "EXCELLENT",
    flags: [
      { label: "Debit card accepted", severity: "green" },
      { label: "Free cancellation", severity: "green" },
    ],
    topWarning: null, affiliateUrl: "#", features: [],
  },
  {
    id: "p2", type: "carhire", provider: "Hertz", providerLogo: "",
    vehicle: "VW Golf or similar", category: "Compact",
    pickupLocation: "Liverpool Airport", dropoffLocation: "Liverpool Airport",
    pickupDate: "2026-07-10", dropoffDate: "2026-07-13",
    days: 3, pricePerDay: 18, totalPrice: 54, estimatedTrueCost: 119,
    transparencyScore: 58, transparencyLevel: "FAIR",
    flags: [
      { label: "£600 deposit hold", severity: "amber" },
      { label: "Credit card only", severity: "red" },
    ],
    topWarning: "£600 pre-auth deposit required", affiliateUrl: "#", features: [],
  },
  {
    id: "p3", type: "carhire", provider: "Alamo", providerLogo: "",
    vehicle: "Toyota Yaris or similar", category: "Mini",
    pickupLocation: "Liverpool Airport", dropoffLocation: "Liverpool Airport",
    pickupDate: "2026-07-10", dropoffDate: "2026-07-13",
    days: 3, pricePerDay: 12, totalPrice: 36, estimatedTrueCost: 94,
    transparencyScore: 31, transparencyLevel: "POOR",
    flags: [
      { label: "Boarding pass required", severity: "red" },
      { label: "Credit card only", severity: "red" },
    ],
    topWarning: "Boarding pass required — high denial risk", affiliateUrl: "#", features: [],
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>

      {/* ── Nav — full width ── */}
      <NavBar />

      {/* ── Hero — 100vw gradient, min-height 85vh desktop ── */}
      <div style={{ background: "linear-gradient(145deg, #163a8e 0%, #1e4db7 50%, #2d6adc 100%)", minHeight: "clamp(auto, 85vh, 85vh)", padding: "clamp(40px,6vw,72px) 0 0", width: "100%" }}>
        <div className="container" style={{ textAlign: "center" as const }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 24, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            Travel Booking · Reimagined
          </div>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 52px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-2px" }}>
            <span style={{ color: "#fff" }}>Book travel.</span><br />
            <em className="hero-nowrap" style={{ color: YELLOW, fontStyle: "normal", whiteSpace: "nowrap" }}>See everything before you pay.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(13px, 1.5vw, 17px)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Every result is scored for hidden fees and restrictions before you see it. No desk surprises. No hidden charges.
          </p>

          {/* Hero CTA buttons */}
          <div id="search" className="hero-buttons">
            <a href="#search-form" style={{ background: ACCENT, color: YELLOW, fontWeight: 800, fontSize: "clamp(13px,1.2vw,15px)", padding: "13px 30px", borderRadius: 10, textDecoration: "none", letterSpacing: "-0.2px" }}>
              Search with transparency →
            </a>
            <a href="#how" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", fontWeight: 700, fontSize: "clamp(13px,1.2vw,14px)", padding: "13px 24px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
              How it works
            </a>
          </div>

          {/* Floating search card */}
          <div id="search-form" className="search-card-floating">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* ── Trust bar — full width, white ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="trust-bar-inner">
          {TRUST_ITEMS.map(({ icon, title, sub }) => (
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

      {/* ── Features 3×2 grid — full width ── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container section-pad">
          <div style={{ textAlign: "center" as const, marginBottom: "clamp(28px, 4vw, 44px)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: ACCENT, marginBottom: 10 }}>Why FairBooking</div>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 34px)", fontWeight: 900, color: DARK, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
              Everything other platforms hide.{" "}
              <span style={{ color: NAVY }}>We show.</span>
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "#6b84b0", margin: 0 }}>
              Built on the same AI engine as RentalTruth — transparency at every step.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#f8faff", border: "1px solid #dbe8fa", borderTop: `3px solid ${NAVY}`, borderRadius: 12, padding: "clamp(16px,2vw,24px) clamp(14px,2vw,22px)" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: "clamp(13px,1vw,15px)", fontWeight: 800, color: DARK, marginBottom: 8 }}>{title}</div>
                <p style={{ margin: 0, fontSize: "clamp(12px,0.9vw,13px)", color: "#6b84b0", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works — horizontal stepper ── */}
      <section id="how" style={{ background: "#f8faff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container section-pad">
          <h2 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center" as const, letterSpacing: "-0.5px" }}>
            How FairBooking works
          </h2>
          <p style={{ fontSize: "clamp(13px,1.2vw,15px)", color: "#6b84b0", textAlign: "center" as const, margin: "0 0 clamp(32px,4vw,52px)" }}>
            Transparency built into every step
          </p>
          <div className="stepper">
            <div className="stepper-line" />
            {STEPS.map(({ step, icon, title, desc }) => (
              <div key={step} className="stepper-step">
                <div className="stepper-circle" style={{ background: NAVY, color: "#fff", fontWeight: 900, fontSize: 18, boxShadow: "0 4px 16px rgba(22,58,142,0.35)", border: "3px solid #f8faff" }}>
                  {step}
                </div>
                <div className="stepper-step-text">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: "clamp(12px,1vw,14px)", fontWeight: 800, color: DARK, marginBottom: 5 }}>{title}</div>
                  <p style={{ margin: 0, fontSize: "clamp(11px,0.9vw,13px)", color: "#6b84b0", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Score explainer — full width ── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container section-pad">
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.07)", border: "1px solid #f0f5ff", padding: "clamp(24px,4vw,44px) clamp(20px,4vw,48px)" }}>
            <div className="score-explainer-grid">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: ACCENT, marginBottom: 12 }}>The FairBooking Score</div>
                <h2 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 900, color: DARK, margin: "0 0 14px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>One number. The whole truth.</h2>
                <p style={{ fontSize: "clamp(12px,1vw,14px)", color: "#475569", lineHeight: 1.75, margin: "0 0 24px" }}>
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
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {[
                  { score: 91, name: "Enterprise", vehicle: "Ford Focus · Economy", price: "£42", note: "✅ Debit accepted · ✅ Free cancellation" },
                  { score: 68, name: "Hertz",       vehicle: "VW Golf · Compact",   price: "£38", note: "⚠️ £600 deposit · ✅ Debit accepted" },
                  { score: 34, name: "Alamo",       vehicle: "Toyota Yaris · Mini", price: "£29", note: "🚫 Airport-only rate · 🚫 Credit card only" },
                ].map(({ score, name, vehicle, price, note }) => {
                  const s = score >= 80 ? { bg: "#dcfce7", text: "#166534", border: "#bbf7d0", label: "Excellent" }
                           : score >= 65 ? { bg: "#fef9c3", text: "#854d0e", border: "#fde047", label: "Good" }
                           : { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", label: "Poor" };
                  return (
                    <div key={name} style={{ background: "#f8faff", border: "1.5px solid #dbe8fa", borderRadius: 10, padding: "clamp(10px,1.5vw,14px) clamp(12px,1.5vw,16px)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" as const }}>
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
          </div>
        </div>
      </section>

      {/* ── Results preview — full width ── */}
      <section style={{ background: "#f1f6fe", borderTop: "1px solid #dbe8fa", width: "100%" }}>
        <div className="container section-pad">
          <div style={{ textAlign: "center" as const, marginBottom: "clamp(20px,3vw,28px)" }}>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 900, color: DARK, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              What results look like
            </h2>
            <p style={{ fontSize: "clamp(12px,1vw,14px)", color: "#6b84b0", margin: 0 }}>
              Real transparency scores on live results — try clicking "Full breakdown"
            </p>
          </div>
          <div className="results-preview-layout">
            {/* Static filter sidebar — hidden on mobile via CSS */}
            <aside className="results-preview-sidebar" style={{ background: "#fff", border: "1px solid #dbe8fa", borderRadius: 12, padding: "18px 16px", alignSelf: "flex-start" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 14 }}>Filters</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b84b0", marginBottom: 8 }}>Min. Transparency</div>
              <input type="range" min={0} max={100} defaultValue={0} readOnly style={{ width: "100%", accentColor: NAVY }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 2, marginBottom: 16 }}>
                <span>Any</span><span>100</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b84b0", marginBottom: 8 }}>Show only</div>
              <label style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, cursor: "pointer", fontSize: 12, color: "#374151" }}>
                <input type="checkbox" readOnly style={{ accentColor: NAVY }} /> Free cancellation
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                <input type="checkbox" readOnly style={{ accentColor: NAVY }} /> Debit card accepted
              </label>
            </aside>

            {/* Preview cards */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" as const, gap: 14 }}>
              {PREVIEW_RESULTS.map(r => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA gradient — full width ── */}
      <section style={{ background: "linear-gradient(135deg, #163a8e 0%, #1e4db7 50%, #2d6adc 100%)", width: "100%" }}>
        <div className="container section-pad" style={{ textAlign: "center" as const }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
              Start now — it&apos;s free
            </div>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
              Ready to book with confidence?
            </h2>
            <p style={{ fontSize: "clamp(13px,1.2vw,16px)", color: "rgba(255,255,255,0.75)", margin: "0 0 32px", lineHeight: 1.65 }}>
              Search car hire, hotels, or flights — with full transparency on every result. No account needed.
            </p>
            <a href="#search-form" style={{ background: ACCENT, color: YELLOW, fontWeight: 800, fontSize: "clamp(14px,1.2vw,16px)", padding: "16px 40px", borderRadius: 10, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", letterSpacing: "-0.2px" }}>
              Search with transparency →
            </a>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 20 }}>
              Already have a booking?{" "}
              <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                Analyse it on RentalTruth →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer — full width dark ── */}
      <footer style={{ background: DARK, width: "100%" }}>
        <div className="container" style={{ padding: "clamp(28px,4vw,40px) clamp(16px,4vw,80px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 20 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                Fair<span style={{ color: ACCENT }}>Booking</span>
              </div>
              <p style={{ fontSize: 12, color: "#6b84b0", margin: 0 }}>Transparent travel booking · Powered by RentalTruth AI</p>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" as const }}>
              <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>RentalTruth</a>
              <a href="mailto:hello@fairbooking.co.uk" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>Contact</a>
              <a href="#" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>Privacy</a>
              <span style={{ fontSize: 12, color: "#374151" }}>© 2026 FairBooking Ltd</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
