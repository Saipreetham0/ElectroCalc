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

type TimeUnit = "s" | "ms" | "us" | "ns";
type FreqUnit = "hz" | "khz" | "mhz" | "ghz";

const TIME_UNITS: { value: TimeUnit; label: string; mult: number }[] = [
    { value: "s", label: "s", mult: 1 },
    { value: "ms", label: "ms", mult: 1e-3 },
    { value: "us", label: "μs", mult: 1e-6 },
    { value: "ns", label: "ns", mult: 1e-9 },
];

const FREQ_UNITS: { value: FreqUnit; label: string; mult: number }[] = [
    { value: "hz", label: "Hz", mult: 1 },
    { value: "khz", label: "kHz", mult: 1e3 },
    { value: "mhz", label: "MHz", mult: 1e6 },
    { value: "ghz", label: "GHz", mult: 1e9 },
];

const DutyCycleCalculator: React.FC = () => {
    // A duty cycle calculation involves 3 of the 4: Pulse Width (T_onn), Period (T), Frequency (f), Duty Cycle (%)
    // T = 1/f, Duty = T_onn / T * 100
    // User enters exactly 2 values.

    const [pulseWidth, setPulseWidth] = useState<string>("");
    const [pwUnit, setPwUnit] = useState<TimeUnit>("us");

    const [period, setPeriod] = useState<string>("");
    const [periodUnit, setPeriodUnit] = useState<TimeUnit>("us");

    const [freq, setFreq] = useState<string>("");
    const [freqUnit, setFreqUnit] = useState<FreqUnit>("khz");

    const [duty, setDuty] = useState<string>("");

    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setPulseWidth("");
        setPeriod("");
        setFreq("");
        setDuty("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const pw = parseFloat(pulseWidth);
        const per = parseFloat(period);
        const f = parseFloat(freq);
        const d = parseFloat(duty);

        const hasPw = !isNaN(pw) && pw > 0;
        const hasPer = !isNaN(per) && per > 0;
        const hasF = !isNaN(f) && f > 0;
        const hasD = !isNaN(d) && d >= 0 && d <= 100;

        const count = [hasPw, hasPer, hasF, hasD].filter(Boolean).length;

        if (count < 2) {
            setError("Please provide exactly two values (Note: Period and Frequency count as one relationship).");
            return null;
        }

        if (hasPer && hasF) {
            setError("Period and Frequency are reciprocals. Provide Pulse Width or Duty Cycle as the second value.");
            return null;
        }

        if (count > 2) {
            setError("Please provide EXACTLY two values. Clear extra fields.");
            return null;
        }

        try {
            let resPwSeconds = 0;
            let resPerSeconds = 0;
            let resDutyPct = 0;

            const pwMulti = TIME_UNITS.find(u => u.value === pwUnit)?.mult || 1;
            const perMulti = TIME_UNITS.find(u => u.value === periodUnit)?.mult || 1;
            const fMulti = FREQ_UNITS.find(u => u.value === freqUnit)?.mult || 1;

            if (hasPw && hasPer) {
                resPwSeconds = pw * pwMulti;
                resPerSeconds = per * perMulti;
                resDutyPct = (resPwSeconds / resPerSeconds) * 100;
            } else if (hasPw && hasF) {
                resPwSeconds = pw * pwMulti;
                resPerSeconds = 1 / (f * fMulti);
                resDutyPct = (resPwSeconds / resPerSeconds) * 100;
            } else if (hasPw && hasD) {
                resPwSeconds = pw * pwMulti;
                resDutyPct = d;
                if (d === 0) throw new Error("Duty cycle cannot be 0 if pulse width is > 0.");
                resPerSeconds = resPwSeconds / (d / 100);
            } else if (hasPer && hasD) {
                resPerSeconds = per * perMulti;
                resDutyPct = d;
                resPwSeconds = resPerSeconds * (d / 100);
            } else if (hasF && hasD) {
                resPerSeconds = 1 / (f * fMulti);
                resDutyPct = d;
                resPwSeconds = resPerSeconds * (d / 100);
            }

            if (resDutyPct > 100) {
                throw new Error("Calculated Duty Cycle exceeds 100%. Pulse Width cannot be longer than Period.");
            }

            const resFreqHz = 1 / resPerSeconds;
            const offTimeSeconds = resPerSeconds - resPwSeconds;

            // Format appropriately
            const formatTime = (seconds: number) => {
                if (seconds === 0) return { val: "0", unit: "s" };
                if (seconds < 1e-6) return { val: (seconds * 1e9).toFixed(2), unit: "ns" };
                if (seconds < 1e-3) return { val: (seconds * 1e6).toFixed(2), unit: "µs" };
                if (seconds < 1) return { val: (seconds * 1e3).toFixed(2), unit: "ms" };
                return { val: seconds.toFixed(4), unit: "s" };
            };

            const formatFreq = (hz: number) => {
                if (hz >= 1e9) return { val: (hz / 1e9).toFixed(3), unit: "GHz" };
                if (hz >= 1e6) return { val: (hz / 1e6).toFixed(3), unit: "MHz" };
                if (hz >= 1e3) return { val: (hz / 1e3).toFixed(3), unit: "kHz" };
                return { val: hz.toFixed(2), unit: "Hz" };
            };

            return {
                duty: resDutyPct.toFixed(2),
                pw: formatTime(resPwSeconds),
                per: formatTime(resPerSeconds),
                off: formatTime(offTimeSeconds),
                freq: formatFreq(resFreqHz)
            };
        } catch (e: any) {
            setError(e.message || "Invalid calculation.");
            return null;
        }
    }, [pulseWidth, pwUnit, period, periodUnit, freq, freqUnit, duty]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Duty Cycle Calculator"
                description="Calculate PWM Duty Cycle, Pulse Width, Period, and Frequency depending on known parameters."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Signal Parameters</CardTitle>
                                </div>
                                <CardDescription>Enter EXACTLY two parameters to calculate the rest</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pulseWidth">Pulse Width (ON Time)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="pulseWidth"
                                            type="number"
                                            value={pulseWidth}
                                            onChange={(e) => setPulseWidth(e.target.value)}
                                            placeholder="e.g. 50"
                                            className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                        <select
                                            className="h-12 w-24 px-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm"
                                            value={pwUnit}
                                            onChange={(e) => setPwUnit(e.target.value as TimeUnit)}
                                        >
                                            {TIME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="period">Total Period (T)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="period"
                                            type="number"
                                            value={period}
                                            onChange={(e) => setPeriod(e.target.value)}
                                            placeholder="e.g. 100"
                                            className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                        <select
                                            className="h-12 w-24 px-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm"
                                            value={periodUnit}
                                            onChange={(e) => setPeriodUnit(e.target.value as TimeUnit)}
                                        >
                                            {TIME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium">OR</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="freq">Frequency (f)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="freq"
                                            type="number"
                                            value={freq}
                                            onChange={(e) => setFreq(e.target.value)}
                                            placeholder="e.g. 10"
                                            className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                        <select
                                            className="h-12 w-24 px-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm"
                                            value={freqUnit}
                                            onChange={(e) => setFreqUnit(e.target.value as FreqUnit)}
                                        >
                                            {FREQ_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/5">
                                    <Label htmlFor="duty">Duty Cycle (%)</Label>
                                    <Input
                                        id="duty"
                                        type="number"
                                        value={duty}
                                        onChange={(e) => setDuty(e.target.value)}
                                        placeholder="e.g. 50"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10 border-ksp-blue/40"
                                    />
                                </div>

                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5 mt-4"
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

                    {/* Results + Visuals Section */}
                    <div className="space-y-6">
                        {result && !error ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 border-ksp-blue/20">
                                <CardHeader className="bg-ksp-blue/5 border-b border-ksp-blue/10">
                                    <CardTitle className="text-lg font-bold">Calculated Results</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="text-center p-4 bg-white dark:bg-[#0a0f1a] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Duty Cycle (%)</div>
                                        <div className="text-5xl font-bold text-ksp-blue">
                                            {result.duty}%
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-center">
                                            <div className="text-xs uppercase text-gray-500 mb-1">ON Time (t<sub>on</sub>)</div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                                {result.pw.val} {result.pw.unit}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-center">
                                            <div className="text-xs uppercase text-gray-500 mb-1">OFF Time (t<sub>off</sub>)</div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                                {result.off.val} {result.off.unit}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0f1a] text-center shadow-sm">
                                            <div className="text-xs uppercase text-ksp-green font-semibold mb-1">Frequency (f)</div>
                                            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                                {result.freq.val} {result.freq.unit}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0f1a] text-center shadow-sm">
                                            <div className="text-xs uppercase text-ksp-green font-semibold mb-1">Total Period (T)</div>
                                            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                                {result.per.val} {result.per.unit}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">PWM Signals</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            What is Duty Cycle?
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Duty cycle is the percentage of one period in which a signal is active (high or ON).
                                            It is commonly used in Pulse Width Modulation (PWM) to control the average power delivered by an electrical signal.
                                        </p>
                                    </div>

                                    <div className="flex justify-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <svg viewBox="0 0 200 100" className="w-full max-w-[250px] h-auto" xmlns="http://www.w3.org/2000/svg">
                                            {/* Axis */}
                                            <line x1="10" y1="80" x2="190" y2="80" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                                            {/* Waveform */}
                                            <path d="M 20 80 L 20 20 L 70 20 L 70 80 L 120 80 L 120 20 L 170 20 L 170 80 L 190 80" fill="none" stroke="currentColor" strokeWidth="2" className="text-ksp-blue" strokeLinejoin="round" />
                                            {/* Labels */}
                                            <text x="45" y="15" className="fill-ksp-blue" fontSize="10" textAnchor="middle">t_on</text>
                                            <text x="95" y="70" className="fill-gray-500" fontSize="10" textAnchor="middle">t_off</text>

                                            {/* Period Bracket */}
                                            <path d="M 20 90 L 20 95 L 120 95 L 120 90" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-500" />
                                            <text x="70" y="105" className="fill-gray-600 dark:fill-gray-400" fontSize="10" textAnchor="middle">Period (T = t_on + t_off)</text>
                                        </svg>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5 mt-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Formulas:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>Duty Cycle (%) = (t_on / Period) × 100</li>
                                            <li>Period (T) = 1 / Frequency (f)</li>
                                            <li>Average Voltage = V_max × (Duty Cycle / 100)</li>
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

export default DutyCycleCalculator;
