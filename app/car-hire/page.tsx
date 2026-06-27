"use client";
import { useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";
const DARK   = "#0a1628";

const WIDGET_ATTRS: Record<string, string> = {
  src:                          "https://www.discovercars.com/widget.js?v1",
  "data-dev-env":               "com",
  "data-location":              "",
  "data-lang":                  "uk",
  "data-currency":              "gbp",
  "data-utm-source":            "https://www.discovercars.com/?a_aid=rakesheway",
  "data-utm-medium":            "widget",
  "data-aff-code":              "a_aid",
  "data-autocomplete":          "on",
  "data-style-submit-bg-color": "#e8501a",
  "data-style-submit-font-color": "#ffffff",
  "data-style-form-bg-color":   "#163a8e",
  "data-style-form-font-color": "#ffffff",
  "data-style-submit-text":     "Search car hire",
  "data-style-title-color":     "#ffffff",
  "data-title-text":            "Search and compare car hire from 500+ suppliers",
  "data-style_rounded_corners": "on",
  "data-localization_currency_box": "on",
  "data-layout_benefits":       "on",
  "data-layout_description":    "on",
  "data-layout_description_text": "We compare deals from 500+ car rental suppliers. FairBooking transparency scores on every result.",
  "data-layout_logo_style":     "on dark",
  "data-layout_powered_by":     "on",
  "data-layout_style_form_bg_color": "#163a8e",
  "data-layout_title":          "on",
  "data-layout_supplier_logos": "on",
};

function DiscoverCarsWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.id    = "dchwidget";
    script.async = true;
    Object.entries(WIDGET_ATTRS).forEach(([k, v]) => {
      if (k === "src") { script.src = v; }
      else { script.setAttribute(k, v); }
    });
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} />;
}

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

      {/* Hero */}
      <div style={{ background: `linear-gradient(145deg, ${DARK} 0%, ${NAVY} 100%)`, padding: "clamp(48px,6vw,80px) 0 0", width: "100%" }}>
        <div className="container" style={{ textAlign: "center" as const }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 20, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
            Car hire · Powered by DiscoverCars
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(26px, 3.5vw, 50px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-1.5px" }}>
            Book your car hire.<br />
            <em style={{ color: "#f4be41", fontStyle: "normal", whiteSpace: "nowrap" }}>See everything before you pay.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(13px,1.4vw,16px)", lineHeight: 1.7, margin: "0 0 8px", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            Compare 500+ suppliers. Transparency scores on every deal. No hidden fees, no desk surprises.
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "0 0 40px" }}>
            Free to search · No account needed · Best price guaranteed
          </p>

          {/* Widget card */}
          <div style={{ maxWidth: 980, margin: "0 auto", borderRadius: "14px 14px 0 0", overflow: "hidden", boxShadow: "0 -4px 32px rgba(0,0,0,0.25)" }}>
            <DiscoverCarsWidget />
          </div>
        </div>
      </div>

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
