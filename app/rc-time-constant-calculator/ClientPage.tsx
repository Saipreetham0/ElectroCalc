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

const RCTimeConstantCalculator: React.FC = () => {
    const [voltage, setVoltage] = useState<string>("");
    const [resistance, setResistance] = useState<string>("");
    const [capacitance, setCapacitance] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setVoltage("");
        setResistance("");
        setCapacitance("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const v = parseFloat(voltage);
        const r = parseFloat(resistance);
        const c = parseFloat(capacitance);

        if (!voltage || !resistance || !capacitance) return null;
        if (isNaN(v) || isNaN(r) || isNaN(c)) {
            setError("Please enter valid numbers");
            return null;
        }
        if (r <= 0 || c <= 0) {
            setError("Resistance and Capacitance must be greater than zero");
            return null;
        }

        try {
            // Convert C from microfarads to Farads for calculation assuming user enters uF
            // Wait, standardizing on Base Units is better, but C is usually very small. Let's assume input is in uF, or we can use multipliers.
            // For simplicity, let's keep inputs in Ohms and microFarads (μF).
            // Actually, best to explicitly state the assumed unit on the label.
            const cFarads = c / 1000000; // Assuming input in μF
            const tau = r * cFarads;     // seconds

            const timeIntervals = [1, 2, 3, 4, 5];
            const chargeData = timeIntervals.map(t => ({
                tau: t,
                time: (tau * t).toFixed(4),
                chargePct: (1 - Math.exp(-t)) * 100,
                chargeVolts: v * (1 - Math.exp(-t)),
                dischargePct: Math.exp(-t) * 100,
                dischargeVolts: v * Math.exp(-t)
            }));

            // Format tau for display
            let displayTau = "";
            let tauUnit = "";
            if (tau < 0.001) {
                displayTau = (tau * 1000000).toFixed(2);
                tauUnit = "µs";
            } else if (tau < 1) {
                displayTau = (tau * 1000).toFixed(2);
                tauUnit = "ms";
            } else {
                displayTau = tau.toFixed(4);
                tauUnit = "s";
            }

            return {
                tau: displayTau,
                unit: tauUnit,
                tauSeconds: tau,
                intervals: chargeData
            };
        } catch {
            setError("Invalid input values.");
            return null;
        }
    }, [voltage, resistance, capacitance]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            // calculations are live
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="RC Time Constant Calculator"
                description="Calculate the time constant (τ) of an RC circuit and determine capacitor voltage during charging and discharging."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Input Parameters</CardTitle>
                                </div>
                                <CardDescription>Enter values to calculate RC timing</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="voltage">Supply Voltage (V)</Label>
                                    <Input
                                        id="voltage"
                                        type="number"
                                        value={voltage}
                                        onChange={(e) => setVoltage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 5"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resistance">Resistance (Ω)</Label>
                                    <Input
                                        id="resistance"
                                        type="number"
                                        value={resistance}
                                        onChange={(e) => setResistance(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 10000"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacitance">Capacitance (μF)</Label>
                                    <Input
                                        id="capacitance"
                                        type="number"
                                        value={capacitance}
                                        onChange={(e) => setCapacitance(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 100"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

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
                                    <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20 mt-4">
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">
                                            Time Constant (τ)
                                        </div>
                                        <div className="text-5xl font-bold text-ksp-blue">
                                            {result.tau} <span className="text-2xl">{result.unit}</span>
                                        </div>
                                        <div className="mt-3 text-sm text-gray-500 font-mono">
                                            Full Charge (5τ): {(result.tauSeconds * 5).toFixed(4)} s
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Tables + Info */}
                    <div className="space-y-6">
                        {result ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Charge / Discharge Profile</CardTitle>
                                    <CardDescription>Capacitor voltage at various time constants</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5">
                                                <tr>
                                                    <th className="px-4 py-3">Time</th>
                                                    <th className="px-4 py-3">Charge</th>
                                                    <th className="px-4 py-3">Discharge</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.intervals.map((row) => (
                                                    <tr key={row.tau} className="border-b dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                        <td className="px-4 py-3 font-mono font-medium">
                                                            <div>{row.tau}τ</div>
                                                            <div className="text-xs text-gray-400">{row.time}s</div>
                                                        </td>
                                                        <td className="px-4 py-3 font-mono text-ksp-blue">
                                                            <div>{row.chargeVolts.toFixed(2)}V</div>
                                                            <div className="text-xs text-ksp-blue/70">{row.chargePct.toFixed(1)}%</div>
                                                        </td>
                                                        <td className="px-4 py-3 font-mono text-ksp-green">
                                                            <div>{row.dischargeVolts.toFixed(2)}V</div>
                                                            <div className="text-xs text-ksp-green/70">{row.dischargePct.toFixed(1)}%</div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Quick Guide</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            The RC Time Constant (τ):
                                        </h3>
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-center">
                                            <span className="font-mono text-lg text-ksp-blue font-bold">
                                                τ = R × C
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                                            The time constant (Tau, represented by τ) describes the rate at which a capacitor charges
                                            or discharges through a resistor. It represents the time required for a capacitor to charge
                                            to approximately 63.2% of full voltage, or discharge to 36.8% of its initial voltage.
                                        </p>
                                    </div>
                                    <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            The 5τ Rule:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                            <li><span className="font-semibold text-gray-900 dark:text-gray-300">1τ :</span> 63.2% charged</li>
                                            <li><span className="font-semibold text-gray-900 dark:text-gray-300">2τ :</span> 86.5% charged</li>
                                            <li><span className="font-semibold text-gray-900 dark:text-gray-300">3τ :</span> 95.0% charged</li>
                                            <li><span className="font-semibold text-gray-900 dark:text-gray-300">4τ :</span> 98.2% charged</li>
                                            <li><span className="font-semibold text-gray-900 dark:text-gray-300">5τ :</span> 99.3% charged (Considered fully charged)</li>
                                        </ul>
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

export default RCTimeConstantCalculator;
