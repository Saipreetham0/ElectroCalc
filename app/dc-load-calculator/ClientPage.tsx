"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap, RotateCcw, Plus, Trash2 } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";

interface DCAppliance { id: number; name: string; voltage: string; current: string; qty: string; hours: string; }
let nextId = 1;

const DCLoadCalculator: React.FC = () => {
    const [systemVoltage, setSystemVoltage] = useState<number>(12);
    const [appliances, setAppliances] = useState<DCAppliance[]>([
        { id: nextId++, name: "LED Light", voltage: "12", current: "1", qty: "4", hours: "6" },
        { id: nextId++, name: "DC Fan", voltage: "12", current: "2.5", qty: "2", hours: "8" },
    ]);

    const addAppliance = () => setAppliances([...appliances, { id: nextId++, name: "", voltage: systemVoltage.toString(), current: "", qty: "1", hours: "1" }]);
    const removeAppliance = (id: number) => setAppliances(appliances.filter((a) => a.id !== id));
    const updateAppliance = (id: number, field: keyof DCAppliance, value: string) => setAppliances(appliances.map((a) => a.id === id ? { ...a, [field]: value } : a));

    const result = useMemo(() => {
        let totalWatts = 0;
        let totalWhPerDay = 0;
        const items = appliances.map((a) => {
            const v = parseFloat(a.voltage) || 0;
            const i = parseFloat(a.current) || 0;
            const q = parseInt(a.qty) || 0;
            const h = parseFloat(a.hours) || 0;
            const watts = v * i * q;
            const wh = watts * h;
            totalWatts += watts;
            totalWhPerDay += wh;
            return { ...a, watts, wh };
        });
        const totalAmps = systemVoltage > 0 ? totalWatts / systemVoltage : 0;
        return { items, totalWatts, totalAmps, totalWhPerDay, totalAhPerDay: systemVoltage > 0 ? totalWhPerDay / systemVoltage : 0 };
    }, [appliances, systemVoltage]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="DC Load Calculator" description="Add up your DC appliances to find total load in watts and amps. Ideal for 12V, 24V, and 48V off-grid and solar systems." />
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2"><Zap className="h-5 w-5 text-ksp-blue" /><CardTitle className="text-xl font-bold">DC Appliances</CardTitle></div>
                                    <div className="flex gap-2">
                                        {[12, 24, 48].map((v) => (
                                            <button key={v} onClick={() => setSystemVoltage(v)} className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${systemVoltage === v ? "bg-ksp-blue border-ksp-blue text-white" : "border-gray-200 dark:border-white/10 text-gray-500"}`}>{v}V</button>
                                        ))}
                                    </div>
                                </div>
                                <CardDescription>Add your DC loads for the system</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Header */}
                                <div className="grid grid-cols-[1fr_60px_60px_50px_50px_32px] gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
                                    <span>Appliance</span><span>V</span><span>Amps</span><span>Qty</span><span>Hrs</span><span></span>
                                </div>
                                {appliances.map((a) => (
                                    <div key={a.id} className="grid grid-cols-[1fr_60px_60px_50px_50px_32px] gap-2 items-center">
                                        <Input value={a.name} onChange={(e) => updateAppliance(a.id, "name", e.target.value)} placeholder="Name" className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.voltage} onChange={(e) => updateAppliance(a.id, "voltage", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.current} onChange={(e) => updateAppliance(a.id, "current", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.qty} onChange={(e) => updateAppliance(a.id, "qty", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <Input type="number" value={a.hours} onChange={(e) => updateAppliance(a.id, "hours", e.target.value)} className="h-9 text-sm dark:bg-[#0a0f1a] dark:border-white/10" />
                                        <button onClick={() => removeAppliance(a.id)} className="h-9 w-8 flex items-center justify-center text-red-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                                    </div>
                                ))}
                                <Button onClick={addAppliance} variant="outline" className="w-full h-9 text-sm dark:border-white/10"><Plus className="mr-1 h-3.5 w-3.5" />Add Appliance</Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Total DC Load</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-6 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Peak Load</div>
                                    <div className="text-4xl font-black text-ksp-blue">{result.totalWatts.toFixed(1)} W</div>
                                    <div className="text-sm text-gray-500 mt-1">{result.totalAmps.toFixed(2)} A at {systemVoltage}V</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2"><span className="text-gray-600 dark:text-gray-400">Daily Energy</span><span className="font-mono text-ksp-blue font-bold">{result.totalWhPerDay.toFixed(0)} Wh</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Daily Ah</span><span className="font-mono text-ksp-blue font-bold">{result.totalAhPerDay.toFixed(1)} Ah</span></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader><CardTitle className="text-lg font-bold">Breakdown</CardTitle></CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                {result.items.filter((i) => i.watts > 0).map((item) => (
                                    <div key={item.id} className="flex justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <span className="text-gray-700 dark:text-gray-300">{item.name || "Unnamed"}</span>
                                        <span className="font-mono text-ksp-blue font-bold text-xs">{item.watts.toFixed(1)}W · {item.wh.toFixed(0)}Wh/day</span>
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

export default DCLoadCalculator;
