"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Battery, RotateCcw, Info, CheckCircle2 } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const INVERTER_SIZES = [600, 700, 800, 900, 1000, 1100, 1400, 1500, 2000, 2500, 3000, 3500, 5000];
const BATTERY_SIZES = [100, 120, 150, 180, 200, 220];

const InverterBatteryMatchingCalculator: React.FC = () => {
    const [totalLoad, setTotalLoad] = useState<string>("400");
    const [backupHours, setBackupHours] = useState<string>("4");
    const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
    const [inverterEfficiency, setInverterEfficiency] = useState<string>("85");
    const [dod, setDod] = useState<string>("50");

    const result = useMemo(() => {
        const w = parseFloat(totalLoad);
        const hrs = parseFloat(backupHours);
        const eff = parseFloat(inverterEfficiency) / 100;
        const dodVal = parseFloat(dod) / 100;
        if (isNaN(w) || isNaN(hrs) || isNaN(eff) || isNaN(dodVal) || w <= 0 || hrs <= 0 || eff <= 0 || dodVal <= 0) return null;

        // Inverter VA (add 20-25% safety margin)
        const requiredVA = w / 0.8; // assuming 0.8 power factor
        const recommendedVA = requiredVA * 1.25;
        const selectedInverter = INVERTER_SIZES.find((s) => s >= recommendedVA) || INVERTER_SIZES[INVERTER_SIZES.length - 1];

        // Battery Ah
        const totalWhNeeded = w * hrs;
        const requiredAh = totalWhNeeded / (batteryVoltage * eff * dodVal);
        const selectedBattery = BATTERY_SIZES.find((s) => s >= requiredAh) || BATTERY_SIZES[BATTERY_SIZES.length - 1];

        // Number of batteries in series for higher voltages
        const batteriesInSeries = batteryVoltage / 12;

        // Actual backup with selected components
        const actualBackup = (selectedBattery * batteryVoltage * eff * dodVal) / w;

        return {
            requiredVA: requiredVA.toFixed(0),
            recommendedVA: recommendedVA.toFixed(0),
            selectedInverter,
            requiredAh: requiredAh.toFixed(1),
            selectedBattery,
            batteriesInSeries,
            totalWhNeeded: totalWhNeeded.toFixed(0),
            actualBackup: actualBackup.toFixed(2),
            actualBackupDisplay: `${Math.floor(actualBackup)}h ${Math.round((actualBackup % 1) * 60)}m`,
        };
    }, [totalLoad, backupHours, batteryVoltage, inverterEfficiency, dod]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="Inverter Battery Matching Calculator" description="Find the right inverter VA rating and battery Ah capacity for your home load and desired backup hours." />
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2"><Battery className="h-5 w-5 text-ksp-blue" /><CardTitle className="text-xl font-bold">Your Requirements</CardTitle></div>
                            <CardDescription>Enter your load and backup needs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label>Total Load (Watts)</Label><Input type="number" value={totalLoad} onChange={(e) => setTotalLoad(e.target.value)} placeholder="400" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            <div className="space-y-2"><Label>Required Backup Hours</Label><Input type="number" value={backupHours} onChange={(e) => setBackupHours(e.target.value)} placeholder="4" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            <div className="space-y-2">
                                <Label>System Voltage</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[12, 24, 48].map((v) => (
                                        <button key={v} onClick={() => setBatteryVoltage(v)} className={`py-2 rounded-lg border text-sm font-bold transition-all ${batteryVoltage === v ? "bg-ksp-blue border-ksp-blue text-white" : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500"}`}>{v}V</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1"><Label>Inverter Efficiency (%)</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>80-90% for pure sine wave inverters</TooltipContent></Tooltip></TooltipProvider></div>
                                <Input type="number" value={inverterEfficiency} onChange={(e) => setInverterEfficiency(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1"><Label>Depth of Discharge (%)</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Lead-acid: 50%, Lithium: 80%</TooltipContent></Tooltip></TooltipProvider></div>
                                <Input type="number" value={dod} onChange={(e) => setDod(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <Button onClick={() => { setTotalLoad("400"); setBackupHours("4"); setBatteryVoltage(12); setInverterEfficiency("85"); setDod("50"); }} variant="outline" className="w-full h-10 dark:border-white/10"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
                        </CardContent>
                    </Card>

                    {result && (
                        <div className="space-y-6">
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Recommended Setup</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-5 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Inverter</div>
                                        <div className="text-3xl font-black text-ksp-blue">{result.selectedInverter} VA</div>
                                        <div className="text-xs text-gray-500 mt-1">Min required: {result.requiredVA} VA (with safety: {result.recommendedVA} VA)</div>
                                    </div>
                                    <div className="p-5 bg-ksp-green/5 rounded-xl border border-ksp-green/20">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Battery</div>
                                        <div className="text-3xl font-black text-ksp-green">
                                            {result.batteriesInSeries > 1 ? `${result.batteriesInSeries} × ` : ""}{result.selectedBattery} Ah
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Min required: {result.requiredAh} Ah
                                            {result.batteriesInSeries > 1 ? ` (${result.batteriesInSeries} batteries in series for ${batteryVoltage}V)` : " (12V)"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-ksp-green flex-shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-400">Actual backup: <strong className="text-gray-900 dark:text-white">{result.actualBackupDisplay}</strong> at {totalLoad}W load</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Details</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Total Energy Needed</span><span className="font-mono text-ksp-blue font-bold">{result.totalWhNeeded} Wh</span></div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">System Voltage</span><span className="font-mono text-ksp-blue font-bold">{batteryVoltage}V</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Batteries in Series</span><span className="font-mono text-ksp-blue font-bold">{result.batteriesInSeries}</span></div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InverterBatteryMatchingCalculator;
