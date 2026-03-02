"use client";
import React, { useState, useMemo } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, RotateCcw, Info } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// ---------------------------------------------------------------------------
// Common LED presets
// ---------------------------------------------------------------------------

interface LEDPreset {
    name: string;
    color: string;
    vf: number; // typical forward voltage
    ifMa: number; // typical forward current in mA
    cssColor: string;
}

const LED_PRESETS: LEDPreset[] = [
    { name: "Red", color: "red", vf: 2.0, ifMa: 20, cssColor: "#ef4444" },
    { name: "Orange", color: "orange", vf: 2.1, ifMa: 20, cssColor: "#f97316" },
    { name: "Yellow", color: "yellow", vf: 2.1, ifMa: 20, cssColor: "#eab308" },
    { name: "Green", color: "green", vf: 3.2, ifMa: 20, cssColor: "#22c55e" },
    { name: "Blue", color: "blue", vf: 3.3, ifMa: 20, cssColor: "#3b82f6" },
    { name: "White", color: "white", vf: 3.3, ifMa: 20, cssColor: "#e2e8f0" },
    { name: "IR (940nm)", color: "ir", vf: 1.2, ifMa: 20, cssColor: "#7c3aed" },
    { name: "UV (395nm)", color: "uv", vf: 3.4, ifMa: 20, cssColor: "#a855f7" },
];

// Standard E24 resistor values
const E24_VALUES = [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
    3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
];

function nearestStandardResistor(value: number): number {
    if (value <= 0) return 0;
    const decade = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / decade;
    let closest = E24_VALUES[0];
    let minDiff = Math.abs(normalized - closest);
    for (const v of E24_VALUES) {
        const diff = Math.abs(normalized - v);
        if (diff < minDiff) {
            minDiff = diff;
            closest = v;
        }
    }
    // Also check next decade
    const nextClosest = E24_VALUES[0] * 10;
    if (Math.abs(normalized - nextClosest) < minDiff) {
        closest = nextClosest;
    }
    return closest * decade;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const LEDResistorCalculator: React.FC = () => {
    const [supplyVoltage, setSupplyVoltage] = useState<string>("5");
    const [forwardVoltage, setForwardVoltage] = useState<string>("2.0");
    const [forwardCurrent, setForwardCurrent] = useState<string>("20");
    const [ledCount, setLedCount] = useState<string>("1");
    const [selectedPreset, setSelectedPreset] = useState<string>("red");

    const applyPreset = (preset: LEDPreset) => {
        setForwardVoltage(preset.vf.toString());
        setForwardCurrent(preset.ifMa.toString());
        setSelectedPreset(preset.color);
    };

    const resetCalculator = () => {
        setSupplyVoltage("5");
        setForwardVoltage("2.0");
        setForwardCurrent("20");
        setLedCount("1");
        setSelectedPreset("red");
    };

    const result = useMemo(() => {
        const vs = parseFloat(supplyVoltage);
        const vf = parseFloat(forwardVoltage);
        const ifMa = parseFloat(forwardCurrent);
        const n = parseInt(ledCount);

        if (isNaN(vs) || isNaN(vf) || isNaN(ifMa) || isNaN(n)) return null;
        if (vs <= 0 || vf <= 0 || ifMa <= 0 || n <= 0) return null;

        const totalVf = vf * n;
        if (totalVf >= vs) {
            return { error: `Total LED forward voltage (${totalVf.toFixed(1)}V) exceeds supply voltage (${vs}V). Reduce LED count or increase supply voltage.` };
        }

        const ifA = ifMa / 1000;
        const exactR = (vs - totalVf) / ifA;
        const standardR = nearestStandardResistor(exactR);
        const actualCurrent = (vs - totalVf) / standardR;
        const actualCurrentMa = actualCurrent * 1000;
        const powerR = (vs - totalVf) * actualCurrent;
        const powerLed = vf * actualCurrent;
        const totalPower = vs * actualCurrent;

        // Recommended wattage (next standard up from 2x power)
        const wattageOptions = [0.125, 0.25, 0.5, 1, 2, 5];
        const minWattage = powerR * 2; // 2x safety factor
        const recommendedWattage = wattageOptions.find((w) => w >= minWattage) || wattageOptions[wattageOptions.length - 1];

        return {
            exactR: exactR.toFixed(2),
            standardR: standardR.toFixed(0),
            actualCurrentMa: actualCurrentMa.toFixed(2),
            powerR: (powerR * 1000).toFixed(2), // mW
            powerLed: (powerLed * 1000).toFixed(2), // mW per LED
            totalPower: (totalPower * 1000).toFixed(2), // mW
            recommendedWattage: recommendedWattage >= 1 ? `${recommendedWattage}W` : `${recommendedWattage * 1000}mW (1/${1 / recommendedWattage}W)`,
            voltageDrop: (vs - totalVf).toFixed(2),
            error: null,
        };
    }, [supplyVoltage, forwardVoltage, forwardCurrent, ledCount]);

    const hasError = result && result.error;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="LED Series Resistor Calculator"
                description="Calculate the correct current-limiting resistor value and wattage for single or multiple LEDs in series."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Calculator */}
                    <div className="space-y-6">
                        {/* LED Color Presets */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">LED Color Preset</CardTitle>
                                </div>
                                <CardDescription>Select an LED type to auto-fill typical values</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-2">
                                    {LED_PRESETS.map((preset) => (
                                        <button
                                            key={preset.color}
                                            onClick={() => applyPreset(preset)}
                                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${selectedPreset === preset.color
                                                    ? "border-ksp-blue bg-ksp-blue/5 dark:bg-ksp-blue/10 shadow-sm"
                                                    : "border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            <div
                                                className="w-5 h-5 rounded-full border border-gray-200 dark:border-white/20"
                                                style={{ backgroundColor: preset.cssColor }}
                                            />
                                            <span className="text-gray-700 dark:text-gray-300 font-semibold">{preset.name}</span>
                                            <span className="text-gray-400 text-[10px]">{preset.vf}V</span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Input values */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-xl font-bold">Input Values</CardTitle>
                                <CardDescription>Enter your circuit parameters</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                                    <Input
                                        id="supply-voltage"
                                        type="number"
                                        value={supplyVoltage}
                                        onChange={(e) => setSupplyVoltage(e.target.value)}
                                        placeholder="e.g. 5, 9, 12"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        min={0}
                                        step={0.1}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="forward-voltage">LED Forward Voltage — Vf (V)</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent>Typical forward voltage drop across the LED. Check your LED datasheet.</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="forward-voltage"
                                        type="number"
                                        value={forwardVoltage}
                                        onChange={(e) => setForwardVoltage(e.target.value)}
                                        placeholder="e.g. 2.0"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        min={0}
                                        step={0.1}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="forward-current">LED Forward Current — If (mA)</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent>Desired operating current. Standard 5mm LEDs are typically 20mA.</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="forward-current"
                                        type="number"
                                        value={forwardCurrent}
                                        onChange={(e) => setForwardCurrent(e.target.value)}
                                        placeholder="e.g. 20"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        min={0}
                                        step={1}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="led-count">Number of LEDs in Series</Label>
                                    <Input
                                        id="led-count"
                                        type="number"
                                        value={ledCount}
                                        onChange={(e) => setLedCount(e.target.value)}
                                        placeholder="1"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        min={1}
                                        step={1}
                                    />
                                </div>

                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                                </Button>

                                {hasError && (
                                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                                        <AlertDescription>{result.error}</AlertDescription>
                                    </Alert>
                                )}

                                {result && !hasError && (
                                    <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">
                                            Required Resistor
                                        </div>
                                        <div className="text-4xl font-bold text-ksp-blue">
                                            {result.standardR} Ω
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Exact: {result.exactR} Ω → Nearest E24: <span className="font-bold text-gray-900 dark:text-white">{result.standardR} Ω</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500 font-mono">
                                            R = (Vs − n×Vf) / If
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Circuit diagram + details */}
                    <div className="space-y-6">
                        {/* Circuit Diagram */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Circuit Diagram</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center py-4">
                                    <svg viewBox="0 0 240 340" className="w-52 h-auto" xmlns="http://www.w3.org/2000/svg">
                                        {/* Vs label */}
                                        <text x="50" y="18" className="fill-gray-900 dark:fill-white" fontSize="14" fontWeight="bold">Vs</text>
                                        {/* Top wire */}
                                        <line x1="65" y1="28" x2="65" y2="55" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* Resistor box */}
                                        <rect x="45" y="55" width="40" height="70" rx="4" className="fill-ksp-blue/10 stroke-ksp-blue" strokeWidth="2" />
                                        <text x="65" y="95" textAnchor="middle" className="fill-ksp-blue" fontSize="13" fontWeight="bold">R</text>
                                        {/* Wire between R and LED */}
                                        <line x1="65" y1="125" x2="65" y2="155" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* LED triangle + bar */}
                                        <polygon points="45,155 85,155 65,195" className="fill-ksp-green/20 stroke-ksp-green" strokeWidth="2" />
                                        <line x1="45" y1="195" x2="85" y2="195" stroke="currentColor" strokeWidth="2" className="text-ksp-green" />
                                        {/* LED arrows (light rays) */}
                                        <line x1="80" y1="165" x2="95" y2="155" stroke="currentColor" strokeWidth="1.5" className="text-ksp-green" />
                                        <line x1="83" y1="175" x2="98" y2="165" stroke="currentColor" strokeWidth="1.5" className="text-ksp-green" />
                                        {/* Arrowheads */}
                                        <polygon points="95,155 90,158 92,152" className="fill-ksp-green" />
                                        <polygon points="98,165 93,168 95,162" className="fill-ksp-green" />
                                        <text x="110" y="180" className="fill-ksp-green" fontSize="12" fontWeight="bold">LED</text>
                                        {/* Bottom wire */}
                                        <line x1="65" y1="195" x2="65" y2="260" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* Ground */}
                                        <line x1="45" y1="260" x2="85" y2="260" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="50" y1="268" x2="80" y2="268" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="55" y1="276" x2="75" y2="276" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="65" y="295" textAnchor="middle" className="fill-gray-500" fontSize="12">GND</text>
                                        {/* Current arrow */}
                                        <text x="25" y="140" className="fill-gray-400" fontSize="11" textAnchor="middle">I ↓</text>
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Circuit Details */}
                        {result && !hasError && (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Circuit Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Resistor Value (E24)</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.standardR} Ω</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Actual LED Current</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.actualCurrentMa} mA</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Voltage Drop Across R</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.voltageDrop} V</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Power in Resistor</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.powerR} mW</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Power per LED</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.powerLed} mW</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Total Circuit Power</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.totalPower} mW</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 font-semibold">Min. Resistor Rating</span>
                                        <span className="font-mono text-ksp-green font-bold">{result.recommendedWattage}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Guide */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Quick Guide</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Formula:
                                    </h3>
                                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-center">
                                        <span className="font-mono text-lg text-ksp-blue font-bold">
                                            R = (Vs − n × Vf) / If
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                                        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div className="text-ksp-blue font-bold">Vs</div>
                                            <div className="text-xs text-gray-500">Supply Voltage</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div className="text-ksp-blue font-bold">Vf</div>
                                            <div className="text-xs text-gray-500">LED Forward Voltage</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div className="text-ksp-blue font-bold">If</div>
                                            <div className="text-xs text-gray-500">Forward Current</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div className="text-ksp-blue font-bold">n</div>
                                            <div className="text-xs text-gray-500">LEDs in Series</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Typical Forward Voltages:
                                    </h3>
                                    <div className="grid grid-cols-2 gap-1.5 text-sm">
                                        {LED_PRESETS.slice(0, 6).map((p) => (
                                            <div key={p.color} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                                <div className="w-3 h-3 rounded-full border border-gray-200 dark:border-white/20" style={{ backgroundColor: p.cssColor }} />
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{p.name}</span>
                                                <span className="ml-auto text-ksp-blue font-bold font-mono text-xs">{p.vf}V</span>
                                            </div>
                                        ))}
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

export default LEDResistorCalculator;
