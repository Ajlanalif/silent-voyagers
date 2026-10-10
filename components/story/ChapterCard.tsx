"use client";

import React from "react";
import { Relic } from "@/data/types";
import { Calendar, Compass, MapPin, Radio, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface ChapterCardProps {
  relic: Relic;
  onExplore: (relic: Relic) => void;
  lang: "en" | "bn";
}

export default function ChapterCard({ relic, onExplore, lang }: ChapterCardProps) {
  const isMars = relic.celestialBody === "Mars";

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 via-slate-950 to-black border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
      
      {/* Top Banner Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-semibold border ${
            isMars 
              ? "bg-orange-500/10 text-orange-400 border-orange-500/30" 
              : "bg-slate-700/20 text-slate-300 border-slate-700"
          }`}>
            {relic.celestialBody}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
            relic.status === "Silent"
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              : relic.status === "Monument"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}>
            {relic.status}
          </span>
        </div>

        {/* Title & Calling */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
            {relic.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{relic.landingSite}</p>
        </div>

        {/* Narrative Teaser */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
          {lang === "en" ? relic.narrativeChapter.synopsisEn : relic.narrativeChapter.synopsisBn}
        </p>

        {/* Telemetry Metric Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
          <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Coordinates</span>
            <span className="text-slate-300 truncate block">{relic.coordinates.formatted}</span>
          </div>
          <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Active Service</span>
            <span className="text-slate-300 truncate block">{relic.missionDates.durationActive}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          Final: {relic.missionDates.finalContactDate}
        </span>
        <button
          onClick={() => onExplore(relic)}
          className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>{lang === "en" ? "Inspect Relic" : "বিশ্লেষণ করুন"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
