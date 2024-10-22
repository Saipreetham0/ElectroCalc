// import Card from "../components/card";
// import { Button } from "@/components/ui/button";

// export const metadata = {
//   title: "ElectroCalc",
//   description: "electronics deals",
// };
// const ciruitofthings = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <main className="py-16 flex flex-col items-center w-full ">
//         <h1 className="text-4xl font-bold mb-8">ElectroCalc</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl px-4">
//           <Card
//             title="Resistor Color Code"
//             category="Electronics"
//             description="Quickly determine resistor values based on their color bands."
//             url="/resistor-calculator"
//           />
//           <Card
//             title="Star-Delta Conversion"
//             category="Electronics"
//             description="Convert between Star and Delta configurations for three-phase networks."
//             url="/Star-Delta-Conversion"
//           />
//           <Card
//             title="Ohm Law Calculator"
//             category="Electronics"
//             description="Easily calculate voltage, current, or resistance with our Ohm's Law Calculator."
//             url="/ohm-law-calculator"
//           />
//           <Card
//             title="SMD Resistor Code "
//             category="Electronics"
//             description="Decode SMD resistor codes to find their resistance values."
//             url="/SMD-resistor-code"
//           />
//           <Card
//             title="Capacitor Code "
//             category="Electronics"
//             description="Find the capacitance value of a capacitor using its code."
//             url="/capacitor-code"
//           />

//           <Card
//             title="SMD Resistor Code "
//             category="Electronics"
//             description=""
//             url="/SMD-resistor-code"
//           />
//           <Button>Click me</Button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ciruitofthings;
"use client";
// import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Zap, Battery, Cpu, Radio } from 'lucide-react';
import Link from 'next/link';

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
    title: "Resistor Color Code",
    category: "Electronics",
    description: "Quickly determine resistor values based on their color bands.",
    url: "/resistor-calculator",
    icon: Radio
  },
  {
    title: "Star-Delta Conversion",
    category: "Electronics",
    description: "Convert between Star and Delta configurations for three-phase networks.",
    url: "/Star-Delta-Conversion",
    icon: Battery
  },
  {
    title: "Ohm Law Calculator",
    category: "Electronics",
    description: "Easily calculate voltage, current, or resistance with our Ohm's Law Calculator.",
    url: "/ohm-law-calculator",
    icon: Calculator
  },
  {
    title: "SMD Resistor Code",
    category: "Electronics",
    description: "Decode SMD resistor codes to find their resistance values.",
    url: "/SMD-resistor-code",
    icon: Cpu
  },
  {
    title: "Capacitor Code",
    category: "Electronics",
    description: "Find the capacitance value of a capacitor using its code.",
    url: "/capacitor-code",
    icon: Cpu
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
              <Link key={calc.title} href={calc.url} className="block no-underline">
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
                    <p className="text-sm text-muted-foreground">{calc.description}</p>
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