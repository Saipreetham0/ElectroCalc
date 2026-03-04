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

type Mode = "power" | "vi";
type TimeUnit = "hours" | "minutes" | "days";

const MODES: { value: Mode; label: string }[] = [
    { value: "power", label: "Known Power (W)" },
    { value: "vi", label: "Voltage & Current (V, A)" },
];

const TIME_UNITS: { value: TimeUnit; label: string; multiplier: number }[] = [
    { value: "minutes", label: "Minutes", multiplier: 1 / 60 },
    { value: "hours", label: "Hours", multiplier: 1 },
    { value: "days", label: "Days", multiplier: 24 },
];

const EnergyCalculator: React.FC = () => {
    const [mode, setMode] = useState<Mode>("power");

    // Inputs
    const [power, setPower] = useState<string>("");
    const [voltage, setVoltage] = useState<string>("");
    const [current, setCurrent] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [timeUnit, setTimeUnit] = useState<TimeUnit>("hours");

    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setPower("");
        setVoltage("");
        setCurrent("");
        setDuration("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const d = parseFloat(duration);

        if (!duration) return null;
        if (isNaN(d) || d < 0) {
            setError("Please enter a valid duration");
            return null;
        }

        let pWatts = 0;

        if (mode === "power") {
            if (!power) return null;
            const p = parseFloat(power);
            if (isNaN(p) || p < 0) {
                setError("Please enter a valid positive power");
                return null;
            }
            pWatts = p;
        } else {
            if (!voltage || !current) return null;
            const v = parseFloat(voltage);
            const i = parseFloat(current);
            if (isNaN(v) || isNaN(i) || v < 0 || i < 0) {
                setError("Please enter valid positive voltage and current");
                return null;
            }
            pWatts = v * i;
        }

        try {
            // Time in hours
            const timeMultiplier = TIME_UNITS.find(u => u.value === timeUnit)?.multiplier || 1;
            const tHours = d * timeMultiplier;

            // Energy calculations
            const energyWh = pWatts * tHours;
            const energyKWh = energyWh / 1000;
            const energyJoules = pWatts * (tHours * 3600); // 1 Watt = 1 Joule/second

            return {
                powerW: pWatts.toFixed(2),
                timeH: tHours.toFixed(2),
                wh: energyWh.toFixed(2),
                kwh: energyKWh.toFixed(4),
                joules: (energyJoules >= 1e6 ? (energyJoules / 1e6).toFixed(2) + " MJ" : energyJoules >= 1e3 ? (energyJoules / 1e3).toFixed(2) + " kJ" : energyJoules.toFixed(2) + " J")
            };
        } catch {
            setError("Calculation error");
            return null;
        }
    }, [mode, power, voltage, current, duration, timeUnit]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Energy Calculator (Wh / kWh)"
                description="Calculate electrical energy consumption in Watt-hours, Kilowatt-hours, and Joules."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">What do you know?</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-2">
                                    {MODES.map((m) => (
                                        <button
                                            key={m.value}
                                            onClick={() => { setMode(m.value); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${mode === m.value
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md relative"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            {m.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-2">
                                    {mode === "power" ? (
                                        <div className="space-y-2">
                                            <Label htmlFor="power">Power Draw (Watts)</Label>
                                            <Input
                                                id="power"
                                                type="number"
                                                value={power}
                                                onChange={(e) => setPower(e.target.value)}
                                                placeholder="e.g. 100"
                                                className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="voltage">Voltage (V)</Label>
                                                <Input
                                                    id="voltage"
                                                    type="number"
                                                    value={voltage}
                                                    onChange={(e) => setVoltage(e.target.value)}
                                                    placeholder="e.g. 12"
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
                                                    placeholder="e.g. 5"
                                                    className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Time / Duration</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="duration"
                                                type="number"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                placeholder="e.g. 24"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 px-3 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm"
                                                value={timeUnit}
                                                onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                                            >
                                                {TIME_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
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
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Results + Info */}
                    <div className="space-y-6">
                        {result ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 bg-ksp-blue/5 border-ksp-blue/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-bold flex justify-between items-end">
                                        <span>Energy Consumption</span>
                                        <span className="text-sm font-normal text-gray-500">Based on {result.powerW}W for {result.timeH}h</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-5 bg-white dark:bg-[#0a0f1a] rounded-xl border border-gray-100 dark:border-white/5 text-center shadow-sm">
                                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                            Watt-Hours
                                        </div>
                                        <div className="text-5xl font-bold text-ksp-blue">
                                            {result.wh} <span className="text-2xl">Wh</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white dark:bg-[#0a0f1a] rounded-xl border border-gray-100 dark:border-white/5 text-center">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Kilowatt-Hours
                                            </div>
                                            <div className="text-2xl font-bold text-ksp-green">
                                                {result.kwh} <span className="text-base">kWh</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-[#0a0f1a] rounded-xl border border-gray-100 dark:border-white/5 text-center">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                Joules
                                            </div>
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                {result.joules}
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
                                <CardContent className="space-y-5">
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Energy vs Power:
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">Power (Watts)</span> is the rate at which electricity is used at a specific moment.
                                            <br /><br />
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">Energy (Watt-hours)</span> is the total amount of electricity consumed over time.
                                        </p>
                                    </div>
                                    <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Formulas:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>Energy (Wh) = Power (W) × Time (hours)</li>
                                            <li>Energy (kWh) = Wh / 1000</li>
                                            <li>Joules (J) = Watts × Seconds</li>
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

export default EnergyCalculator;
