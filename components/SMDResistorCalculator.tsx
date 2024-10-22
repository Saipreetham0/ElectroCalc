"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Calculator, Zap } from "lucide-react";
// import { ResistorCalculatorProps } from "@/types";

interface ResistorCalculatorProps {
  className?: string;
}


// const SMDResistorCalculator: React.FC<ResistorCalculatorProps> = ({ className }) => {
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
    const cleanCode = code.trim();

    if (!/^\d{3,4}$/.test(cleanCode)) {
      throw new Error("Invalid code format. Please enter 3 or 4 digits.");
    }

    if (cleanCode.length === 3) {
      const significantFigures = cleanCode.slice(0, 2);
      const multiplier = cleanCode[2];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else {
      const significantFigures = cleanCode.slice(0, 3);
      const multiplier = cleanCode[3];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    }
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
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setCode(newValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <Card className="w-full backdrop-blur-sm bg-white/90 border-2 shadow-xl">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-2xl md:text-3xl text-center text-indigo-900">
                  SMD Resistor Calculator
                </CardTitle>
              </div>
              <CardDescription className="text-center text-gray-600">
                Calculate resistance values from SMD codes instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50/50 border border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Enter 3 or 4 digits code from your SMD resistor.
                  <br />
                  Example: 103 = 10kΩ, 1002 = 10kΩ
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label htmlFor="smd-code" className="text-lg text-gray-700">
                  SMD Code
                </Label>
                <Input
                  id="smd-code"
                  type="text"
                  maxLength={4}
                  value={code}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter 3 or 4 digit code"
                  className="text-lg h-12 placeholder:text-gray-400"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                // className="w-full h-12 text-lg bg-black hover:bg-indigo-700 text-white"

              >
                <Zap className="mr-2 h-5 w-5" />
                Calculate
              </Button>

              {error && (
                <Alert variant="destructive" className="border-2">
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 shadow-inner">
                  <div className="font-semibold text-gray-600 mb-2">Resistance Value:</div>
                  <span className="text-3xl font-bold text-green-700">
                    {result}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Section */}
          <div className="hidden md:block space-y-6">
            <Card className="backdrop-blur-sm bg-white/90 border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-900">Quick Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">How to Read SMD Codes:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>3-digit code: First two digits + multiplier</li>
                    <li>4-digit code: First three digits + multiplier</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">Examples:</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <p className="font-medium">Code: 103</p>
                      <p>10 × 10³ = 10kΩ</p>
                    </div>
                    <div>
                      <p className="font-medium">Code: 4702</p>
                      <p>470 × 10² = 47kΩ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/90 border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-900">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Make sure the SMD component is a resistor</li>
                  <li>Clean the component surface for better readability</li>
                  <li>Use proper lighting for accurate code reading</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMDResistorCalculator;

