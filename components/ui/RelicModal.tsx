"use client";

import React from "react";
import { Relic } from "@/data/types";
import { X, ExternalLink, MapPin, Calendar, Activity, Zap, Compass, ShieldAlert } from "lucide-react";

interface RelicModalProps {
  relic: Relic | null;
  onClose: () => void;
  lang: "en" | "bn";
}

export default function RelicModal({ relic, onClose, lang }: RelicModalProps) {
  if (!relic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                relic.celestialBody === "Mars" ? "bg-orange-500/10 text-orange-400" : "bg-slate-700/20 text-slate-300"
              }`}>
                {relic.celestialBody}
              </span>
              <span className="text-xs text-slate-400 font-mono">{relic.callsign}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{relic.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Status & Final Transmission Banner */}
          <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-orange-400 uppercase tracking-wider">
                Status: {relic.status}
              </span>
              <span className="font-mono text-slate-400">
                Final Date: {relic.missionDates.finalContactDate}
              </span>
            </div>
            <p className="text-slate-300 italic font-serif text-base">
              &ldquo;{relic.finalTransmission.humanInterpretation}&rdquo;
            </p>
            {relic.finalTransmission.rawMessage && (
              <p className="text-[11px] font-mono text-slate-400 bg-black/40 p-2 rounded">
                Raw Log: {relic.finalTransmission.rawMessage}
              </p>
            )}
          </div>

          {/* Mission Telemetry Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Surface Coordinates</span>
              <span className="text-slate-200 font-semibold">{relic.coordinates.formatted}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Mission Lifespan</span>
              <span className="text-slate-200 font-semibold">{relic.missionDates.durationActive}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Power Source</span>
              <span className="text-slate-200 font-semibold truncate block">{relic.missionStats.powerSource}</span>
            </div>
            {relic.missionStats.distanceTraveledKm !== undefined && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Distance Traversed</span>
                <span className="text-slate-200 font-semibold">{relic.missionStats.distanceTraveledKm} km</span>
              </div>
            )}
            {relic.missionStats.photosTransmitted !== undefined && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Archival Imagery</span>
                <span className="text-slate-200 font-semibold">{relic.missionStats.photosTransmitted.toLocaleString()} frames</span>
              </div>
            )}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Resting Topography</span>
              <span className="text-slate-200 font-semibold truncate block">{relic.landingSite}</span>
            </div>
          </div>

          {/* Scientific Heritage Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Scientific Breakthroughs
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400 text-xs">
              {relic.scientificImpact.map((item, idx) => (
                <li key={idx}><span className="text-slate-300">{item}</span></li>
              ))}
            </ul>
          </div>

          {/* NASA Dataset Sources */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              NASA Datasets & Verification APIs
            </h4>
            <div className="space-y-2">
              {relic.nasaDatasets.map((ds, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{ds.name}</span>
                    <span className="text-slate-400 text-[11px]">{ds.ingestionRole}</span>
                  </div>
                  <a
                    href={ds.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 p-1.5 hover:bg-slate-800 rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/40 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
