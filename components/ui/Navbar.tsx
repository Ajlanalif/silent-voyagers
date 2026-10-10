"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, Globe2, Radio, Sparkles, Volume2, VolumeX, Menu, X } from "lucide-react";

interface NavbarProps {
  lang: "en" | "bn";
  setLang: (lang: "en" | "bn") => void;
  ambientSound: boolean;
  setAmbientSound: (val: boolean) => void;
  onOpenFigmaModal?: () => void;
}

export default function Navbar({
  lang,
  setLang,
  ambientSound,
  setAmbientSound,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const figmaLiveUrl = "https://client-flick-59003537.figma.site/";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/75 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Logo & Project Identity (Prevents layout shift with shrink-0) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-indigo-600 flex items-center justify-center p-[1px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg font-black tracking-widest text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                    SILENT VOYAGERS
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-wider font-semibold uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 whitespace-nowrap">
                    NSAC 2026
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono tracking-tight hidden lg:block truncate max-w-[260px] xl:max-w-none">
                  {lang === "en" ? "NASA Relic Heritage Preservation" : "নাসা রোবোটিক ঐতিহ্য সংরক্ষণ প্ল্যাটফর্ম"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm text-slate-300 font-medium whitespace-nowrap">
            <a href="#relics" className="hover:text-amber-400 transition-colors">
              {lang === "en" ? "Relics" : "নিদর্শন"}
            </a>
            <a href="#scrollytelling" className="hover:text-amber-400 transition-colors">
              {lang === "en" ? "Final Sols" : "শেষ মুহূর্ত"}
            </a>
            <a href="#visualizer" className="hover:text-amber-400 transition-colors">
              {lang === "en" ? "3D Hardware" : "৩ডি মডেল"}
            </a>
            <a href="#datasets" className="hover:text-amber-400 transition-colors">
              {lang === "en" ? "NASA Open Data" : "নাসা ডেটাসেট"}
            </a>
            <a href="#team" className="hover:text-amber-400 transition-colors">
              {lang === "en" ? "Team Watchers" : "টিম পরিচিতি"}
            </a>
          </nav>

          {/* Action CTAs: Sound, Language & Direct Figma Prototype Link */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Audio Ambient Toggle */}
            <button
              onClick={() => setAmbientSound(!ambientSound)}
              title={ambientSound ? "Mute Cosmic Telemetry Audio" : "Play Cosmic Telemetry Ambient Audio"}
              className="p-2 sm:p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all flex items-center justify-center shrink-0"
            >
              {ambientSound ? (
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Language Toggle (EN / BN) */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-1 sm:gap-1.5 transition-all shrink-0"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Direct Interactive Figma Prototype Link Button */}
            <a
              id="nav-figma-prototype-btn"
              href={figmaLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin shrink-0" style={{ animationDuration: "6s" }} />
              <span className="whitespace-nowrap hidden sm:inline">
                {lang === "en" ? "Explore Figma Prototype" : "ফিগুমা প্রোটোটাইপ"}
              </span>
              <span className="whitespace-nowrap sm:hidden">
                Figma
              </span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 flex flex-col gap-3 text-sm text-slate-300">
            <a
              href="#relics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "Extraterrestrial Relics" : "মহাজাগতিক নিদর্শন"}
            </a>
            <a
              href="#scrollytelling"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "Final Sols Scrollytelling" : "শেষ মুহূর্ত"}
            </a>
            <a
              href="#visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "3D Hardware Inspector" : "৩ডি মডেল"}
            </a>
            <a
              href="#datasets"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "NASA Open Datasets" : "নাসা ডেটাসেট"}
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "Team Relic Watchers" : "টিম পরিচিতি"}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
