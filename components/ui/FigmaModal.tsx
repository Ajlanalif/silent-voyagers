"use client";

import React, { useState } from "react";
import { ExternalLink, Copy, Check, X, Layers, Smartphone, Eye, Sparkles } from "lucide-react";

interface FigmaModalProps {
  isOpen: boolean;
  onClose: () => void;
  figmaUrl?: string;
}

export default function FigmaModal({
  isOpen,
  onClose,
  figmaUrl = "https://client-flick-59003537.figma.site/",
}: FigmaModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(figmaUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-700/80 rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Silent Voyagers Interactive Figma Prototype
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-medium">
                  Hi-Fi Evaluator Preview
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official UI/UX design specification for NASA Space Apps Challenge 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Action Ribbon */}
          <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Direct Evaluation Link
              </span>
              <p className="text-sm text-slate-300 font-mono break-all line-clamp-1">
                {figmaUrl}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Link" : "Copy Link"}</span>
              </button>
              <a
                href={figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all"
              >
                <span>Launch in Figma</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Screen Flows Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">1. Extraterrestrial Relic Catalog</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter between Mars & Lunar relics, explore coordinate pins, mission durations, and solar panel status with real-time NASA data.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">2. 3D WebGL Rover Inspector</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                360° interactive rover mesh featuring Martian regolith dust accumulation simulation, camera mast rotation, and antenna subsystems.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">3. Sol-by-Sol Scrollytelling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Emotional narrative chronologies synchronized with Opportunity battery discharge curves and InSight SEIS seismic sonification.
              </p>
            </div>
          </div>

          {/* Evaluator Notes Section */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              Guidance for NASA Space Apps Challenge Evaluators
            </h5>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Click &quot;Present&quot; in Figma to experience animated micro-interactions and transitions between Sol chapters.</li>
              <li>Toggle between 1440px Desktop and 390px Mobile prototype flows in the Figma frames panel.</li>
              <li>Prototype features full bilingual localization mockups (English & Bengali).</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/40 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Team Relic Watchers • Comilla University</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
