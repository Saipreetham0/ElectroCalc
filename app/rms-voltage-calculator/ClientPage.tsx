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

type VType = "rms" | "peak" | "p2p" | "avg";

const V_TYPES: { value: VType; label: string; symbol: string }[] = [
    { value: "rms", label: "RMS Voltage", symbol: "Vrms" },
    { value: "peak", label: "Peak Voltage", symbol: "Vp" },
    { value: "p2p", label: "Peak-to-Peak Voltage", symbol: "Vp-p" },
    { value: "avg", label: "Average Voltage", symbol: "Vavg" },
];

const RMSVoltageCalculator: React.FC = () => {
    const [inputType, setInputType] = useState<VType>("rms");
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setValue("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const v = parseFloat(value);

        if (!value) return null;
        if (isNaN(v)) {
            setError("Please enter a valid number");
            return null;
        }

        // We assume a pure sinusoidal wave.
        /* Formulas (Sine Wave):
           V_peak = V_rms * sqrt(2)
           V_p2p = 2 * V_peak
           V_avg = V_peak * (2 / PI)
        */

        let vPeak = 0;

        try {
            // First, normalize everything to vPeak
            if (inputType === "peak") {
                vPeak = v;
            } else if (inputType === "rms") {
                vPeak = v * Math.SQRT2; // v * 1.4142
            } else if (inputType === "p2p") {
                vPeak = v / 2;
            } else if (inputType === "avg") {
                // vAvg = vPeak * (2/pi) => vPeak = vAvg * (pi/2)
                vPeak = v * (Math.PI / 2);
            }

            const vRms = vPeak / Math.SQRT2;
            const vP2P = vPeak * 2;
            const vAvg = vPeak * (2 / Math.PI); // Full-wave rectified average

            return {
                rms: vRms.toFixed(3),
                peak: vPeak.toFixed(3),
                p2p: vP2P.toFixed(3),
                avg: vAvg.toFixed(3),
            };
        } catch {
            setError("Calculation error");
            return null;
        }
    }, [inputType, value]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="RMS Voltage Calculator"
                description="Convert between RMS, Peak, Peak-to-Peak, and Average voltages for a pure sine wave."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Sinusoidal Input</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Known Voltage Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {V_TYPES.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { setInputType(opt.value); setError(""); }}
                                                className={`text-center px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${inputType === opt.value
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
                                    <Label htmlFor="voltageValue" className="font-mono text-xs uppercase text-gray-500 font-bold">
                                        Enter {V_TYPES.find(v => v.value === inputType)?.symbol} Value (Volts)
                                    </Label>
                                    <Input
                                        id="voltageValue"
                                        type="number"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder={`e.g. ${inputType === 'rms' ? '230' : inputType === 'peak' ? '325' : '100'}`}
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
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

                    {/* Results + Info Section */}
                    <div className="space-y-6">
                        {result && !error ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 border-ksp-blue/20">
                                <CardHeader className="bg-ksp-blue/5 border-b border-ksp-blue/10">
                                    <CardTitle className="text-lg font-bold">Conversions</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* RMS */}
                                        <div className={`p-4 rounded-xl border ${inputType === 'rms' ? 'bg-ksp-blue text-white' : 'bg-white dark:bg-[#0a0f1a] border-gray-100 dark:border-white/5'} text-center shadow-sm`}>
                                            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${inputType === 'rms' ? 'text-white/80' : 'text-gray-500'}`}>RMS Voltage</div>
                                            <div className="text-xl font-bold flex flex-col">
                                                <span>{Number(result.rms) % 1 === 0 ? Number(result.rms) : result.rms} V</span>
                                            </div>
                                        </div>

                                        {/* Peak */}
                                        <div className={`p-4 rounded-xl border ${inputType === 'peak' ? 'bg-ksp-blue text-white' : 'bg-white dark:bg-[#0a0f1a] border-gray-100 dark:border-white/5'} text-center shadow-sm`}>
                                            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${inputType === 'peak' ? 'text-white/80' : 'text-gray-500'}`}>Peak Voltage</div>
                                            <div className="text-xl font-bold flex flex-col">
                                                <span>{Number(result.peak) % 1 === 0 ? Number(result.peak) : result.peak} V</span>
                                            </div>
                                        </div>

                                        {/* P2P */}
                                        <div className={`p-4 rounded-xl border ${inputType === 'p2p' ? 'bg-ksp-blue text-white' : 'bg-white dark:bg-[#0a0f1a] border-gray-100 dark:border-white/5'} text-center shadow-sm`}>
                                            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${inputType === 'p2p' ? 'text-white/80' : 'text-gray-500'}`}>Peak-to-Peak</div>
                                            <div className="text-xl font-bold flex flex-col">
                                                <span>{Number(result.p2p) % 1 === 0 ? Number(result.p2p) : result.p2p} V</span>
                                            </div>
                                        </div>

                                        {/* Average */}
                                        <div className={`p-4 rounded-xl border ${inputType === 'avg' ? 'bg-ksp-blue text-white' : 'bg-white dark:bg-[#0a0f1a] border-gray-100 dark:border-white/5'} text-center shadow-sm`}>
                                            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${inputType === 'avg' ? 'text-white/80' : 'text-gray-500'}`}>Average Voltage</div>
                                            <div className="text-xl font-bold flex flex-col">
                                                <span>{Number(result.avg) % 1 === 0 ? Number(result.avg) : result.avg} V</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-center text-gray-500 mt-4">* Assumes a standard sinusoidal AC waveform.</p>
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
                                            Sinusoidal Waveform Relationships
                                        </h3>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                            <p className="leading-relaxed">
                                                <strong className="text-gray-900 dark:text-gray-300">RMS (Root Mean Square):</strong> The DC equivalent voltage that delivers the same heating power. (e.g. 230V mains is RMS).
                                            </p>
                                            <p className="leading-relaxed">
                                                <strong className="text-gray-900 dark:text-gray-300">Peak ($V_p$):</strong> The maximum voltage reached from zero.
                                            </p>
                                            <p className="leading-relaxed">
                                                <strong className="text-gray-900 dark:text-gray-300">Peak-to-Peak (V<sub>p-p</sub>):</strong> The total voltage swing from positive peak to negative peak.
                                            </p>
                                            <p className="leading-relaxed">
                                                <strong className="text-gray-900 dark:text-gray-300">Average (V<sub>avg</sub>):</strong> The average over a half cycle (or full-wave rectified).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Formulas:
                                        </h3>
                                        <div className="space-y-2 font-mono text-xs text-gray-500 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                                            <div>V_rms = V_peak × 0.7071</div>
                                            <div>V_peak = V_rms × 1.414</div>
                                            <div>V_p-p = V_peak × 2</div>
                                            <div>V_avg = V_peak × 0.636</div>
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

export default RMSVoltageCalculator;
