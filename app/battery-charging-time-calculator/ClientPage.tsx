"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Battery, RotateCcw, Info } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BatteryChargingTimeCalculator: React.FC = () => {
    const [batteryAh, setBatteryAh] = useState<string>("150");
    const [chargerCurrent, setChargerCurrent] = useState<string>("15");
    const [dod, setDod] = useState<string>("50");
    const [chargingEfficiency, setChargingEfficiency] = useState<string>("80");

    const result = useMemo(() => {
        const ah = parseFloat(batteryAh);
        const ic = parseFloat(chargerCurrent);
        const dodVal = parseFloat(dod) / 100;
        const eff = parseFloat(chargingEfficiency) / 100;
        if (isNaN(ah) || isNaN(ic) || isNaN(dodVal) || isNaN(eff) || ah <= 0 || ic <= 0 || eff <= 0) return null;

        const ahToCharge = ah * dodVal;
        const chargeTime = ahToCharge / (ic * eff);
        const hours = Math.floor(chargeTime);
        const minutes = Math.round((chargeTime - hours) * 60);

        return {
            ahToCharge: ahToCharge.toFixed(1),
            chargeTimeHours: chargeTime.toFixed(2),
            displayTime: `${hours}h ${minutes}m`,
            recommendedRate: (ah * 0.1).toFixed(1),
            fastRate: (ah * 0.2).toFixed(1),
            trickleRate: (ah * 0.05).toFixed(1),
        };
    }, [batteryAh, chargerCurrent, dod, chargingEfficiency]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="Battery Charging Time Calculator" description="Estimate how long it takes to charge your inverter, UPS, or solar battery." />
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2"><Battery className="h-5 w-5 text-ksp-blue" /><CardTitle className="text-xl font-bold">Input Parameters</CardTitle></div>
                            <CardDescription>Enter battery and charger details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label>Battery Capacity (Ah)</Label><Input type="number" value={batteryAh} onChange={(e) => setBatteryAh(e.target.value)} placeholder="150" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            <div className="space-y-2"><Label>Charger Current (A)</Label><Input type="number" value={chargerCurrent} onChange={(e) => setChargerCurrent(e.target.value)} placeholder="15" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1"><Label>Depth of Discharge (%)</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>How much of the battery was used before charging. 50% is typical for lead-acid.</TooltipContent></Tooltip></TooltipProvider></div>
                                <Input type="number" value={dod} onChange={(e) => setDod(e.target.value)} placeholder="50" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1"><Label>Charging Efficiency (%)</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Energy lost as heat during charging. 80% for lead-acid, 95% for lithium.</TooltipContent></Tooltip></TooltipProvider></div>
                                <Input type="number" value={chargingEfficiency} onChange={(e) => setChargingEfficiency(e.target.value)} placeholder="80" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <Button onClick={() => { setBatteryAh("150"); setChargerCurrent("15"); setDod("50"); setChargingEfficiency("80"); }} variant="outline" className="w-full h-10 dark:border-white/10"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {result && (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Charging Time</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-center p-8 bg-ksp-green/5 rounded-xl border border-ksp-green/20 mb-6">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Estimated Charge Time</div>
                                        <div className="text-5xl font-black text-ksp-green">{result.displayTime}</div>
                                        <div className="text-sm text-gray-500 mt-2">({result.chargeTimeHours} hours)</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Ah to Recharge</span><span className="font-mono text-ksp-blue font-bold">{result.ahToCharge} Ah</span></div>
                                        <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Recommended Rate (C/10)</span><span className="font-mono text-ksp-blue font-bold">{result.recommendedRate} A</span></div>
                                        <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Fast Rate (C/5)</span><span className="font-mono text-ksp-blue font-bold">{result.fastRate} A</span></div>
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Trickle Rate (C/20)</span><span className="font-mono text-ksp-blue font-bold">{result.trickleRate} A</span></div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Quick Guide</CardTitle></CardHeader>
                            <CardContent><ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                <li>C/10 rate (recommended) = Battery Ah ÷ 10</li>
                                <li>Lead-acid batteries need ~80% charging efficiency factor</li>
                                <li>Lithium batteries are ~95% efficient while charging</li>
                                <li>Never fast-charge a lead-acid battery above C/5 rate</li>
                                <li>Most Indian inverters charge at 10–15A by default</li>
                            </ul></CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatteryChargingTimeCalculator;
