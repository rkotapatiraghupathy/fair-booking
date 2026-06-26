"use client";
import { useState } from "react";

const NAVY   = "#163a8e";
const ACCENT = "#e8501a";

interface Props {
  showLinks?: boolean;
  rightContent?: React.ReactNode;
}

export default function NavBar({ showLinks = true, rightContent }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: NAVY, borderBottom: "1px solid #1d4499", position: "sticky", top: 0, zIndex: 50, width: "100%" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 62 }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: 20 }}>🔍</span>
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
            Fair<span style={{ color: ACCENT }}>Booking</span>
          </span>
          <span style={{ background: ACCENT, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.04em" }}>BETA</span>
        </a>

        {/* Desktop links */}
        {showLinks && (
          <div className="nav-links">
            {[
              { label: "Car hire",    href: "/#search" },
              { label: "Hotels",      href: "/#search" },
              { label: "Flights",     href: "/#search" },
              { label: "How it works", href: "/#how" },
              { label: "✈️ Flight help", href: "/flight-help" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                {label}
              </a>
            ))}
            <a href="/#search" style={{ background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>
              Search free →
            </a>
          </div>
        )}

        {/* Right content slot (results page) */}
        {!showLinks && rightContent && (
          <div>{rightContent}</div>
        )}

        {/* Hamburger */}
        {showLinks && (
          <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {showLinks && (
        <div className={`nav-mobile-menu${open ? " open" : ""}`} style={{ position: "absolute", top: "100%", left: 0, right: 0 }}>
          {[
            { label: "Car hire",       href: "/#search" },
            { label: "Hotels",         href: "/#search" },
            { label: "Flights",        href: "/#search" },
            { label: "How it works",   href: "/#how" },
            { label: "✈️ Flight help", href: "/flight-help" },
          ].map(({ label, href }) => (
            <a
              key={label} href={href}
              onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 500, textDecoration: "none", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "block" }}
            >
              {label}
            </a>
          ))}
          <div style={{ padding: "14px 24px" }}>
            <a
              href="/#search" onClick={() => setOpen(false)}
              style={{ background: ACCENT, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 8, textDecoration: "none", display: "block", textAlign: "center" as const }}
            >
              Search free →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
