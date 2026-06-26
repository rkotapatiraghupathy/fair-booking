"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";
const DARK   = "#0a1628";
const BORDER = "#dbe8fa";

interface FormData {
  airline: string;
  flightNumber: string;
  flightDate: string;
  issueType: "delay" | "cancellation" | "baggage" | "denied" | "";
  delayDuration: string;
  cancellationNotice: string;
  baggageIssue: string;
  deniedReason: string;
  bookingRef: string;
  departureAirport: string;
  arrivalAirport: string;
  passengersAffected: number;
  offeredCompensation: boolean;
  compensationAmount: string;
  name: string;
  email: string;
}

interface Result {
  eligible: boolean;
  reason: string;
  compensationPerPassenger: number | null;
  totalCompensation: number | null;
  strengthOfClaim: "strong" | "medium" | "weak";
  letter: string;
  nextSteps: string[];
  escalationPath: string;
  timeLimit: string;
}

const ISSUE_TYPES = [
  { key: "delay",        icon: "✈️", label: "Flight delayed",        desc: "Your flight arrived late at the destination" },
  { key: "cancellation", icon: "❌", label: "Flight cancelled",       desc: "Your flight was cancelled before or on the day" },
  { key: "baggage",      icon: "🧳", label: "Baggage lost / damaged", desc: "Your luggage was lost, damaged or delayed" },
  { key: "denied",       icon: "🚫", label: "Denied boarding",        desc: "You were refused boarding despite a valid ticket" },
] as const;

const STEP2_CONFIG = {
  delay: {
    label: "How long was the delay?",
    field: "delayDuration" as keyof FormData,
    options: [
      { key: "under2", label: "Under 2 hours",  hint: "Unlikely to qualify for UK261 compensation" },
      { key: "2to3",   label: "2–3 hours",       hint: "May qualify depending on route distance" },
      { key: "3to4",   label: "3–4 hours",       hint: "Qualifies for most routes under UK261" },
      { key: "over4",  label: "Over 4 hours",    hint: "Qualifies for all route distances under UK261" },
    ],
  },
  cancellation: {
    label: "How much notice did you receive?",
    field: "cancellationNotice" as keyof FormData,
    options: [
      { key: "under7",  label: "Under 7 days",   hint: "Strong claim — entitled to full UK261 compensation" },
      { key: "7to14",   label: "7–14 days",       hint: "Partial claim depending on rebooking offered" },
      { key: "over14",  label: "Over 14 days",    hint: "UK261 compensation unlikely — goodwill claim possible" },
    ],
  },
  baggage: {
    label: "What happened to your bag?",
    field: "baggageIssue" as keyof FormData,
    options: [
      { key: "lost",     label: "Lost permanently",    hint: "Up to £1,300 under the Montreal Convention" },
      { key: "damaged",  label: "Damaged",              hint: "Up to £1,300 under the Montreal Convention" },
      { key: "delayed",  label: "Delayed / late arrival", hint: "Expenses incurred may be recoverable" },
    ],
  },
  denied: {
    label: "Why were you denied boarding?",
    field: "deniedReason" as keyof FormData,
    options: [
      { key: "overbooked", label: "Flight was overbooked",    hint: "Strong claim — involuntary denial is covered by UK261" },
      { key: "docs",       label: "Document or check-in issue", hint: "Claim depends on who was at fault" },
      { key: "other",      label: "Other reason",               hint: "Will be assessed based on the circumstances" },
    ],
  },
};

const STEP_LABELS = ["What happened", "More details", "Booking", "Your info", "Result"];

const EMPTY_FORM: FormData = {
  airline: "", flightNumber: "", flightDate: "", issueType: "",
  delayDuration: "", cancellationNotice: "", baggageIssue: "", deniedReason: "",
  bookingRef: "", departureAirport: "", arrivalAirport: "",
  passengersAffected: 1, offeredCompensation: false, compensationAmount: "",
  name: "", email: "",
};

function getStep2Value(form: FormData): string {
  switch (form.issueType) {
    case "delay":        return form.delayDuration;
    case "cancellation": return form.cancellationNotice;
    case "baggage":      return form.baggageIssue;
    case "denied":       return form.deniedReason;
    default:             return "";
  }
}

function canContinue(step: number, form: FormData): boolean {
  if (step === 1) return !!(form.airline && form.flightNumber && form.flightDate && form.issueType);
  if (step === 2) return !!getStep2Value(form);
  if (step === 3) return !!(form.bookingRef && form.departureAirport && form.arrivalAirport && form.passengersAffected >= 1);
  if (step === 4) return !!(form.name && form.email && form.email.includes("@"));
  return true;
}

function timeLimit(flightDate: string): string {
  if (!flightDate) return "6 years from your flight date";
  const d = new Date(flightDate);
  d.setFullYear(d.getFullYear() + 6);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function downloadLetter(letter: string, airline: string) {
  const blob = new Blob([letter], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `complaint-${airline.replace(/\s+/g, "-").toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function FlightHelp() {
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<Result | null>(null);
  const [apiError, setApiError] = useState("");
  const [copied, setCopied]   = useState(false);
  const [form, setForm]       = useState<FormData>(EMPTY_FORM);

  function update(field: keyof FormData, value: string | number | boolean) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function next() {
    if (step < 4) { setStep(s => s + 1); return; }
    // Step 4 → submit
    submit();
  }

  function back() {
    if (step > 1) setStep(s => s - 1);
  }

  function restart() {
    setStep(1); setResult(null); setApiError(""); setForm(EMPTY_FORM);
  }

  async function submit() {
    setStep(5);
    setLoading(true);
    setApiError("");
    try {
      const res  = await fetch("/api/flight-help", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setApiError(e.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLetter() {
    if (!result) return;
    await navigator.clipboard.writeText(result.letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // ── UI helpers ──────────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: `1.5px solid ${BORDER}`,
    borderRadius: 9, fontSize: 14, color: DARK, outline: "none",
    fontFamily: "inherit", background: "#fff", transition: "border-color 0.15s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "#374151",
    display: "block", marginBottom: 6, letterSpacing: "0.01em",
  };
  const sectionHead: React.CSSProperties = {
    fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 20,
  };

  // ── Progress bar ────────────────────────────────────────────────────────────

  function ProgressBar() {
    return (
      <div style={{ background: "#f8faff", borderBottom: `1px solid ${BORDER}`, padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, position: "relative" }}>
          {STEP_LABELS.map((label, i) => {
            const n       = i + 1;
            const done    = n < step;
            const active  = n === step;
            const bg      = done ? "#16a34a" : active ? NAVY : "#e2e8f0";
            const tcol    = done || active ? "#fff" : "#9ca3af";
            const isLast  = i === STEP_LABELS.length - 1;
            return (
              <div key={n} style={{ display: "flex", alignItems: "center", flex: isLast ? "none" : 1 }}>
                <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: bg, color: tcol, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0, transition: "background 0.2s" }}>
                    {done ? "✓" : n}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? NAVY : "#9ca3af", whiteSpace: "nowrap" as const, lineHeight: 1 }}>
                    {label}
                  </span>
                </div>
                {!isLast && (
                  <div style={{ flex: 1, height: 2, background: done ? "#16a34a" : "#e2e8f0", margin: "0 6px", marginBottom: 20, transition: "background 0.2s" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Step 1 ──────────────────────────────────────────────────────────────────

  function Step1() {
    return (
      <div>
        <p style={sectionHead}>What happened on your flight?</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div>
            <label style={labelStyle}>Airline</label>
            <input style={inputStyle} placeholder="e.g. British Airways" value={form.airline} onChange={e => update("airline", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Flight number</label>
            <input style={inputStyle} placeholder="e.g. BA0245" value={form.flightNumber} onChange={e => update("flightNumber", e.target.value.toUpperCase())} />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Flight date</label>
          <input style={{ ...inputStyle, colorScheme: "light" }} type="date" value={form.flightDate} onChange={e => update("flightDate", e.target.value)} />
        </div>

        <div>
          <label style={{ ...labelStyle, marginBottom: 12 }}>What was the issue?</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {ISSUE_TYPES.map(({ key, icon, label, desc }) => {
              const sel = form.issueType === key;
              return (
                <button
                  key={key}
                  onClick={() => update("issueType", key)}
                  style={{
                    background: sel ? "#eff6ff" : "#fff",
                    border: sel ? `2px solid ${NAVY}` : `1.5px solid ${BORDER}`,
                    borderRadius: 12, padding: "16px 14px", cursor: "pointer",
                    textAlign: "left" as const, transition: "all 0.15s",
                    outline: "none",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: sel ? NAVY : DARK, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>{desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2 ──────────────────────────────────────────────────────────────────

  function Step2() {
    if (!form.issueType) return null;
    const config = STEP2_CONFIG[form.issueType];
    const curVal = getStep2Value(form);
    return (
      <div>
        <p style={sectionHead}>{config.label}</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {config.options.map(({ key, label, hint }) => {
            const sel = curVal === key;
            return (
              <button
                key={key}
                onClick={() => update(config.field, key)}
                style={{
                  background: sel ? "#eff6ff" : "#fff",
                  border: sel ? `2px solid ${NAVY}` : `1.5px solid ${BORDER}`,
                  borderRadius: 10, padding: "14px 18px", cursor: "pointer",
                  textAlign: "left" as const, transition: "all 0.15s", outline: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: sel ? NAVY : DARK, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{hint}</div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: sel ? `5px solid ${NAVY}` : `2px solid ${BORDER}`, flexShrink: 0, transition: "all 0.15s" }} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Step 3 ──────────────────────────────────────────────────────────────────

  function Step3() {
    return (
      <div>
        <p style={sectionHead}>Booking details</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
          <div>
            <label style={labelStyle}>Booking reference</label>
            <input style={inputStyle} placeholder="e.g. XYZ123" value={form.bookingRef} onChange={e => update("bookingRef", e.target.value.toUpperCase())} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>Departure airport</label>
              <input style={inputStyle} placeholder="e.g. London Heathrow (LHR)" value={form.departureAirport} onChange={e => update("departureAirport", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Arrival airport</label>
              <input style={inputStyle} placeholder="e.g. New York (JFK)" value={form.arrivalAirport} onChange={e => update("arrivalAirport", e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Number of passengers affected</label>
            <input style={{ ...inputStyle, maxWidth: 120 }} type="number" min={1} max={20} value={form.passengersAffected} onChange={e => update("passengersAffected", +e.target.value)} />
          </div>
          <div>
            <label style={{ ...labelStyle, marginBottom: 10 }}>Did the airline offer any compensation?</label>
            <div style={{ display: "flex", gap: 10 }}>
              {(["Yes", "No"] as const).map(opt => {
                const sel = opt === "Yes" ? form.offeredCompensation : !form.offeredCompensation;
                return (
                  <button
                    key={opt}
                    onClick={() => update("offeredCompensation", opt === "Yes")}
                    style={{
                      padding: "9px 24px", border: sel ? `2px solid ${NAVY}` : `1.5px solid ${BORDER}`,
                      borderRadius: 8, background: sel ? "#eff6ff" : "#fff",
                      color: sel ? NAVY : "#374151", fontWeight: 700, fontSize: 14,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          {form.offeredCompensation && (
            <div>
              <label style={labelStyle}>How much did they offer? (£)</label>
              <input style={{ ...inputStyle, maxWidth: 180 }} type="number" placeholder="e.g. 100" value={form.compensationAmount} onChange={e => update("compensationAmount", e.target.value)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Step 4 ──────────────────────────────────────────────────────────────────

  function Step4() {
    return (
      <div>
        <p style={sectionHead}>Your details</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input style={inputStyle} placeholder="e.g. Jane Smith" value={form.name} onChange={e => update("name", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Email address</label>
            <input style={inputStyle} type="email" placeholder="e.g. jane@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 20, padding: "12px 16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, fontSize: 12, color: "#166534", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <span>We don&apos;t store your data — everything is generated locally and your information is only used to draft your complaint letter.</span>
        </div>
      </div>
    );
  }

  // ── Step 5 — Results ────────────────────────────────────────────────────────

  function Results() {
    if (loading) {
      return (
        <div style={{ textAlign: "center" as const, padding: "48px 0" }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>⚖️</div>
          <p style={{ fontSize: 17, fontWeight: 700, color: DARK, margin: "0 0 8px" }}>Analysing your claim…</p>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Checking UK261 eligibility and drafting your letter</p>
          <div style={{ marginTop: 28, height: 4, background: "#f1f5f9", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: NAVY, borderRadius: 2, width: "60%", animation: "none" }} />
          </div>
        </div>
      );
    }

    if (apiError) {
      return (
        <div style={{ textAlign: "center" as const, padding: "40px 0" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#991b1b", marginBottom: 16 }}>{apiError}</p>
          <button onClick={() => { setStep(4); setApiError(""); }} style={{ padding: "10px 24px", background: NAVY, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            ← Go back and try again
          </button>
        </div>
      );
    }

    if (!result) return null;

    const strengthCol = result.strengthOfClaim === "strong" ? "#166534" : result.strengthOfClaim === "medium" ? "#854d0e" : "#991b1b";
    const strengthBg  = result.strengthOfClaim === "strong" ? "#dcfce7" : result.strengthOfClaim === "medium" ? "#fef9c3" : "#fee2e2";
    const strengthPct = result.strengthOfClaim === "strong" ? "85%" : result.strengthOfClaim === "medium" ? "55%" : "25%";

    return (
      <div>
        {/* Compensation badge */}
        <div style={{ textAlign: "center" as const, marginBottom: 28 }}>
          {result.eligible && result.totalCompensation ? (
            <div style={{ display: "inline-block", background: "#dcfce7", border: "2px solid #86efac", borderRadius: 20, padding: "16px 32px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#166534", marginBottom: 4 }}>
                You may be owed
              </div>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#166534", lineHeight: 1 }}>
                £{result.totalCompensation.toLocaleString()}
              </div>
              {result.compensationPerPassenger && form.passengersAffected > 1 && (
                <div style={{ fontSize: 13, color: "#166534", marginTop: 4 }}>
                  £{result.compensationPerPassenger} × {form.passengersAffected} passengers
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "inline-block", background: "#f1f5f9", border: "2px solid #e2e8f0", borderRadius: 20, padding: "16px 32px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 4 }}>Not eligible for UK261 compensation</div>
              <div style={{ fontSize: 13, color: "#6b7280", maxWidth: 360 }}>{result.reason}</div>
            </div>
          )}
        </div>

        {/* Reason */}
        {result.eligible && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>
            ℹ️ {result.reason}
          </div>
        )}

        {/* Strength of claim */}
        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>Strength of claim</span>
            <span style={{ background: strengthBg, color: strengthCol, border: `1px solid ${strengthCol}33`, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700, textTransform: "capitalize" as const }}>
              {result.strengthOfClaim}
            </span>
          </div>
          <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: strengthPct, background: strengthCol, borderRadius: 4, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Complaint letter */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ background: "#f8faff", borderBottom: `1px solid ${BORDER}`, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>📄 Formal Complaint Letter</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={copyLetter}
                style={{ padding: "6px 14px", border: `1.5px solid ${BORDER}`, borderRadius: 7, background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
              <button
                onClick={() => downloadLetter(result.letter, form.airline)}
                style={{ padding: "6px 14px", border: "none", borderRadius: 7, background: NAVY, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              >
                ⬇ Download
              </button>
            </div>
          </div>
          <div style={{ padding: "20px 22px", maxHeight: 340, overflowY: "auto" as const, background: "#fff" }}>
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: 13, color: DARK, lineHeight: 1.7, whiteSpace: "pre-wrap" as const, wordBreak: "break-word" as const }}>
              {result.letter}
            </pre>
          </div>
        </div>

        {/* Next steps */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 14 }}>📋 Next steps</div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {result.nextSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation path */}
        <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderLeft: `4px solid ${ACCENT}`, borderRadius: 10, padding: "14px 18px", marginBottom: 16, fontSize: 13, color: "#9a3412", lineHeight: 1.6 }}>
          <strong>⚡ If the airline refuses:</strong> {result.escalationPath}
        </div>

        {/* Time limit */}
        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 18px", fontSize: 13, color: "#374151", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>⏰</span>
          <span>
            <strong>Claim deadline:</strong> {form.flightDate ? `${timeLimit(form.flightDate)} (6 years under UK law)` : result.timeLimit}
          </span>
        </div>

        {/* Restart */}
        <div style={{ marginTop: 24, textAlign: "center" as const }}>
          <button onClick={restart} style={{ padding: "10px 24px", background: "none", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#6b7280", cursor: "pointer" }}>
            ← Start a new claim
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  const isResult = step === 5;

  return (
    <div style={{ minHeight: "100vh", background: "#f1f6fe", width: "100%" }}>
      <NavBar
        showLinks={false}
        rightContent={
          <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", textDecoration: "none", fontWeight: 500 }}>
            ← FairBooking
          </a>
        }
      />

      {/* Hero */}
      <div style={{ background: `linear-gradient(150deg, ${DARK} 0%, ${NAVY} 100%)`, padding: "clamp(40px,6vw,72px) 28px clamp(40px,5vw,60px)" }}>
        <div className="container" style={{ textAlign: "center" as const }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 20, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
            UK261 Compensation Calculator
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px, 3.5vw, 46px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-1.5px" }}>
            Get the flight compensation<br />you&apos;re owed
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(13px,1.4vw,16px)", lineHeight: 1.7, margin: "0 0 8px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            UK law entitles you to up to <strong style={{ color: "#fff" }}>£520 per passenger</strong> for delays, cancellations and denied boarding.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
            Free · No win no fee · Takes 3 minutes
          </p>
        </div>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(20px,4vw,40px) clamp(16px,4vw,28px) 60px" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 4px 32px rgba(22,58,142,0.08)" }}>
          <ProgressBar />

          <div style={{ padding: "clamp(20px,4vw,36px)" }}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Results />}

            {/* Navigation buttons */}
            {!isResult && (
              <div style={{ display: "flex", justifyContent: step === 1 ? "flex-end" : "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
                {step > 1 && (
                  <button onClick={back} style={{ padding: "11px 24px", border: `1.5px solid ${BORDER}`, borderRadius: 9, background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                    ← Back
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={!canContinue(step, form)}
                  style={{
                    padding: "11px 28px", border: "none", borderRadius: 9,
                    background: canContinue(step, form) ? NAVY : "#e2e8f0",
                    color: canContinue(step, form) ? "#fff" : "#9ca3af",
                    fontSize: 14, fontWeight: 700, cursor: canContinue(step, form) ? "pointer" : "default",
                    transition: "all 0.15s",
                  }}
                >
                  {step === 4 ? "Generate letter →" : "Continue →"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust strip */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 20, flexWrap: "wrap" as const }}>
          {["🔒 Your data is not stored", "⚖️ Based on UK261 law", "✉️ Legally-grounded letter"].map(t => (
            <span key={t} style={{ fontSize: 12, color: "#6b84b0", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
