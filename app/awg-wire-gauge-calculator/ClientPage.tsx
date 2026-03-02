"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  RotateCcw,
  Zap,
  AlertTriangle,
  Info,
  Ruler,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToolPageHeader from "@/components/ToolPageHeader";

interface WireGaugeResult {
  diameter: number;
  area: number;
  currentCapacity: number;
  resistance: number;
}

const AWGTable: Record<string, { diameterMm: number; areaMm2: number; currentCapacityAmps: number; resistanceOhmPerKm: number }> = {
  "0000": { diameterMm: 11.684, areaMm2: 107.2, currentCapacityAmps: 302, resistanceOhmPerKm: 0.158 },
  "000": { diameterMm: 10.404, areaMm2: 85.0, currentCapacityAmps: 239, resistanceOhmPerKm: 0.197 },
  "00": { diameterMm: 9.266, areaMm2: 67.4, currentCapacityAmps: 190, resistanceOhmPerKm: 0.252 },
  "0": { diameterMm: 8.252, areaMm2: 53.5, currentCapacityAmps: 150, resistanceOhmPerKm: 0.317 },
  "1": { diameterMm: 7.348, areaMm2: 42.4, currentCapacityAmps: 120, resistanceOhmPerKm: 0.400 },
  "2": { diameterMm: 6.544, areaMm2: 33.6, currentCapacityAmps: 95, resistanceOhmPerKm: 0.506 },
  "4": { diameterMm: 5.189, areaMm2: 21.2, currentCapacityAmps: 60, resistanceOhmPerKm: 0.803 },
  "6": { diameterMm: 4.115, areaMm2: 13.3, currentCapacityAmps: 37, resistanceOhmPerKm: 1.27 },
  "8": { diameterMm: 3.264, areaMm2: 8.37, currentCapacityAmps: 24, resistanceOhmPerKm: 2.03 },
  "10": { diameterMm: 2.588, areaMm2: 5.26, currentCapacityAmps: 15, resistanceOhmPerKm: 3.23 },
  "12": { diameterMm: 2.053, areaMm2: 3.31, currentCapacityAmps: 9.3, resistanceOhmPerKm: 5.13 },
  "14": { diameterMm: 1.628, areaMm2: 2.08, currentCapacityAmps: 5.9, resistanceOhmPerKm: 8.17 },
  "16": { diameterMm: 1.291, areaMm2: 1.31, currentCapacityAmps: 3.7, resistanceOhmPerKm: 13.0 },
  "18": { diameterMm: 1.024, areaMm2: 0.823, currentCapacityAmps: 2.3, resistanceOhmPerKm: 20.7 },
  "20": { diameterMm: 0.812, areaMm2: 0.518, currentCapacityAmps: 1.5, resistanceOhmPerKm: 33.3 },
  "22": { diameterMm: 0.644, areaMm2: 0.326, currentCapacityAmps: 0.9, resistanceOhmPerKm: 52.9 },
};

const WireGaugeCalculator: React.FC = () => {
  const [gauge, setGauge] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [result, setResult] = useState<WireGaugeResult | null>(null);
  const [error, setError] = useState<{ message: string; type: "error" | "warning" } | null>(null);

  const handleCalculate = (): void => {
    setError(null);
    setResult(null);

    if (!gauge) {
      setError({ message: "Please select a wire gauge", type: "error" });
      return;
    }

    const wireData = AWGTable[gauge];
    if (wireData) {
      setResult({
        diameter: wireData.diameterMm,
        area: wireData.areaMm2,
        currentCapacity: wireData.currentCapacityAmps,
        resistance: wireData.resistanceOhmPerKm,
      });

      if (current) {
        const currentNum = parseFloat(current);
        if (currentNum > wireData.currentCapacityAmps) {
          setError({
            message: `Selected current (${currentNum}A) exceeds recommended maximum (${wireData.currentCapacityAmps}A)`,
            type: "warning",
          });
        }
      }
    }
  };

  const handleReset = (): void => {
    setGauge("");
    setCurrent("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="AWG Wire Gauge Calculator"
        description="Calculate wire diameter, cross-sectional area, resistance, and current carrying capacity for American Wire Gauge (AWG) sizes."
      />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-ksp-blue" />
                <CardTitle className="text-xl font-bold">Calculation Tool</CardTitle>
              </div>
              <CardDescription>Select gauge and optional current load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gauge" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Wire Gauge (AWG)
                  </Label>
                  <Select value={gauge} onValueChange={setGauge}>
                    <SelectTrigger className="h-12 dark:bg-[#0a0f1a] dark:border-white/10">
                      <SelectValue placeholder="Select gauge" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#111827] dark:border-white/10">
                      {Object.keys(AWGTable)
                        .map((awg) => (
                          <SelectItem key={awg} value={awg}>
                            {awg} AWG
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Current (Amperes)
                  </Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrent(e.target.value)}
                    placeholder="Load in A"
                    className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 h-12 text-lg font-semibold transition-all shadow-sm"
                >
                  <Zap className="mr-2 h-5 w-5 fill-current" />
                  Calculate
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 px-4 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>

              {error && (
                <div className={`p-4 rounded-lg flex items-start gap-3 border ${error.type === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/10 dark:border-amber-900/20 dark:text-amber-400"
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-400"
                  }`}>
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error.message}</p>
                </div>
              )}

              {result && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20 col-span-2 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Diameter</div>
                    <div className="text-3xl font-bold text-ksp-blue">{result.diameter.toFixed(3)} mm</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Area</div>
                    <div className="text-xl font-bold text-ksp-green">{result.area.toFixed(2)} mm²</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Resistance</div>
                    <div className="text-xl font-bold text-ksp-blue">{result.resistance.toFixed(2)} Ω/km</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-ksp-blue" />
                  Common AWG Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between">
                    <span className="font-bold text-ksp-blue">12 AWG</span>
                    <span className="text-gray-500">20A Circuits</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between">
                    <span className="font-bold text-ksp-blue">14 AWG</span>
                    <span className="text-gray-500">15A Circuits</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between">
                    <span className="font-bold text-ksp-blue">18 AWG</span>
                    <span className="text-gray-500">Low Voltage / LEDs</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between">
                    <span className="font-bold text-ksp-blue">22 AWG</span>
                    <span className="text-gray-500">Breadboards / Signal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl">
              <h4 className="flex items-center gap-2 text-blue-900 dark:text-blue-400 font-bold mb-3">
                <Info className="h-5 w-5" />
                AWG Fact
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-500/80 leading-relaxed font-medium">
                AWG is logarithmic. Every 3 gauge steps doubles or halves the cross-sectional area, and every 6 steps doubles or halves the diameter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireGaugeCalculator;
