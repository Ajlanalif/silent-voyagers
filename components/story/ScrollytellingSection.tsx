"use client";

import React, { useState } from "react";
import { Relic } from "@/data/types";
import telemetryLogs from "@/data/telemetry_logs.json";
import { 
  Activity, 
  BatteryCharging, 
  BatteryWarning, 
  Calendar, 
  Clock, 
  Compass, 
  Globe2, 
  Headphones, 
  Play, 
  Radio, 
  Volume2, 
  VolumeX, 
  Zap,
  Sparkles
} from "lucide-react";

interface ScrollytellingSectionProps {
  relics: Relic[];
  lang: "en" | "bn";
}

export default function ScrollytellingSection({ relics, lang }: ScrollytellingSectionProps) {
  const [selectedRelicIndex, setSelectedRelicIndex] = useState(0);
  const [currentSolStep, setCurrentSolStep] = useState(4); // Default to Sol 5111 for Opportunity
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeRelic = relics[selectedRelicIndex];
  const oppyTimeline = telemetryLogs.opportunity_sol_series;
  const currentOppyData = oppyTimeline[currentSolStep];

  // Synthesize Web Audio API sound based on telemetry (battery voltage -> pitch)
  const handlePlaySonification = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Lower frequency as battery drops: 650 Wh -> ~440 Hz, 22 Wh -> ~80 Hz
      const baseFreq = Math.max(60, (currentOppyData.batteryWattHours / 650) * 440);
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      // Tremolo / modulation for atmospheric dust opacity
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(currentOppyData.tauOpacity * 1.5, ctx.currentTime);
      lfoGain.gain.setValueAtTime(15, ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setIsPlayingAudio(true);

      setTimeout(() => {
        osc.stop();
        lfo.stop();
        ctx.close();
        setIsPlayingAudio(false);
      }, 2500);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section id="scrollytelling" className="py-20 relative overflow-hidden bg-slate-950/80">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,88,12,0.15),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Telemetry & Scrollytelling</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "en" ? "The Last Whispers Across the Void" : "মহাশূন্যের শেষ প্রতিধ্বনি"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {lang === "en"
              ? "Reconstruct the final operational hours of NASA's historic robotic explorers through synchronized battery readouts, seismic waves, and atmospheric tau opacity."
              : "ব্যাটারি টেলিমেট্রি, সিসমিক তরঙ্গ এবং ধূলিঝড়ের উপাত্তের মাধ্যমে নাসার ঐতিহাসিক রোবটগুলোর শেষ মুহূর্তগুলোকে পুনরুজ্জীবিত করুন।"}
          </p>

          {/* Relic Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {relics.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setSelectedRelicIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedRelicIndex === idx
                    ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {r.callsign}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative & Telemetry Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Chapter (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-medium text-orange-400 uppercase tracking-wider">
                {activeRelic.landingSite}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                Active: {activeRelic.missionDates.durationActive}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {lang === "en" ? activeRelic.narrativeChapter.titleEn : activeRelic.narrativeChapter.titleBn}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {lang === "en" ? activeRelic.narrativeChapter.synopsisEn : activeRelic.narrativeChapter.synopsisBn}
              </p>
            </div>

            {/* Emotional Quote Callout */}
            <div className="p-5 rounded-xl bg-orange-950/20 border-l-4 border-orange-500 space-y-2">
              <span className="text-[11px] font-mono uppercase text-orange-400 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Final Historical Transmission
              </span>
              <blockquote className="text-base sm:text-lg italic text-slate-100 font-serif">
                &ldquo;{activeRelic.finalTransmission.humanInterpretation}&rdquo;
              </blockquote>
              <p className="text-xs font-mono text-slate-400">
                Timestamp: {activeRelic.finalTransmission.earthDate}
              </p>
            </div>

            {/* Scientific Milestones Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Enduring Scientific Heritage
              </h4>
              <div className="space-y-2">
                {activeRelic.scientificImpact.map((impact, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orbital Satellite Cross-Check */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Orbiter Verification:</span>{" "}
                <span className="text-white font-medium">{activeRelic.orbitalVerification.orbiter}</span>
                <p className="text-slate-500 font-mono text-[11px]">
                  Frame: {activeRelic.orbitalVerification.archiveImageId}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                Coordinates Verified
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Sol-by-Sol Telemetry Sonification Engine (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Telemetry Sonification
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                Web Audio Engine
              </span>
            </div>

            {/* Sol Timeline Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Opportunity Final Sols</span>
                <span className="font-mono text-orange-400 font-bold">Sol {currentOppyData.sol}</span>
              </div>
              <input
                type="range"
                min="0"
                max={oppyTimeline.length - 1}
                value={currentSolStep}
                onChange={(e) => setCurrentSolStep(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Sol 5080 (Nominal)</span>
                <span>Sol 5111 (Final)</span>
              </div>
            </div>

            {/* Real Telemetry Readout Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Battery Power</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold font-mono ${
                    currentOppyData.batteryWattHours < 100 ? "text-rose-400" : "text-emerald-400"
                  }`}>
                    {currentOppyData.batteryWattHours}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Wh</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Dust Opacity (Tau)</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold font-mono ${
                    currentOppyData.tauOpacity > 5 ? "text-amber-400" : "text-sky-400"
                  }`}>
                    {currentOppyData.tauOpacity}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">τ</span>
                </div>
              </div>
            </div>

            {/* Sol Status Log */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono text-slate-300">
              <div className="text-[10px] text-slate-500 mb-1">Earth Date: {currentOppyData.date}</div>
              <p className="leading-relaxed text-slate-300">{currentOppyData.status}</p>
            </div>

            {/* Audio Synthesis Trigger */}
            <div className="pt-2">
              <button
                onClick={handlePlaySonification}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-pulse text-amber-200" />
                    <span>Synthesizing Mars Audio...</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-4 h-4" />
                    <span>Sonify Sol {currentOppyData.sol} Telemetry Tone</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                Converts real battery voltage & atmospheric tau into frequency oscillations via Web Audio API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
