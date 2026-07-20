import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AmbientTrace } from "./components/AmbientTrace";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashu",
  description: "Ashu's personal website",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AmbientTrace />
        {children}
      </body>
      <Script
        src="https://cdn.seline.com/seline.js"
        data-token="6b56edfce044431"
        strategy="afterInteractive"
      />
    </html>
  );
}
