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
    Sun,
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
        description: "Calculate voltage, current, or resistance instantly using Ohm's Law. Essential for every electronics project.",
        url: "/ohms-law-calculator",
        icon: Zap,
        badge: "Popular",
    },
    {
        title: "Inverter & Battery Calculator",
        category: "Power & Battery",
        description: "Size your inverter (VA) and battery bank (Ah) for solar, off-grid, and backup power systems.",
        url: "/inverter-calculator",
        icon: Battery,
    },
    {
        title: "Resistor Color Code Calculator",
        category: "Components",
        description: "Decode 4-band and 5-band resistor color codes to get exact resistance and tolerance values.",
        url: "/resistor-color-code-calculator",
        icon: Radio,
        badge: "Popular",
    },
    {
        title: "SMD Resistor Code Decoder",
        category: "Components",
        description: "Decode EIA-96 and 3/4-digit SMD resistor markings to resistance values.",
        url: "/smd-resistor-code-decoder",
        icon: Cpu,
    },
    {
        title: "Capacitor Code Calculator",
        category: "Components",
        description: "Convert 3-digit capacitor codes to pF, nF, and µF values with tolerance info.",
        url: "/capacitor-code-calculator",
        icon: Cpu,
    },
    {
        title: "AWG Wire Gauge Calculator",
        category: "Wire & Cable",
        description: "Look up wire diameter, cross-section area, and max current capacity by AWG number.",
        url: "/awg-wire-gauge-calculator",
        icon: Cable,
    },
    {
        title: "SWG Wire Gauge Calculator",
        category: "Wire & Cable",
        description: "Convert SWG numbers to wire dimensions. Standard for Indian and British wiring.",
        url: "/swg-wire-gauge-calculator",
        icon: Cable,
    },
    {
        title: "Star-Delta Conversion",
        category: "Fundamentals",
        description: "Convert between Star (Y) and Delta (Δ) resistor networks for three-phase AC circuits.",
        url: "/Star-Delta-Conversion",
        icon: Calculator,
    },
    {
        title: "Voltage Divider Calculator",
        category: "Fundamentals",
        description: "Calculate output voltage, required resistor values, or input voltage for resistor divider circuits.",
        url: "/voltage-divider-calculator",
        icon: Zap,
        badge: "New",
    },
    {
        title: "LED Series Resistor Calculator",
        category: "Components",
        description: "Find the correct current-limiting resistor value and wattage for single or series LEDs.",
        url: "/led-resistor-calculator",
        icon: Zap,
        badge: "New",
    },
    {
        title: "Pull-up / Pull-down Resistor",
        category: "Fundamentals",
        description: "Calculate optimal pull-up or pull-down resistor values, valid ranges, and power for digital logic.",
        url: "/pullup-pulldown-calculator",
        icon: Zap,
        badge: "New",
    },
    {
        title: "Battery Backup Time",
        category: "Power & Battery",
        description: "Calculate how long your inverter battery will last based on Ah capacity, load, voltage, and efficiency.",
        url: "/battery-backup-time-calculator",
        icon: Battery,
        badge: "New",
    },
    {
        title: "Battery Charging Time",
        category: "Power & Battery",
        description: "Estimate charging time for your inverter or solar battery based on charger current and DoD.",
        url: "/battery-charging-time-calculator",
        icon: Battery,
        badge: "New",
    },
    {
        title: "Inverter Battery Matching",
        category: "Power & Battery",
        description: "Find the right inverter VA and battery Ah for your home load and desired backup hours.",
        url: "/inverter-battery-matching-calculator",
        icon: Battery,
        badge: "New",
    },
    {
        title: "DC Load Calculator",
        category: "Power & Battery",
        description: "Add up DC appliances to find total watts and amps for 12V, 24V, or 48V off-grid systems.",
        url: "/dc-load-calculator",
        icon: Zap,
        badge: "New",
    },
    {
        title: "AC Load Calculator",
        category: "Power & Battery",
        description: "Calculate total power, monthly kWh, and estimated electricity cost for household appliances.",
        url: "/ac-load-calculator",
        icon: Zap,
        badge: "New",
    },
    {
        title: "Solar Load Calculator",
        category: "Power & Battery",
        description: "Size your solar panels, battery bank, charge controller, and inverter for your daily load.",
        url: "/solar-load-calculator",
        icon: Sun,
        badge: "New",
    },
];

const categories = ["All", ...Array.from(new Set(calculators.map((c) => c.category)))];

/* ── Component ── */
export default function HomePageClient() {
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
        <>
            {/* ── Hero ── */}
            <section className="relative border-b border-slate-800 bg-[#0a0f1a] overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1C61E7]/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#21C15E]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-24 pb-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left — Text content */}
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#21C15E] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#21C15E]" />
                                </span>
                                <span className="text-xs font-semibold text-slate-300 tracking-wide">FREE · OPEN SOURCE · NO SIGN-UP</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.08] mb-5">
                                Electronics{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C61E7] to-[#3d9bf0]">
                                    Calculators
                                </span>
                                <br />
                                <span className="text-slate-400 text-3xl sm:text-4xl lg:text-[2.5rem] font-bold">
                                    Built for Engineers
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg mb-8">
                                {calculators.length} professional-grade tools — from Ohm&apos;s Law to solar panel sizing.
                                IEEE-verified formulas. Instant results. Always free.
                            </p>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                <Link
                                    href="#tools"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#1C61E7]/25 hover:-translate-y-0.5"
                                >
                                    Browse All Tools
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://kspelectronics.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600/60 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
                                >
                                    Shop Components ↗
                                </Link>
                            </div>

                            {/* Quick category pills */}
                            <div className="flex flex-wrap gap-2">
                                {["Fundamentals", "Components", "Power & Battery"].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-slate-700/50 bg-slate-800/40 text-xs font-semibold text-slate-400 hover:text-[#1C61E7] hover:border-[#1C61E7]/40 transition-all duration-200 backdrop-blur-sm"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right — Stat cards */}
                        <div className="hidden lg:grid grid-cols-2 gap-3">
                            {[
                                {
                                    value: calculators.length.toString(),
                                    label: "Free Calculators",
                                    sublabel: "No sign-up required",
                                    color: "from-[#1C61E7]/20 to-[#1C61E7]/5",
                                    borderColor: "border-[#1C61E7]/20",
                                    valueColor: "text-[#1C61E7]",
                                },
                                {
                                    value: "IEEE",
                                    label: "Verified Formulas",
                                    sublabel: "IEC standards compliant",
                                    color: "from-[#21C15E]/20 to-[#21C15E]/5",
                                    borderColor: "border-[#21C15E]/20",
                                    valueColor: "text-[#21C15E]",
                                },
                                {
                                    value: "100%",
                                    label: "Browser-Based",
                                    sublabel: "No data sent to servers",
                                    color: "from-amber-500/20 to-amber-500/5",
                                    borderColor: "border-amber-500/20",
                                    valueColor: "text-amber-500",
                                },
                                {
                                    value: "0ms",
                                    label: "Server Latency",
                                    sublabel: "All computations local",
                                    color: "from-purple-500/20 to-purple-500/5",
                                    borderColor: "border-purple-500/20",
                                    valueColor: "text-purple-500",
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`relative p-5 rounded-2xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} backdrop-blur-sm group hover:scale-[1.03] transition-transform duration-300`}
                                >
                                    <p className={`text-3xl font-black ${stat.valueColor} mb-1`}>{stat.value}</p>
                                    <p className="text-sm font-semibold text-white">{stat.label}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{stat.sublabel}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust bar */}
                    <div className="mt-16 pt-8 border-t border-slate-800/60">
                        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                            {[
                                { icon: CheckCircle2, text: "Used by 10,000+ engineers & students" },
                                { icon: Zap, text: "Instant calculations — no loading" },
                                { icon: CheckCircle2, text: "Works offline after first load" },
                                { icon: CheckCircle2, text: "Mobile-friendly responsive design" },
                            ].map((f) => (
                                <span key={f.text} className="flex items-center gap-2 text-sm text-slate-500">
                                    <f.icon className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                                    {f.text}
                                </span>
                            ))}
                        </div>
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
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All {calculators.length} Tools</h2>
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
                                    <XIcon />
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
                                        {calc.badge && (
                                            <span className={`absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-bold ${calc.badge === "New"
                                                ? "bg-[#21C15E]/10 text-[#21C15E] dark:bg-[#21C15E]/20"
                                                : "bg-[#1C61E7]/10 text-[#1C61E7] dark:bg-[#1C61E7]/20"
                                                }`}>
                                                {calc.badge}
                                            </span>
                                        )}
                                        <div className="mb-4 w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#1C61E7]/10 dark:group-hover:bg-[#1C61E7]/15 transition-colors">
                                            <Icon className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400 group-hover:text-[#1C61E7] transition-colors" />
                                        </div>
                                        <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-1">{calc.category}</p>
                                        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-2 group-hover:text-[#1C61E7] dark:group-hover:text-[#3d7ef0] transition-colors">
                                            {calc.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{calc.description}</p>
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
                                ElectroCalc is a free suite of electronics engineering tools built and maintained by <strong>KSP Electronics</strong>. Every calculator follows IEEE and IEC standards so you can trust the results in real-world projects — from student labs to production engineering.
                            </p>
                            <Link
                                href="https://kspelectronics.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-base font-semibold text-[#1C61E7] hover:underline"
                            >
                                Shop electronics at kspelectronics.in <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { title: "Browser-based", desc: "All calculations run locally in your browser. No data is ever sent to a server." },
                                { title: "IEEE & IEC verified", desc: "Every formula is sourced from recognised international standards." },
                                { title: "Free, no account required", desc: "Unlimited use with zero sign-ups — no ads on calculator pages." },
                                { title: "Open Source", desc: "The full source code is available on GitHub for transparency and contributions." },
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

            {/* ── FAQ (SEO) ── */}
            <section className="border-t border-slate-200 dark:border-slate-800 py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Left — Header */}
                        <div className="lg:col-span-2">
                            <p className="text-sm font-bold tracking-wider uppercase text-[#1C61E7] mb-3">FAQ</p>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                                Frequently Asked<br />Questions
                            </h2>
                            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                Everything you need to know about ElectroCalc and our free electronics tools.
                            </p>
                            <Link
                                href="https://kspelectronics.in/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C61E7] hover:underline"
                            >
                                Still have questions? Contact us <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        {/* Right — Accordion */}
                        <div className="lg:col-span-3 space-y-3">
                            <FAQAccordion />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-slate-200 dark:border-slate-800 py-16 px-6">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                        Shop Electronic Components
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base mb-7 max-w-md mx-auto">
                        Need components for your project? Visit our e-commerce store for development boards, sensors, resistors, capacitors, and project kits.
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
        </>
    );
}

/* ── FAQ Accordion ── */
const faqData = [
    {
        q: "What is ElectroCalc?",
        a: "ElectroCalc is a free suite of online electronics calculators built by KSP Electronics. It includes tools for Ohm's Law, resistor color codes, voltage dividers, LED resistor calculations, wire gauge lookups, inverter/battery sizing, and more.",
    },
    {
        q: "Are these electronics calculators really free?",
        a: "Yes, 100% free with no sign-up required. All calculators run entirely in your browser — no data is ever sent to any server. There are no paywalls, usage limits, or hidden charges.",
    },
    {
        q: "How accurate are the calculations?",
        a: "All formulas are verified against IEEE and IEC standards. Results are computed locally using double-precision floating-point arithmetic for maximum accuracy. We recommend verifying critical designs against component datasheets.",
    },
    {
        q: "What is a voltage divider calculator used for?",
        a: "A voltage divider calculator helps you determine the output voltage of a resistor divider network, or find the resistor values needed to achieve a specific voltage. Common uses include level shifting (e.g., 5V to 3.3V), ADC reference voltage scaling, and sensor signal conditioning.",
    },
    {
        q: "How do I calculate the resistor for an LED?",
        a: "Use the LED Series Resistor Calculator. Enter your supply voltage, the LED's forward voltage (Vf) and forward current (If), and the number of LEDs in series. The calculator gives you the exact resistor value, the nearest standard E24 value, and the recommended wattage rating.",
    },
    {
        q: "What is the difference between kspelectronics.in and tools.kspelectronics.in?",
        a: "kspelectronics.in is our main e-commerce store where you can purchase electronic components, development boards, sensors, and project kits. tools.kspelectronics.in (ElectroCalc) is our free engineering tools and calculators platform for electronics professionals and students.",
    },
];

function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            {faqData.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={faq.q}
                        className={`border rounded-xl transition-all duration-200 ${isOpen
                                ? "border-[#1C61E7]/30 bg-[#1C61E7]/[0.03] dark:bg-[#1C61E7]/[0.06] shadow-sm"
                                : "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
                            }`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="w-full flex items-start gap-4 p-5 text-left"
                        >
                            <span className={`text-sm font-black mt-0.5 flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-[#1C61E7]" : "text-slate-300 dark:text-slate-600"
                                }`}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-base font-semibold text-slate-900 dark:text-white pr-2">
                                {faq.q}
                            </span>
                            <svg
                                className={`h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className="grid transition-all duration-300 ease-in-out"
                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                            <div className="overflow-hidden">
                                <p className="px-5 pb-5 pl-14 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

/* small X button inside search */
function XIcon({ className = "" }: { className?: string }) {
    return (
        <svg className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
