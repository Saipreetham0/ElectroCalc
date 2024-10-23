"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, Battery, Cpu, Radio, Cable } from "lucide-react";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: 'ElectroCalc - Electronics Calculator Suite',
//   description: 'Comprehensive electronics calculation tools for engineers and hobbyists',
// };

interface Calculator {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: typeof Zap;
}

const calculators: Calculator[] = [
  {
    title: "Inverter Calculator",
    category: "Power",
    description: "Calculate your power needs instantly",
    url: "/inverter-calculator",
    icon: Battery,
  },
  {
    title: "Resistor Color Code",
    category: "Electronics",
    description:
      "Quickly determine resistor values based on their color bands.",
    url: "/resistor-color-code-calculator",
    // url: "/electronics/resistor-color-code-calculator",
    icon: Radio,
  },
  {
    title: "Star-Delta Conversion",
    category: "Electronics",
    description:
      "Convert between Star and Delta configurations for three-phase networks.",
    url: "/Star-Delta-Conversion",
    // url: "/electronics/star-delta-conversion-calculator",
    icon: Battery,
  },
  {
    title: "Ohm Law Calculator",
    category: "Electronics",
    description:
      "Easily calculate voltage, current, or resistance with our Ohm's Law Calculator.",
    url: "/ohms-law-calculator",
    icon: Calculator,
  },
  {
    title: "SMD Resistor Code",
    category: "Electronics",
    description: "Decode SMD resistor codes to find their resistance values.",
    url: "/smd-resistor-code-decoder",
    // url: "/electronics/smd-resistor-code-decoder",

    icon: Cpu,
  },
  {
    title: "Capacitor Code",
    category: "Electronics",
    description: "Find the capacitance value of a capacitor using its code.",
    url: "/capacitor-code-calculator",
    //   url: "/electronics/capacitor-code-calculator",
    icon: Cpu,
  },
  {
    title: "American Wire Gauge (AWG)",
    category: "Wire Sizing",
    description: "Calculate wire diameter, cross-sectional area, and current capacity using AWG standards.",
    url: "/awg-wire-gauge-calculator",
    icon: Cable,
  },
  {
    title: "Standard Wire Gauge (SWG)",
    category: "Wire Sizing",
    description: "Convert between SWG numbers and physical dimensions for Indian/British standard wires.",
    url: "/swg-wire-gauge-calculator",
    icon: Cable,
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">ElectroCalc</h1>
          </div>
          <p className="text-muted-foreground">
            Your comprehensive electronics calculation toolkit
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.title}
                href={calc.url}
                className="block no-underline"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{calc.title}</CardTitle>
                        <CardDescription className="text-sm text-orange-600">
                          {calc.category}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {calc.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Button size="lg" variant="default">
            Explore More Tools
          </Button>
        </div>
      </main>
    </div>
  );
}
