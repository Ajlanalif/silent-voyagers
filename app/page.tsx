"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ChapterCard from "@/components/story/ChapterCard";
import ScrollytellingSection from "@/components/story/ScrollytellingSection";
import CoordinateMap from "@/components/visualizer/CoordinateMap";
import DatasetMatrix from "@/components/story/DatasetMatrix";
import TeamSection from "@/components/ui/TeamSection";
import FigmaModal from "@/components/ui/FigmaModal";
import RelicModal from "@/components/ui/RelicModal";
import relicsData from "@/data/relics.json";
import { Relic } from "@/data/types";
import { 
  ArrowRight, 
  ExternalLink, 
  Globe2, 
  MapPin, 
  Radio, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  Compass, 
  Activity, 
  Orbit 
} from "lucide-react";

// Client-only dynamic import for Three.js 3D Canvas
const RoverCanvas3D = dynamic(() => import("@/components/visualizer/RoverCanvas3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading Three.js WebGL Engine...
    </div>
  ),
});

export default function Home() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [ambientSound, setAmbientSound] = useState(false);
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);
  const [inspectedRelic, setInspectedRelic] = useState<Relic | null>(null);
  const [selectedRelicId, setSelectedRelicId] = useState<string>("mer-opportunity");
  const [activeTab, setActiveTab] = useState<"All" | "Mars" | "Moon">("All");

  const relics = relicsData as Relic[];

  const filteredRelics = relics.filter((r) => {
    if (activeTab === "All") return true;
    return r.celestialBody === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        ambientSound={ambientSound}
        setAmbientSound={setAmbientSound}
        onOpenFigmaModal={() => setIsFigmaModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden">
        
        {/* Cosmic Backdrop Gradients & Starlight Simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(249,115,22,0.18),rgba(255,255,255,0))]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Challenge Track Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-md text-orange-400 text-xs font-semibold tracking-wide shadow-inner shadow-orange-500/10">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>NASA Space Apps 2026 • Abandoned but not Forgotten</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
              Silent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500">Voyagers</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              {lang === "en"
                ? "Honoring humanity's silent robotic pioneers resting across extraterrestrial landscapes."
                : "চন্দ্র ও মঙ্গলপৃষ্ঠের নির্জন প্রান্তে চিরঘুমে শায়িত মানবজাতির নীরব রোবোটিক অগ্রদূতদের প্রতি শ্রদ্ধাঞ্জলি।"}
            </p>
          </div>

          {/* Primary Action Buttons (Prominent Figma CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* High-Impact Interactive Figma Prototype Button */}
            <a
              href="https://client-flick-59003537.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "5s" }} />
              <span>Explore Interactive Figma Prototype</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Jump to 3D Canvas */}
            <a
              href="#visualizer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>Launch 3D Hardware Inspector</span>
            </a>
          </div>

          {/* Mission Statistics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-400">5,111</span>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Sols Traversed (Oppy)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">1,319</span>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Marsquakes Logged</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">57+</span>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Years on Lunar Soil</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">4</span>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">NASA Relics Cataloged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Relics Explorer Gallery */}
      <section id="relics" className="py-20 relative bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-2">
                <Orbit className="w-3.5 h-3.5" />
                <span>Extraterrestrial Artifacts</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Catalog of Retired Lunar & Martian Hardware
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["All", "Mars", "Moon"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRelics.map((relic) => (
              <ChapterCard
                key={relic.id}
                relic={relic}
                onExplore={(r) => {
                  setInspectedRelic(r);
                  setSelectedRelicId(r.id);
                }}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Hardware Inspector Section */}
      <section id="visualizer" className="py-20 relative bg-slate-950/70 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive 3D Hardware Inspector
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Inspect full 360° meshes derived from NASA 3D assets. Adjust the dust slider to simulate years of Martian atmospheric regolith settling.
            </p>
          </div>

          <RoverCanvas3D />
        </div>
      </section>

      {/* Planetary Coordinate Grid Map Section */}
      <section className="py-20 relative bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Orbital Satellite Coordinate Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cross-checked against Lunar Reconnaissance Orbiter (LROC) and Mars Reconnaissance Orbiter (HiRISE) photographic registers.
            </p>
          </div>

          <CoordinateMap
            relics={relics}
            onSelectRelic={(r) => {
              setSelectedRelicId(r.id);
              setInspectedRelic(r);
            }}
            selectedRelicId={selectedRelicId}
          />
        </div>
      </section>

      {/* Scrollytelling & Telemetry Section */}
      <ScrollytellingSection relics={relics} lang={lang} />

      {/* NASA Open Datasets Ingestion Matrix */}
      <DatasetMatrix />

      {/* Team Relic Watchers (Comilla University & Pedigree) */}
      <TeamSection />

      {/* Footer */}
      <Footer />

      {/* Figma Evaluator Modal */}
      <FigmaModal
        isOpen={isFigmaModalOpen}
        onClose={() => setIsFigmaModalOpen(false)}
      />

      {/* Relic Inspection Modal */}
      <RelicModal
        relic={inspectedRelic}
        onClose={() => setInspectedRelic(null)}
        lang={lang}
      />
    </div>
  );
}
