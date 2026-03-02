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
import { Zap, RotateCcw, ArrowDown } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

type SolveFor = "vout" | "r1" | "r2" | "vin";

const MODES: { value: SolveFor; label: string; description: string }[] = [
    { value: "vout", label: "Output Voltage (Vout)", description: "Given Vin, R1, R2" },
    { value: "r1", label: "R1 (Top Resistor)", description: "Given Vin, Vout, R2" },
    { value: "r2", label: "R2 (Bottom Resistor)", description: "Given Vin, Vout, R1" },
    { value: "vin", label: "Input Voltage (Vin)", description: "Given Vout, R1, R2" },
];

const VoltageDividerCalculator: React.FC = () => {
    const [solveFor, setSolveFor] = useState<SolveFor>("vout");
    const [vin, setVin] = useState<string>("");
    const [vout, setVout] = useState<string>("");
    const [r1, setR1] = useState<string>("");
    const [r2, setR2] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setVin("");
        setVout("");
        setR1("");
        setR2("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");
        const vinVal = parseFloat(vin);
        const voutVal = parseFloat(vout);
        const r1Val = parseFloat(r1);
        const r2Val = parseFloat(r2);

        try {
            switch (solveFor) {
                case "vout": {
                    if (!vin || !r1 || !r2) return null;
                    if (r1Val + r2Val === 0) { setError("R1 + R2 cannot be zero"); return null; }
                    const result = vinVal * (r2Val / (r1Val + r2Val));
                    return { value: result.toFixed(4), unit: "V", label: "Output Voltage (Vout)", formula: "Vout = Vin × R2 / (R1 + R2)" };
                }
                case "r1": {
                    if (!vin || !vout || !r2) return null;
                    if (voutVal === 0) { setError("Vout cannot be zero"); return null; }
                    const result = r2Val * ((vinVal / voutVal) - 1);
                    if (result < 0) { setError("Resulting R1 would be negative — check your values"); return null; }
                    return { value: result.toFixed(2), unit: "Ω", label: "R1 (Top Resistor)", formula: "R1 = R2 × (Vin/Vout − 1)" };
                }
                case "r2": {
                    if (!vin || !vout || !r1) return null;
                    if (vinVal === voutVal) { setError("Vin and Vout cannot be equal (R2 would be infinite)"); return null; }
                    const result = r1Val / ((vinVal / voutVal) - 1);
                    if (result < 0) { setError("Resulting R2 would be negative — check your values"); return null; }
                    return { value: result.toFixed(2), unit: "Ω", label: "R2 (Bottom Resistor)", formula: "R2 = R1 / (Vin/Vout − 1)" };
                }
                case "vin": {
                    if (!vout || !r1 || !r2) return null;
                    if (r2Val === 0) { setError("R2 cannot be zero"); return null; }
                    const result = voutVal * ((r1Val + r2Val) / r2Val);
                    return { value: result.toFixed(4), unit: "V", label: "Input Voltage (Vin)", formula: "Vin = Vout × (R1 + R2) / R2" };
                }
            }
        } catch {
            setError("Invalid input values. Please check your numbers.");
            return null;
        }
    }, [solveFor, vin, vout, r1, r2]);

    // Derived info
    const dividerInfo = useMemo(() => {
        const vinVal = parseFloat(solveFor === "vin" && result ? result.value : vin);
        const r1Val = parseFloat(solveFor === "r1" && result ? result.value : r1);
        const r2Val = parseFloat(solveFor === "r2" && result ? result.value : r2);
        const voutVal = parseFloat(solveFor === "vout" && result ? result.value : vout);

        if (isNaN(vinVal) || isNaN(r1Val) || isNaN(r2Val) || isNaN(voutVal)) return null;
        if (r1Val + r2Val === 0) return null;

        const current = vinVal / (r1Val + r2Val);
        const ratio = voutVal / vinVal;
        const powerR1 = current * current * r1Val;
        const powerR2 = current * current * r2Val;

        return {
            current: (current * 1000).toFixed(4), // mA
            ratio: (ratio * 100).toFixed(2),
            powerR1: (powerR1 * 1000).toFixed(4), // mW
            powerR2: (powerR2 * 1000).toFixed(4), // mW
            totalPower: ((powerR1 + powerR2) * 1000).toFixed(4), // mW
        };
    }, [solveFor, vin, vout, r1, r2, result]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            // calculations are live/automatic
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Voltage Divider Calculator"
                description="Calculate output voltage, resistor values, or input voltage for a resistor voltage divider circuit."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        {/* Mode selector */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Solve For</CardTitle>
                                </div>
                                <CardDescription>Choose what you want to calculate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    {MODES.map((mode) => (
                                        <button
                                            key={mode.value}
                                            onClick={() => { setSolveFor(mode.value); setError(""); }}
                                            className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${solveFor === mode.value
                                                    ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                    : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            <div className="font-bold">{mode.label}</div>
                                            <div className={`text-xs mt-0.5 ${solveFor === mode.value ? "text-white/70" : "text-gray-400"}`}>
                                                {mode.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Inputs */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-xl font-bold">Input Values</CardTitle>
                                <CardDescription>Enter the known values below</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {solveFor !== "vin" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="vin">Input Voltage — Vin (V)</Label>
                                        <Input
                                            id="vin"
                                            type="number"
                                            value={vin}
                                            onChange={(e) => setVin(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 12"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                {solveFor !== "vout" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="vout">Output Voltage — Vout (V)</Label>
                                        <Input
                                            id="vout"
                                            type="number"
                                            value={vout}
                                            onChange={(e) => setVout(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 3.3"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                {solveFor !== "r1" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="r1">R1 — Top Resistor (Ω)</Label>
                                        <Input
                                            id="r1"
                                            type="number"
                                            value={r1}
                                            onChange={(e) => setR1(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 10000"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                {solveFor !== "r2" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="r2">R2 — Bottom Resistor (Ω)</Label>
                                        <Input
                                            id="r2"
                                            type="number"
                                            value={r2}
                                            onChange={(e) => setR2(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 4700"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                                </Button>

                                {error && (
                                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {result && !error && (
                                    <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">
                                            {result.label}
                                        </div>
                                        <div className="text-4xl font-bold text-ksp-blue">
                                            {result.value} {result.unit}
                                        </div>
                                        <div className="mt-3 text-sm text-gray-500 font-mono">
                                            Formula: {result.formula}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Circuit diagram + info */}
                    <div className="space-y-6">
                        {/* Circuit Diagram */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Circuit Diagram</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center py-4">
                                    {/* SVG Voltage Divider Diagram */}
                                    <svg viewBox="0 0 240 320" className="w-56 h-auto" xmlns="http://www.w3.org/2000/svg">
                                        {/* Vin label */}
                                        <text x="50" y="20" className="fill-gray-900 dark:fill-white" fontSize="14" fontWeight="bold">Vin</text>
                                        {/* Top wire */}
                                        <line x1="70" y1="30" x2="70" y2="60" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* R1 resistor box */}
                                        <rect x="50" y="60" width="40" height="80" rx="4" className="fill-ksp-blue/10 stroke-ksp-blue" strokeWidth="2" />
                                        <text x="70" y="105" textAnchor="middle" className="fill-ksp-blue" fontSize="13" fontWeight="bold">R1</text>
                                        {/* Middle wire + Vout tap */}
                                        <line x1="70" y1="140" x2="70" y2="170" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="70" y1="155" x2="160" y2="155" stroke="currentColor" strokeWidth="2" className="text-ksp-green" />
                                        <circle cx="70" cy="155" r="4" className="fill-ksp-green" />
                                        <text x="170" y="160" className="fill-ksp-green" fontSize="14" fontWeight="bold">Vout</text>
                                        <ArrowDown x={155} y={162} className="text-ksp-green" />
                                        {/* R2 resistor box */}
                                        <rect x="50" y="170" width="40" height="80" rx="4" className="fill-ksp-green/10 stroke-ksp-green" strokeWidth="2" />
                                        <text x="70" y="215" textAnchor="middle" className="fill-ksp-green" fontSize="13" fontWeight="bold">R2</text>
                                        {/* Bottom wire */}
                                        <line x1="70" y1="250" x2="70" y2="280" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* Ground symbol */}
                                        <line x1="50" y1="280" x2="90" y2="280" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="55" y1="288" x2="85" y2="288" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="60" y1="296" x2="80" y2="296" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="70" y="314" textAnchor="middle" className="fill-gray-500" fontSize="12">GND</text>
                                        {/* Current arrow */}
                                        <text x="28" y="150" className="fill-gray-400" fontSize="11" textAnchor="middle">I ↓</text>
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Info */}
                        {dividerInfo && (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Circuit Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Divider Current</span>
                                        <span className="font-mono text-ksp-blue font-bold">{dividerInfo.current} mA</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Voltage Ratio (Vout/Vin)</span>
                                        <span className="font-mono text-ksp-blue font-bold">{dividerInfo.ratio}%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Power in R1</span>
                                        <span className="font-mono text-ksp-blue font-bold">{dividerInfo.powerR1} mW</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Power in R2</span>
                                        <span className="font-mono text-ksp-blue font-bold">{dividerInfo.powerR2} mW</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 font-semibold">Total Power</span>
                                        <span className="font-mono text-ksp-blue font-bold">{dividerInfo.totalPower} mW</span>
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
                                        Core Formula:
                                    </h3>
                                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-center">
                                        <span className="font-mono text-lg text-ksp-blue font-bold">
                                            Vout = Vin × R2 / (R1 + R2)
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Common Uses:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <li>Level shifting (e.g. 5V to 3.3V for microcontrollers)</li>
                                        <li>Sensor signal conditioning</li>
                                        <li>ADC reference voltage scaling</li>
                                        <li>Bias voltage generation</li>
                                        <li>Feedback networks in regulators</li>
                                    </ul>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Tips:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <li>Keep total resistance high to minimize current draw</li>
                                        <li>Use 1% tolerance resistors for precision applications</li>
                                        <li>Account for load impedance — it acts as a parallel resistance with R2</li>
                                        <li>Unloaded voltage dividers are not suitable for powering loads</li>
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

export default VoltageDividerCalculator;
