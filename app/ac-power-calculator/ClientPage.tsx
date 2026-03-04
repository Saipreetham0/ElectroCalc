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
import { Zap, RotateCcw } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

type PhaseType = "single" | "three_ll" | "three_ln";

const PHASE_OPTIONS: { value: PhaseType; label: string }[] = [
    { value: "single", label: "Single Phase" },
    { value: "three_ll", label: "3-Phase (Line-to-Line)" },
    { value: "three_ln", label: "3-Phase (Line-to-Neutral)" },
];

const ACPowerCalculator: React.FC = () => {
    const [phase, setPhase] = useState<PhaseType>("single");
    const [voltage, setVoltage] = useState<string>("");
    const [current, setCurrent] = useState<string>("");
    const [powerFactor, setPowerFactor] = useState<string>("0.8");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setVoltage("");
        setCurrent("");
        setPowerFactor("0.8");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const v = parseFloat(voltage);
        const i = parseFloat(current);
        const pf = parseFloat(powerFactor);

        if (!voltage || !current || !powerFactor) return null;
        if (isNaN(v) || isNaN(i) || isNaN(pf) || v < 0 || i < 0) {
            setError("Please enter valid positive numbers for voltage and current");
            return null;
        }
        if (pf < 0 || pf > 1) {
            setError("Power Factor must be between 0 and 1");
            return null;
        }

        try {
            let apparentS = 0; // VA

            if (phase === "single") {
                apparentS = v * i;
            } else if (phase === "three_ll") {
                apparentS = Math.sqrt(3) * v * i;
            } else if (phase === "three_ln") {
                apparentS = 3 * v * i;
            }

            const realP = apparentS * pf; // Watts
            const reactiveQ = apparentS * Math.sqrt(1 - pf * pf); // VAR

            return {
                s: apparentS,
                sKVA: (apparentS / 1000).toFixed(2),
                p: realP,
                pKW: (realP / 1000).toFixed(2),
                q: reactiveQ,
                qKVAR: (reactiveQ / 1000).toFixed(2),
            };
        } catch {
            setError("Calculation error.");
            return null;
        }
    }, [phase, voltage, current, powerFactor]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="AC Power Calculator"
                description="Calculate Active (Real), Apparent, and Reactive power for single-phase and three-phase AC systems."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">System Parameters</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Phase Type</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        {PHASE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setPhase(opt.value)}
                                                className={`text-center px-3 py-2 rounded-lg border text-sm font-medium transition-all ${phase === opt.value
                                                    ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                    : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="voltage">Voltage (V)</Label>
                                    <Input
                                        id="voltage"
                                        type="number"
                                        value={voltage}
                                        onChange={(e) => setVoltage(e.target.value)}
                                        placeholder={phase === "three_ll" ? "e.g. 415 (Line-to-Line)" : "e.g. 230"}
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="current">Current (A)</Label>
                                    <Input
                                        id="current"
                                        type="number"
                                        value={current}
                                        onChange={(e) => setCurrent(e.target.value)}
                                        placeholder="e.g. 10"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <Label htmlFor="pf" className="flex justify-between items-center">
                                        <span>Power Factor (cos φ)</span>
                                        <span className="text-ksp-blue font-bold">{powerFactor}</span>
                                    </Label>
                                    <input
                                        id="pf"
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={powerFactor}
                                        onChange={(e) => setPowerFactor(e.target.value)}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0 (Purely Reactive)</span>
                                        <span>1 (Purely Resistive)</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5 mt-2"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                                </Button>

                                {error && (
                                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Results + Info */}
                    <div className="space-y-6">
                        {result && !error ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader className="bg-slate-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                    <CardTitle className="text-lg font-bold">Power Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {/* Active Power */}
                                    <div className="p-5 rounded-xl border border-ksp-blue/30 bg-ksp-blue/5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                                                    Real Power (P)
                                                </div>
                                                <div className="text-xs text-gray-500">Actual power doing work</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-ksp-blue">
                                                    {result.pKW} <span className="text-lg">kW</span>
                                                </div>
                                                <div className="text-sm text-gray-500 font-mono mt-1">{result.p.toFixed(0)} W</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Apparent Power */}
                                    <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a]">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Apparent Power (S)
                                                </div>
                                                <div className="text-xs text-gray-500">Total power supplied</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {result.sKVA} <span className="text-sm text-gray-500">kVA</span>
                                                </div>
                                                <div className="text-xs text-gray-500 font-mono mt-0.5">{result.s.toFixed(0)} VA</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reactive Power */}
                                    <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a]">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Reactive Power (Q)
                                                </div>
                                                <div className="text-xs text-gray-500">Power wasted in fields</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-orange-500">
                                                    {result.qKVAR} <span className="text-sm text-gray-500">kVAR</span>
                                                </div>
                                                <div className="text-xs text-gray-500 font-mono mt-0.5">{result.q.toFixed(0)} VAR</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Quick Guide</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Power Triangle:
                                        </h3>
                                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                            <li>
                                                <span className="font-bold text-ksp-blue">Real Power (kW):</span> The actual power consumed by resistive loads to do useful work (heat, light, motion).
                                            </li>
                                            <li>
                                                <span className="font-bold text-gray-800 dark:text-gray-200">Apparent Power (kVA):</span> The total power supplied by the grid or generator. This is the product of RMS voltage and current.
                                            </li>
                                            <li>
                                                <span className="font-bold text-orange-500">Reactive Power (kVAR):</span> The "wasted" power that oscillates back and forth in inductive (motors) or capacitive loads without doing real work.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Formulas:
                                        </h3>
                                        <div className="space-y-2 font-mono text-xs text-gray-500 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div>S (Apparent) = V × I</div>
                                            <div>P (Real) = S × PF</div>
                                            <div>Q (Reactive) = √(S² - P²)</div>
                                            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                                                * For 3-Phase (L-L): Multiply by √3 (~1.732)
                                                <br />* For 3-Phase (L-N): Multiply by 3
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ACPowerCalculator;
