"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap, RotateCcw, Plus, Trash2, Info } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ACAppliance { id: number; name: string; watts: string; qty: string; hours: string; pf: string; }
let nextId = 1;

const COMMON_APPLIANCES = [
    { name: "Ceiling Fan", watts: "75", pf: "0.65" },
    { name: "LED Bulb (12W)", watts: "12", pf: "0.95" },
    { name: "Tube Light", watts: "36", pf: "0.85" },
    { name: "Refrigerator", watts: "150", pf: "0.65" },
    { name: "TV (LED 42\")", watts: "80", pf: "0.95" },
    { name: "Air Cooler", watts: "200", pf: "0.70" },
    { name: "Washing Machine", watts: "500", pf: "0.65" },
    { name: "AC (1 Ton)", watts: "1100", pf: "0.85" },
    { name: "AC (1.5 Ton)", watts: "1600", pf: "0.85" },
    { name: "Water Heater (Geyser)", watts: "2000", pf: "1.00" },
    { name: "Iron", watts: "1000", pf: "1.00" },
    { name: "Mixer Grinder", watts: "750", pf: "0.70" },
    { name: "Laptop Charger", watts: "65", pf: "0.95" },
    { name: "Phone Charger", watts: "20", pf: "0.90" },
    { name: "Wi-Fi Router", watts: "15", pf: "0.95" },
];

const ACLoadCalculator: React.FC = () => {
    const [electricityRate, setElectricityRate] = useState<string>("8");
    const [appliances, setAppliances] = useState<ACAppliance[]>([
        { id: nextId++, name: "Ceiling Fan", watts: "75", qty: "3", hours: "12", pf: "0.65" },
        { id: nextId++, name: "LED Bulb", watts: "12", qty: "6", hours: "6", pf: "0.95" },
        { id: nextId++, name: "Refrigerator", watts: "150", qty: "1", hours: "24", pf: "0.65" },
        { id: nextId++, name: "TV", watts: "80", qty: "1", hours: "5", pf: "0.95" },
    ]);

    const addAppliance = () => setAppliances([...appliances, { id: nextId++, name: "", watts: "", qty: "1", hours: "1", pf: "0.8" }]);
    const addPreset = (preset: typeof COMMON_APPLIANCES[0]) => setAppliances([...appliances, { id: nextId++, name: preset.name, watts: preset.watts, qty: "1", hours: "1", pf: preset.pf }]);
    const removeAppliance = (id: number) => setAppliances(appliances.filter((a) => a.id !== id));
    const updateAppliance = (id: number, field: keyof ACAppliance, value: string) => setAppliances(appliances.map((a) => a.id === id ? { ...a, [field]: value } : a));

    const result = useMemo(() => {
        let totalWatts = 0;
        let totalVA = 0;
        let totalWhPerDay = 0;
        const rate = parseFloat(electricityRate) || 0;

        const items = appliances.map((a) => {
            const w = parseFloat(a.watts) || 0;
            const q = parseInt(a.qty) || 0;
            const h = parseFloat(a.hours) || 0;
            const pf = parseFloat(a.pf) || 0.8;
            const realPower = w * q;
            const apparentPower = pf > 0 ? realPower / pf : realPower;
            const whPerDay = realPower * h;
            totalWatts += realPower;
            totalVA += apparentPower;
            totalWhPerDay += whPerDay;
            return { ...a, realPower, apparentPower, whPerDay };
        });

        const kwhPerDay = totalWhPerDay / 1000;
        const kwhPerMonth = kwhPerDay * 30;
        const monthlyCost = kwhPerMonth * rate;

        return { items, totalWatts, totalVA, totalWhPerDay, kwhPerDay, kwhPerMonth, monthlyCost };
    }, [appliances, electricityRate]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="AC Load Calculator" description="Add your household or office appliances to find total power consumption, monthly energy (kWh), and estimated electricity cost." />
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {/* Quick add */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <div className="flex items-center space-x-2"><Zap className="h-5 w-5 text-ksp-blue" /><CardTitle className="text-lg font-bold">Quick Add Appliance</CardTitle></div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {COMMON_APPLIANCES.map((p) => (
                                        <button key={p.name} onClick={() => addPreset(p)} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:border-ksp-blue hover:text-ksp-blue transition-colors">{p.name}</button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Appliance list */}
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold">Appliances</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Label className="text-xs text-gray-500">₹/kWh:</Label>
                                        <Input type="number" value={electricityRate} onChange={(e) => setElectricityRate(e.target.value)} className="w-20 h-8 text-xs dark:bg-[#0a0f1a] dark:border-white/10" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-[1fr_70px_50px_50px_55px_32px] gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
                                    <span>Appliance</span><span>Watts</span><span>Qty</span><span>Hrs</span>
                                    <span className="flex items-center gap-0.5">PF<TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3 w-3 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Power Factor (0.5–1.0)</TooltipContent></Tooltip></TooltipProvider></span>
                                    <span></span>
                                </div>
                                {appliances.map((a) => (
                                    <div key={a.id} className="grid grid-cols-[1fr_70px_50px_50px_55px_32px] gap-2 items-center">
                                        <Input value={a.name} onChange={(e) => updateAppliance(a.id, "name", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.watts} onChange={(e) => updateAppliance(a.id, "watts", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.qty} onChange={(e) => updateAppliance(a.id, "qty", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.hours} onChange={(e) => updateAppliance(a.id, "hours", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.pf} onChange={(e) => updateAppliance(a.id, "pf", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" step="0.05" />
                                        <button onClick={() => removeAppliance(a.id)} className="h-9 w-8 flex items-center justify-center text-red-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                                    </div>
                                ))}
                                <Button onClick={addAppliance} variant="outline" className="w-full h-9 text-sm dark:border-white/10"><Plus className="mr-1 h-3.5 w-3.5" />Add Row</Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Power Summary</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-5 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total Real Power</div>
                                    <div className="text-4xl font-black text-ksp-blue">{result.totalWatts.toFixed(0)} W</div>
                                    <div className="text-sm text-gray-500 mt-1">{result.totalVA.toFixed(0)} VA apparent</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Daily Energy</span><span className="font-mono text-ksp-blue font-bold">{result.kwhPerDay.toFixed(2)} kWh</span></div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Monthly Energy</span><span className="font-mono text-ksp-blue font-bold">{result.kwhPerMonth.toFixed(1)} kWh</span></div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 font-semibold">Monthly Cost (est.)</span>
                                        <span className="font-mono text-ksp-green font-bold text-lg">₹{result.monthlyCost.toFixed(0)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Per-Appliance Breakdown</CardTitle></CardHeader>
                            <CardContent className="space-y-2 text-sm max-h-64 overflow-y-auto">
                                {result.items.filter((i) => i.realPower > 0).map((item) => (
                                    <div key={item.id} className="flex justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <span className="text-gray-700 dark:text-gray-300 truncate mr-2">{item.name || "Unnamed"}</span>
                                        <span className="font-mono text-ksp-blue font-bold text-xs whitespace-nowrap">{item.realPower}W · {(item.whPerDay / 1000).toFixed(2)} kWh/day</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ACLoadCalculator;
