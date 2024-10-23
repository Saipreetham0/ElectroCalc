// import CapacitorCodeCalculator from "../../components/capacitor-calculator";

// const capacitorCode = () => {
//   return (
//     <div className="min-h-screen bg-gray-200 py-1">
//       <div className="container mx-auto">
//         <main className="flex flex-col items-center justify-center min-h-screen py-2">
//           {/* <h1 className="text-4xl font-bold mb-8">Resistor Color Code</h1> */}
//           <CapacitorCodeCalculator />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default capacitorCode;

"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calculator,
  RotateCcw,
  HelpCircle,
  BookOpen,
  LightbulbIcon,
  Info,
  AlertTriangle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CapacitorResult {
  capacitance: number;
  unit: string;
  formatted: string;
}

const CapacitorCodeCalculator: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<CapacitorResult | null>(null);
  const [error, setError] = useState<string>("");

  const formatCapacitance = (capacitanceInPf: number): CapacitorResult => {
    if (capacitanceInPf >= 1000000) {
      return {
        capacitance: capacitanceInPf / 1000000,
        unit: "µF",
        formatted: `${(capacitanceInPf / 1000000).toFixed(2)} µF`
      };
    } else if (capacitanceInPf >= 1000) {
      return {
        capacitance: capacitanceInPf / 1000,
        unit: "nF",
        formatted: `${(capacitanceInPf / 1000).toFixed(2)} nF`
      };
    } else {
      return {
        capacitance: capacitanceInPf,
        unit: "pF",
        formatted: `${capacitanceInPf.toFixed(2)} pF`
      };
    }
  };

  const calculateCapacitance = (code: string): number | null => {
    const cleanCode = code.trim();
    if (/^\d{3}$/.test(cleanCode)) {
      const significantFigures = cleanCode.slice(0, 2);
      const multiplier = cleanCode[2];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else if (/^\d{4}$/.test(cleanCode)) {
      const significantFigures = cleanCode.slice(0, 3);
      const multiplier = cleanCode[3];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    }
    return null;
  };

  const handleCalculate = (): void => {
    setError("");
    setResult(null);

    if (!code) {
      setError("Please enter a capacitor code");
      return;
    }

    const capacitance = calculateCapacitance(code);
    if (capacitance !== null) {
      setResult(formatCapacitance(capacitance));
    } else {
      setError("Invalid code. Please enter a valid 3 or 4 digit capacitor code.");
    }
  };

  const handleReset = (): void => {
    setCode("");
    setResult(null);
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const ExampleCodes: React.FC = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Common Codes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>104</strong> = 100,000 pF (0.1 µF)
          </div>
          <div>
            <strong>223</strong> = 22,000 pF (22 nF)
          </div>
          <div>
            <strong>472</strong> = 4,700 pF (4.7 nF)
          </div>
          <div>
            <strong>105</strong> = 1,000,000 pF (1 µF)
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl text-center text-indigo-900">
                    Capacitor Code Calculator
                  </CardTitle>
                </div>
                <CardDescription className="text-center">
                  Convert 3 or 4 digit capacitor codes to actual capacitance values
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="code">Capacitor Code</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter a 3 or 4 digit code from your capacitor</p>
                          <p>Example: 104 = 100,000 pF (0.1 µF)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter 3 or 4 digit code (e.g., 104)"
                    className="text-lg h-12"
                    maxLength={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="h-12 px-4"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {result && !error && (
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 shadow-inner">
                    <div className="font-semibold text-gray-600 mb-2">Capacitance:</div>
                    <div className="text-3xl font-bold text-green-700">
                      {result.formatted}
                    </div>
                  </div>
                )}

                <ExampleCodes />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Guide Card */}
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-600" />
                  Quick Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="reading">
                    <AccordionTrigger>How to Read Capacitor Codes</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">3-Digit Code Format:</h4>
                          <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>First two digits: Significant figures</li>
                            <li>Third digit: Number of zeros to add</li>
                            <li>Example: 104 = 10 + 4 zeros = 100,000 pF</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold">4-Digit Code Format:</h4>
                          <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>First three digits: Significant figures</li>
                            <li>Fourth digit: Number of zeros to add</li>
                            <li>Example: 2234 = 223 + 4 zeros = 2,230,000 pF</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="units">
                    <AccordionTrigger>Understanding Units</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">Unit Conversion:</h4>
                          <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>1 µF (microfarad) = 1,000 nF = 1,000,000 pF</li>
                            <li>1 nF (nanofarad) = 1,000 pF</li>
                            <li>1 pF (picofarad) = base unit for codes</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LightbulbIcon className="h-5 w-5 text-indigo-600" />
                  Tips & Tricks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Common Pitfalls</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm mt-2">
                        <li>Don&apos;t include letters or special characters</li>
                        <li>Make sure to enter exactly 3 or 4 digits</li>
                        <li>Leading zeros are significant</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Helpful Tips:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Press Enter to quickly calculate</li>
                      <li>Use the reset button to clear all fields</li>
                      <li>Results automatically convert to the most appropriate unit</li>
                      <li>Check the Examples section for common values</li>
                      <li>Remember that temperature coefficients (if any) are not included in the basic code</li>
                    </ul>
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