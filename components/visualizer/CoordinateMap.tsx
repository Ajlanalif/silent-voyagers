"use client";

import React, { useState } from "react";
import { Relic } from "@/data/types";
import { MapPin, Navigation, Compass, Globe, Radio, ExternalLink } from "lucide-react";

interface CoordinateMapProps {
  relics: Relic[];
  onSelectRelic: (relic: Relic) => void;
  selectedRelicId: string;
}

export default function CoordinateMap({
  relics,
  onSelectRelic,
  selectedRelicId,
}: CoordinateMapProps) {
  const [activeBody, setActiveBody] = useState<"Mars" | "Moon">("Mars");

  const filteredRelics = relics.filter((r) => r.celestialBody === activeBody);
  const currentRelic = relics.find((r) => r.id === selectedRelicId) || relics[0];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-slate-800 p-4 sm:p-6 shadow-2xl">
      {/* Header & Body Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Extraterrestrial Planetary Grid
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Geographic surface coordinates verified via MRO HiRISE & LROC orbital satellites
          </p>
        </div>

        {/* Mars vs Moon Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveBody("Mars")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeBody === "Mars"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span>Mars ({relics.filter((r) => r.celestialBody === "Mars").length} Relics)</span>
          </button>
          <button
            onClick={() => setActiveBody("Moon")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeBody === "Moon"
                ? "bg-slate-700 text-white shadow-md shadow-slate-700/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Moon (1 Monument)</span>
          </button>
        </div>
      </div>

      {/* Surface Map Display */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center">
        
        {/* Synthetic Planetary Surface Texture Gradient */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeBody === "Mars"
              ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-950 to-slate-950 opacity-90"
              : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/30 via-slate-950 to-black opacity-90"
          }`}
        />

        {/* Latitude / Longitude Radar Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Orbital Scanning Radar Beam Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent animate-pulse pointer-events-none" />

        {/* Center Target Meridian Rings */}
        <div className="absolute w-72 h-72 rounded-full border border-slate-800/60 pointer-events-none" />
        <div className="absolute w-44 h-44 rounded-full border border-slate-800/40 pointer-events-none" />
        <div className="absolute w-20 h-20 rounded-full border border-slate-700/40 pointer-events-none" />

        {/* Topographic Feature Callouts */}
        {activeBody === "Mars" ? (
          <>
            <div className="absolute top-1/4 left-1/4 text-[10px] font-mono text-slate-600 uppercase tracking-widest pointer-events-none">
              Endeavour Crater
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-[10px] font-mono text-slate-600 uppercase tracking-widest pointer-events-none">
              Gusev Crater
            </div>
            <div className="absolute top-1/3 right-1/3 text-[10px] font-mono text-slate-600 uppercase tracking-widest pointer-events-none">
              Elysium Planitia
            </div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/3 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
            Mare Tranquillitatis (Sea of Tranquility)
          </div>
        )}

        {/* Interactive Relic Markers */}
        {filteredRelics.map((relic) => {
          const isSelected = relic.id === selectedRelicId;
          
          // Normalized display positions for UI projection
          let topPos = "50%";
          let leftPos = "50%";
          if (relic.id === "mer-opportunity") {
            topPos = "38%";
            leftPos = "28%";
          } else if (relic.id === "mer-spirit") {
            topPos = "68%";
            leftPos = "74%";
          } else if (relic.id === "insight-lander") {
            topPos = "32%";
            leftPos = "62%";
          } else if (relic.id === "apollo-11-descent") {
            topPos = "48%";
            leftPos = "46%";
          }

          return (
            <div
              key={relic.id}
              style={{ top: topPos, left: leftPos }}
              onClick={() => onSelectRelic(relic)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              {/* Radar pulse beacon */}
              <span className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${
                isSelected ? "bg-orange-500" : "bg-sky-500"
              }`} />
              
              {/* Pin Icon */}
              <div className={`relative p-2 rounded-full border transition-all ${
                isSelected
                  ? "bg-orange-500 border-white text-white scale-125 shadow-lg shadow-orange-500/50"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400 group-hover:scale-110"
              }`}>
                <MapPin className="w-4 h-4" />
              </div>

              {/* Pin Label Hover Badge */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-[200px] bg-black/90 backdrop-blur-md border border-slate-700 px-2.5 py-1 rounded text-center pointer-events-none transition-opacity">
                <p className="text-[11px] font-semibold text-white whitespace-nowrap">{relic.name}</p>
                <p className="text-[9px] font-mono text-orange-400">{relic.coordinates.formatted}</p>
              </div>
            </div>
          );
        })}

        {/* Global Coordinate HUD */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-2.5 text-[10px] font-mono text-slate-400">
          <div className="text-white font-semibold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-orange-400" />
            <span>Planetary Coordinates: {currentRelic.coordinates.formatted}</span>
          </div>
          <div>Datum Elevation: {currentRelic.coordinates.elevation || "N/A"}</div>
        </div>
      </div>

      {/* Relic Snapshot Strip */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {filteredRelics.map((r) => {
          const isSelected = r.id === selectedRelicId;
          return (
            <button
              key={r.id}
              onClick={() => onSelectRelic(r)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-orange-950/30 border-orange-500/50 shadow-md shadow-orange-500/10"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold text-white truncate">{r.callsign}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-orange-300">
                  {r.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono line-clamp-1">{r.landingSite}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
