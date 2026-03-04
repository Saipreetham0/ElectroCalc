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

const RealReactivePowerCalculator: React.FC = () => {
    // We have 4 primary variables in the power triangle (discounting Phase Angle, which is directly tied to PF)
    // S (Apparent), P (Real), Q (Reactive), PF (Power Factor)
    // Entering ANY TWO solves the rest.

    const [sInput, setSInput] = useState<string>(""); // Apparent Power S (VA)
    const [pInput, setPInput] = useState<string>(""); // Real Power P (W)
    const [qInput, setQInput] = useState<string>(""); // Reactive Power Q (VAR)
    const [pfInput, setPfInput] = useState<string>(""); // Power Factor

    // Results
    const [resS, setResS] = useState<string>("");
    const [resP, setResP] = useState<string>("");
    const [resQ, setResQ] = useState<string>("");
    const [resPf, setResPf] = useState<string>("");
    const [resAngle, setResAngle] = useState<string>("");

    const [error, setError] = useState<string>("");

    const resetCalculator = (): void => {
        setSInput("");
        setPInput("");
        setQInput("");
        setPfInput("");
        setResS("");
        setResP("");
        setResQ("");
        setResPf("");
        setResAngle("");
        setError("");
    };

    const calculatePowerTriangle = (): void => {
        setError("");

        const S = parseFloat(sInput);
        const P = parseFloat(pInput);
        const Q = parseFloat(qInput);
        const PF = parseFloat(pfInput);

        const hasS = !isNaN(S);
        const hasP = !isNaN(P);
        const hasQ = !isNaN(Q);
        const hasPF = !isNaN(PF);

        const filledCount = [hasS, hasP, hasQ, hasPF].filter(Boolean).length;

        if (filledCount < 2) {
            setError("Please provide exactly two values to calculate the others.");
            return;
        }
        if (filledCount > 2) {
            setError("Please provide EXACTLY two values. Clear the extra fields.");
            return;
        }

        try {
            let calcS = 0, calcP = 0, calcQ = 0, calcPF = 0;

            if (hasS && hasP) {
                if (P > S) throw new Error("Real Power (P) cannot be greater than Apparent Power (S)");
                calcS = S; calcP = P;
                calcQ = Math.sqrt(S * S - P * P);
                calcPF = P / S;
            } else if (hasS && hasQ) {
                if (Q > S) throw new Error("Reactive Power (Q) cannot be greater than Apparent Power (S)");
                calcS = S; calcQ = Q;
                calcP = Math.sqrt(S * S - Q * Q);
                calcPF = calcP / S;
            } else if (hasS && hasPF) {
                if (PF < 0 || PF > 1) throw new Error("Power Factor must be between 0 and 1");
                calcS = S; calcPF = PF;
                calcP = S * PF;
                calcQ = S * Math.sqrt(1 - PF * PF);
            } else if (hasP && hasQ) {
                calcP = P; calcQ = Q;
                calcS = Math.sqrt(P * P + Q * Q);
                calcPF = P / calcS;
            } else if (hasP && hasPF) {
                if (PF <= 0 || PF > 1) throw new Error("Power Factor must be > 0 and <= 1. (If PF=0, Real Power must be 0)");
                calcP = P; calcPF = PF;
                calcS = P / PF;
                calcQ = Math.sqrt(calcS * calcS - P * P);
            } else if (hasQ && hasPF) {
                if (PF < 0 || PF >= 1) throw new Error("Power Factor must be >= 0 and < 1. (If PF=1, Reactive Power must be 0)");
                calcQ = Q; calcPF = PF;
                // Q = S * sin(acos(PF)) -> S = Q / sin(acos(PF))
                const sinTheta = Math.sqrt(1 - PF * PF);
                calcS = Q / sinTheta;
                calcP = calcS * PF;
            }

            if (!isFinite(calcS) || !isFinite(calcP) || !isFinite(calcQ) || !isFinite(calcPF)) {
                throw new Error("Calculation resulted in infinity.");
            }

            // Phase Angle (theta) = arccos(PF)
            const angleRad = Math.acos(calcPF);
            const angleDeg = angleRad * (180 / Math.PI);

            setResS(calcS.toFixed(2));
            setResP(calcP.toFixed(2));
            setResQ(calcQ.toFixed(2));
            setResPf(calcPF.toFixed(4));
            setResAngle(angleDeg.toFixed(2));

        } catch (err: any) {
            setError(err.message || "Invalid input values. Please check your numbers.");
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>): void => {
        setter(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            calculatePowerTriangle();
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Real vs Reactive Power Calculator"
                description="Solve the AC Power Triangle. Enter any two values (S, P, Q, PF) to calculate the rest, including the Phase Angle."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <Card className="w-full border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Zap className="h-5 w-5 text-ksp-blue" />
                                <CardTitle className="text-xl font-bold">Power Triangle Solver</CardTitle>
                            </div>
                            <CardDescription>Enter EXACTLY two values to calculate the others</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sInput">Apparent Power — S (VA)</Label>
                                    <Input
                                        id="sInput"
                                        type="number"
                                        value={sInput}
                                        onChange={handleInputChange(setSInput)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 1000"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pInput">Real Power — P (W)</Label>
                                    <Input
                                        id="pInput"
                                        type="number"
                                        value={pInput}
                                        onChange={handleInputChange(setPInput)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 800"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="qInput">Reactive Power — Q (VAR)</Label>
                                    <Input
                                        id="qInput"
                                        type="number"
                                        value={qInput}
                                        onChange={handleInputChange(setQInput)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 600"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pfInput">Power Factor (PF)</Label>
                                    <Input
                                        id="pfInput"
                                        type="number"
                                        value={pfInput}
                                        onChange={handleInputChange(setPfInput)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 0.8"
                                        className="h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <Button
                                    onClick={calculatePowerTriangle}
                                    className="flex-1 h-12 text-lg font-semibold transition-all shadow-sm bg-ksp-blue hover:bg-ksp-blue/90 text-white"
                                >
                                    <Zap className="mr-2 h-5 w-5" /> Solve Triangle
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
                        </CardContent>
                    </Card>

                    {/* Results / Visuals */}
                    <div className="space-y-6">
                        {resS && !error ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 bg-ksp-blue/5 border-ksp-blue/20">
                                <CardHeader className="pb-2 border-b border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                    <CardTitle className="text-lg font-bold">Solved AC Power Triangle</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-xl border ${pInput ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-white dark:bg-[#0a0f1a] border-ksp-blue/30 shadow-sm'} text-center`}>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Real Power (P)</div>
                                            <div className={`text-2xl font-bold ${pInput ? 'text-gray-900 dark:text-white' : 'text-ksp-blue'}`}>{Number(resP) % 1 === 0 ? Number(resP) : resP} <span className="text-sm">W</span></div>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${qInput ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-white dark:bg-[#0a0f1a] border-orange-500/30 shadow-sm'} text-center`}>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reactive Power (Q)</div>
                                            <div className={`text-2xl font-bold ${qInput ? 'text-gray-900 dark:text-white' : 'text-orange-500'}`}>{Number(resQ) % 1 === 0 ? Number(resQ) : resQ} <span className="text-sm">VAR</span></div>
                                        </div>
                                        <div className={`p-4 rounded-xl border col-span-2 ${sInput ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10' : 'bg-white dark:bg-[#0a0f1a] border-gray-300 dark:border-gray-600 shadow-sm'} text-center`}>
                                            <div className="flex justify-between items-center w-full px-4">
                                                <div className="text-left">
                                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Apparent Power (S)</div>
                                                    <div className={`text-3xl font-bold ${sInput ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{Number(resS) % 1 === 0 ? Number(resS) : resS} <span className="text-lg">VA</span></div>
                                                </div>
                                                <div className="text-right border-l border-gray-200 dark:border-gray-700 pl-6 py-2">
                                                    <div className="text-sm text-gray-500 mb-1 font-mono">
                                                        <span className="text-gray-400">PF =</span> <span className="font-bold text-gray-700 dark:text-gray-300">{Number(resPf) % 1 === 0 ? Number(resPf) : resPf}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-500 font-mono">
                                                        <span className="text-gray-400">θ =</span> <span className="font-bold text-gray-700 dark:text-gray-300">{Number(resAngle) % 1 === 0 ? Number(resAngle) : resAngle}°</span>
                                                    </div>
                                                </div>
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
                                    {/* Triangle SVG diagram */}
                                    <div className="flex justify-center p-4">
                                        <svg viewBox="0 0 200 150" className="w-48 h-auto" xmlns="http://www.w3.org/2000/svg">
                                            {/* P (Base) */}
                                            <line x1="20" y1="130" x2="160" y2="130" stroke="currentColor" strokeWidth="3" className="text-ksp-blue" />
                                            <text x="90" y="145" className="fill-ksp-blue" fontSize="12" fontWeight="bold">P (Real - W)</text>

                                            {/* Q (Vertical) */}
                                            <line x1="160" y1="130" x2="160" y2="30" stroke="currentColor" strokeWidth="3" className="text-orange-500" />
                                            <text x="170" y="85" className="fill-orange-500" fontSize="12" fontWeight="bold" transform="rotate(-90 170 85)">Q (Reactive - VAR)</text>

                                            {/* S (Hypotenuse) */}
                                            <line x1="20" y1="130" x2="160" y2="30" stroke="currentColor" strokeWidth="3" className="text-gray-600 dark:text-gray-400" />
                                            <text x="60" y="70" className="fill-gray-600 dark:fill-gray-400" fontSize="12" fontWeight="bold" transform="rotate(-35 60 70)">S (Apparent - VA)</text>

                                            {/* Angle Indicator */}
                                            <path d="M 50 130 A 30 30 0 0 0 45 110" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                                            <text x="55" y="122" className="fill-gray-500" fontSize="14" fontStyle="italic">θ</text>
                                        </svg>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5 mt-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Right-Angle Formulas:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                            <li>S² = P² + Q² (Pythagorean)</li>
                                            <li>PF = cos(θ) = P / S</li>
                                            <li>P = S × PF</li>
                                            <li>Q = S × sin(θ)</li>
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

export default RealReactivePowerCalculator;
