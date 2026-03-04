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

type DbMode = "power" | "voltageOrCurrent";

const DB_MODES: { value: DbMode; label: string; equation: string }[] = [
    { value: "power", label: "Power Gain (10 log)", equation: "dB = 10 × log₁₀(P₂/P₁)" },
    { value: "voltageOrCurrent", label: "Voltage/Current Gain (20 log)", equation: "dB = 20 × log₁₀(V₂/V₁)" },
];

const DecibelCalculator: React.FC = () => {
    const [mode, setMode] = useState<DbMode>("power");
    const [input1, setInput1] = useState<string>(""); // Reference (In)
    const [input2, setInput2] = useState<string>(""); // Measured (Out)

    // Alt mode (Reverse): Given Db and Input1, find Input2
    const [dbInput, setDbInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setInput1("");
        setInput2("");
        setDbInput("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        const inRef = parseFloat(input1);
        const outMeas = parseFloat(input2);
        const db = parseFloat(dbInput);

        const hasRef = !isNaN(inRef);
        const hasOut = !isNaN(outMeas);
        const hasDb = !isNaN(db);

        const count = [hasRef, hasOut, hasDb].filter(Boolean).length;

        if (count < 2) {
            setError("Please fill exactly two fields to calculate the third.");
            return null;
        }
        if (count > 2) {
            setError("Please fill EXACTLY two fields. Clear the third to calculate.");
            return null;
        }
        if (hasRef && inRef <= 0) {
            setError("Reference value (In) must be greater than zero.");
            return null;
        }

        try {
            let resRef = 0, resOut = 0, resDb = 0;
            const multiplier = mode === "power" ? 10 : 20;

            if (hasRef && hasOut) {
                if (outMeas <= 0) throw new Error("Measured value must be greater than zero for logarithmic calculation.");
                resRef = inRef;
                resOut = outMeas;
                const ratio = outMeas / inRef;
                resDb = multiplier * Math.log10(ratio);
            } else if (hasRef && hasDb) {
                resRef = inRef;
                resDb = db;
                // db = M * log10(X/R) => X/R = 10^(db/M) => X = R * 10^(db/M)
                const ratio = Math.pow(10, db / multiplier);
                resOut = inRef * ratio;
            } else if (hasOut && hasDb) {
                if (outMeas <= 0) throw new Error("Measured value must be greater than zero.");
                resOut = outMeas;
                resDb = db;
                // X = R * 10^(db/M) => R = X / 10^(db/M)
                const ratio = Math.pow(10, db / multiplier);
                resRef = outMeas / ratio;
            }

            const linearRatio = resOut / resRef;

            return {
                ref: resRef.toFixed(4),
                out: resOut.toFixed(4),
                db: resDb.toFixed(3),
                ratio: linearRatio.toFixed(4)
            };
        } catch (e: any) {
            setError(e.message || "Calculation error invalid inputs.");
            return null;
        }
    }, [mode, input1, input2, dbInput]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Decibel (dB) Gain Calculator"
                description="Convert linear power, voltage, and current ratios into logarithmic decibels (dB)."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">dB Calculator</CardTitle>
                                </div>
                                <CardDescription>Enter any 2 values to calculate the 3rd</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Signal Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {DB_MODES.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { setMode(opt.value); setError(""); }}
                                                className={`text-center px-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${mode === opt.value
                                                    ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                    : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-center text-gray-500 font-mono mt-1">
                                        {DB_MODES.find(m => m.value === mode)?.equation}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="input1">Reference Value (In)</Label>
                                        <Input
                                            id="input1"
                                            type="number"
                                            value={input1}
                                            onChange={(e) => setInput1(e.target.value)}
                                            placeholder="e.g. 1"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="input2">Measured Value (Out)</Label>
                                        <Input
                                            id="input2"
                                            type="number"
                                            value={input2}
                                            onChange={(e) => setInput2(e.target.value)}
                                            placeholder="e.g. 100"
                                            className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dbInput">Decibel Gain / Loss (dB)</Label>
                                    <Input
                                        id="dbInput"
                                        type="number"
                                        value={dbInput}
                                        onChange={(e) => setDbInput(e.target.value)}
                                        placeholder={`e.g. ${mode === 'power' ? '20' : '40'}`}
                                        className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10 border-ksp-blue/40"
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results + Info Section */}
                    <div className="space-y-6">
                        {result && !error ? (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10 overflow-hidden">
                                <div className={`p-1 ${parseFloat(result.db) >= 0 ? "bg-ksp-blue" : "bg-red-500"}`}></div>
                                <CardHeader className="bg-slate-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                    <CardTitle className="text-lg font-bold">Calculation Results</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            {parseFloat(result.db) >= 0 ? "Gain" : "Attenuation"} in Decibels
                                        </div>
                                        <div className={`text-6xl font-bold ${parseFloat(result.db) >= 0 ? "text-ksp-blue" : "text-red-500"}`}>
                                            {parseFloat(result.db) > 0 ? "+" : ""}{Number(result.db) % 1 === 0 ? Number(result.db) : result.db} <span className="text-2xl">dB</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-center">
                                            <div className="text-xs uppercase text-gray-500 mb-1">Linear Ratio (Out/In)</div>
                                            <div className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                                                {Number(result.ratio) % 1 === 0 ? Number(result.ratio) : result.ratio}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-center">
                                            <div className="text-xs uppercase text-gray-500 mb-1">Reference In</div>
                                            <div className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                                                {Number(result.ref) % 1 === 0 ? Number(result.ref) : result.ref}
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
                                            Power vs Voltage/Current dB
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Decibels (dB) are used to express the ratio of two values (usually power or root-power) on a logarithmic scale.
                                            Because Power is proportional to the square of Voltage $(P = V^2 / R)$, a factor of 2 applies to the logarithm for Voltage and Current, resulting in the $20 \log$ rule instead of the $10 \log$ rule for Power.
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Common dB Rules of Thumb:
                                        </h3>
                                        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 text-sm">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                                    <tr>
                                                        <th className="p-2 border-b dark:border-white/10">Ratio</th>
                                                        <th className="p-2 border-b dark:border-white/10">Power (10log)</th>
                                                        <th className="p-2 border-b dark:border-white/10">Voltage (20log)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-700 dark:text-gray-300">
                                                    <tr>
                                                        <td className="p-2 border-b dark:border-white/10">x 2</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-ksp-blue">+3 dB</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-ksp-blue">+6 dB</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2 border-b dark:border-white/10">x 10</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-ksp-blue">+10 dB</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-ksp-blue">+20 dB</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2 border-b dark:border-white/10">/ 2</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-red-500">-3 dB</td>
                                                        <td className="p-2 border-b dark:border-white/10 font-bold text-red-500">-6 dB</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2">/ 10</td>
                                                        <td className="p-2 font-bold text-red-500">-10 dB</td>
                                                        <td className="p-2 font-bold text-red-500">-20 dB</td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default DecibelCalculator;
