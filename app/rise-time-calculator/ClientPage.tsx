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

// Equation: Tr = 0.35 / BW   (For single-pole filter / 10% to 90% rise time)

type TimeUnit = "ms" | "us" | "ns" | "ps";
type FreqUnit = "khz" | "mhz" | "ghz";

const TIME_UNITS: { value: TimeUnit; label: string; mult: number }[] = [
    { value: "ms", label: "ms (Milli)", mult: 1e-3 },
    { value: "us", label: "µs (Micro)", mult: 1e-6 },
    { value: "ns", label: "ns (Nano)", mult: 1e-9 },
    { value: "ps", label: "ps (Pico)", mult: 1e-12 },
];

const FREQ_UNITS: { value: FreqUnit; label: string; mult: number }[] = [
    { value: "khz", label: "kHz", mult: 1e3 },
    { value: "mhz", label: "MHz", mult: 1e6 },
    { value: "ghz", label: "GHz", mult: 1e9 },
];

const RiseTimeCalculator: React.FC = () => {
    const [calcMode, setCalcMode] = useState<"tr" | "bw">("tr");

    // Rise Time to BM
    const [trInput, setTrInput] = useState<string>("");
    const [trUnit, setTrUnit] = useState<TimeUnit>("ns");

    // BW to Rise Time
    const [bwInput, setBwInput] = useState<string>("");
    const [bwUnit, setBwUnit] = useState<FreqUnit>("mhz");

    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setTrInput("");
        setBwInput("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        let targetBwHz = 0;
        let targetTrSeconds = 0;

        try {
            if (calcMode === "tr") {
                if (!trInput) return null;
                const tr = parseFloat(trInput);
                if (isNaN(tr) || tr <= 0) {
                    setError("Please enter a valid positive rise time.");
                    return null;
                }
                const trMulti = TIME_UNITS.find(u => u.value === trUnit)?.mult || 1e-9;
                targetTrSeconds = tr * trMulti;

                // BW = 0.35 / Tr
                targetBwHz = 0.35 / targetTrSeconds;

            } else {
                if (!bwInput) return null;
                const bw = parseFloat(bwInput);
                if (isNaN(bw) || bw <= 0) {
                    setError("Please enter a valid positive bandwidth.");
                    return null;
                }
                const bwMulti = FREQ_UNITS.find(u => u.value === bwUnit)?.mult || 1e6;
                targetBwHz = bw * bwMulti;

                // Tr = 0.35 / BW
                targetTrSeconds = 0.35 / targetBwHz;
            }

            // Formatting
            const formatTime = (seconds: number) => {
                if (seconds < 1e-9) return { val: (seconds * 1e12).toFixed(2), unit: "ps" };
                if (seconds < 1e-6) return { val: (seconds * 1e9).toFixed(2), unit: "ns" };
                if (seconds < 1e-3) return { val: (seconds * 1e6).toFixed(2), unit: "µs" };
                return { val: (seconds * 1e3).toFixed(2), unit: "ms" };
            };

            const formatFreq = (hz: number) => {
                if (hz >= 1e9) return { val: (hz / 1e9).toFixed(3), unit: "GHz" };
                if (hz >= 1e6) return { val: (hz / 1e6).toFixed(3), unit: "MHz" };
                if (hz >= 1e3) return { val: (hz / 1e3).toFixed(3), unit: "kHz" };
                return { val: hz.toFixed(2), unit: "Hz" };
            };

            return {
                tr: formatTime(targetTrSeconds),
                bw: formatFreq(targetBwHz)
            };
        } catch {
            setError("Invalid calculation point.");
            return null;
        }
    }, [calcMode, trInput, trUnit, bwInput, bwUnit]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Rise Time & Bandwidth Calculator"
                description="Convert between signal Rise Time (10% to 90%) and analog Bandwidth using the standard 0.35 rule."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Calculation Type</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => { setCalcMode("tr"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "tr"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Rise Time → Bandwidth
                                        </button>
                                        <button
                                            onClick={() => { setCalcMode("bw"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "bw"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Bandwidth → Rise Time
                                        </button>
                                    </div>
                                </div>

                                {calcMode === "tr" ? (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="trInput">Measured Rise Time (tr)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="trInput"
                                                type="number"
                                                value={trInput}
                                                onChange={(e) => setTrInput(e.target.value)}
                                                placeholder="e.g. 3.5"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 w-32 px-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-ksp-blue"
                                                value={trUnit}
                                                onChange={(e) => setTrUnit(e.target.value as TimeUnit)}
                                            >
                                                {TIME_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="bwInput">System Bandwidth (BW)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="bwInput"
                                                type="number"
                                                value={bwInput}
                                                onChange={(e) => setBwInput(e.target.value)}
                                                placeholder="e.g. 100"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 w-32 px-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-orange-500"
                                                value={bwUnit}
                                                onChange={(e) => setBwUnit(e.target.value as FreqUnit)}
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
                                        <div className={`p-6 rounded-xl border ${calcMode === 'tr' ? 'bg-orange-500/5 border-orange-500/30' : 'bg-ksp-blue/5 border-ksp-blue/30'} text-center shadow-sm`}>
                                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                {calcMode === "tr" ? "Analog Bandwidth (BW)" : "Signal Rise Time (10-90%)"}
                                            </div>
                                            <div className={`text-5xl font-bold ${calcMode === 'tr' ? 'text-orange-500' : 'text-ksp-blue'}`}>
                                                {calcMode === "tr" ? result.bw.val : result.tr.val}
                                                <span className="text-2xl ml-2 text-gray-900 dark:text-white">
                                                    {calcMode === "tr" ? result.bw.unit : result.tr.unit}
                                                </span>
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
                                            The 0.35 Rule
                                        </h3>
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 flex items-center justify-center">
                                            <div className="font-mono text-xl text-ksp-blue font-bold flex gap-4">
                                                <span>BW = 0.35 / t<sub className="text-xs">r</sub></span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2 leading-relaxed">
                                            This is an approximation valid for single-pole low-pass filter responses (like an RC circuit), which accurately models many front-ends of oscilloscopes and basic amplifier stages.
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Oscilloscope Rule of Thumb
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            To accurately measure the rise time of a signal, the bandwidth of your oscilloscope should be at least <span className="font-bold text-ksp-blue">3 to 5 times larger</span> than the bandwidth of the signal being measured. A 100MHz scope has an internal rise time of about 3.5 ns.
                                        </p>
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

export default RiseTimeCalculator;
