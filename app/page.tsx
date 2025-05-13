// "use client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calculator, Zap, Battery, Cpu, Radio, Cable, Microchip  } from "lucide-react";
// import Link from "next/link";

// // export const metadata: Metadata = {
// //   title: 'ElectroCalc - Electronics Calculator Suite',
// //   description: 'Comprehensive electronics calculation tools for engineers and hobbyists',
// // };

// interface Calculator {
//   title: string;
//   category: string;
//   description: string;
//   url: string;
//   icon: typeof Zap;
// }

// const calculators: Calculator[] = [
//   {
//     title: "Inverter Calculator",
//     category: "Power",
//     description: "Calculate your power needs instantly",
//     url: "/inverter-calculator",
//     icon: Battery,
//   },
//   {
//     title: "Resistor Color Code",
//     category: "Electronics",
//     description:
//       "Quickly determine resistor values based on their color bands.",
//     url: "/resistor-color-code-calculator",
//     // url: "/electronics/resistor-color-code-calculator",
//     icon: Radio,
//   },
//   {
//     title: "Star-Delta Conversion",
//     category: "Electronics",
//     description:
//       "Convert between Star and Delta configurations for three-phase networks.",
//     url: "/Star-Delta-Conversion",
//     // url: "/electronics/star-delta-conversion-calculator",
//     icon: Battery,
//   },
//   {
//     title: "Ohm Law Calculator",
//     category: "Electronics",
//     description:
//       "Easily calculate voltage, current, or resistance with our Ohm's Law Calculator.",
//     url: "/ohms-law-calculator",
//     icon: Calculator,
//   },
//   {
//     title: "SMD Resistor Code",
//     category: "Electronics",
//     description: "Decode SMD resistor codes to find their resistance values.",
//     url: "/smd-resistor-code-decoder",
//     // url: "/electronics/smd-resistor-code-decoder",

//     icon: Cpu,
//   },
//   {
//     title: "Capacitor Code",
//     category: "Electronics",
//     description: "Find the capacitance value of a capacitor using its code.",
//     url: "/capacitor-code-calculator",
//     //   url: "/electronics/capacitor-code-calculator",
//     icon: Cpu,
//   },
//   {
//     title: "American Wire Gauge (AWG)",
//     category: "Wire Sizing",
//     description:
//       "Calculate wire diameter, cross-sectional area, and current capacity using AWG standards.",
//     url: "/awg-wire-gauge-calculator",
//     icon: Cable,
//   },
//   {
//     title: "Standard Wire Gauge (SWG)",
//     category: "Wire Sizing",
//     description:
//       "Convert between SWG numbers and physical dimensions for Indian/British standard wires.",
//     url: "/swg-wire-gauge-calculator",
//     icon: Cable,
//   },
//   {
//     title: "Arduino Blogs",
//     category: "Microcontrollers",
//     description:
//       "Explore tutorials, projects, and guides for Arduino enthusiasts.",
//     url: "/arduino-blogs",
//     icon: Microchip,
//   },
//   {
//     title: "ESP32 Blogs",
//     category: "Microcontrollers",
//     description:
//       "Learn about ESP32 programming, IoT applications, and project ideas.",
//     url: "/esp32-blogs",
//     icon: Microchip,
//   },
//   {
//     title: "Raspberry Pi Blogs",
//     category: "Single Board Computers",
//     description:
//       "Discover Raspberry Pi projects, setup guides, and troubleshooting tips.",
//     url: "/raspberry-pi-blogs",
//     icon: Microchip,
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto py-16">
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Zap className="w-8 h-8 text-primary" />
//             <h1 className="text-4xl font-bold tracking-tight">ElectroCalc</h1>
//           </div>
//           <p className="text-muted-foreground">
//             Your comprehensive electronics calculation toolkit
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//           {calculators.map((calc) => {
//             const Icon = calc.icon;
//             return (
//               <Link
//                 key={calc.title}
//                 href={calc.url}
//                 className="block no-underline"
//               >
//                 <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
//                   <CardHeader>
//                     <div className="flex items-center gap-2">
//                       <Icon className="w-6 h-6 text-primary" />
//                       <div>
//                         <CardTitle className="text-lg">{calc.title}</CardTitle>
//                         <CardDescription className="text-sm text-orange-600">
//                           {calc.category}
//                         </CardDescription>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground">
//                       {calc.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             );
//           })}
//         </div>

//         <div className="flex justify-center mt-8">
//           <Button size="lg" variant="default">
//             Explore More Tools
//           </Button>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, Battery, Cpu, Radio, Cable, Microchip } from "lucide-react";
import Link from "next/link";

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
    icon: Radio,
  },
  {
    title: "Star-Delta Conversion",
    category: "Electronics",
    description:
      "Convert between Star and Delta configurations for three-phase networks.",
    url: "/Star-Delta-Conversion",
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
    icon: Cpu,
  },
  {
    title: "Capacitor Code",
    category: "Electronics",
    description: "Find the capacitance value of a capacitor using its code.",
    url: "/capacitor-code-calculator",
    icon: Cpu,
  },
  {
    title: "American Wire Gauge (AWG)",
    category: "Wire Sizing",
    description:
      "Calculate wire diameter, cross-sectional area, and current capacity using AWG standards.",
    url: "/awg-wire-gauge-calculator",
    icon: Cable,
  },
  {
    title: "Standard Wire Gauge (SWG)",
    category: "Wire Sizing",
    description:
      "Convert between SWG numbers and physical dimensions for Indian/British standard wires.",
    url: "/swg-wire-gauge-calculator",
    icon: Cable,
  },
  {
    title: "Arduino Blogs",
    category: "Microcontrollers",
    description:
      "Explore tutorials, projects, and guides for Arduino enthusiasts.",
    url: "/arduino-blogs",
    icon: Microchip,
  },
  {
    title: "ESP32 Blogs",
    category: "Microcontrollers",
    description:
      "Learn about ESP32 programming, IoT applications, and project ideas.",
    url: "/esp32-blogs",
    icon: Microchip,
  },
  {
    title: "Raspberry Pi Blogs",
    category: "Single Board Computers",
    description:
      "Discover Raspberry Pi projects, setup guides, and troubleshooting tips.",
    url: "/raspberry-pi-blogs",
    icon: Microchip,
  },
];

// Group calculators by category
const categorizedCalculators = calculators.reduce<Record<string, Calculator[]>>((acc, calc) => {
  if (!acc[calc.category]) {
    acc[calc.category] = [];
  }
  acc[calc.category].push(calc);
  return acc;
}, {});

const categories = Object.keys(categorizedCalculators);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                <path d="M0 0h100v100H0z" fill="none" />
                <path d="M50 0v30M50 70v30M0 50h30M70 50h30" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        <div className="container relative mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Zap className="w-10 h-10 text-white" />
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                ElectroCalc
              </h1>
            </div>
            <p className="max-w-2xl text-xl text-blue-100 mb-8">
              The ultimate electronics calculation toolkit for engineers, makers, and hobbyists
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
                   <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Tools
              </Button>
            </div>
          </div>
        </div>
      </section> */}


         <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                <path d="M0 0h100v100H0z" fill="none" />
                <path d="M50 0v30M50 70v30M0 50h30M70 50h30" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        <div className="container relative mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Zap className="w-10 h-10 text-white" />
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                ElectroCalc
              </h1>
            </div>
            <p className="max-w-2xl text-xl text-blue-100 mb-8">
              The ultimate electronics calculation toolkit for engineers, makers, and hobbyists
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/10">
                Explore Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 pl-10 text-base rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Search for calculators or tools..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="absolute right-16 bottom-2 top-2 px-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 bottom-2 top-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {/* Additional search action if needed */}}
            >
              Search
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <Button
              variant={selectedCategory === "All" ? "default" : "ghost"}
              className={`rounded-full border ${selectedCategory === "All" ? "bg-blue-600 text-white" : "border-gray-200 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700"}`}
              onClick={() => handleCategorySelect("All")}
            >
              All Tools
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`rounded-full border ${selectedCategory === category ? "bg-blue-600 text-white" : "border-gray-200 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700"}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCalculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.title}
                  href={calc.url}
                  className="block no-underline group"
                >
                  <Card className="h-full border-0 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{calc.title}</CardTitle>
                          <CardDescription className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {calc.category}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {calc.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No matching tools found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-3 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Calculations</h3>
            <p className="text-gray-600 dark:text-gray-300">Get precise results instantly for all your electronic design needs</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-3 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Industry Standards</h3>
            <p className="text-gray-600 dark:text-gray-300">All calculations follow the latest industry standards and best practices</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-3 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Microchip className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">Access blogs and guides to enhance your electronics knowledge</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your electronics projects?</h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Explore All Tools
          </Button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

