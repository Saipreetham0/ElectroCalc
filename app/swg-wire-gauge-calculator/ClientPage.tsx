"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calculator,
  RotateCcw,
  Ruler,
  Zap,
} from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

interface WireGaugeResult {
  diameter: number;
  area: number;
  maxCurrent: number;
}

const WireGaugeCalculator = () => {
  const [gauge, setGauge] = useState<string>("");
  const [result, setResult] = useState<WireGaugeResult | null>(null);
  const [error, setError] = useState<string>("");

  const gaugeToMm: { [key: number]: number } = {
    0: 8.23, 1: 7.62, 2: 7.01, 3: 6.40, 4: 5.89, 5: 5.38, 6: 4.88, 7: 4.47, 8: 4.06, 9: 3.66,
    10: 3.25, 11: 2.95, 12: 2.64, 13: 2.34, 14: 2.03, 15: 1.83, 16: 1.63, 17: 1.42, 18: 1.22, 19: 1.02,
    20: 0.91, 21: 0.81, 22: 0.71, 23: 0.61, 24: 0.56, 25: 0.51, 26: 0.46, 27: 0.41, 28: 0.35, 29: 0.30, 30: 0.25
  };

  const handleCalculate = () => {
    setError("");
    setResult(null);
    if (!gauge) {
      setError("Please enter a wire gauge number");
      return;
    }
    const gaugeNum = parseInt(gauge);
    if (isNaN(gaugeNum) || !gaugeToMm[gaugeNum]) {
      setError("Please enter a valid wire gauge number (0-30)");
      return;
    }
    const diameter = gaugeToMm[gaugeNum];
    const area = Math.PI * Math.pow(diameter / 2, 2);
    const maxCurrent = area * 4; // Conservative estimate for copper

    setResult({ diameter, area, maxCurrent });
  };

  const handleReset = () => {
    setGauge("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="SWG Wire Gauge Calculator"
        description="Convert Standard Wire Gauge (SWG) to diameter, cross-sectional area, and approximate current carrying capacity."
      />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-ksp-blue" />
                <CardTitle className="text-xl font-bold">Calculation Tool</CardTitle>
              </div>
              <CardDescription>Enter the SWG number to calculate properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="gauge" className="text-sm font-semibold uppercase tracking-wider text-gray-500 font-mono">
                  Wire Gauge (SWG)
                </Label>
                <Input
                  id="gauge"
                  type="number"
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value)}
                  placeholder="e.g., 16"
                  className="text-2xl h-16 dark:bg-[#0a0f1a] dark:border-white/10 text-center font-mono"
                  min="0"
                  max="30"
                />
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
                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Diameter</div>
                      <div className="text-3xl font-bold text-ksp-blue">{result.diameter.toFixed(2)} mm</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Area</div>
                        <div className="text-xl font-bold text-ksp-green">{result.area.toFixed(2)} mm²</div>
                      </div>
                      <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1">Max Current</div>
                        <div className="text-xl font-bold text-ksp-blue">~{result.maxCurrent.toFixed(1)} A</div>
                      </div>
                    </div>
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
                  Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border dark:border-white/5 rounded-lg">
                      <span className="font-bold text-ksp-blue">SWG 8</span>
                      <p className="text-xs text-gray-500">Heavy duty cables</p>
                    </div>
                    <div className="p-3 border dark:border-white/5 rounded-lg">
                      <span className="font-bold text-ksp-blue">SWG 16</span>
                      <p className="text-xs text-gray-500">Domestic wiring</p>
                    </div>
                    <div className="p-3 border dark:border-white/5 rounded-lg">
                      <span className="font-bold text-ksp-blue">SWG 22</span>
                      <p className="text-xs text-gray-500">Electronics</p>
                    </div>
                    <div className="p-3 border dark:border-white/5 rounded-lg">
                      <span className="font-bold text-ksp-blue">SWG 30</span>
                      <p className="text-xs text-gray-500">Precision work</p>
                    </div>
                  </div>
                  <Alert className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/20">
                    <p className="text-xs text-amber-800 dark:text-amber-500/80">
                      <strong>Note:</strong> Current capacity is an estimate for copper wire. Consult local electrical codes for actual installations.
                    </p>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireGaugeCalculator;