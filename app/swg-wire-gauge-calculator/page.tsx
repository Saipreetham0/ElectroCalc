"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calculator,
  RotateCcw,
  HelpCircle,
  Table,
  Ruler,
  Info
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

interface WireGaugeResult {
  diameter: number;
  area: number;
  maxCurrent: number;
}

const WireGaugeCalculator = () => {
  const [gauge, setGauge] = useState<string>("");
  const [result, setResult] = useState<WireGaugeResult | null>(null);
  const [error, setError] = useState<string>("");

  // SWG to mm conversion data (common Indian wire gauges)
  const gaugeToMm: { [key: number]: number } = {
    0: 8.23,
    1: 7.62,
    2: 7.01,
    3: 6.40,
    4: 5.89,
    5: 5.38,
    6: 4.88,
    7: 4.47,
    8: 4.06,
    9: 3.66,
    10: 3.25,
    11: 2.95,
    12: 2.64,
    13: 2.34,
    14: 2.03,
    15: 1.83,
    16: 1.63,
    17: 1.42,
    18: 1.22,
    19: 1.02,
    20: 0.91,
    21: 0.81,
    22: 0.71,
    23: 0.61,
    24: 0.56,
    25: 0.51,
    26: 0.46,
    27: 0.41,
    28: 0.35,
    29: 0.30,
    30: 0.25
  };

  const calculateArea = (diameter: number): number => {
    return Math.PI * Math.pow(diameter / 2, 2);
  };

  // Approximate current carrying capacity (for copper wire at room temperature)
  const calculateMaxCurrent = (area: number): number => {
    // Using approximately 4 A/mm² as a conservative estimate
    return area * 4;
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
    const area = calculateArea(diameter);
    const maxCurrent = calculateMaxCurrent(area);

    setResult({
      diameter,
      area,
      maxCurrent
    });
  };

  const handleReset = () => {
    setGauge("");
    setResult(null);
    setError("");
  };

  const CommonGauges = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Table className="h-5 w-5 text-indigo-600" />
          Common Wire Gauges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>SWG 8</strong>: Heavy-duty power cables</div>
          <div><strong>SWG 12</strong>: Main power lines</div>
          <div><strong>SWG 16</strong>: Domestic wiring</div>
          <div><strong>SWG 20</strong>: Electronic applications</div>
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
                  <Ruler className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl text-center text-indigo-900">
                    Indian Wire Gauge Calculator
                  </CardTitle>
                </div>
                <CardDescription className="text-center">
                  Convert SWG (Standard Wire Gauge) to diameter and calculate wire properties
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gauge">Wire Gauge (SWG)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter a wire gauge number (0-30)</p>
                          <p>Lower numbers = thicker wire</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="gauge"
                    type="number"
                    value={gauge}
                    onChange={(e) => setGauge(e.target.value)}
                    placeholder="Enter gauge number (e.g., 16)"
                    className="text-lg h-12"
                    min="0"
                    max="30"
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
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-gray-600">Diameter:</div>
                        <div className="text-2xl font-bold text-green-700">
                          {result.diameter.toFixed(2)} mm
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">Cross-sectional Area:</div>
                        <div className="text-xl font-bold text-green-700">
                          {result.area.toFixed(2)} mm²
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600">Max Current (approx):</div>
                        <div className="text-xl font-bold text-green-700">
                          {result.maxCurrent.toFixed(1)} A
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
                  Wire Gauge Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="about">
                    <AccordionTrigger>About Wire Gauges</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <p>The Standard Wire Gauge (SWG) is a set of standard sizes for wire diameter. In India, SWG is commonly used for electrical wiring. The gauge number is inverse to the wire diameter - as the gauge number increases, the wire diameter decreases.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="applications">
                    <AccordionTrigger>Common Applications</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <ul className="list-disc list-inside space-y-2">
                          <li>SWG 6-8: Industrial power distribution</li>
                          <li>SWG 10-14: Main power supply lines</li>
                          <li>SWG 16-18: Household wiring</li>
                          <li>SWG 20-26: Electronic equipment</li>
                          <li>SWG 28-30: Precision electronics</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="safety">
                    <AccordionTrigger>Safety Considerations</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg text-sm">
                        <ul className="list-disc list-inside space-y-2">
                          <li>Always follow local electrical codes</li>
                          <li>Consider voltage drop over distance</li>
                          <li>Account for ambient temperature</li>
                          <li>Include safety margin in current ratings</li>
                          <li>Consult professional electrician for installations</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireGaugeCalculator;