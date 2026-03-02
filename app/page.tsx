import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Free Online Electronics Calculators | Ohm's Law, Resistor Codes, Voltage Divider | ElectroCalc",
  description:
    "17 free online electronics calculators — Ohm's Law, resistor color code decoder, voltage divider, LED resistor, inverter sizing, battery backup, solar load sizing, wire gauge, capacitor code, and more. Instant results, no sign-up. By KSP Electronics.",
  keywords: [
    "electronics calculator",
    "ohm's law calculator",
    "resistor color code calculator",
    "voltage divider calculator",
    "LED resistor calculator",
    "capacitor code calculator",
    "SMD resistor decoder",
    "wire gauge calculator",
    "AWG calculator",
    "SWG calculator",
    "inverter battery calculator",
    "star delta conversion",
    "pull-up resistor calculator",
    "free electronics tools",
    "ElectroCalc",
    "KSP Electronics",
  ],
  openGraph: {
    title: "Free Online Electronics Calculators | ElectroCalc by KSP Electronics",
    description:
      "11 professional-grade electronics calculators — instant, accurate, and always free. Ohm's Law, voltage dividers, resistor codes, LED resistors, and more.",
    url: "https://tools.kspelectronics.in",
    siteName: "ElectroCalc",
    type: "website",
  },
  alternates: {
    canonical: "https://tools.kspelectronics.in",
  },
};

/* ── JSON-LD Structured Data ── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ElectroCalc",
  alternateName: "KSP Electronics Calculator Suite",
  url: "https://tools.kspelectronics.in",
  description:
    "Free online electronics calculators for engineers and students. Ohm's Law, resistor color codes, voltage dividers, LED resistors, wire gauges, and more.",
  publisher: {
    "@type": "Organization",
    name: "KSP Electronics",
    url: "https://kspelectronics.in",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tools.kspelectronics.in/#tools?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const toolListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Electronics Calculators",
  description: "Free online electronics engineering calculators by KSP Electronics",
  numberOfItems: 17,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ohm's Law Calculator", url: "https://tools.kspelectronics.in/ohms-law-calculator" },
    { "@type": "ListItem", position: 2, name: "Inverter & Battery Calculator", url: "https://tools.kspelectronics.in/inverter-calculator" },
    { "@type": "ListItem", position: 3, name: "Resistor Color Code Calculator", url: "https://tools.kspelectronics.in/resistor-color-code-calculator" },
    { "@type": "ListItem", position: 4, name: "SMD Resistor Code Decoder", url: "https://tools.kspelectronics.in/smd-resistor-code-decoder" },
    { "@type": "ListItem", position: 5, name: "Capacitor Code Calculator", url: "https://tools.kspelectronics.in/capacitor-code-calculator" },
    { "@type": "ListItem", position: 6, name: "AWG Wire Gauge Calculator", url: "https://tools.kspelectronics.in/awg-wire-gauge-calculator" },
    { "@type": "ListItem", position: 7, name: "SWG Wire Gauge Calculator", url: "https://tools.kspelectronics.in/swg-wire-gauge-calculator" },
    { "@type": "ListItem", position: 8, name: "Star-Delta Conversion", url: "https://tools.kspelectronics.in/Star-Delta-Conversion" },
    { "@type": "ListItem", position: 9, name: "Voltage Divider Calculator", url: "https://tools.kspelectronics.in/voltage-divider-calculator" },
    { "@type": "ListItem", position: 10, name: "LED Series Resistor Calculator", url: "https://tools.kspelectronics.in/led-resistor-calculator" },
    { "@type": "ListItem", position: 11, name: "Pull-up / Pull-down Resistor Calculator", url: "https://tools.kspelectronics.in/pullup-pulldown-calculator" },
    { "@type": "ListItem", position: 12, name: "Battery Backup Time Calculator", url: "https://tools.kspelectronics.in/battery-backup-time-calculator" },
    { "@type": "ListItem", position: 13, name: "Battery Charging Time Calculator", url: "https://tools.kspelectronics.in/battery-charging-time-calculator" },
    { "@type": "ListItem", position: 14, name: "Inverter Battery Matching Calculator", url: "https://tools.kspelectronics.in/inverter-battery-matching-calculator" },
    { "@type": "ListItem", position: 15, name: "DC Load Calculator", url: "https://tools.kspelectronics.in/dc-load-calculator" },
    { "@type": "ListItem", position: 16, name: "AC Load Calculator", url: "https://tools.kspelectronics.in/ac-load-calculator" },
    { "@type": "ListItem", position: 17, name: "Solar Load Calculator", url: "https://tools.kspelectronics.in/solar-load-calculator" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ElectroCalc?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ElectroCalc is a free suite of online electronics calculators built by KSP Electronics. It includes tools for Ohm's Law, resistor color codes, voltage dividers, LED resistor calculations, wire gauge lookups, inverter/battery sizing, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Are these electronics calculators really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, 100% free with no sign-up required. All calculators run entirely in your browser — no data is ever sent to any server. There are no paywalls, usage limits, or hidden charges.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All formulas are verified against IEEE and IEC standards. Results are computed locally using double-precision floating-point arithmetic for maximum accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "What is a voltage divider calculator used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A voltage divider calculator helps you determine the output voltage of a resistor divider network, or find the resistor values needed to achieve a specific voltage. Common uses include level shifting (e.g., 5V to 3.3V), ADC reference voltage scaling, and sensor signal conditioning.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate the resistor for an LED?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the LED Series Resistor Calculator. Enter your supply voltage, the LED's forward voltage (Vf) and forward current (If), and the number of LEDs in series. The calculator gives you the exact resistor value, the nearest standard E24 value, and the recommended wattage rating.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between kspelectronics.in and tools.kspelectronics.in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "kspelectronics.in is our main e-commerce store where you can purchase electronic components, development boards, sensors, and project kits. tools.kspelectronics.in (ElectroCalc) is our free engineering tools and calculators platform for electronics professionals and students.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Client-side interactive content */}
      <HomePageClient />
    </div>
  );
}
