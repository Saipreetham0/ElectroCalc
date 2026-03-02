"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowUpRight, Zap, Battery, Cable, Radio, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ThemeButton from "../Theme";

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface ToolGroup {
  label: string;
  icon: LucideIcon;
  items: { name: string; href: string; description: string }[];
}

const toolGroups: ToolGroup[] = [
  {
    label: "Fundamentals",
    icon: Zap,
    items: [
      { name: "Ohm's Law", href: "/ohms-law-calculator", description: "Voltage, current & resistance" },
      { name: "Inverter Calculator", href: "/inverter-calculator", description: "Power & battery sizing" },
      { name: "Voltage Divider", href: "/voltage-divider-calculator", description: "Resistor divider circuits" },
      { name: "Pull-up / Pull-down", href: "/pullup-pulldown-calculator", description: "Digital logic resistors" },
    ],
  },
  {
    label: "Components",
    icon: Radio,
    items: [
      { name: "Resistor Color Code", href: "/resistor-color-code-calculator", description: "Decode band colors" },
      { name: "SMD Resistor Code", href: "/smd-resistor-code-decoder", description: "Surface-mount markings" },
      { name: "Capacitor Code", href: "/capacitor-code-calculator", description: "Find capacitance values" },
      { name: "LED Series Resistor", href: "/led-resistor-calculator", description: "Current-limiting resistor" },
    ],
  },
  {
    label: "Wire & Networks",
    icon: Cable,
    items: [
      { name: "AWG Wire Gauge", href: "/awg-wire-gauge-calculator", description: "American standard" },
      { name: "SWG Wire Gauge", href: "/swg-wire-gauge-calculator", description: "British/Indian standard" },
      { name: "Star-Delta Conversion", href: "/Star-Delta-Conversion", description: "3-phase networks" },
    ],
  },
  {
    label: "Power & Battery",
    icon: Battery,
    items: [
      { name: "Battery Backup Time", href: "/battery-backup-time-calculator", description: "How long will it last" },
      { name: "Battery Charging Time", href: "/battery-charging-time-calculator", description: "Estimate charge time" },
      { name: "Inverter Matching", href: "/inverter-battery-matching-calculator", description: "Right inverter & battery" },
      { name: "AC Load Calculator", href: "/ac-load-calculator", description: "Home power & cost" },
      { name: "DC Load Calculator", href: "/dc-load-calculator", description: "Off-grid DC loads" },
      { name: "Solar Calculator", href: "/solar-load-calculator", description: "Panel & battery sizing" },
    ],
  },
];

const navigation: NavLink[] = [
  { name: "About", href: "https://kspelectronics.in/about", isExternal: true },
  { name: "Blog", href: "https://kspelectronics.in/blog", isExternal: true },
  { name: "Contact", href: "https://kspelectronics.in/contact", isExternal: true },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    if (toolsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [toolsOpen]);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((p) => !p), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 dark:bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm"
          : "bg-white dark:bg-[#0a0f1a]"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 h-16 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="ElectroCalc Home">
            <Image src="/KSP Electronics-black.png" alt="KSP Electronics" width={180} height={44} className="h-8 w-auto dark:hidden" priority />
            <Image src="/KSP Electronics-white.png" alt="KSP Electronics" width={180} height={44} className="h-8 w-auto hidden dark:block" priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Tools dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setToolsOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${toolsOpen
                  ? "bg-[#1C61E7]/10 text-[#1C61E7] dark:bg-[#1C61E7]/15 dark:text-[#3d7ef0]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#21C15E]" />
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega dropdown */}
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
                  {/* Dropdown header */}
                  <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Calculator Suite</p>
                        <p className="text-xs text-slate-500 mt-0.5">17 free electronics tools</p>
                      </div>
                      <Link
                        href="/"
                        onClick={() => setToolsOpen(false)}
                        className="text-xs font-semibold text-[#1C61E7] dark:text-[#3d7ef0] hover:underline"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>

                  {/* Tool groups grid */}
                  <div className="grid grid-cols-4 gap-0 p-2">
                    {toolGroups.map((group) => {
                      const GroupIcon = group.icon;
                      return (
                        <div key={group.label} className="p-3">
                          <div className="flex items-center gap-2 mb-2.5 px-2">
                            <div className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <GroupIcon className="h-3 w-3 text-slate-400" />
                            </div>
                            <p className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                              {group.label}
                            </p>
                          </div>
                          <div className="space-y-0.5">
                            {group.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setToolsOpen(false)}
                                className="block rounded-lg px-2.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                              >
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#1C61E7] dark:group-hover:text-[#3d7ef0] transition-colors leading-tight">
                                  {item.name}
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-tight">{item.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dropdown footer */}
                  <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs text-slate-500">New: Solar Calculator, Battery Tools</span>
                    </div>
                    <a
                      href="https://kspelectronics.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-[#1C61E7] hover:underline"
                    >
                      Shop components <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeButton />
            <a
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#1C61E7]/20"
            >
              Shop
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile: theme + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeButton />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white dark:bg-[#0a0f1a] border-l border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200 dark:border-slate-800">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/KSP Electronics-black.png" alt="KSP Electronics" width={140} height={36} className="h-7 w-auto dark:hidden" />
              <Image src="/KSP Electronics-white.png" alt="KSP Electronics" width={140} height={36} className="h-7 w-auto hidden dark:block" />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer content */}
          <div className="overflow-y-auto h-[calc(100%-4rem)] p-4 space-y-5">
            {toolGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.label}>
                  <div className="flex items-center gap-2 px-2 mb-2">
                    <GroupIcon className="h-3.5 w-3.5 text-slate-400" />
                    <p className="text-xs font-bold tracking-wider uppercase text-slate-400">
                      {group.label}
                    </p>
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium leading-tight">{item.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                      </div>
                      <span className="text-slate-300 dark:text-slate-600 text-sm">›</span>
                    </Link>
                  ))}
                </div>
              );
            })}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {item.name} {item.isExternal && "↗"}
                </Link>
              ))}
            </div>

            <a
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
            >
              Shop at kspelectronics.in
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
