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
  { icon: "🏆", title: "Every result scored",     sub: "0–100 transparency rating" },
  { icon: "🎯", title: "Book direct",              sub: "No middleman no markup" },
  { icon: "💸", title: "Cashback included",        sub: "10% of our commission yours" },
  { icon: "✅", title: "Always free",              sub: "No sign-up required" },
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
    <div style={{ fontFamily: "inherit", minHeight: "100vh" }}>

      {/* ── Nav — navy ── */}
      <nav style={{ background: NAVY, borderBottom: "1px solid #1d4499", padding: "0 28px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 62 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>🔍</span>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </span>
            <span style={{ background: ACCENT, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.04em" }}>BETA</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <a href="#how"      style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Car hire</a>
            <a href="#how"      style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Hotels</a>
            <a href="#how"      style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Flights</a>
            <a href="#how"      style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>How it works</a>
            <a href="#search"   style={{ background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>Search free →</a>
          </div>
        </div>
      </nav>

      {/* ── Hero — navy gradient, floating search card ── */}
      <div style={{ background: "linear-gradient(145deg, #163a8e 0%, #1e4db7 50%, #2d6adc 100%)", padding: "64px 28px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 24, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            Travel Booking · Reimagined
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 62px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-2px" }}>
            <span style={{ color: "#fff" }}>Book travel.</span><br />
            <span style={{ color: YELLOW }}>See everything</span><br />
            <span style={{ color: "#fff" }}>before you pay.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Every result is scored for hidden fees and restrictions before you see it. No desk surprises. No hidden charges.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 44 }}>
            <a href="#search" style={{ background: ACCENT, color: YELLOW, fontWeight: 800, fontSize: 15, padding: "13px 30px", borderRadius: 10, textDecoration: "none", letterSpacing: "-0.2px" }}>
              Search with transparency →
            </a>
            <a href="#how" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
              How it works
            </a>
          </div>

          {/* Floating search card — no bottom radius */}
          <div id="search" style={{ maxWidth: 680, margin: "0 auto", background: "#fff", borderRadius: "14px 14px 0 0", boxShadow: "0 -4px 32px rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <SearchForm />
          </div>
        </div>
      </div>

      {/* ── Trust bar — white ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", padding: "0 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap" as const }}>
          {TRUST_ITEMS.map(({ icon, title, sub }, i) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 32px", borderRight: i < TRUST_ITEMS.length - 1 ? "1px solid #f0f5ff" : "none" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{title}</div>
                <div style={{ fontSize: 11, color: "#6b84b0", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features 3×2 grid ── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #dbe8fa", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: ACCENT, marginBottom: 10 }}>Why FairBooking</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, color: DARK, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
              Everything other platforms hide.{" "}
              <span style={{ color: NAVY }}>We show.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#6b84b0", margin: 0 }}>
              Built on the same AI engine as RentalTruth — transparency at every step.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#f8faff", border: "1px solid #dbe8fa", borderTop: `3px solid ${NAVY}`, borderRadius: 12, padding: "24px 22px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 8 }}>{title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b84b0", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works — horizontal stepper ── */}
      <section id="how" style={{ background: "#f8faff", borderBottom: "1px solid #dbe8fa", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: DARK, margin: "0 0 8px", textAlign: "center" as const, letterSpacing: "-0.5px" }}>
            How FairBooking works
          </h2>
          <p style={{ fontSize: 15, color: "#6b84b0", textAlign: "center" as const, margin: "0 0 52px" }}>Transparency built into every step</p>
          <div style={{ position: "relative" as const, display: "flex", alignItems: "flex-start" }}>
            <div style={{ position: "absolute" as const, top: 23, left: "calc(12.5%)", right: "calc(12.5%)", height: 0, borderTop: "2px dashed #dbe8fa", zIndex: 0 }} />
            {STEPS.map(({ step, icon, title, desc }) => (
              <div key={step} style={{ flex: 1, padding: "0 12px", textAlign: "center" as const, position: "relative" as const, zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: NAVY, color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 4px 16px rgba(22,58,142,0.35)", border: "3px solid #fff" }}>
                  {step}
                </div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 6 }}>{title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b84b0", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results preview ── */}
      <section style={{ background: "#f1f6fe", borderTop: "1px solid #dbe8fa", padding: "40px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 28 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900, color: DARK, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              What results look like
            </h2>
            <p style={{ fontSize: 14, color: "#6b84b0", margin: 0 }}>
              Real transparency scores on live car hire results — try clicking "Full breakdown"
            </p>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            {/* Static preview filter sidebar */}
            <aside style={{ width: 190, flexShrink: 0, background: "#fff", border: "1px solid #dbe8fa", borderRadius: 12, padding: "18px 16px", alignSelf: "flex-start" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: DARK, marginBottom: 14 }}>Filters</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b84b0", marginBottom: 8 }}>
                Min. Transparency
              </div>
              <input type="range" min={0} max={100} defaultValue={0} readOnly style={{ width: "100%", accentColor: NAVY }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 2, marginBottom: 16 }}>
                <span>Any</span><span>100</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#6b84b0", marginBottom: 8 }}>
                Show only
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, cursor: "pointer", fontSize: 12, color: "#374151" }}>
                <input type="checkbox" readOnly style={{ accentColor: NAVY }} /> Free cancellation
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                <input type="checkbox" readOnly style={{ accentColor: NAVY }} /> Debit card accepted
              </label>
            </aside>

            {/* Preview cards */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, gap: 14 }}>
              {PREVIEW_RESULTS.map(r => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA gradient ── */}
      <section style={{ background: "linear-gradient(135deg, #163a8e 0%, #1e4db7 50%, #2d6adc 100%)", padding: "80px 28px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
            Start now — it&apos;s free
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Ready to book with confidence?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", margin: "0 0 32px", lineHeight: 1.65 }}>
            Search car hire, hotels, or flights — with full transparency on every result. No account needed.
          </p>
          <a href="#search" style={{ background: ACCENT, color: YELLOW, fontWeight: 800, fontSize: 16, padding: "16px 40px", borderRadius: 10, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", letterSpacing: "-0.2px" }}>
            Search with transparency →
          </a>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 20 }}>
            Already have a booking?{" "}
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              Analyse it on RentalTruth →
            </a>
          </p>
        </div>
      </section>

      {/* ── Footer — dark ── */}
      <footer style={{ background: DARK, padding: "40px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
              Fair<span style={{ color: ACCENT }}>Booking</span>
            </div>
            <p style={{ fontSize: 12, color: "#6b84b0", margin: 0 }}>Transparent travel booking · Powered by RentalTruth AI</p>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" as const }}>
            <a href="https://rentaltruth.co.uk" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>RentalTruth</a>
            <a href="mailto:hello@fairbooking.co.uk" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>Contact</a>
            <a href="#" style={{ fontSize: 13, color: "#6b84b0", textDecoration: "none", fontWeight: 500 }}>Privacy</a>
            <span style={{ fontSize: 12, color: "#374151" }}>© 2026 FairBooking Ltd</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
