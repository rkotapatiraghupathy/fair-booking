import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FairBooking — Book Travel with Full Transparency",
  description: "The only travel booking platform that shows hidden fees, restrictions and true costs before you pay. Car hire, hotels and flights with FairBooking scores on every result.",
  keywords: "transparent travel booking, car hire hidden fees, hotel hidden charges, flight extra costs, fairbooking, fair booking",
  metadataBase: new URL("https://fairbooking.co.uk"),
  openGraph: {
    title: "FairBooking — Book Travel with Full Transparency",
    description: "See the real cost before you book. No hidden fees. No desk surprises.",
    url: "https://fairbooking.co.uk",
    siteName: "FairBooking",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
