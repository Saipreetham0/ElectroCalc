"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

interface Color {
  name: string;
  hex: string;
  value?: number;
  multiplier?: number;
  tolerance?: number;
  tempCoeff?: number;
}

const colors: Color[] = [
  { name: "black", hex: "#000000", value: 0, multiplier: 1, tempCoeff: 250 },
  {
    name: "brown",
    hex: "#8B4513",
    value: 1,
    multiplier: 10,
    tolerance: 1,
    tempCoeff: 100,
  },
  {
    name: "red",
    hex: "#FF0000",
    value: 2,
    multiplier: 100,
    tolerance: 2,
    tempCoeff: 50,
  },
  { name: "orange", hex: "#FFA500", value: 3, multiplier: 1000, tempCoeff: 15 },
  {
    name: "yellow",
    hex: "#FFFF00",
    value: 4,
    multiplier: 10000,
    tempCoeff: 25,
  },
  {
    name: "green",
    hex: "#008000",
    value: 5,
    multiplier: 100000,
    tolerance: 0.5,
  },
  {
    name: "blue",
    hex: "#0000FF",
    value: 6,
    multiplier: 1000000,
    tolerance: 0.25,
  },
  {
    name: "violet",
    hex: "#EE82EE",
    value: 7,
    multiplier: 10000000,
    tolerance: 0.1,
  },
  { name: "gray", hex: "#808080", value: 8, tolerance: 0.05 },
  { name: "white", hex: "#FFFFFF", value: 9 },
  { name: "gold", hex: "#FFD700", multiplier: 0.1, tolerance: 5 },
  { name: "silver", hex: "#C0C0C0", multiplier: 0.01, tolerance: 10 },
];

interface ResistanceResult {
  value: string;
  unit: string;
  tolerance?: number | null;
  tempCoeff?: number | null;
  rawValue: number;
}

const formatResistance = (value: number): { value: string; unit: string } => {
  if (value >= 1e6) {
    return { value: (value / 1e6).toFixed(2), unit: "MΩ" };
  } else if (value >= 1e3) {
    return { value: (value / 1e3).toFixed(2), unit: "kΩ" };
  } else {
    return { value: value.toFixed(2), unit: "Ω" };
  }
};

interface BandSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  filterType?: "value" | "multiplier" | "tolerance" | "tempCoeff";
  disabled?: boolean;
}

const ResistorColorCode: React.FC = () => {
  const [bandsCount, setBandsCount] = useState<string>("4");
  const [band1, setBand1] = useState<string>("brown");
  const [band2, setBand2] = useState<string>("black");
  const [band3, setBand3] = useState<string>("red");
  const [multiplier, setMultiplier] = useState<string>("brown");
  const [tolerance, setTolerance] = useState<string>("gold");
  const [temperatureCoefficient, setTemperatureCoefficient] =
    useState<string>("brown");

  useEffect(() => {
    if (bandsCount === "3") {
      setBand3("black");
      setTolerance("gold");
      setTemperatureCoefficient("brown");
    }
  }, [bandsCount]);

  const calculateResistance = (): ResistanceResult => {
    let baseValue: number;
    const digit1 = colors.find((c) => c.name === band1)?.value ?? 0;
    const digit2 = colors.find((c) => c.name === band2)?.value ?? 0;
    const digit3 = colors.find((c) => c.name === band3)?.value ?? 0;
    const multiplierValue =
      colors.find((c) => c.name === multiplier)?.multiplier ?? 1;
    const toleranceValue =
      colors.find((c) => c.name === tolerance)?.tolerance ?? 5;
    const tempCoeffValue = colors.find(
      (c) => c.name === temperatureCoefficient
    )?.tempCoeff;

    switch (bandsCount) {
      case "3":
        baseValue = (digit1 * 10 + digit2) * multiplierValue;
        return {
          ...formatResistance(baseValue),
          tolerance: null,
          tempCoeff: null,
          rawValue: baseValue,
        };
      case "4":
        baseValue = (digit1 * 10 + digit2) * multiplierValue;
        return {
          ...formatResistance(baseValue),
          tolerance: toleranceValue,
          tempCoeff: null,
          rawValue: baseValue,
        };
      case "5":
      case "6":
        baseValue = (digit1 * 100 + digit2 * 10 + digit3) * multiplierValue;
        return {
          ...formatResistance(baseValue),
          tolerance: toleranceValue,
          tempCoeff: bandsCount === "6" ? tempCoeffValue : null,
          rawValue: baseValue,
        };
      default:
        return {
          ...formatResistance(0),
          tolerance: null,
          tempCoeff: null,
          rawValue: 0,
        };
    }
  };

  const BandSelect: React.FC<BandSelectProps> = ({
    label,
    value,
    onChange,
    filterType,
    disabled = false,
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{
                backgroundColor: colors.find((c) => c.name === value)?.hex,
              }}
            />
            <SelectValue placeholder="Select color">{value}</SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {colors
            .filter((c) => {
              if (filterType === "value") return typeof c.value === "number";
              if (filterType === "multiplier")
                return typeof c.multiplier === "number";
              if (filterType === "tolerance")
                return typeof c.tolerance === "number";
              if (filterType === "tempCoeff")
                return typeof c.tempCoeff === "number";
              return true;
            })
            .map((c) => (
              <SelectItem key={c.name} value={c.name}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="capitalize">{c.name}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );

  const ResistorVisualization: React.FC = () => {
    const getBandStyles = () => {
      const commonStyle = "h-full transition-all duration-300";

      const bands = [
        <div
          key="band1"
          className={`${commonStyle} w-6`}
          style={{ backgroundColor: colors.find((c) => c.name === band1)?.hex }}
        ></div>,
        <div
          key="band2"
          className={`${commonStyle} w-6`}
          style={{ backgroundColor: colors.find((c) => c.name === band2)?.hex }}
        ></div>,
      ];

      if (["5", "6"].includes(bandsCount)) {
        bands.push(
          <div
            key="band3"
            className={`${commonStyle} w-6`}
            style={{
              backgroundColor: colors.find((c) => c.name === band3)?.hex,
            }}
          ></div>
        );
      }

      bands.push(
        <div
          key="multiplier"
          className={`${commonStyle} w-6`}
          style={{
            backgroundColor: colors.find((c) => c.name === multiplier)?.hex,
          }}
        ></div>
      );

      if (["4", "5", "6"].includes(bandsCount)) {
        bands.push(
          <div key="spacer" className="flex-grow"></div>,
          <div
            key="tolerance"
            className={`${commonStyle} w-6`}
            style={{
              backgroundColor: colors.find((c) => c.name === tolerance)?.hex,
            }}
          ></div>
        );
      }

      if (bandsCount === "6") {
        bands.push(
          <div
            key="tempCoeff"
            className={`${commonStyle} w-6`}
            style={{
              backgroundColor: colors.find(
                (c) => c.name === temperatureCoefficient
              )?.hex,
            }}
          ></div>
        );
      }

      return bands;
    };

    return (
      <div className="relative w-full mb-8">
        <div className="mx-auto max-w-2xl aspect-[6/1] bg-gradient-to-b from-[#E4D5C3] to-[#D4C5B3] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg">
          <div className="absolute left-0 w-1/6 h-3 bg-zinc-300 rounded-full"></div>
          <div className="absolute right-0 w-1/6 h-3 bg-zinc-300 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center gap-6 px-12">
            {getBandStyles()}
          </div>
        </div>
      </div>
    );
  };

  const result = calculateResistance();

  return (
    // <div className="max-w-4xl mx-auto p-4 space-y-6">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Resistor Color Code Calculator
          </CardTitle>
          <CardDescription>
            Calculate resistance values using the standard {bandsCount}-band
            color code system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8"> */}

<Card className="w-full backdrop-blur-sm bg-white/90 border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-center space-x-2">
                <Info className="h-6 w-6 text-indigo-600" />
                <CardTitle className="text-2xl md:text-3xl text-center text-indigo-900">
                  Resistor Color Code Calculator
                </CardTitle>
              </div>
              <CardDescription className="text-center text-gray-600">
                Calculate resistance values using the standard color code system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
          {/* <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Label className="min-w-32 font-medium">Number of Bands:</Label>
            <Select value={bandsCount} onValueChange={setBandsCount}>
              <SelectTrigger className="w-32">
                <SelectValue>{bandsCount} Bands</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Bands
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          {/* Number of Bands Selection */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Label className="min-w-32 font-medium">Number of Bands:</Label>
            <Select value={bandsCount} onValueChange={setBandsCount}>
              <SelectTrigger className="w-32">
                <SelectValue>{bandsCount} Bands</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Bands
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ResistorVisualization />

          {/* <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-gray-800">
                  {result.value} {result.unit}
                </div>
                {result.tolerance && (
                  <div className="text-lg text-gray-600">
                    ±{result.tolerance}% tolerance
                  </div>
                )}
                {result.tempCoeff && (
                  <div className="text-sm text-gray-500">
                    Temperature Coefficient: {result.tempCoeff} ppm/K
                  </div>
                )}
              </div>
            </CardContent>
          </Card> */}

          {/* Result Display */}

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-inner">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-green-700">
                  {result.value} {result.unit}
                </div>
                {result.tolerance && (
                  <div className="text-lg text-gray-600">
                    ±{result.tolerance}% tolerance
                  </div>
                )}
                {result.tempCoeff && (
                  <div className="text-sm text-gray-500">
                    Temperature Coefficient: {result.tempCoeff} ppm/K
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Color Band Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
            <BandSelect
              label="First Band"
              value={band1}
              onChange={setBand1}
              filterType="value"
            />
            <BandSelect
              label="Second Band"
              value={band2}
              onChange={setBand2}
              filterType="value"
            />
            {["5", "6"].includes(bandsCount) && (
              <BandSelect
                label="Third Band"
                value={band3}
                onChange={setBand3}
                filterType="value"
              />
            )}
            <BandSelect
              label="Multiplier"
              value={multiplier}
              onChange={setMultiplier}
              filterType="multiplier"
            />
            {["4", "5", "6"].includes(bandsCount) && (
              <BandSelect
                label="Tolerance"
                value={tolerance}
                onChange={setTolerance}
                filterType="tolerance"
              />
            )}
            {bandsCount === "6" && (
              <BandSelect
                label="Temperature Coefficient"
                value={temperatureCoefficient}
                onChange={setTemperatureCoefficient}
                filterType="tempCoeff"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Information Section */}
      <div className="hidden md:block space-y-6">
        <Card className="backdrop-blur-sm bg-white/90 border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-900">
              Quick Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">
                How to Read Color Bands:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>First Band: First significant figure</li>
                <li>Second Band: Second significant figure</li>
                <li>Third Band (5-6 bands): Third significant figure</li>
                <li>Multiplier Band: Number of zeros to add</li>
                <li>Tolerance Band: Resistance tolerance</li>
                <li>Temperature Coefficient (6 bands): PPM/K value</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Common Examples:</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-medium">Red-Violet-Orange</p>
                  <p>27 × 1000 = 27kΩ</p>
                </div>
                <div>
                  <p className="font-medium">Brown-Black-Green</p>
                  <p>10 × 100000 = 1MΩ</p>
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
              <li>Always read bands from left to right</li>
              <li>The tolerance band is typically gold or silver</li>
              <li>Hold the resistor with the tolerance band on the right</li>
              <li>Clean the resistor surface for better color visibility</li>
              <li>Use good lighting to distinguish similar colors</li>
              <li>When in doubt, use a multimeter to verify</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ResistorColorCode;
