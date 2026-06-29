import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";

export const metadata: Metadata = {
  title: "FairBooking — Book Travel with Full Transparency",
  description: "The only travel booking platform that shows hidden fees, restrictions and true costs before you pay.",
  metadataBase: new URL("https://fairbooking.co.uk"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="tp-drive"
          strategy="afterInteractive"
          src="https://emrld.ltd/NTQzODg1.js?t=543885"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
