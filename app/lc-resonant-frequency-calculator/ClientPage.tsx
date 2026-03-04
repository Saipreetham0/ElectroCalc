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

const LCResonantFrequencyCalculator: React.FC = () => {
    // We'll use uH for inductance and pF for capacitance as standard defaults for RF/tuning circuits
    const [inductance, setInductance] = useState<string>("");
    const [capacitance, setCapacitance] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setInductance("");
        setCapacitance("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const l = parseFloat(inductance);
        const c = parseFloat(capacitance);

        if (!inductance || !capacitance) return null;
        if (isNaN(l) || isNaN(c)) {
            setError("Please enter valid numbers");
            return null;
        }
        if (l <= 0 || c <= 0) {
            setError("Inductance and Capacitance must be strictly greater than zero");
            return null;
        }

        try {
            // Convert L from microhenries (μH) to Henries
            const lHenries = l * 1e-6;
            // Convert C from picofarads (pF) to Farads
            const cFarads = c * 1e-12;

            // f = 1 / (2 * pi * sqrt(L * C))
            const fHz = 1 / (2 * Math.PI * Math.sqrt(lHenries * cFarads));

            let displayFreq = "";
            let freqUnit = "";

            if (fHz >= 1e9) {
                displayFreq = (fHz / 1e9).toFixed(4);
                freqUnit = "GHz";
            } else if (fHz >= 1e6) {
                displayFreq = (fHz / 1e6).toFixed(4);
                freqUnit = "MHz";
            } else if (fHz >= 1e3) {
                displayFreq = (fHz / 1e3).toFixed(4);
                freqUnit = "kHz";
            } else {
                displayFreq = fHz.toFixed(4);
                freqUnit = "Hz";
            }

            // Also compute Reactance at resonance (XL = XC = 2*pi*f*L)
            const reactance = 2 * Math.PI * fHz * lHenries;

            return {
                frequency: displayFreq,
                unit: freqUnit,
                freqHz: fHz,
                reactance: reactance.toFixed(2),
                reactanceUnit: "Ω"
            };
        } catch {
            setError("Invalid calculation result due to extreme values.");
            return null;
        }
    }, [inductance, capacitance]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            // live calc
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="LC Resonant Frequency Calculator"
                description="Calculate the resonant frequency of an ideal LC circuit (tank circuit) given its inductance and capacitance."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Tank Circuit Parameters</CardTitle>
                                </div>
                                <CardDescription>Enter values to calculate resonant frequency</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="inductance">Inductance — L (μH)</Label>
                                    <Input
                                        id="inductance"
                                        type="number"
                                        value={inductance}
                                        onChange={(e) => setInductance(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 10 (microhenries)"
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacitance">Capacitance — C (pF)</Label>
                                    <Input
                                        id="capacitance"
                                        type="number"
                                        value={capacitance}
                                        onChange={(e) => setCapacitance(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 100 (picofarads)"
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
                                            Resonant Frequency (f<sub className="text-[10px]">r</sub>)
                                        </div>
                                        <div className="text-5xl font-bold text-ksp-blue">
                                            {result.frequency} <span className="text-2xl">{result.unit}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-ksp-blue/10">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Reactance at resonance (X<sub className="text-[10px]">L</sub> = X<sub className="text-[10px]">C</sub>)
                                            </div>
                                            <div className="text-xl font-bold text-ksp-green mt-1">
                                                {result.reactance} {result.reactanceUnit}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Info & Diagrams */}
                    <div className="space-y-6">
                        {/* Circuit Diagram */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">LC Tank Circuit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center py-6">
                                    <svg viewBox="0 0 200 160" className="w-48 h-auto" xmlns="http://www.w3.org/2000/svg">
                                        {/* Top wire */}
                                        <line x1="40" y1="40" x2="160" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />

                                        {/* Inductor Branch (Left) */}
                                        <line x1="60" y1="40" x2="60" y2="60" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* Inductor coils */}
                                        <path d="M 60 60 Q 75 67 60 75 Q 75 82 60 90 Q 75 97 60 105" fill="none" stroke="currentColor" strokeWidth="2" className="text-ksp-blue" strokeLinecap="round" />
                                        <line x1="60" y1="105" x2="60" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="35" y="85" className="fill-ksp-blue" fontSize="14" fontWeight="bold">L</text>

                                        {/* Capacitor Branch (Right) */}
                                        <line x1="140" y1="40" x2="140" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        {/* Capacitor plates */}
                                        <line x1="125" y1="70" x2="155" y2="70" stroke="currentColor" strokeWidth="3" className="text-ksp-green" />
                                        <line x1="125" y1="90" x2="155" y2="90" stroke="currentColor" strokeWidth="3" className="text-ksp-green" />
                                        <line x1="140" y1="90" x2="140" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="165" y="85" className="fill-ksp-green" fontSize="14" fontWeight="bold">C</text>

                                        {/* Bottom wire */}
                                        <line x1="40" y1="120" x2="160" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />

                                        {/* Nodes */}
                                        <circle cx="60" cy="40" r="3" className="fill-gray-600 dark:fill-gray-400" />
                                        <circle cx="140" cy="40" r="3" className="fill-gray-600 dark:fill-gray-400" />
                                        <circle cx="60" cy="120" r="3" className="fill-gray-600 dark:fill-gray-400" />
                                        <circle cx="140" cy="120" r="3" className="fill-gray-600 dark:fill-gray-400" />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Guide */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Quick Guide</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Resonant Frequency Formula:
                                    </h3>
                                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 flex items-center justify-center">
                                        <div className="font-mono text-lg text-ksp-blue font-bold flex items-center">
                                            f<sub className="text-xs mb-2">r</sub>
                                            <span className="mx-2">=</span>
                                            <div className="flex flex-col items-center">
                                                <span className="border-b-2 border-current px-1 leading-none pb-1">1</span>
                                                <span className="leading-none pt-1">2π√(LC)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                                        Resonance occurs when the inductive reactance ($X_L$) equals the capacitive reactance ($X_C$).
                                        At this specific frequency, the total impedance of a parallel tank circuit is at its maximum,
                                        and it acts as a band-pass filter (or oscillator tank).
                                    </p>
                                </div>
                                <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Applications:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <li>Radio frequency (RF) oscillators</li>
                                        <li>Band-pass and band-stop filters</li>
                                        <li>Tuning circuits in radios and receivers</li>
                                        <li>Impedance matching networks</li>
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

export default LCResonantFrequencyCalculator;
