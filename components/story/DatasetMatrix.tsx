"use client";

import React from "react";
import { Database, ExternalLink, HardDrive, Layers, Radio, Sparkles, CheckCircle2 } from "lucide-react";

export default function DatasetMatrix() {
  const datasets = [
    {
      id: "mer-3d",
      title: "NASA 3D Models: MER Opportunity",
      portalUrl: "https://data.nasa.gov/dataset/nasa-3d-models-mer-opportunity",
      agency: "NASA Jet Propulsion Laboratory (JPL)",
      tag: "3D CAD / Mesh Geometry",
      pipelineRole: "Directly ingested into Three.js / React Three Fiber to reconstruct Opportunity's high-fidelity hardware mesh, solar panel wings, and dust accumulation shaders.",
      coverage: "MER-B Opportunity Structural Model",
      badgeColor: "border-orange-500/30 text-orange-400 bg-orange-500/10"
    },
    {
      id: "insight-spice",
      title: "InSight Mars Lander Mission SPICE Kernel & SEIS Data Bundle",
      portalUrl: "https://data.nasa.gov/dataset/insight-mars-lander-mission-spice-kernel-archive-bundle",
      agency: "NASA PDS Geosciences Node / CNES / IPGP",
      tag: "Orbital Ephemerides & Seismic Waves",
      pipelineRole: "Provides ground-truth landing coordinates, spacecraft orientation ephemerides, and raw SEIS seismic frequency time-series used for telemetry sonification.",
      coverage: "1,440 Sols on Elysium Planitia",
      badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
    },
    {
      id: "mars-photos-api",
      title: "NASA Mars Rover Photos API (JPL OpenAPI)",
      portalUrl: "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos",
      agency: "NASA Open Innovation / JPL",
      tag: "RESTful JSON / Open API",
      pipelineRole: "Streams Sol-by-Sol Pancam and Hazcam optical imagery documenting the gradual rise in Martian dust storm opacity leading to Sol 5111.",
      coverage: "217,000+ Raw Scientific Frames",
      badgeColor: "border-amber-500/30 text-amber-400 bg-amber-500/10"
    },
    {
      id: "lroc-hirise",
      title: "LROC (Lunar Reconnaissance) & HiRISE Orbital Archives",
      portalUrl: "https://www.lroc.asu.edu/featured_sites/lroc_features/Apollo%2011/feature_highlights",
      agency: "NASA Goddard / University of Arizona",
      tag: "Sub-Meter Satellite Verification",
      pipelineRole: "Verifies the resting coordinates and current physical preservation state of both the Apollo 11 Lunar Module Descent Stage and Mars rovers from planetary orbit.",
      coverage: "Apollo 11 Tranquility Base & Perseverance Valley",
      badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10"
    }
  ];

  return (
    <section id="datasets" className="py-20 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <Database className="w-3.5 h-3.5" />
            <span>NASA Open Innovation Integration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Open NASA Datasets & Ingestion Pipeline
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Silent Voyagers relies directly on official NASA open data portals, JPL APIs, and orbital archives to ensure mathematical precision and scientific authenticity.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-semibold ${dataset.badgeColor}`}>
                    {dataset.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {dataset.agency}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{dataset.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">Dataset Coverage: {dataset.coverage}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Data Pipeline Ingestion Role
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {dataset.pipelineRole}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified NASA Endpoint</span>
                </span>
                <a
                  href={dataset.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Access NASA Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
