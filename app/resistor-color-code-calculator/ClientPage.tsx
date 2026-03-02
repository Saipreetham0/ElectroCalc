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
import { Info } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

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
        <SelectTrigger className="w-full dark:bg-[#0a0f1a] dark:border-white/10">
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
        <SelectContent className="bg-white dark:bg-[#111827] dark:border-white/10">
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
              <SelectItem key={c.name} value={c.name} className="dark:hover:bg-white/5">
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
        <div className="mx-auto max-w-2xl aspect-[6/1] bg-gradient-to-b from-[#E4D5C3] to-[#D4C5B3] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-lg border-2 border-amber-900/10">
          <div className="absolute left-0 w-1/6 h-3 bg-zinc-400/50 rounded-full"></div>
          <div className="absolute right-0 w-1/6 h-3 bg-zinc-400/50 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center gap-6 px-12">
            {getBandStyles()}
          </div>
        </div>
      </div>
    );
  };

  const result = calculateResistance();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="Resistor Color Code Calculator"
        description="Decoding the resistance value and tolerance of axial lead resistors with 3, 4, 5, or 6 color bands."
      />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-ksp-blue" />
                <CardTitle className="text-xl font-bold">Resistor Tool</CardTitle>
              </div>
              <CardDescription>
                Select the number of bands and their colors to see the value
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Label className="min-w-32 font-medium">Bands Configuration:</Label>
                <Select value={bandsCount} onValueChange={setBandsCount}>
                  <SelectTrigger className="w-40 dark:bg-[#0a0f1a] dark:border-white/10">
                    <SelectValue>{bandsCount} Bands</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#111827] dark:border-white/10">
                    {[3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Bands System
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ResistorVisualization />

              <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">Resistance Value</div>
                <div className="text-5xl font-bold text-ksp-blue">
                  {result.value} {result.unit}
                </div>
                {(result.tolerance !== null || result.tempCoeff !== null) && (
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {result.tolerance !== null && (
                      <span className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                        ±{result.tolerance}% Tolerance
                      </span>
                    )}
                    {result.tempCoeff !== null && (
                      <span className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                        {result.tempCoeff} ppm/K
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BandSelect label="1st Band" value={band1} onChange={setBand1} filterType="value" />
                <BandSelect label="2nd Band" value={band2} onChange={setBand2} filterType="value" />
                {["5", "6"].includes(bandsCount) && (
                  <BandSelect label="3rd Band" value={band3} onChange={setBand3} filterType="value" />
                )}
                <BandSelect label="Multiplier" value={multiplier} onChange={setMultiplier} filterType="multiplier" />
                {["4", "5", "6"].includes(bandsCount) && (
                  <BandSelect label="Tolerance" value={tolerance} onChange={setTolerance} filterType="tolerance" />
                )}
                {bandsCount === "6" && (
                  <BandSelect label="Temp. Coeff." value={temperatureCoefficient} onChange={setTemperatureCoefficient} filterType="tempCoeff" />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">How to Read</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Band Roles:</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex gap-3 items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-ksp-blue text-white font-bold text-xs">1</div>
                      <span>Significant digit 1</span>
                    </div>
                    <div className="flex gap-3 items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-ksp-blue text-white font-bold text-xs">2</div>
                      <span>Significant digit 2</span>
                    </div>
                    {["5", "6"].includes(bandsCount) && (
                      <div className="flex gap-3 items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                        <div className="w-6 h-6 rounded flex items-center justify-center bg-ksp-blue text-white font-bold text-xs">3</div>
                        <span>Significant digit 3</span>
                      </div>
                    )}
                    <div className="flex gap-3 items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-ksp-green text-white font-bold text-xs">M</div>
                      <span>Multiplier (10<sup>x</sup>)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-500/80 leading-relaxed">
                    Hold the resistor with the <strong>larger gap</strong> or <strong>gold/silver band</strong> on the <strong>right side</strong>. This band represents the tolerance and is always the last band.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Standard Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border dark:border-white/5 rounded-lg">
                    <div className="font-bold text-gray-900 dark:text-white mb-1">10kΩ Resistor</div>
                    <div className="text-xs text-gray-500">Brown, Black, Orange</div>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg">
                    <div className="font-bold text-gray-900 dark:text-white mb-1">1kΩ Resistor</div>
                    <div className="text-xs text-gray-500">Brown, Black, Red</div>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg">
                    <div className="font-bold text-gray-900 dark:text-white mb-1">220Ω Resistor</div>
                    <div className="text-xs text-gray-500">Red, Red, Brown</div>
                  </div>
                  <div className="p-3 border dark:border-white/5 rounded-lg">
                    <div className="font-bold text-gray-900 dark:text-white mb-1">4.7kΩ Resistor</div>
                    <div className="text-xs text-gray-500">Yellow, Violet, Red</div>
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

export default ResistorColorCode;

