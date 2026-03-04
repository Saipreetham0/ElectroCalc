"use client";
import React, { useState, ChangeEvent } from "react";
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

const PowerCalculator: React.FC = () => {
    const [voltage, setVoltage] = useState<string>("");
    const [current, setCurrent] = useState<string>("");
    const [resistance, setResistance] = useState<string>("");
    const [power, setPower] = useState<string>("");

    // Results
    const [resVoltage, setResVoltage] = useState<string>("");
    const [resCurrent, setResCurrent] = useState<string>("");
    const [resResistance, setResResistance] = useState<string>("");
    const [resPower, setResPower] = useState<string>("");

    const [error, setError] = useState<string>("");

    const resetCalculator = (): void => {
        setVoltage("");
        setCurrent("");
        setResistance("");
        setPower("");
        setResVoltage("");
        setResCurrent("");
        setResResistance("");
        setResPower("");
        setError("");
    };

    const calculatePower = (): void => {
        setError("");

        const v = parseFloat(voltage);
        const i = parseFloat(current);
        const r = parseFloat(resistance);
        const p = parseFloat(power);

        const hasV = !isNaN(v);
        const hasI = !isNaN(i);
        const hasR = !isNaN(r);
        const hasP = !isNaN(p);

        const filledCount = [hasV, hasI, hasR, hasP].filter(Boolean).length;

        if (filledCount < 2) {
            setError("Please provide exactly two values to calculate the others.");
            return;
        }
        if (filledCount > 2) {
            setError("Please provide EXACTLY two values. Clear the extra fields.");
            return;
        }

        try {
            let calcV = 0, calcI = 0, calcR = 0, calcP = 0;

            if (hasV && hasI) {
                calcV = v;
                calcI = i;
                calcP = v * i;
                calcR = v / i;
            } else if (hasV && hasR) {
                calcV = v;
                calcR = r;
                calcP = (v * v) / r;
                calcI = v / r;
            } else if (hasV && hasP) {
                calcV = v;
                calcP = p;
                calcI = p / v;
                calcR = (v * v) / p;
            } else if (hasI && hasR) {
                calcI = i;
                calcR = r;
                calcV = i * r;
                calcP = i * i * r;
            } else if (hasI && hasP) {
                calcI = i;
                calcP = p;
                calcV = p / i;
                calcR = p / (i * i);
            } else if (hasR && hasP) {
                calcR = r;
                calcP = p;
                calcV = Math.sqrt(p * r);
                calcI = Math.sqrt(p / r);
            }

            if (!isFinite(calcV) || !isFinite(calcI) || !isFinite(calcR) || !isFinite(calcP)) {
                throw new Error("Calculation resulted in infinity (division by zero).");
            }

            setResVoltage(calcV.toFixed(4));
            setResCurrent(calcI.toFixed(4));
            setResResistance(calcR.toFixed(4));
            setResPower(calcP.toFixed(4));

        } catch (err: any) {
            setError(err.message || "Invalid input values. Please check your numbers.");
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>): void => {
        setter(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            calculatePower();
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Power Calculator (P = VI)"
                description="Calculate electrical power, voltage, current, and resistance. Enter any two known values to compute the rest."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Zap className="h-5 w-5 text-ksp-blue" />
                                <CardTitle className="text-xl font-bold">Calculation Tool</CardTitle>
                            </div>
                            <CardDescription>Enter EXACTLY two values to calculate the other two</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="voltage">Voltage (V)</Label>
                                    <Input
                                        id="voltage"
                                        type="number"
                                        value={voltage}
                                        onChange={handleInputChange(setVoltage)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Volts"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="current">Current (I)</Label>
                                    <Input
                                        id="current"
                                        type="number"
                                        value={current}
                                        onChange={handleInputChange(setCurrent)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Amperes"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resistance">Resistance (R)</Label>
                                    <Input
                                        id="resistance"
                                        type="number"
                                        value={resistance}
                                        onChange={handleInputChange(setResistance)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ohms"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="power">Power (P)</Label>
                                    <Input
                                        id="power"
                                        type="number"
                                        value={power}
                                        onChange={handleInputChange(setPower)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Watts"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10 border-ksp-blue/40 focus-visible:ring-ksp-blue"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <Button
                                    onClick={calculatePower}
                                    className="flex-1 h-12 text-lg font-semibold transition-all shadow-sm bg-ksp-blue hover:bg-ksp-blue/90 text-white"
                                >
                                    <Zap className="mr-2 h-5 w-5" /> Calculate
                                </Button>
                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="h-12 px-6 dark:border-white/10 dark:hover:bg-white/5"
                                >
                                    <RotateCcw className="h-5 w-5" />
                                </Button>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {resPower && !error && (
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className={`p-4 rounded-xl border ${power ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-ksp-blue/10 border-ksp-blue/30'} text-center`}>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Power (P)</div>
                                        <div className={`text-2xl font-bold ${power ? 'text-gray-900 dark:text-white' : 'text-ksp-blue'}`}>{Number(resPower) % 1 === 0 ? Number(resPower) : resPower} W</div>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${voltage ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-ksp-blue/10 border-ksp-blue/30'} text-center`}>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Voltage (V)</div>
                                        <div className={`text-2xl font-bold ${voltage ? 'text-gray-900 dark:text-white' : 'text-ksp-blue'}`}>{Number(resVoltage) % 1 === 0 ? Number(resVoltage) : resVoltage} V</div>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${current ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-ksp-blue/10 border-ksp-blue/30'} text-center`}>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current (I)</div>
                                        <div className={`text-2xl font-bold ${current ? 'text-gray-900 dark:text-white' : 'text-ksp-blue'}`}>{Number(resCurrent) % 1 === 0 ? Number(resCurrent) : resCurrent} A</div>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${resistance ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-ksp-blue/10 border-ksp-blue/30'} text-center`}>
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Resistance (R)</div>
                                        <div className={`text-2xl font-bold ${resistance ? 'text-gray-900 dark:text-white' : 'text-ksp-blue'}`}>{Number(resResistance) % 1 === 0 ? Number(resResistance) : resResistance} Ω</div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Right column: Formulas */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Ohm's Law Power Wheel</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Power */}
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-ksp-blue uppercase tracking-wider">For Power (P)</h3>
                                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>P = V × I</li>
                                            <li>P = I² × R</li>
                                            <li>P = V² / R</li>
                                        </ul>
                                    </div>
                                    {/* Voltage */}
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-ksp-blue uppercase tracking-wider">For Voltage (V)</h3>
                                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>V = I × R</li>
                                            <li>V = P / I</li>
                                            <li>V = √(P × R)</li>
                                        </ul>
                                    </div>
                                    {/* Current */}
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-ksp-blue uppercase tracking-wider">For Current (I)</h3>
                                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>I = V / R</li>
                                            <li>I = P / V</li>
                                            <li>I = √(P / R)</li>
                                        </ul>
                                    </div>
                                    {/* Resistance */}
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-ksp-blue uppercase tracking-wider">For Resistance (R)</h3>
                                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>R = V / I</li>
                                            <li>R = V² / P</li>
                                            <li>R = P / I²</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerCalculator;
