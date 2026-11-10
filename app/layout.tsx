import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tata Motors Digital Brochures | View & Download Vehicle Brochures",
  description:
    "Official Tata Motors digital brochure platform. Access official vehicle brochures online via NFC or download original high-resolution PDFs.",
  keywords: [
    "Tata Motors",
    "Tata Tiago",
    "Digital Brochure",
    "Vehicle Specifications",
    "NFC Brochure",
  ],
  authors: [{ name: "Tata Motors" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#002D62",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F9FAFB] text-neutral-900 selection:bg-tata-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
