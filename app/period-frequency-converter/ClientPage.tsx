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

// Equation: f = 1/T

type TimeUnit = "s" | "ms" | "us" | "ns" | "ps";
type FreqUnit = "hz" | "khz" | "mhz" | "ghz" | "thz";

const TIME_UNITS: { value: TimeUnit; label: string; mult: number }[] = [
    { value: "s", label: "Seconds (s)", mult: 1 },
    { value: "ms", label: "Milliseconds (ms)", mult: 1e-3 },
    { value: "us", label: "Microseconds (µs)", mult: 1e-6 },
    { value: "ns", label: "Nanoseconds (ns)", mult: 1e-9 },
    { value: "ps", label: "Picoseconds (ps)", mult: 1e-12 },
];

const FREQ_UNITS: { value: FreqUnit; label: string; mult: number }[] = [
    { value: "hz", label: "Hertz (Hz)", mult: 1 },
    { value: "khz", label: "Kilohertz (kHz)", mult: 1e3 },
    { value: "mhz", label: "Megahertz (MHz)", mult: 1e6 },
    { value: "ghz", label: "Gigahertz (GHz)", mult: 1e9 },
    { value: "thz", label: "Terahertz (THz)", mult: 1e12 },
];

const PeriodFrequencyConverter: React.FC = () => {
    const [calcMode, setCalcMode] = useState<"f2t" | "t2f">("t2f");

    // Period to Freq
    const [periodInput, setPeriodInput] = useState<string>("");
    const [periodUnit, setPeriodUnit] = useState<TimeUnit>("ms");

    // Freq to Period
    const [freqInput, setFreqInput] = useState<string>("");
    const [freqUnit, setFreqUnit] = useState<FreqUnit>("khz");

    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setPeriodInput("");
        setFreqInput("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        let targetFreqHz = 0;
        let targetPeriodSec = 0;

        try {
            if (calcMode === "t2f") {
                if (!periodInput) return null;
                const t = parseFloat(periodInput);
                if (isNaN(t) || t <= 0) {
                    setError("Please enter a valid positive period.");
                    return null;
                }
                const tMulti = TIME_UNITS.find(u => u.value === periodUnit)?.mult || 1;
                targetPeriodSec = t * tMulti;

                targetFreqHz = 1 / targetPeriodSec;

            } else {
                if (!freqInput) return null;
                const f = parseFloat(freqInput);
                if (isNaN(f) || f <= 0) {
                    setError("Please enter a valid positive frequency.");
                    return null;
                }
                const fMulti = FREQ_UNITS.find(u => u.value === freqUnit)?.mult || 1;
                targetFreqHz = f * fMulti;

                targetPeriodSec = 1 / targetFreqHz;
            }

            // Formatting Time intelligently based on value
            let displayTime = "";
            let displayTimeUnit = "";

            if (targetPeriodSec < 1e-9) {
                displayTime = (targetPeriodSec * 1e12).toFixed(4);
                displayTimeUnit = "ps";
            } else if (targetPeriodSec < 1e-6) {
                displayTime = (targetPeriodSec * 1e9).toFixed(4);
                displayTimeUnit = "ns";
            } else if (targetPeriodSec < 1e-3) {
                displayTime = (targetPeriodSec * 1e6).toFixed(4);
                displayTimeUnit = "µs";
            } else if (targetPeriodSec < 1) {
                displayTime = (targetPeriodSec * 1e3).toFixed(4);
                displayTimeUnit = "ms";
            } else {
                displayTime = targetPeriodSec.toFixed(4);
                displayTimeUnit = "s";
            }

            // Formatting Freq intelligently
            let displayFreq = "";
            let displayFreqUnit = "";

            if (targetFreqHz >= 1e12) {
                displayFreq = (targetFreqHz / 1e12).toFixed(4);
                displayFreqUnit = "THz";
            } else if (targetFreqHz >= 1e9) {
                displayFreq = (targetFreqHz / 1e9).toFixed(4);
                displayFreqUnit = "GHz";
            } else if (targetFreqHz >= 1e6) {
                displayFreq = (targetFreqHz / 1e6).toFixed(4);
                displayFreqUnit = "MHz";
            } else if (targetFreqHz >= 1e3) {
                displayFreq = (targetFreqHz / 1e3).toFixed(4);
                displayFreqUnit = "kHz";
            } else {
                displayFreq = targetFreqHz.toFixed(4);
                displayFreqUnit = "Hz";
            }

            return {
                timeVal: parseFloat(displayTime).toString(), // Remove trailing zeros
                timeUnit: displayTimeUnit,
                freqVal: parseFloat(displayFreq).toString(), // Remove trailing zeros
                freqUnit: displayFreqUnit
            };
        } catch {
            setError("Invalid calculation.");
            return null;
        }
    }, [calcMode, periodInput, periodUnit, freqInput, freqUnit]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Period / Frequency Converter"
                description="Convert signal period duration into frequency (Hz) or frequency into period (time)."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Conversion Type</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => { setCalcMode("t2f"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "t2f"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Period → Frequency
                                        </button>
                                        <button
                                            onClick={() => { setCalcMode("f2t"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "f2t"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Frequency → Period
                                        </button>
                                    </div>
                                </div>

                                {calcMode === "t2f" ? (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="periodInput">Signal Period (T)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="periodInput"
                                                type="number"
                                                value={periodInput}
                                                onChange={(e) => setPeriodInput(e.target.value)}
                                                placeholder="e.g. 5"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 w-48 px-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-ksp-blue"
                                                value={periodUnit}
                                                onChange={(e) => setPeriodUnit(e.target.value as TimeUnit)}
                                            >
                                                {TIME_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="freqInput">Signal Frequency (f)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="freqInput"
                                                type="number"
                                                value={freqInput}
                                                onChange={(e) => setFreqInput(e.target.value)}
                                                placeholder="e.g. 60"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 w-48 px-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-orange-500"
                                                value={freqUnit}
                                                onChange={(e) => setFreqUnit(e.target.value as FreqUnit)}
                                            >
                                                {FREQ_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

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
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 overflow-hidden">
                                <CardHeader className="bg-slate-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                    <CardTitle className="text-lg font-bold">Equivalent Result</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className={`p-6 rounded-xl border ${calcMode === 'f2t' ? 'bg-ksp-blue/5 border-ksp-blue/30' : 'bg-orange-500/5 border-orange-500/30'} text-center shadow-sm`}>
                                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                {calcMode === "f2t" ? "Calculated Period (T)" : "Calculated Frequency (f)"}
                                            </div>
                                            <div className={`text-5xl font-bold ${calcMode === 'f2t' ? 'text-ksp-blue' : 'text-orange-500'}`}>
                                                {calcMode === "f2t" ? result.timeVal : result.freqVal}
                                                <span className="text-2xl ml-2 text-gray-900 dark:text-white">
                                                    {calcMode === "f2t" ? result.timeUnit : result.freqUnit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg">
                                        <div className="flex justify-between items-center text-sm font-mono text-gray-900 dark:text-gray-300">
                                            <span>
                                                {calcMode === "f2t" ? `${freqInput} ${FREQ_UNITS.find(u => u.value === freqUnit)?.label}` : `${periodInput} ${TIME_UNITS.find(u => u.value === periodUnit)?.label}`}
                                            </span>
                                            <span className="mx-2 text-gray-400">is equivalent to</span>
                                            <span className="font-bold text-gray-800 dark:text-white">
                                                {calcMode === "f2t" ? `${result.timeVal} ${result.timeUnit}` : `${result.freqVal} ${result.freqUnit}`}
                                            </span>
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
                                            Frequency / Period Inverse Relationship
                                        </h3>
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2">
                                            <div className="font-mono text-lg text-ksp-blue font-bold">
                                                f = 1 / T
                                            </div>
                                            <div className="font-mono text-lg text-orange-500 font-bold">
                                                T = 1 / f
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2 leading-relaxed">
                                            Frequency ($f$) and Period ($T$) are reciprocal values.
                                            Frequency represents "how many cycles occur in one second," while Period represents "how many seconds a single cycle takes."
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Metric Prefixes Reference
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-600 dark:text-gray-400">
                                            <ul className="space-y-1">
                                                <li><strong className="text-gray-900 dark:text-gray-200">ms</strong> = 10<sup>-3</sup> seconds</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">µs</strong> = 10<sup>-6</sup> seconds</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">ns</strong> = 10<sup>-9</sup> seconds</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">ps</strong> = 10<sup>-12</sup> seconds</li>
                                            </ul>
                                            <ul className="space-y-1">
                                                <li><strong className="text-gray-900 dark:text-gray-200">kHz</strong> = 10<sup>3</sup> Hertz</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">MHz</strong> = 10<sup>6</sup> Hertz</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">GHz</strong> = 10<sup>9</sup> Hertz</li>
                                                <li><strong className="text-gray-900 dark:text-gray-200">THz</strong> = 10<sup>12</sup> Hertz</li>
                                            </ul>
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

export default PeriodFrequencyConverter;
