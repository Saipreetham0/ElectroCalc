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
import { Zap, RotateCcw, ArrowRight } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

type SolveFor = "i_branch" | "it" | "r1";

const MODES: { value: SolveFor; label: string; description: string }[] = [
    { value: "i_branch", label: "Branch Currents (I1, I2)", description: "Given It, R1, R2" },
    { value: "it", label: "Total Current (It)", description: "Given I1, R1, R2" },
    { value: "r1", label: "Resistor R1", description: "Given It, I1, R2" },
];

const CurrentDividerCalculator: React.FC = () => {
    const [solveFor, setSolveFor] = useState<SolveFor>("i_branch");
    const [it, setIt] = useState<string>("");
    const [i1, setI1] = useState<string>("");
    const [r1, setR1] = useState<string>("");
    const [r2, setR2] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setIt("");
        setI1("");
        setR1("");
        setR2("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");
        const itVal = parseFloat(it);
        const i1Val = parseFloat(i1);
        const r1Val = parseFloat(r1);
        const r2Val = parseFloat(r2);

        try {
            switch (solveFor) {
                case "i_branch": {
                    if (!it || !r1 || !r2) return null;
                    if (r1Val + r2Val === 0) { setError("R1 + R2 cannot be zero"); return null; }
                    const req = (r1Val * r2Val) / (r1Val + r2Val);
                    const calcI1 = itVal * (r2Val / (r1Val + r2Val));
                    const calcI2 = itVal * (r1Val / (r1Val + r2Val));
                    return {
                        primaryValue: calcI1.toFixed(4),
                        primaryUnit: "A",
                        primaryLabel: "I1 (Through R1)",
                        secondaryValue: calcI2.toFixed(4),
                        secondaryUnit: "A",
                        secondaryLabel: "I2 (Through R2)",
                        formula: "I_x = I_t × (R_other / (R1 + R2))",
                        req: req.toFixed(4)
                    };
                }
                case "it": {
                    if (!i1 || !r1 || !r2) return null;
                    if (r2Val === 0) { setError("R2 cannot be zero"); return null; }
                    const calcIt = i1Val * ((r1Val + r2Val) / r2Val);
                    const calcI2 = calcIt - i1Val;
                    const req = (r1Val * r2Val) / (r1Val + r2Val);
                    return {
                        primaryValue: calcIt.toFixed(4),
                        primaryUnit: "A",
                        primaryLabel: "Total Current (It)",
                        secondaryValue: calcI2.toFixed(4),
                        secondaryUnit: "A",
                        secondaryLabel: "I2 (Through R2)",
                        formula: "It = I1 × ((R1 + R2) / R2)",
                        req: req.toFixed(4)
                    };
                }
                case "r1": {
                    if (!it || !i1 || !r2) return null;
                    if (itVal <= i1Val) { setError("Total current must be greater than I1"); return null; }
                    if (i1Val === 0) { setError("I1 cannot be zero"); return null; }
                    const calcI2 = itVal - i1Val;
                    const calcR1 = r2Val * (calcI2 / i1Val);
                    const req = (calcR1 * r2Val) / (calcR1 + r2Val);
                    return {
                        primaryValue: calcR1.toFixed(2),
                        primaryUnit: "Ω",
                        primaryLabel: "Resistor R1",
                        secondaryValue: calcI2.toFixed(4),
                        secondaryUnit: "A",
                        secondaryLabel: "I2 (Through R2)",
                        formula: "R1 = R2 × (I2 / I1)",
                        req: req.toFixed(4)
                    };
                }
            }
        } catch {
            setError("Invalid input values. Please check your numbers.");
            return null;
        }
    }, [solveFor, it, i1, r1, r2]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            // calculations are live
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Current Divider Calculator"
                description="Calculate branch currents in a parallel resistor circuit using the current divider rule."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        {/* Mode selector */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">Solve For</CardTitle>
                                </div>
                                <CardDescription>Choose what you want to calculate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {MODES.map((mode) => (
                                        <button
                                            key={mode.value}
                                            onClick={() => { setSolveFor(mode.value); setError(""); }}
                                            className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${solveFor === mode.value
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            <div className="font-bold">{mode.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Inputs */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-xl font-bold">Input Values</CardTitle>
                                <CardDescription>Enter the known values below</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {solveFor !== "it" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="it">Total Current — It (A)</Label>
                                        <Input
                                            id="it"
                                            type="number"
                                            value={it}
                                            onChange={(e) => setIt(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 5"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                {solveFor !== "i_branch" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="i1">Branch Current 1 — I1 (A)</Label>
                                        <Input
                                            id="i1"
                                            type="number"
                                            value={i1}
                                            onChange={(e) => setI1(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 2"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                {solveFor !== "r1" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="r1">R1 — Resistor 1 (Ω)</Label>
                                        <Input
                                            id="r1"
                                            type="number"
                                            value={r1}
                                            onChange={(e) => setR1(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="e.g. 100"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="r2">R2 — Resistor 2 (Ω)</Label>
                                    <Input
                                        id="r2"
                                        type="number"
                                        value={r2}
                                        onChange={(e) => setR2(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="e.g. 220"
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
                                    <div className="p-6 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">
                                                    {result.primaryLabel}
                                                </div>
                                                <div className="text-3xl font-bold text-ksp-blue">
                                                    {result.primaryValue} <span className="text-xl">{result.primaryUnit}</span>
                                                </div>
                                            </div>
                                            <div className="border-l border-ksp-blue/20">
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">
                                                    {result.secondaryLabel}
                                                </div>
                                                <div className="text-2xl font-bold text-ksp-green mt-1">
                                                    {result.secondaryValue} <span className="text-lg">{result.secondaryUnit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-ksp-blue/10 text-center">
                                            <div className="text-sm text-gray-500 font-mono">
                                                Eq. Resistance (Req): {result.req} Ω
                                            </div>
                                            <div className="text-xs text-gray-400 font-mono mt-1">
                                                Formula: {result.formula}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: Circuit diagram + info */}
                    <div className="space-y-6">
                        {/* Circuit Diagram */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Parallel Circuit Diagram</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center py-6">
                                    <svg viewBox="0 0 300 200" className="w-full max-w-xs h-auto" xmlns="http://www.w3.org/2000/svg">
                                        {/* Main incoming wire */}
                                        <line x1="20" y1="40" x2="150" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="50" y="30" className="fill-ksp-blue" fontSize="14" fontWeight="bold">It →</text>

                                        {/* Split top */}
                                        <line x1="80" y1="40" x2="80" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="220" y1="40" x2="220" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="150" y1="40" x2="220" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />

                                        {/* R1 Branch */}
                                        <text x="55" y="90" className="fill-ksp-blue" fontSize="12">I1 ↓</text>
                                        <rect x="60" y="70" width="40" height="60" rx="4" className="fill-ksp-blue/10 stroke-ksp-blue" strokeWidth="2" />
                                        <text x="80" y="105" textAnchor="middle" className="fill-ksp-blue" fontSize="13" fontWeight="bold">R1</text>

                                        {/* R2 Branch */}
                                        <text x="195" y="90" className="fill-ksp-green" fontSize="12">I2 ↓</text>
                                        <rect x="200" y="70" width="40" height="60" rx="4" className="fill-ksp-green/10 stroke-ksp-green" strokeWidth="2" />
                                        <text x="220" y="105" textAnchor="middle" className="fill-ksp-green" fontSize="13" fontWeight="bold">R2</text>

                                        {/* Join bottom */}
                                        <line x1="80" y1="130" x2="80" y2="160" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="220" y1="130" x2="220" y2="160" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <line x1="20" y1="160" x2="220" y2="160" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400" />
                                        <text x="50" y="180" className="fill-ksp-blue" fontSize="14" fontWeight="bold">← It</text>

                                        {/* Nodes */}
                                        <circle cx="80" cy="40" r="4" className="fill-gray-600 dark:fill-gray-400" />
                                        <circle cx="80" cy="160" r="4" className="fill-gray-600 dark:fill-gray-400" />
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
                                        The Current Divider Rule:
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        In a parallel circuit, the current splits between branches. The amount of current
                                        flowing through any branch is inversely proportional to its resistance.
                                        Current takes the path of least resistance.
                                    </p>
                                </div>
                                <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Key Rules:
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <li>Total Current (It) = I1 + I2</li>
                                        <li>Voltage across all parallel branches is equal (V = I1×R1 = I2×R2)</li>
                                        <li>The smaller resistor always carries the larger current</li>
                                        <li>If R1 = R2, the current splits equally (I1 = I2 = It/2)</li>
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

export default CurrentDividerCalculator;
