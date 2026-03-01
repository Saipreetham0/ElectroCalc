"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Zap,
  Battery,
  Cpu,
  Radio,
  Cable,
  Search,
  ArrowRight,
  Gauge,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ──────────────────────────────────────────
   Data
────────────────────────────────────────── */
interface Calculator {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: LucideIcon;
  color: string;        // Tailwind bg gradient classes
  badge?: string;
}

const calculators: Calculator[] = [
  {
    title: "Ohm's Law Calculator",
    category: "Fundamentals",
    description: "Instantly compute voltage, current, or resistance. The essential tool for every electronics project.",
    url: "/ohms-law-calculator",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    badge: "Popular",
  },
  {
    title: "Inverter Calculator",
    category: "Power Systems",
    description: "Size your inverter, battery bank, and solar panels with precision for any off-grid system.",
    url: "/inverter-calculator",
    icon: Battery,
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Resistor Color Code",
    category: "Components",
    description: "Decode 4-band and 5-band resistor color codes to find exact resistance and tolerance values.",
    url: "/resistor-color-code-calculator",
    icon: Radio,
    color: "from-blue-400 to-indigo-500",
    badge: "Popular",
  },
  {
    title: "SMD Resistor Decoder",
    category: "Components",
    description: "Decode EIA-96 and numeric SMD resistor markings to find resistance values instantly.",
    url: "/smd-resistor-code-decoder",
    icon: Cpu,
    color: "from-violet-400 to-purple-500",
  },
  {
    title: "Capacitor Code Calculator",
    category: "Components",
    description: "Convert capacitor numeric codes to picofarad, nanofarad, and microfarad values.",
    url: "/capacitor-code-calculator",
    icon: Cpu,
    color: "from-rose-400 to-pink-500",
  },
  {
    title: "AWG Wire Gauge",
    category: "Wire Sizing",
    description: "Calculate wire diameter, cross-sectional area, and maximum current capacity by AWG number.",
    url: "/awg-wire-gauge-calculator",
    icon: Cable,
    color: "from-cyan-400 to-blue-500",
    badge: "New",
  },
  {
    title: "SWG Wire Gauge",
    category: "Wire Sizing",
    description: "Convert SWG numbers to physical dimensions. Essential for British and Indian standard wiring.",
    url: "/swg-wire-gauge-calculator",
    icon: Cable,
    color: "from-sky-400 to-cyan-500",
  },
  {
    title: "Star-Delta Conversion",
    category: "Circuit Analysis",
    description: "Convert between Star (Y) and Delta (Δ) configurations for three-phase AC circuit networks.",
    url: "/Star-Delta-Conversion",
    icon: Calculator,
    color: "from-fuchsia-400 to-violet-500",
  },
];

const categories = ["All", ...Array.from(new Set(calculators.map((c) => c.category)))];

const stats = [
  { value: "8+", label: "Free Calculators" },
  { value: "100%", label: "Browser-based" },
  { value: "0", label: "Sign-up Required" },
  { value: "∞", label: "Calculations / Day" },
];

const features = [
  {
    icon: Gauge,
    title: "Instant Results",
    description: "All calculations happen in real-time right in your browser. No waiting, no server round-trips.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Layers,
    title: "Industry Standards",
    description: "Built on IEEE, IEC, and ANSI standards. Trusted formulas verified for professional use.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Always Free",
    description: "No accounts, no ads on tools, no paywalls. Open access for engineers, students, and makers.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "beautifully Designed",
    description: "Clean, modern UI with dark mode support. Works great on desktop, tablet, and mobile.",
    color: "from-rose-500 to-pink-500",
  },
];

/* ──────────────────────────────────────────
   HomePage Component
────────────────────────────────────────── */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCalculators = useMemo(
    () =>
      calculators.filter((calc) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          calc.title.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.category.toLowerCase().includes(q);
        const matchesCategory =
          selectedCategory === "All" || calc.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [searchQuery, selectedCategory]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-[120px] animate-float" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Circuit SVG pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" patternUnits="userSpaceOnUse" width="60" height="60">
              <path d="M0 30h20M40 30h20M30 0v20M30 40v20" stroke="white" strokeWidth="1" fill="none" />
              <circle cx="30" cy="30" r="3" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Content */}
        <div className="relative container mx-auto px-6 pt-20 pb-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-blue-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Free Electronics Toolkit
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Electronics{" "}
            <span className="relative">
              <span className="text-gradient">Calculations</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-60" />
            </span>
            {" "}Made Simple
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-blue-100/80 mb-10 leading-relaxed">
            Professional-grade electronics calculators for engineers, students, and makers.
            Fast, free, and always in your browser.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 shadow-2xl shadow-blue-500/25 transition-all duration-200 hover:scale-105"
            >
              Browse All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white font-semibold text-sm hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            >
              KSP Electronics ↗
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-5 px-4 bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-blue-200/70 mt-1 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              className="fill-white dark:fill-slate-950"
            />
          </svg>
        </div>
      </section>

      {/* ── Tools Section ── */}
      <section id="tools" className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
              <Calculator className="h-3.5 w-3.5" />
              Calculator Suite
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Every Tool You Need
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-base">
              Comprehensive electronics calculators covering fundamentals, components, wire sizing, and circuit analysis.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators…"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Calculator Grid */}
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCalculators.map((calc, i) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.title}
                    href={calc.url}
                    className={`group relative block animate-fade-up stagger-${Math.min(i + 1, 8)}`}
                    style={{ opacity: 0 }}
                  >
                    <div className="relative h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 p-5 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden">
                      {/* Hover glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />

                      {/* Top bar accent */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${calc.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

                      {/* Badge */}
                      {calc.badge && (
                        <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${calc.color}`}>
                          {calc.badge}
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`mb-4 inline-flex p-2.5 rounded-xl bg-gradient-to-br ${calc.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Category */}
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">
                        {calc.category}
                      </p>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {calc.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {calc.description}
                      </p>

                      {/* Arrow */}
                      <div className="mt-4 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200">
                        Open Calculator
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-5 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Try a different search term or category filter.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Why ElectroCalc?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Built by engineers, for engineers — KSP Electronics brings you a no-nonsense, high-quality toolkit.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="relative group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feat.color} shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 animate-gradient" />
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                    <path d="M0 20h16M24 20h16M20 0v16M20 24v16" stroke="white" strokeWidth="0.8" fill="none" />
                    <circle cx="20" cy="20" r="2" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>
            <div className="relative px-8 py-14 text-center">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                KSP Electronics
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                More Resources at KSP Electronics
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Explore project tutorials, component guides, IoT experiments, and more on our main blog.
              </p>
              <Link
                href="https://kspelectronics.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 shadow-2xl shadow-blue-900/30 transition-all duration-200 hover:scale-105"
              >
                Visit kspelectronics.in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
