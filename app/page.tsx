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
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Data ── */
interface CalculatorItem {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

const calculators: CalculatorItem[] = [
  {
    title: "Ohm's Law Calculator",
    category: "Fundamentals",
    description: "Calculate voltage, current, or resistance. The foundation of every electronics project.",
    url: "/ohms-law-calculator",
    icon: Zap,
    badge: "Popular",
  },
  {
    title: "Inverter Calculator",
    category: "Power Systems",
    description: "Size your inverter and battery bank for any solar or off-grid power system.",
    url: "/inverter-calculator",
    icon: Battery,
  },
  {
    title: "Resistor Color Code",
    category: "Components",
    description: "Decode 4-band and 5-band resistor colors to get exact resistance and tolerance.",
    url: "/resistor-color-code-calculator",
    icon: Radio,
    badge: "Popular",
  },
  {
    title: "SMD Resistor Decoder",
    category: "Components",
    description: "Decode EIA-96 and 3-digit SMD resistor markings to resistance values instantly.",
    url: "/smd-resistor-code-decoder",
    icon: Cpu,
  },
  {
    title: "Capacitor Code Calculator",
    category: "Components",
    description: "Convert capacitor numeric codes to pF, nF, and µF values with tolerance.",
    url: "/capacitor-code-calculator",
    icon: Cpu,
  },
  {
    title: "AWG Wire Gauge",
    category: "Wire Sizing",
    description: "Calculate wire diameter, area, and max current capacity by AWG number.",
    url: "/awg-wire-gauge-calculator",
    icon: Cable,
    badge: "New",
  },
  {
    title: "SWG Wire Gauge",
    category: "Wire Sizing",
    description: "Convert SWG numbers to physical dimensions. Standard for Indian and British wiring.",
    url: "/swg-wire-gauge-calculator",
    icon: Cable,
  },
  {
    title: "Star-Delta Conversion",
    category: "Circuit Analysis",
    description: "Convert between Star (Y) and Delta (Δ) for three-phase AC circuit networks.",
    url: "/Star-Delta-Conversion",
    icon: Calculator,
  },
];

const categories = ["All", ...Array.from(new Set(calculators.map((c) => c.category)))];

const features = [
  "Runs entirely in your browser — no server, no account",
  "All formulas verified against IEEE and IEC standards",
  "Free forever — no paywalls or usage limits",
  "Responsive design — works on desktop, tablet, and mobile",
];

/* ── Component ── */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCalculators = useMemo(
    () =>
      calculators.filter((calc) => {
        const q = searchQuery.toLowerCase();
        const matchSearch =
          calc.title.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.category.toLowerCase().includes(q);
        const matchCat = selectedCategory === "All" || calc.category === selectedCategory;
        return matchSearch && matchCat;
      }),
    [searchQuery, selectedCategory]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">

      {/* ── Hero ── */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-[#0a0f1a]">
        <div className="container mx-auto max-w-5xl px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-slate-700 bg-slate-800 text-slate-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#21C15E]" />
            Free · Open Source · No Sign-up
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Electronics Calculators<br />
            <span className="text-[#1C61E7]">for Engineers & Makers</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg sm:text-xl text-slate-400 mb-8 leading-relaxed">
            8 professional-grade tools covering Ohm's Law, resistor codes, wire sizing, power systems, and circuit analysis. Instant, accurate, and always free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
            >
              Browse All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
            >
              kspelectronics.in ↗
            </Link>
          </div>

          {/* Key facts row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {features.map((f) => (
              <span key={f} className="flex items-center gap-2 text-base text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-[#21C15E] flex-shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools" className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-[#1C61E7] mb-1">Calculator Suite</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Tools</h2>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools…"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/40 focus:border-[#1C61E7] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X />
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${selectedCategory === cat
                  ? "bg-[#1C61E7] border-[#1C61E7] text-white"
                  : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCalculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.title}
                    href={calc.url}
                    className="group relative flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl hover:border-[#1C61E7]/50 dark:hover:border-[#1C61E7]/40 hover:shadow-md transition-all duration-200"
                  >
                    {/* Badge */}
                    {calc.badge && (
                      <span className={`absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-bold ${calc.badge === "New"
                        ? "bg-[#21C15E]/10 text-[#21C15E] dark:bg-[#21C15E]/20"
                        : "bg-[#1C61E7]/10 text-[#1C61E7] dark:bg-[#1C61E7]/20"
                        }`}>
                        {calc.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="mb-4 w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#1C61E7]/10 dark:group-hover:bg-[#1C61E7]/15 transition-colors">
                      <Icon className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400 group-hover:text-[#1C61E7] transition-colors" />
                    </div>

                    {/* Category */}
                    <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-1">
                      {calc.category}
                    </p>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-2 group-hover:text-[#1C61E7] dark:group-hover:text-[#3d7ef0] transition-colors">
                      {calc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                      {calc.description}
                    </p>

                    {/* Footer arrow */}
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#1C61E7] dark:text-[#3d7ef0] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150">
                      Open Calculator <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border border-slate-200 dark:border-slate-700 rounded-xl">
              <Search className="h-8 w-8 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">No tools found</h3>
              <p className="text-sm text-slate-500 mb-4">Try a different search term or category.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Why section ── */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-[#1C61E7] mb-2">Why ElectroCalc</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Built for professionals,<br />free for everyone.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
                ElectroCalc is a free suite of electronics tools built and maintained by KSP Electronics. Every calculator follows industry standards so you can trust the results in real projects.
              </p>
              <Link
                href="https://kspelectronics.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#1C61E7] hover:underline"
              >
                Learn more about KSP Electronics <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Browser-based", desc: "All calculations run locally. No data ever sent to a server." },
                { title: "IEEE & IEC standards", desc: "Every formula is sourced from recognised international standards." },
                { title: "Free, no account required", desc: "Unlimited use with zero sign-ups, no ads on tools pages." },
                { title: "Open Source", desc: "The full codebase is available on GitHub for transparency." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#21C15E] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-200 dark:border-slate-800 py-16 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            More resources at KSP Electronics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-7 max-w-md mx-auto">
            Project tutorials, component guides, IoT experiments, and hands-on electronics content — all on our main blog.
          </p>
          <Link
            href="https://kspelectronics.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
          >
            Visit kspelectronics.in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* small X button inside search */
function X({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
