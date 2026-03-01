"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
    label: "Fundamentals",
    items: [
      { name: "Ohm's Law", href: "/ohms-law-calculator", description: "Voltage, current & resistance" },
      { name: "Inverter Calculator", href: "/inverter-calculator", description: "Power & battery sizing" },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Resistor Color Code", href: "/resistor-color-code-calculator", description: "Decode band colors" },
      { name: "SMD Resistor Code", href: "/smd-resistor-code-decoder", description: "Surface-mount markings" },
      { name: "Capacitor Code", href: "/capacitor-code-calculator", description: "Find capacitance values" },
    ],
  },
  {
    label: "Wire & Networks",
    items: [
      { name: "AWG Wire Gauge", href: "/awg-wire-gauge-calculator", description: "American standard" },
      { name: "SWG Wire Gauge", href: "/swg-wire-gauge-calculator", description: "British/Indian standard" },
      { name: "Star-Delta Conversion", href: "/Star-Delta-Conversion", description: "3-phase networks" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled
            ? "bg-white dark:bg-[#0a0f1a] border-b border-slate-200 dark:border-slate-800"
            : "bg-white dark:bg-[#0a0f1a]"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="ElectroCalc Home">
            {/* Light mode: black logo */}
            <Image
              src="/KSP Electronics-black.png"
              alt="KSP Electronics"
              width={180}
              height={44}
              className="h-8 w-auto dark:hidden"
              priority
            />
            {/* Dark mode: white logo */}
            <Image
              src="/KSP Electronics-white.png"
              alt="KSP Electronics"
              width={180}
              height={44}
              className="h-8 w-auto hidden dark:block"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Tools dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setToolsOpen((v) => !v)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${toolsOpen
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[600px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-5">
                  <div className="grid grid-cols-3 gap-5">
                    {toolGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">
                          {group.label}
                        </p>
                        <div className="space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setToolsOpen(false)}
                              className="block rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#1C61E7] dark:group-hover:text-[#3d7ef0] transition-colors">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
                    <Link
                      href="/"
                      onClick={() => setToolsOpen(false)}
                      className="text-sm font-medium text-[#1C61E7] dark:text-[#3d7ef0] hover:underline"
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
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeButton />
            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
            >
              kspelectronics.in ↗
            </Link>
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
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-200 ${mobileMenuOpen ? "visible" : "invisible"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white dark:bg-[#0a0f1a] border-l border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
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
            {toolGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-2 mb-2">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                    <span className="text-slate-400">›</span>
                  </Link>
                ))}
              </div>
            ))}

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

            <Link
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
            >
              kspelectronics.in ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
