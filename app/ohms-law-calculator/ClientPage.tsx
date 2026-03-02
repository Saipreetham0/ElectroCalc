"use client";
import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, RotateCcw } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

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

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      calculateOhmsLaw();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="Ohm's Law Calculator"
        description="Calculate the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit."
      />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-ksp-blue" />
                <CardTitle className="text-xl font-bold">
                  Calculation Tool
                </CardTitle>
              </div>
              <CardDescription>
                Enter any two values to calculate the third
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage">Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={handleInputChange(setVoltage)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter voltage in volts"
                    className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current">Current (I)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={handleInputChange(setCurrent)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter current in amperes"
                    className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resistance">Resistance (R)</Label>
                  <Input
                    id="resistance"
                    type="number"
                    value={resistance}
                    onChange={handleInputChange(setResistance)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter resistance in ohms"
                    className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={calculateOhmsLaw}
                  className="flex-1 h-12 text-lg font-semibold transition-all shadow-sm"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Calculate
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
                <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">Result</div>
                  <div className="text-4xl font-bold text-ksp-blue">{result}</div>
                  {formula && (
                    <div className="mt-3 text-sm text-gray-500 font-mono">Formula: {formula}</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Section */}
          <div className="space-y-6">
            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Ohm&apos;s Law Formulas:</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                      <span>Voltage (V)</span>
                      <span className="font-mono text-ksp-blue font-bold">I × R</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                      <span>Current (I)</span>
                      <span className="font-mono text-ksp-blue font-bold">V / R</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span>Resistance (R)</span>
                      <span className="font-mono text-ksp-blue font-bold">V / I</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Standard Units:</h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <div className="text-ksp-blue font-bold uppercase">V</div>
                      <div className="text-xs text-gray-500">Volts</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <div className="text-ksp-blue font-bold uppercase">A</div>
                      <div className="text-xs text-gray-500">Amperes</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                      <div className="text-ksp-blue font-bold uppercase">Ω</div>
                      <div className="text-xs text-gray-500">Ohms</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>Enter any <span className="text-ksp-blue font-medium underline underline-offset-4Decoration-2">two values</span> to calculate the third automatically.</li>
                  <li>Use decimal points for precise fractional values (e.g., 0.5).</li>
                  <li>Results are accurately rounded to <span className="font-medium text-gray-900 dark:text-white">2 decimal places</span>.</li>
                  <li>Always verify your units before running calculations for precision.</li>
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