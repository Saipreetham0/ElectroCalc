"use client";
import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Zap, RotateCcw } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

const CapacitorCodeCalculator: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<{
    pf: string;
    nf: string;
    uf: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateCapacitance = (val: string): void => {
    setError("");
    const cleanCode = val.trim();

    if (!cleanCode) {
      setResult(null);
      return;
    }

    if (!/^\d{3,4}$/.test(cleanCode)) {
      setError("Please enter a 3 or 4 digit code (e.g., 104 or 1002)");
      setResult(null);
      return;
    }

    try {
      let pfValue: number;
      if (cleanCode.length === 3) {
        const base = parseInt(cleanCode.substring(0, 2));
        const multiplier = parseInt(cleanCode.substring(2));
        pfValue = base * Math.pow(10, multiplier);
      } else {
        const base = parseInt(cleanCode.substring(0, 3));
        const multiplier = parseInt(cleanCode.substring(3));
        pfValue = base * Math.pow(10, multiplier);
      }

      setResult({
        pf: pfValue.toLocaleString() + " pF",
        nf: (pfValue / 1000).toLocaleString() + " nF",
        uf: (pfValue / 1000000).toLocaleString() + " µF",
      });
    } catch (err) {
      setError("Invalid code format");
      setResult(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCode(val);
    if (val.length >= 3) {
      calculateCapacitance(val);
    } else {
      setResult(null);
    }
  };

  const resetCalculator = (): void => {
    setCode("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="Capacitor Code Calculator"
        description="Convert 3-digit and 4-digit capacitor codes into picofarads (pF), nanofarads (nF), and microfarads (µF)."
      />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-ksp-blue" />
                <CardTitle className="text-xl font-bold">
                  Calculation Tool
                </CardTitle>
              </div>
              <CardDescription>
                Enter the code printed on the capacitor body
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="cap-code" className="text-sm font-semibold uppercase tracking-wider text-gray-500 font-mono">
                  Marking Code (3-4 Digits)
                </Label>
                <div className="relative">
                  <Input
                    id="cap-code"
                    type="text"
                    maxLength={4}
                    value={code}
                    onChange={handleInputChange}
                    placeholder="e.g., 104"
                    className="text-2xl h-16 dark:bg-[#0a0f1a] dark:border-white/10 font-mono tracking-[0.2em] text-center"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => calculateCapacitance(code)}
                  className="flex-1 h-12 text-lg font-semibold transition-all shadow-sm"
                >
                  <Zap className="mr-2 h-5 w-5 fill-current" />
                  Convert Code
                </Button>
                <Button
                  onClick={resetCalculator}
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

              {result && !error && (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">Capacitance Values</div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Picofarads</div>
                        <div className="text-3xl font-bold text-ksp-blue">{result.pf}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                          <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Nanofarads</div>
                          <div className="text-xl font-bold text-ksp-green">{result.nf}</div>
                        </div>
                        <div className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/5">
                          <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Microfarads</div>
                          <div className="text-xl font-bold text-ksp-blue">{result.uf}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Section */}
          <div className="space-y-6">
            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">How it Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">3-Digit System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Standard marking system where the first 2 digits are significant values and the 3rd is the multiplier.
                    </p>
                    <div className="mt-3 font-mono text-xs bg-white dark:bg-black/20 p-2 rounded border dark:border-white/5">
                      <span className="text-ksp-blue font-bold">10</span> + <span className="text-ksp-green font-bold">4</span> = 10 × 10⁴ pF = 100,000 pF
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-1 leading-none">Tolerance Codes:</h4>
                  <p className="text-xs text-amber-800 dark:text-amber-500/80 mb-2">Often printed after the digits:</p>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
                    <div className="p-1 bg-amber-100 dark:bg-amber-800/20 rounded">J: ±5%</div>
                    <div className="p-1 bg-amber-100 dark:bg-amber-800/20 rounded">K: ±10%</div>
                    <div className="p-1 bg-amber-100 dark:bg-amber-800/20 rounded">M: ±20%</div>
                    <div className="p-1 bg-amber-100 dark:bg-amber-800/20 rounded">Z: +80/-20%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Common Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">104</span>
                    <span className="text-xs text-gray-500">0.1 µF</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">103</span>
                    <span className="text-xs text-gray-500">0.01 µF</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">224</span>
                    <span className="text-xs text-gray-500">0.22 µF</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">471</span>
                    <span className="text-xs text-gray-500">470 pF</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">102</span>
                    <span className="text-xs text-gray-500">1 nF</span>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg flex justify-between items-center">
                    <span className="font-mono font-bold text-ksp-blue">101</span>
                    <span className="text-xs text-gray-500">100 pF</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacitorCodeCalculator;