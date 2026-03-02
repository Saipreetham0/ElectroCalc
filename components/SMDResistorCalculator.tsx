"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Zap } from "lucide-react";

interface ResistorCalculatorProps {
  className?: string;
}

const EIA96_VALUES: Record<string, number> = {
  "01": 100, "02": 102, "03": 105, "04": 107, "05": 110, "06": 113, "07": 115, "08": 118, "09": 121, "10": 124,
  "11": 127, "12": 130, "13": 133, "14": 137, "15": 140, "16": 143, "17": 147, "18": 150, "19": 154, "20": 158,
  "21": 162, "22": 165, "23": 169, "24": 174, "25": 178, "26": 182, "27": 187, "28": 191, "29": 196, "30": 200,
  "31": 205, "32": 210, "33": 215, "34": 221, "35": 226, "36": 232, "37": 237, "38": 243, "39": 249, "40": 255,
  "41": 261, "42": 267, "43": 274, "44": 280, "45": 287, "46": 294, "47": 301, "48": 309, "49": 316, "50": 324,
  "51": 332, "52": 340, "53": 348, "54": 357, "55": 365, "56": 374, "57": 383, "58": 392, "59": 402, "60": 412,
  "61": 422, "62": 432, "63": 442, "64": 453, "65": 464, "66": 475, "67": 487, "68": 499, "69": 511, "70": 523,
  "71": 536, "72": 549, "73": 562, "74": 576, "75": 590, "76": 604, "77": 619, "78": 634, "79": 649, "80": 665,
  "81": 681, "82": 698, "83": 715, "84": 732, "85": 750, "86": 768, "87": 787, "88": 806, "89": 825, "90": 845,
  "91": 866, "92": 887, "93": 909, "94": 931, "95": 953, "96": 976,
};

const EIA96_MULTIPLIERS: Record<string, number> = {
  "Z": 0.001, "Y": 0.01, "R": 0.01, "X": 0.1, "S": 0.1, "A": 1, "B": 10, "C": 100, "D": 1000, "E": 10000, "F": 100000
};

const SMDResistorCalculator = ({ className }: ResistorCalculatorProps) => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const formatResistance = (ohms: number): string => {
    if (ohms >= 1000000) {
      return `${(ohms / 1000000).toFixed(1)}MΩ`;
    } else if (ohms >= 1000) {
      return `${(ohms / 1000).toFixed(1)}kΩ`;
    }
    return `${ohms}Ω`;
  };

  const calculateResistance = (code: string): number => {
    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      throw new Error("Please enter a code");
    }

    // Decimal formats (R, K, M)
    if (cleanCode.includes("R") || cleanCode.includes("K") || cleanCode.includes("M")) {
      // Check if it's EIA-96 with "R" multiplier first (e.g., 01R)
      if (/^\d{2}[A-Z]$/.test(cleanCode) && EIA96_VALUES[cleanCode.slice(0, 2)]) {
        // Proceed to EIA-96 logic below
      } else {
        let multiplier = 1;
        if (cleanCode.includes("K")) multiplier = 1000;
        if (cleanCode.includes("M")) multiplier = 1000000;

        let valStr = cleanCode.replace(/[RKM]/, ".");
        const val = parseFloat(valStr);
        if (isNaN(val)) throw new Error("Invalid decimal format");
        return val * multiplier;
      }
    }

    // EIA-96 (2 digits + 1 letter)
    if (/^\d{2}[A-Z]$/.test(cleanCode)) {
      const valueCode = cleanCode.slice(0, 2);
      const multCode = cleanCode[2];

      const value = EIA96_VALUES[valueCode];
      const multiplier = EIA96_MULTIPLIERS[multCode];

      if (!value || multiplier === undefined) {
        throw new Error("Invalid EIA-96 code");
      }

      return value * multiplier;
    }

    // Standard 3 or 4 digit
    if (/^\d{3,4}$/.test(cleanCode)) {
      const len = cleanCode.length;
      const significantFigures = cleanCode.slice(0, len - 1);
      const multiplier = parseInt(cleanCode.slice(len - 1));

      return parseInt(significantFigures) * Math.pow(10, multiplier);
    }

    if (cleanCode === "0" || cleanCode === "000" || cleanCode === "0000") return 0;

    throw new Error("Unrecognized SMD code format");
  };

  const handleCalculate = (): void => {
    try {
      const resistance = calculateResistance(code);
      setResult(formatResistance(resistance));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setResult(null);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
    setCode(newValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-12">
      {/* Calculator Section */}
      <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-ksp-blue" />
            <CardTitle className="text-xl font-bold">
              Decoder Tool
            </CardTitle>
          </div>
          <CardDescription>
            Enter the code printed on the SMD resistor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-ksp-blue/5 border border-ksp-blue/10 rounded-xl mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard EIA-96 markings use <span className="text-ksp-blue font-semibold">3 or 4 digits</span>.
              The last digit is the multiplier (power of 10).
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="smd-code" className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              SMD Marking Code
            </Label>
            <Input
              id="smd-code"
              type="text"
              maxLength={4}
              value={code}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 103 or 4702"
              className="text-xl h-14 dark:bg-[#0a0f1a] dark:border-white/10 font-mono tracking-widest text-center"
            />
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full h-12 text-lg font-semibold transition-all shadow-sm"
          >
            <Zap className="mr-2 h-5 w-5 fill-current" />
            Decode Value
          </Button>

          {error && (
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="text-center p-8 bg-ksp-green/5 rounded-xl border border-ksp-green/20">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">Resistance Value</div>
              <div className="text-5xl font-bold text-ksp-green">
                {result}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Section */}
      <div className="space-y-6">
        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Standard Markings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">3-Digit System (±5%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  First 2 digits are significant; 3rd is the multiplier.
                </p>
                <div className="mt-2 text-xs font-mono text-ksp-blue">Example: 103 = 10 × 10³ = 10,000Ω (10kΩ)</div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">4-Digit System (±1%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  First 3 digits are significant; 4th is the multiplier.
                </p>
                <div className="mt-2 text-xs font-mono text-ksp-blue">Example: 4702 = 470 × 10² = 47,000Ω (47kΩ)</div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-widest mb-1">E-Series Tip:</h4>
              <p className="text-sm text-amber-800 dark:text-amber-500/80">
                If the code contains an "R", it acts as a decimal point. Example: 4R7 = 4.7Ω, R22 = 0.22Ω.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Common Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">103</div>
                <div className="text-[10px] text-gray-500">10kΩ</div>
              </div>
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">472</div>
                <div className="text-[10px] text-gray-500">4.7kΩ</div>
              </div>
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">104</div>
                <div className="text-[10px] text-gray-500">100kΩ</div>
              </div>
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">221</div>
                <div className="text-[10px] text-gray-500">220Ω</div>
              </div>
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">000</div>
                <div className="text-[10px] text-gray-500">Link/0Ω</div>
              </div>
              <div className="p-2 border dark:border-white/5 rounded-lg">
                <div className="text-xs font-mono text-ksp-blue font-bold">1002</div>
                <div className="text-[10px] text-gray-500">10kΩ</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SMDResistorCalculator;


