"use client";

import React, { useState } from "react";
import StarConnection from "./StarConnection";
import DeltaConnection from "./DeltaConnection";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeftRight, RotateCcw } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ResistanceSet {
    r1: string;
    r2: string;
    r3: string;
}

const ConversionForm: React.FC = () => {
    const [starResistances, setStarResistances] = useState<ResistanceSet>({
        r1: "", r2: "", r3: ""
    });
    const [deltaResistances, setDeltaResistances] = useState<ResistanceSet>({
        r1: "", r2: "", r3: ""
    });

    const calculateStarToDelta = () => {
        const r1 = parseFloat(starResistances.r1);
        const r2 = parseFloat(starResistances.r2);
        const r3 = parseFloat(starResistances.r3);

        if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
            // Formula: Ra = (R1*R2 + R2*R3 + R3*R1) / R3? 
            // Using standard naming: Ra, Rb, Rc (star) -> R12, R23, R31 (delta)
            // For this UI, let's stick to consistent mapping
            const sum = (r1 * r2) + (r2 * r3) + (r3 * r1);
            setDeltaResistances({
                r1: (sum / r3).toFixed(2),
                r2: (sum / r1).toFixed(2),
                r3: (sum / r2).toFixed(2),
            });
        }
    };

    const calculateDeltaToStar = () => {
        const r1 = parseFloat(deltaResistances.r1);
        const r2 = parseFloat(deltaResistances.r2);
        const r3 = parseFloat(deltaResistances.r3);

        if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
            const sum = r1 + r2 + r3;
            setStarResistances({
                r1: ((r1 * r3) / sum).toFixed(2),
                r2: ((r1 * r2) / sum).toFixed(2),
                r3: ((r2 * r3) / sum).toFixed(2),
            });
        }
    };

    const resetAll = () => {
        setStarResistances({ r1: "", r2: "", r3: "" });
        setDeltaResistances({ r1: "", r2: "", r3: "" });
    };

    return (
        <div className="w-full space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Star to Delta Card */}
                <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-ksp-blue" />
                                Star → Delta
                            </span>
                            <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                        </CardTitle>
                        <CardDescription>Convert Star connection to Delta equivalent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">Ra (Ω)</Label>
                                <Input
                                    value={starResistances.r1}
                                    onChange={(e) => setStarResistances({ ...starResistances, r1: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">Rb (Ω)</Label>
                                <Input
                                    value={starResistances.r2}
                                    onChange={(e) => setStarResistances({ ...starResistances, r2: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">Rc (Ω)</Label>
                                <Input
                                    value={starResistances.r3}
                                    onChange={(e) => setStarResistances({ ...starResistances, r3: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                        </div>

                        <Button onClick={calculateStarToDelta} className="w-full font-bold shadow-sm">
                            Convert to Delta
                        </Button>

                        <div className="pt-4 border-t dark:border-white/5 flex justify-center">
                            <DeltaConnection resistances={deltaResistances} />
                        </div>
                    </CardContent>
                </Card>

                {/* Delta to Star Card */}
                <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-ksp-green" />
                                Delta → Star
                            </span>
                            <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                        </CardTitle>
                        <CardDescription>Convert Delta connection to Star equivalent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">R1 (Ω)</Label>
                                <Input
                                    value={deltaResistances.r1}
                                    onChange={(e) => setDeltaResistances({ ...deltaResistances, r1: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">R2 (Ω)</Label>
                                <Input
                                    value={deltaResistances.r2}
                                    onChange={(e) => setDeltaResistances({ ...deltaResistances, r2: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold text-gray-400">R3 (Ω)</Label>
                                <Input
                                    value={deltaResistances.r3}
                                    onChange={(e) => setDeltaResistances({ ...deltaResistances, r3: e.target.value })}
                                    className="dark:bg-[#0a0f1a] dark:border-white/5 font-mono text-center"
                                    placeholder="0.0"
                                />
                            </div>
                        </div>

                        <Button onClick={calculateDeltaToStar} variant="success" className="w-full font-bold shadow-sm">
                            Convert to Star
                        </Button>

                        <div className="pt-4 border-t dark:border-white/5 flex justify-center">
                            <StarConnection resistances={starResistances} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" onClick={resetAll} className="px-10 border-gray-200 dark:border-white/10 dark:hover:bg-white/5">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset All Calculations
                </Button>
            </div>
        </div>
    );
};

export default ConversionForm;
