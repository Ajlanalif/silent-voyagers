"use client";

import React from "react";
import { ExternalLink, Heart, Radio, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
              <Radio className="w-4 h-4 text-orange-400" />
              <span>SILENT VOYAGERS</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Honoring humanity&apos;s silent robotic pioneers resting across extraterrestrial landscapes.
              Built for the NASA International Space Apps Challenge 2026.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono text-[10px]">
                NASA Space Apps 2026
              </span>
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[10px]">
                Comilla University (Cumilla, Bangladesh)
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                2025 Global Finalist Pedigree
              </span>
            </div>
          </div>

          {/* NASA Open Data Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">NASA Open Portals</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://data.nasa.gov/dataset/nasa-3d-models-mer-opportunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>NASA 3D Models (Opportunity)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.nasa.gov/dataset/insight-mars-lander-mission-spice-kernel-archive-bundle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>InSight SPICE & SEIS Bundle</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Mars Rover Photos OpenAPI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.lroc.asu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>LROC Lunar Orbital Archive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Team Relic Watchers */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Team Relic Watchers</h4>
            <div className="space-y-1.5 text-slate-300">
              <p className="font-medium text-white">Sayed Ajlan Al Alif</p>
              <p className="text-slate-400 text-[11px]">Full-Stack Systems & 3D WebGL Lead</p>
              <p className="font-medium text-white pt-2">Farzana Sultana Soma</p>
              <p className="text-slate-400 text-[11px]">Scientific Telemetry & Narrative Designer</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & MIT Notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Team Relic Watchers. Open-source under the MIT License.</p>
          <div className="flex items-center gap-4">
            <span>NASA Space Apps Challenge 2026 — Local Event: Cumilla, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
