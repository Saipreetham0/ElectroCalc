"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Battery, RotateCcw, Info } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BatteryBackupTimeCalculator: React.FC = () => {
    const [batteryAh, setBatteryAh] = useState<string>("150");
    const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
    const [loadWatts, setLoadWatts] = useState<string>("400");
    const [inverterEfficiency, setInverterEfficiency] = useState<string>("85");
    const [dod, setDod] = useState<string>("50");

    const result = useMemo(() => {
        const ah = parseFloat(batteryAh);
        const w = parseFloat(loadWatts);
        const eff = parseFloat(inverterEfficiency) / 100;
        const dodVal = parseFloat(dod) / 100;
        if (isNaN(ah) || isNaN(w) || isNaN(eff) || isNaN(dodVal) || ah <= 0 || w <= 0 || eff <= 0) return null;

        const batteryWh = ah * batteryVoltage;
        const usableWh = batteryWh * dodVal;
        const effectiveWh = usableWh * eff;
        const backupHours = effectiveWh / w;
        const backupMinutes = backupHours * 60;

        return {
            batteryWh: batteryWh.toFixed(0),
            usableWh: usableWh.toFixed(0),
            effectiveWh: effectiveWh.toFixed(0),
            backupHours: backupHours.toFixed(2),
            backupMinutes: backupMinutes.toFixed(0),
            displayTime: backupHours >= 1
                ? `${Math.floor(backupHours)}h ${Math.round((backupHours % 1) * 60)}m`
                : `${backupMinutes} minutes`,
        };
    }, [batteryAh, batteryVoltage, loadWatts, inverterEfficiency, dod]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="Battery Backup Time Calculator" description="Calculate how long your inverter battery will last based on battery capacity, load, and efficiency." />
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2"><Battery className="h-5 w-5 text-ksp-blue" /><CardTitle className="text-xl font-bold">Input Parameters</CardTitle></div>
                            <CardDescription>Enter your battery and load details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Battery Capacity (Ah)</Label>
                                <Input type="number" value={batteryAh} onChange={(e) => setBatteryAh(e.target.value)} placeholder="150" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Battery Voltage</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[12, 24, 48].map((v) => (
                                        <button key={v} onClick={() => setBatteryVoltage(v)} className={`py-2 rounded-lg border text-sm font-bold transition-all ${batteryVoltage === v ? "bg-ksp-blue border-ksp-blue text-white" : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500"}`}>{v}V</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Total Load (Watts)</Label>
                                <Input type="number" value={loadWatts} onChange={(e) => setLoadWatts(e.target.value)} placeholder="400" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1">
                                    <Label>Inverter Efficiency (%)</Label>
                                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Typical: 80-90% for sine wave inverters</TooltipContent></Tooltip></TooltipProvider>
                                </div>
                                <Input type="number" value={inverterEfficiency} onChange={(e) => setInverterEfficiency(e.target.value)} placeholder="85" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1">
                                    <Label>Depth of Discharge — DoD (%)</Label>
                                    <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Lead-acid: 50%, Lithium: 80-90%. Going deeper shortens battery life.</TooltipContent></Tooltip></TooltipProvider>
                                </div>
                                <Input type="number" value={dod} onChange={(e) => setDod(e.target.value)} placeholder="50" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <Button onClick={() => { setBatteryAh("150"); setLoadWatts("400"); setInverterEfficiency("85"); setDod("50"); setBatteryVoltage(12); }} variant="outline" className="w-full h-10 dark:border-white/10"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {result && (
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Backup Time</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-center p-8 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20 mb-6">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Estimated Backup</div>
                                        <div className="text-5xl font-black text-ksp-blue">{result.displayTime}</div>
                                        <div className="text-sm text-gray-500 mt-2">({result.backupHours} hours)</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Total Battery Energy</span><span className="font-mono text-ksp-blue font-bold">{result.batteryWh} Wh</span></div>
                                        <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Usable Energy (DoD)</span><span className="font-mono text-ksp-blue font-bold">{result.usableWh} Wh</span></div>
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Effective Energy (after losses)</span><span className="font-mono text-ksp-blue font-bold">{result.effectiveWh} Wh</span></div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Common Indian Batteries</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-1.5 text-sm">
                                    {[{ name: "Luminous RC 18000", ah: "150Ah", v: "12V" }, { name: "Exide Inva Master", ah: "150Ah", v: "12V" }, { name: "Amaron CR 150Ah", ah: "150Ah", v: "12V" }, { name: "Livguard LG-S 1560", ah: "150Ah", v: "12V" }, { name: "Microtek TT 2450", ah: "150Ah", v: "12V" }].map((b) => (
                                        <div key={b.name} className="flex justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <span className="text-gray-700 dark:text-gray-300">{b.name}</span>
                                            <span className="text-ksp-blue font-bold font-mono text-xs">{b.ah} / {b.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatteryBackupTimeCalculator;
