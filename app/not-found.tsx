"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircuitBoard, Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const commonCalculators = [
    {
      name: "Ohm's Law Calculator",
      url: "/ohms-law-calculator",
    },
    {
      name: "Resistor Color Code",
      url: "/resistor-color-code-calculator",
    },
    {
      name: "Wire Gauge Calculator",
      url: "/awg-wire-gauge-calculator",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            {/* Circuit Animation Icon */}
            <div className="flex justify-center mb-6">
              <CircuitBoard className="h-24 w-24 text-blue-500 animate-pulse" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700">
                Circuit Not Found
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Looks like there&asop;s a break in the circuit! The page
                you&asop;re looking for seems to have disconnected.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link href="/">
                <Button className="w-full sm:w-auto flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                </Button>
              </Link>
              <Link href="javascript:history.back()">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </Link>
            </div>

            {/* Popular Calculators Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Popular Calculators
              </h3>
              <div className="grid gap-3">
                {commonCalculators.map((calc) => (
                  <Link
                    href={calc.url}
                    key={calc.name}
                    className="p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  >
                    <Search className="w-4 h-4" />
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
