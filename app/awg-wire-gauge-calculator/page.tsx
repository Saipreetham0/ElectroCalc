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
  BookOpen,
  LightbulbIcon,
  Info,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WireGaugeResult {
  diameter: number;
  area: number;
  currentCapacity: number;
  resistance: number;
}

interface AWGData {
  [key: string]: {
    diameterMm: number;
    areaMm2: number;
    currentCapacityAmps: number;
    resistanceOhmPerKm: number;
  };
}

const AWGTable: AWGData = {
  "0000": {
    diameterMm: 11.684,
    areaMm2: 107.2,
    currentCapacityAmps: 302,
    resistanceOhmPerKm: 0.158,
  },
  "000": {
    diameterMm: 10.404,
    areaMm2: 85.0,
    currentCapacityAmps: 239,
    resistanceOhmPerKm: 0.197,
  },
  "00": {
    diameterMm: 9.266,
    areaMm2: 67.4,
    currentCapacityAmps: 190,
    resistanceOhmPerKm: 0.252,
  },
  "0": {
    diameterMm: 8.252,
    areaMm2: 53.5,
    currentCapacityAmps: 150,
    resistanceOhmPerKm: 0.317,
  },
  "2": {
    diameterMm: 6.544,
    areaMm2: 33.6,
    currentCapacityAmps: 95,
    resistanceOhmPerKm: 0.506,
  },
  "4": {
    diameterMm: 5.189,
    areaMm2: 21.2,
    currentCapacityAmps: 60,
    resistanceOhmPerKm: 0.803,
  },
  "6": {
    diameterMm: 4.115,
    areaMm2: 13.3,
    currentCapacityAmps: 37,
    resistanceOhmPerKm: 1.27,
  },
  "8": {
    diameterMm: 3.264,
    areaMm2: 8.37,
    currentCapacityAmps: 24,
    resistanceOhmPerKm: 2.03,
  },
  "10": {
    diameterMm: 2.588,
    areaMm2: 5.26,
    currentCapacityAmps: 15,
    resistanceOhmPerKm: 3.23,
  },
  "12": {
    diameterMm: 2.053,
    areaMm2: 3.31,
    currentCapacityAmps: 9.3,
    resistanceOhmPerKm: 5.13,
  },
  "14": {
    diameterMm: 1.628,
    areaMm2: 2.08,
    currentCapacityAmps: 5.9,
    resistanceOhmPerKm: 8.17,
  },
  "16": {
    diameterMm: 1.291,
    areaMm2: 1.31,
    currentCapacityAmps: 3.7,
    resistanceOhmPerKm: 13.0,
  },
  "18": {
    diameterMm: 1.024,
    areaMm2: 0.823,
    currentCapacityAmps: 2.3,
    resistanceOhmPerKm: 20.7,
  },
};

const WireGaugeCalculator: React.FC = () => {
  const [gauge, setGauge] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [result, setResult] = useState<WireGaugeResult | null>(null);
  const [error, setError] = useState<{
    message: string;
    type: "error" | "warning";
  } | null>(null);

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
            message: `Warning: Selected current (${currentNum}A) exceeds recommended maximum (${wireData.currentCapacityAmps}A)`,
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

  const CommonGauges: React.FC = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Common Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>14 AWG:</strong> Household circuits (15A)
          </div>
          <div>
            <strong>12 AWG:</strong> Household circuits (20A)
          </div>
          <div>
            <strong>10 AWG:</strong> Electric water heaters
          </div>
          <div>
            <strong>6 AWG:</strong> Sub-panels, electric ranges
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
                  <Zap className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl text-center text-indigo-900">
                    Wire Gauge Calculator
                  </CardTitle>
                </div>
                <CardDescription className="text-center">
                  Calculate wire specifications and current capacity for AWG
                  sizes
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gauge">Wire Gauge (AWG)</Label>
                    <Select value={gauge} onValueChange={setGauge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gauge..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {Object.keys(AWGTable)
                          .reverse()
                          .map((awg) => (
                            <SelectItem key={awg} value={awg}>
                              {awg} AWG
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current">Current (Optional)</Label>
                    <Input
                      id="current"
                      type="number"
                      value={current}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCurrent(e.target.value)
                      }
                      placeholder="Enter current in amperes"
                      className="text-lg h-12"
                    />
                  </div>
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

                {/* {error && (
                  <Alert
                    variant={
                      error.includes("Warning") ? "warning" : "destructive"
                    }
                  >
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )} */}

                {error && (
                  <div
                    className={`rounded-lg p-4 ${
                      error.type === "warning"
                        ? "bg-yellow-50 border-2 border-yellow-200"
                        : "bg-red-50 border-2 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          error.type === "warning"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          error.type === "warning"
                            ? "text-yellow-800"
                            : "text-red-800"
                        }`}
                      >
                        {error.message}
                      </p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold text-gray-600">
                          Diameter:
                        </div>
                        <div className="text-xl font-bold text-green-700">
                          {result.diameter.toFixed(3)} mm
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">Area:</div>
                        <div className="text-xl font-bold text-green-700">
                          {result.area.toFixed(2)} mm²
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">
                          Max Current:
                        </div>
                        <div className="text-xl font-bold text-green-700">
                          {result.currentCapacity} A
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">
                          Resistance:
                        </div>
                        <div className="text-xl font-bold text-green-700">
                          {result.resistance.toFixed(3)} Ω/km
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <CommonGauges />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-600" />
                  Quick Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="awg">
                    <AccordionTrigger>Understanding AWG</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            AWG (American Wire Gauge) is a standardized wire
                            gauge system
                          </li>
                          <li>Lower AWG numbers indicate thicker wires</li>
                          <li>
                            Each reduction of 3 AWG numbers doubles the
                            wire&apos;s cross-sectional area
                          </li>
                          <li>
                            Each reduction of 6 AWG numbers doubles the
                            wire&apos;s diameter
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="current">
                    <AccordionTrigger>Current Capacity</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Current ratings are for copper wire at room
                            temperature
                          </li>
                          <li>
                            Actual capacity depends on installation conditions
                          </li>
                          <li>
                            Consider derating factors for:
                            <ul className="list-disc list-inside pl-4">
                              <li>Ambient temperature</li>
                              <li>Bundling with other wires</li>
                              <li>Insulation type</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LightbulbIcon className="h-5 w-5 text-indigo-600" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">
                        Important Considerations
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm mt-2">
                        <li>Always follow local electrical codes</li>
                        <li>Consider voltage drop for long runs</li>
                        <li>Include safety margin in current calculations</li>
                        <li>Consult professional electrician when in doubt</li>
                      </ul>
                    </div>
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

export default WireGaugeCalculator;
