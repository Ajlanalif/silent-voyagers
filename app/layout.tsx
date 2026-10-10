import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silent Voyagers | NASA International Space Apps Challenge 2026",
  description:
    "Honoring humanity's silent robotic pioneers resting across extraterrestrial landscapes. Interactive 3D WebGL meshes, telemetry sonification, and scrollytelling for retired relics on the Moon and Mars.",
  keywords: [
    "NASA Space Apps Challenge 2026",
    "Silent Voyagers",
    "Opportunity Rover",
    "Spirit Rover",
    "InSight Lander",
    "Apollo 11",
    "Extraterrestrial Relics",
    "Comilla University",
    "Relic Watchers",
    "NASA 3D Models",
    "Three.js",
  ],
  authors: [{ name: "Team Relic Watchers (Sayed Ajlan Al Alif & Farzana Sultana Soma)" }],
  openGraph: {
    title: "Silent Voyagers - NASA Extraterrestrial Relic Preservation",
    description: "Honoring humanity's silent robotic pioneers resting across extraterrestrial landscapes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
        {children}
      </body>
    </html>
  );
}
