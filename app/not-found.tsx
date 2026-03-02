"use client";
import Link from "next/link";
import { Home, ArrowRight, Zap, Battery, Radio, Cable, Sun } from "lucide-react";

const popularTools = [
  { name: "Ohm's Law Calculator", url: "/ohms-law-calculator", icon: Zap },
  { name: "Resistor Color Code", url: "/resistor-color-code-calculator", icon: Radio },
  { name: "Battery Backup Time", url: "/battery-backup-time-calculator", icon: Battery },
  { name: "Solar Load Calculator", url: "/solar-load-calculator", icon: Sun },
  { name: "Wire Gauge (AWG)", url: "/awg-wire-gauge-calculator", icon: Cable },
  { name: "AC Load Calculator", url: "/ac-load-calculator", icon: Zap },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E\")" }} />

      {/* Glowing blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1C61E7]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Animated circuit icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-28 h-28 rounded-full bg-[#1C61E7]/10 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute w-20 h-20 rounded-full bg-[#1C61E7]/20 animate-pulse" />
          <svg className="relative w-14 h-14 text-[#1C61E7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Broken circuit path */}
            <path d="M2 12h4l2-3 2 6 2-6 2 3h4" className="animate-pulse" />
            <circle cx="20" cy="12" r="1.5" fill="currentColor" className="opacity-50" />
            <circle cx="2" cy="12" r="1.5" fill="currentColor" className="opacity-50" />
            {/* Spark */}
            <path d="M12 3l-1 3h2l-1 3" className="text-amber-400" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Error code */}
        <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/20 leading-none mb-4 tracking-tight select-none">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Circuit Not Found
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-md mx-auto mb-8 leading-relaxed">
          Looks like there&apos;s a break in the circuit! The page you&apos;re looking for has been disconnected or doesn&apos;t exist.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-base font-semibold transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white text-base font-semibold transition-colors"
          >
            ← Go Back
          </button>
        </div>

        {/* Popular tools */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-sm font-semibold tracking-wider uppercase text-slate-500 mb-4">
            Popular Tools
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  href={tool.url}
                  className="group flex items-center gap-2.5 p-3 rounded-lg border border-slate-800 hover:border-[#1C61E7]/40 bg-white/[0.02] hover:bg-[#1C61E7]/5 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-md bg-slate-800 group-hover:bg-[#1C61E7]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#1C61E7] transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors truncate">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Shop CTA */}
        <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-white/[0.02]">
          <p className="text-base text-slate-400 mb-2">
            Looking for electronic components instead?
          </p>
          <Link
            href="https://kspelectronics.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-[#1C61E7] hover:underline"
          >
            Shop at kspelectronics.in <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
