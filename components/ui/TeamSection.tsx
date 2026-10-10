"use client";

import React from "react";
import { Award, Code2, Globe, Heart, Sparkles, Terminal, Users } from "lucide-react";

export default function TeamSection() {
  const members = [
    {
      name: "Sayed Ajlan Al Alif",
      role: "Technical Lead & 3D WebGL Architect",
      institution: "Comilla University",
      bio: "Computer Science & Engineering researcher specializing in full-stack architecture, WebGL procedural graphics, and spatial data pipelines. Leading system development for Silent Voyagers.",
      highlight: "NASA Space Apps 2025 Global Finalist Legacy"
    },
    {
      name: "Farzana Sultana Soma",
      role: "Scientific Telemetry & Narrative Strategist",
      institution: "Comilla University",
      bio: "Interdisciplinary space science enthusiast specializing in planetary telemetry analysis, human-centered UI/UX design, and emotional scrollytelling narratives across extraterrestrial contexts.",
      highlight: "NASA Open Data Pipeline Specialist"
    }
  ];

  return (
    <section id="team" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Team Relic Watchers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Pioneers Behind Silent Voyagers
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Representing Comilla University and the local event of Cumilla, Bangladesh at the NASA International Space Apps Challenge 2026.
          </p>
        </div>

        {/* Global Finalist Pedigree Ribbon */}
        <div className="max-w-4xl mx-auto mb-12 p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-orange-950/20 to-indigo-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Proven Competition Pedigree</h4>
              <p className="text-xs text-slate-300">
                Building upon the proven heritage of NASA Space Apps 2025 Global Finalist recognition with higher technical rigor and emotional storytelling.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Cumilla, Bangladesh
          </span>
        </div>

        {/* Members Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {member.institution}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-mono text-orange-400 mt-0.5">{member.role}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{member.highlight}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
