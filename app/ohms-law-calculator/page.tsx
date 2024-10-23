// import OhmsLawCalculator from "../../components/OhmsLawCalculator";
// const OhmsCalculator = () => {
//   return (
//     <div className="min-h-screen bg-gray-200 py-1">
//       <div className="container mx-auto">
//         <main className="flex flex-col items-center justify-center min-h-screen py-2">
//           {/* <h1 className="text-4xl font-bold mb-8">Resistor Color Code</h1> */}
//           <OhmsLawCalculator />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default OhmsCalculator;

"use client";
import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Info, RotateCcw } from "lucide-react";

// Type definitions
interface TriangleProps {}

interface OhmsLawState {
  voltage: string;
  current: string;
  resistance: string;
  result: string;
  formula: string;
  error: string;
}

const OhmsLawCalculator: React.FC = () => {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [formula, setFormula] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetCalculator = (): void => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setResult("");
    setFormula("");
    setError("");
  };

  const calculateOhmsLaw = (): void => {
    setError("");

    const v: number = parseFloat(voltage);
    const i: number = parseFloat(current);
    const r: number = parseFloat(resistance);

    try {
      if (voltage && current) {
        const calculatedResistance: string = (v / i).toFixed(2);
        if (isFinite(Number(calculatedResistance)) && !isNaN(Number(calculatedResistance))) {
          setResistance(calculatedResistance);
          setResult(`Resistance = ${calculatedResistance} Ω`);
          setFormula("R = V / I");
        } else {
          throw new Error("Invalid calculation result");
        }
      } else if (voltage && resistance) {
        const calculatedCurrent: string = (v / r).toFixed(2);
        if (isFinite(Number(calculatedCurrent)) && !isNaN(Number(calculatedCurrent))) {
          setCurrent(calculatedCurrent);
          setResult(`Current = ${calculatedCurrent} A`);
          setFormula("I = V / R");
        } else {
          throw new Error("Invalid calculation result");
        }
      } else if (current && resistance) {
        const calculatedVoltage: string = (i * r).toFixed(2);
        if (isFinite(Number(calculatedVoltage)) && !isNaN(Number(calculatedVoltage))) {
          setVoltage(calculatedVoltage);
          setResult(`Voltage = ${calculatedVoltage} V`);
          setFormula("V = I × R");
        } else {
          throw new Error("Invalid calculation result");
        }
      } else {
        setError("Please provide exactly two values to calculate the third");
      }
    } catch (err) {
      setError("Invalid input values. Please check your numbers.");
    }
  };

  const Triangle: React.FC<TriangleProps> = () => (
    <div className="relative w-48 h-48 mx-auto my-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-4 border-indigo-500 transform rotate-45"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-12 text-center">
          <div className="text-lg font-semibold text-indigo-600">V</div>
          <div className="flex justify-between w-32">
            <div className="text-lg font-semibold text-indigo-600">I</div>
            <div className="text-lg font-semibold text-indigo-600">R</div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <Card className="w-full backdrop-blur-sm bg-white/90 border-2 shadow-xl">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-2xl md:text-3xl text-center text-indigo-900">
                  Ohm&apos;s Law Calculator
                </CardTitle>
              </div>
              <CardDescription className="text-center text-gray-600">
                Calculate voltage, current, or resistance using Ohm&apos;s Law
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <Triangle /> */}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage">Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={handleInputChange(setVoltage)}
                    placeholder="Enter voltage in volts"
                    className="text-lg h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current">Current (I)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={handleInputChange(setCurrent)}
                    placeholder="Enter current in amperes"
                    className="text-lg h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resistance">Resistance (R)</Label>
                  <Input
                    id="resistance"
                    type="number"
                    value={resistance}
                    onChange={handleInputChange(setResistance)}
                    placeholder="Enter resistance in ohms"
                    className="text-lg h-12"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={calculateOhmsLaw}
                  className="flex-1 h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
                <Button
                  onClick={resetCalculator}
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
                  <div className="font-semibold text-gray-600 mb-2">Result:</div>
                  <div className="text-3xl font-bold text-green-700">{result}</div>
                  {formula && (
                    <div className="mt-2 text-gray-600">Using {formula}</div>
                  )}
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
                  <h3 className="font-semibold text-gray-800">Ohm&apos;s Law Formulas:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Voltage (V) = Current (I) × Resistance (R)</li>
                    <li>Current (I) = Voltage (V) ÷ Resistance (R)</li>
                    <li>Resistance (R) = Voltage (V) ÷ Current (I)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">Units:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Voltage: Volts (V)</li>
                    <li>Current: Amperes (A)</li>
                    <li>Resistance: Ohms (Ω)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/90 border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-900">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Enter any two values to calculate the third</li>
                  <li>Use decimal points for fractional values</li>
                  <li>Results are rounded to 2 decimal places</li>
                  <li>Use the reset button to clear all fields</li>
                  <li>Check your units before calculating</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawCalculator;