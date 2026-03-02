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
import { Zap, RotateCcw, Info, ArrowUp, ArrowDown } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------

interface LogicPreset {
    name: string;
    vcc: number;
    vih: number; // min V for HIGH
    vil: number; // max V for LOW
    iil: number; // input leakage current µA
}

const LOGIC_PRESETS: LogicPreset[] = [
    { name: "3.3V CMOS", vcc: 3.3, vih: 2.0, vil: 0.8, iil: 1 },
    { name: "5V CMOS", vcc: 5.0, vih: 3.5, vil: 1.5, iil: 1 },
    { name: "5V TTL", vcc: 5.0, vih: 2.0, vil: 0.8, iil: 40 },
    { name: "I²C (3.3V)", vcc: 3.3, vih: 2.0, vil: 0.8, iil: 3 },
    { name: "I²C (5V)", vcc: 5.0, vih: 3.5, vil: 1.5, iil: 3 },
    { name: "1.8V CMOS", vcc: 1.8, vih: 1.17, vil: 0.63, iil: 1 },
];

type Mode = "pullup" | "pulldown";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const PullUpDownCalculator: React.FC = () => {
    const [mode, setMode] = useState<Mode>("pullup");
    const [vcc, setVcc] = useState<string>("3.3");
    const [vih, setVih] = useState<string>("2.0");
    const [vil, setVil] = useState<string>("0.8");
    const [iil, setIil] = useState<string>("1"); // µA
    const [resistor, setResistor] = useState<string>("10000");
    const [selectedPreset, setSelectedPreset] = useState<string>("3.3V CMOS");

    const applyPreset = (preset: LogicPreset) => {
        setVcc(preset.vcc.toString());
        setVih(preset.vih.toString());
        setVil(preset.vil.toString());
        setIil(preset.iil.toString());
        setSelectedPreset(preset.name);
    };

    const resetCalculator = () => {
        setVcc("3.3");
        setVih("2.0");
        setVil("0.8");
        setIil("1");
        setResistor("10000");
        setSelectedPreset("3.3V CMOS");
        setMode("pullup");
    };

    const result = useMemo(() => {
        const vccVal = parseFloat(vcc);
        const vihVal = parseFloat(vih);
        const vilVal = parseFloat(vil);
        const iilUa = parseFloat(iil);
        const rVal = parseFloat(resistor);

        if (isNaN(vccVal) || isNaN(vihVal) || isNaN(vilVal) || isNaN(iilUa) || isNaN(rVal)) return null;
        if (vccVal <= 0 || rVal <= 0) return null;

        const iilA = iilUa / 1_000_000; // convert µA to A

        // Current through the resistor when line is driven LOW (for pull-up) or HIGH (for pull-down)
        const currentWhenActive = vccVal / rVal; // A
        const currentWhenActiveMa = currentWhenActive * 1000;

        // Power dissipated in resistor when active
        const powerActive = (vccVal * vccVal) / rVal;
        const powerActiveMw = powerActive * 1000;

        // For pull-up: voltage at pin when floating (with leakage)
        // Vpin = Vcc - (Iil * R) — leakage pulls pin slightly from Vcc
        // For pull-down: Vpin = Iil * R — leakage lifts pin slightly from GND
        const vPinHigh = mode === "pullup" ? vccVal - (iilA * rVal) : iilA * rVal;
        const vPinLow = mode === "pullup" ? iilA * rVal : vccVal - (iilA * rVal);

        // Is the resistor in valid range?
        // Max R: must ensure pin stays in valid logic level despite leakage
        // For pull-up: Vpin_high > Vih => Vcc - Iil*Rmax > Vih => Rmax < (Vcc - Vih) / Iil
        // For pull-down: Vpin_low < Vil => Iil*Rmax < Vil => Rmax < Vil / Iil
        let rMax: number;
        if (mode === "pullup") {
            rMax = iilA > 0 ? (vccVal - vihVal) / iilA : Infinity;
        } else {
            rMax = iilA > 0 ? vilVal / iilA : Infinity;
        }

        // Min R: limited by max current drive when pin is actively driven to opposite rail
        // Typically we don't want more than ~10-25mA for general logic
        const rMin = vccVal / 0.020; // 20mA max current

        const isInRange = rVal >= rMin && rVal <= rMax;

        // Recommended range
        const suggestedMin = Math.ceil(rMin / 100) * 100;
        const suggestedMax = Math.floor(rMax / 1000) * 1000;

        return {
            currentWhenActiveMa: currentWhenActiveMa.toFixed(3),
            powerActiveMw: powerActiveMw.toFixed(3),
            vPinHigh: vPinHigh.toFixed(4),
            vPinLow: vPinLow.toFixed(4),
            rMin: rMin.toFixed(0),
            rMax: isFinite(rMax) ? rMax.toFixed(0) : "∞",
            suggestedMin: suggestedMin > 0 ? suggestedMin.toLocaleString() : "—",
            suggestedMax: isFinite(suggestedMax) && suggestedMax > 0 ? suggestedMax.toLocaleString() : "∞",
            isInRange,
        };
    }, [mode, vcc, vih, vil, iil, resistor]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Pull-up / Pull-down Resistor Calculator"
                description="Calculate the optimal resistor value, valid range, current draw, and power dissipation for pull-up or pull-down configurations."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Calculator */}
                    <div className="space-y-6">
                        {/* Mode selector */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Configuration</CardTitle>
                                </div>
                                <CardDescription>Choose pull-up or pull-down mode</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setMode("pullup")}
                                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border text-sm font-bold transition-all ${mode === "pullup"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                            }`}
                                    >
                                        <ArrowUp className="h-4 w-4" /> Pull-Up
                                    </button>
                                    <button
                                        onClick={() => setMode("pulldown")}
                                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border text-sm font-bold transition-all ${mode === "pulldown"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                            }`}
                                    >
                                        <ArrowDown className="h-4 w-4" /> Pull-Down
                                    </button>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Logic Family Presets</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {LOGIC_PRESETS.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => applyPreset(preset)}
                                                className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${selectedPreset === preset.name
                                                        ? "border-ksp-blue bg-ksp-blue/5 dark:bg-ksp-blue/10 text-ksp-blue"
                                                        : "border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                                                    }`}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Inputs */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-xl font-bold">Input Values</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vcc">Supply Voltage — Vcc (V)</Label>
                                    <Input id="vcc" type="number" value={vcc} onChange={(e) => setVcc(e.target.value)} placeholder="3.3" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" min={0} step={0.1} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="vih">V<sub>IH</sub> min (V)</Label>
                                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Minimum voltage recognized as logic HIGH</TooltipContent></Tooltip></TooltipProvider>
                                        </div>
                                        <Input id="vih" type="number" value={vih} onChange={(e) => setVih(e.target.value)} placeholder="2.0" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" min={0} step={0.1} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1">
                                            <Label htmlFor="vil">V<sub>IL</sub> max (V)</Label>
                                            <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Maximum voltage recognized as logic LOW</TooltipContent></Tooltip></TooltipProvider>
                                        </div>
                                        <Input id="vil" type="number" value={vil} onChange={(e) => setVil(e.target.value)} placeholder="0.8" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" min={0} step={0.1} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="iil">Input Leakage Current (µA)</Label>
                                        <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Max input leakage current of the digital input pin (from datasheet)</TooltipContent></Tooltip></TooltipProvider>
                                    </div>
                                    <Input id="iil" type="number" value={iil} onChange={(e) => setIil(e.target.value)} placeholder="1" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" min={0} step={0.1} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resistor" className="text-base font-bold">Resistor Value (Ω)</Label>
                                    <Input id="resistor" type="number" value={resistor} onChange={(e) => setResistor(e.target.value)} placeholder="10000" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10 font-bold" min={0} step={100} />
                                </div>

                                <Button onClick={resetCalculator} variant="outline" className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5">
                                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Diagram + results */}
                    <div className="space-y-6">
                        {/* Circuit Diagram */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    {mode === "pullup" ? "Pull-Up" : "Pull-Down"} Circuit
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center py-4">
                                    {mode === "pullup" ? (
                                        <svg viewBox="0 0 240 280" className="w-52 h-auto" xmlns="http://www.w3.org/2000/svg">
                                            <text x="60" y="18" className="fill-gray-900 dark:fill-white" fontSize="14" fontWeight="bold">Vcc</text>
                                            <line x1="70" y1="26" x2="70" y2="50" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <rect x="50" y="50" width="40" height="70" rx="4" className="fill-ksp-blue/10 stroke-ksp-blue" strokeWidth="2" />
                                            <text x="70" y="90" textAnchor="middle" className="fill-ksp-blue" fontSize="13" fontWeight="bold">R</text>
                                            <line x1="70" y1="120" x2="70" y2="150" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <circle cx="70" cy="150" r="4" className="fill-ksp-green" />
                                            <line x1="70" y1="150" x2="170" y2="150" stroke="currentColor" strokeWidth="2" className="text-ksp-green" />
                                            <text x="180" y="155" className="fill-ksp-green" fontSize="14" fontWeight="bold">Pin</text>
                                            <line x1="70" y1="150" x2="70" y2="200" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" strokeDasharray="6 3" />
                                            <text x="70" y="220" textAnchor="middle" className="fill-gray-400" fontSize="11">to switch/</text>
                                            <text x="70" y="234" textAnchor="middle" className="fill-gray-400" fontSize="11">open drain</text>
                                            <line x1="53" y1="250" x2="87" y2="250" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <line x1="58" y1="256" x2="82" y2="256" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <line x1="63" y1="262" x2="77" y2="262" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 240 280" className="w-52 h-auto" xmlns="http://www.w3.org/2000/svg">
                                            <text x="70" y="30" textAnchor="middle" className="fill-gray-400" fontSize="11">to switch/</text>
                                            <text x="70" y="44" textAnchor="middle" className="fill-gray-400" fontSize="11">open drain</text>
                                            <line x1="70" y1="50" x2="70" y2="80" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" strokeDasharray="6 3" />
                                            <circle cx="70" cy="80" r="4" className="fill-ksp-green" />
                                            <line x1="70" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" className="text-ksp-green" />
                                            <text x="180" y="85" className="fill-ksp-green" fontSize="14" fontWeight="bold">Pin</text>
                                            <line x1="70" y1="80" x2="70" y2="110" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <rect x="50" y="110" width="40" height="70" rx="4" className="fill-ksp-blue/10 stroke-ksp-blue" strokeWidth="2" />
                                            <text x="70" y="150" textAnchor="middle" className="fill-ksp-blue" fontSize="13" fontWeight="bold">R</text>
                                            <line x1="70" y1="180" x2="70" y2="210" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <line x1="50" y1="210" x2="90" y2="210" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <line x1="55" y1="218" x2="85" y2="218" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <line x1="60" y1="226" x2="80" y2="226" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                            <text x="70" y="245" textAnchor="middle" className="fill-gray-500" fontSize="12">GND</text>
                                        </svg>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        {result && (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className={`p-4 rounded-xl border text-center ${result.isInRange ? "bg-ksp-green/5 border-ksp-green/20" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30"}`}>
                                        <div className={`text-sm font-bold uppercase tracking-wider ${result.isInRange ? "text-ksp-green" : "text-red-500"}`}>
                                            {result.isInRange ? "✓ Value is in valid range" : "⚠ Value is out of range"}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Valid range: {result.rMin} Ω — {result.rMax} Ω
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Suggested Range</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.suggestedMin} – {result.suggestedMax} Ω</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Current (when driven)</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.currentWhenActiveMa} mA</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Power Dissipation</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.powerActiveMw} mW</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Pin Voltage (floating HIGH)</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.vPinHigh} V</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Pin Voltage (driven LOW)</span>
                                        <span className="font-mono text-ksp-blue font-bold">{result.vPinLow} V</span>
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
                                        Typical Values:
                                    </h3>
                                    <div className="grid grid-cols-1 gap-1.5 text-sm">
                                        {[
                                            { label: "General GPIO", value: "4.7 kΩ – 10 kΩ" },
                                            { label: "I²C Bus (100 kHz)", value: "4.7 kΩ" },
                                            { label: "I²C Bus (400 kHz)", value: "2.2 kΩ" },
                                            { label: "SPI Chip Select", value: "10 kΩ" },
                                            { label: "Reset Lines", value: "10 kΩ" },
                                            { label: "Buttons / Switches", value: "10 kΩ" },
                                        ].map((item) => (
                                            <div key={item.label} className="flex justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                                                <span className="text-ksp-blue font-bold font-mono text-xs">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Tips:</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <li>Lower R → faster rise/fall time but higher current draw</li>
                                        <li>Higher R → lower power but slower signal edges and more noise susceptibility</li>
                                        <li>For I²C, calculate based on bus capacitance and speed</li>
                                        <li>Always check your MCU datasheet for V<sub>IH</sub>, V<sub>IL</sub>, and I<sub>IL</sub></li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PullUpDownCalculator;
