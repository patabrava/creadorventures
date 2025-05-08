import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Providers from "./providers";

// Import Inter font from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400"], // Light and Regular weights from style guide
});

export const metadata: Metadata = {
  title: "Creador Ventures",
  description: "Building value where others overlook. Creador Ventures blends AI insight with local intuition to fund and accelerate bold founders in LATAM, Africa, Eastern Europe, and the Hispanic USA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body style={{
        margin: 0,
        padding: 0,
        background: "var(--paper)",
        color: "var(--ink)",
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        {/* Wrap entire app with our Providers component */}
        <Providers>
          {/* Neo-Brutalist minimal header with brand mark and navigation */}
          <header style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-sm) var(--space-lg)",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            height: "80px"
          }}>
            <div className="navbar-brand" style={{ color: "var(--paper)" }}>Creador Ventures</div>
            <Navigation />
          </header>
          
          <main style={{
            width: "100%",
            overflow: "hidden",
            display: "block",
            flex: "1 0 auto",
            // Add padding to ensure content isn't hidden behind fixed header
            paddingTop: "80px"
          }}>
            {children}
          </main>
          
          {/* Neo-Brutalist footer with high-contrast dark background */}
          <footer style={{
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            padding: "var(--space-xl)",
            width: "100%",
            flex: "0 0 auto"
          }}>
            <div className="container">
              <div style={{
                borderTop: "1px solid var(--graphite-40)",
                paddingTop: "var(--space-xl)"
              }}>
                <p>
                  Creador Ventures · Bogotá · 
                  <a 
                    href="mailto:biz@creador.vc" 
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "var(--paper)",
                      textDecoration: "none",
                      fontSize: "18px",
                      marginLeft: "var(--space-xs)",
                      paddingLeft: "28px",
                      position: "relative"
                    }}
                  >
                    <span style={{
                      position: "absolute",
                      left: 0,
                      content: '""'
                    }}>→</span>
                    biz@creador.vc
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
