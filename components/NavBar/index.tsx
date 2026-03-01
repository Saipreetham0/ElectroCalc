"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeButton from "../Theme";

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface ToolGroup {
  label: string;
  items: { name: string; href: string; description: string }[];
}

const toolGroups: ToolGroup[] = [
  {
    label: "Basic",
    items: [
      { name: "Ohm's Law", href: "/ohms-law-calculator", description: "V, I, R calculations" },
      { name: "Inverter Calculator", href: "/inverter-calculator", description: "Power & battery sizing" },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Resistor Color Code", href: "/resistor-color-code-calculator", description: "Decode band colors" },
      { name: "SMD Resistor Code", href: "/smd-resistor-code-decoder", description: "Surface-mount decoder" },
      { name: "Capacitor Code", href: "/capacitor-code-calculator", description: "Find capacitance values" },
    ],
  },
  {
    label: "Wire & Network",
    items: [
      { name: "AWG Wire Gauge", href: "/awg-wire-gauge-calculator", description: "American standard" },
      { name: "SWG Wire Gauge", href: "/swg-wire-gauge-calculator", description: "British/Indian standard" },
      { name: "Star-Delta Conversion", href: "/Star-Delta-Conversion", description: "3-phase network analysis" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setToolsOpen(false);
    if (toolsOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [toolsOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-blue-500/5 border-b border-slate-200/60 dark:border-white/10"
          : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="ElectroCalc Home"
          >
            {/* Light mode logo */}
            <Image
              src="/ksp-logo.png"
              alt="KSP Electronics"
              width={160}
              height={40}
              className="h-8 w-auto object-contain dark:hidden transition-opacity group-hover:opacity-80"
              priority
            />
            {/* Dark mode logo (inverted) */}
            <Image
              src="/ksp-logo.png"
              alt="KSP Electronics"
              width={160}
              height={40}
              className="h-8 w-auto object-contain hidden dark:block brightness-0 invert transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Tools Mega-dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setToolsOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${toolsOpen
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                  }`}
              >
                Tools
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 border border-slate-200/80 dark:border-white/10 p-5 backdrop-blur-xl">
                  <div className="grid grid-cols-3 gap-6">
                    {toolGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#1C61E7] dark:text-[#3d7ef0] mb-2.5">
                          {group.label}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setToolsOpen(false)}
                              className="group/item block rounded-xl px-3 py-2.5 hover:bg-[#1C61E7]/6 dark:hover:bg-[#1C61E7]/15 transition-all duration-150"
                            >
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover/item:text-[#1C61E7] dark:group-hover/item:text-[#3d7ef0] transition-colors">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                    <Link
                      href="/"
                      onClick={() => setToolsOpen(false)}
                      className="flex items-center justify-center gap-2 text-sm font-medium text-[#1C61E7] dark:text-[#3d7ef0] hover:underline"
                    >
                      View all tools →
                    </Link>
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
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-[#1C61E7] hover:bg-[#1C61E7]/8 dark:text-slate-300 dark:hover:text-[#3d7ef0] dark:hover:bg-[#1C61E7]/15 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeButton />
            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#1C61E7] to-[#21C15E] group-hover:from-[#1659d4] group-hover:to-[#1da852] transition-all duration-300" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,oklch(1_0_0/20%),transparent)] animate-shimmer" />
              </span>
              <span className="relative">KSP Electronics ↗</span>
            </Link>
          </div>

          {/* ── Mobile: theme + burger ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeButton />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-all"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/ksp-logo.png"
                alt="KSP Electronics"
                width={140}
                height={36}
                className="h-8 w-auto object-contain dark:hidden"
              />
              <Image
                src="/ksp-logo.png"
                alt="KSP Electronics"
                width={140}
                height={36}
                className="h-8 w-auto object-contain hidden dark:block brightness-0 invert"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto h-full pb-24 p-4 space-y-6">
            {/* All Tools */}
            {toolGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 px-2 mb-2">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-blue-900/25 dark:hover:text-blue-400 transition-all"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                      </div>
                      <span className="text-slate-400 text-lg">›</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Nav links */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"
                >
                  {item.name} {item.isExternal && "↗"}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#1C61E7] to-[#21C15E] text-white font-semibold text-sm shadow-lg shadow-[#1C61E7]/25 hover:shadow-[#1C61E7]/40 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Visit KSP Electronics ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to compensate for fixed navbar height */}
      <div className="h-[60px]" />
    </>
  );
};

export default Navbar;
