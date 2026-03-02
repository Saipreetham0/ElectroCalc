"use client";
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sun, RotateCcw, Info, CheckCircle2 } from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SolarLoadCalculator: React.FC = () => {
    const [dailyLoad, setDailyLoad] = useState<string>("2000"); // Wh/day
    const [peakLoad, setPeakLoad] = useState<string>("500"); // watts
    const [sunHours, setSunHours] = useState<string>("5"); // peak sun hours
    const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
    const [autonomyDays, setAutonomyDays] = useState<string>("1");
    const [dod, setDod] = useState<string>("50");
    const [panelLoss, setPanelLoss] = useState<string>("20"); // dust, temp, wiring losses
    const [inverterEfficiency, setInverterEfficiency] = useState<string>("85");

    const result = useMemo(() => {
        const load = parseFloat(dailyLoad);
        const peak = parseFloat(peakLoad);
        const sun = parseFloat(sunHours);
        const auto = parseFloat(autonomyDays);
        const dodVal = parseFloat(dod) / 100;
        const loss = parseFloat(panelLoss) / 100;
        const eff = parseFloat(inverterEfficiency) / 100;
        if (isNaN(load) || isNaN(sun) || isNaN(auto) || isNaN(dodVal) || isNaN(loss) || isNaN(eff) || load <= 0 || sun <= 0) return null;

        // Account for inverter losses
        const actualDailyWh = load / eff;

        // Solar panel sizing (account for losses)
        const panelWp = actualDailyWh / (sun * (1 - loss));

        // Standard panel sizes (Indian market)
        const panelSizes = [100, 150, 200, 330, 380, 400, 440, 500, 545];
        const recommended330 = Math.ceil(panelWp / 330);
        const recommended440 = Math.ceil(panelWp / 440);

        // Battery sizing
        const batteryWh = actualDailyWh * auto / dodVal;
        const batteryAh = batteryWh / batteryVoltage;
        const batterySizes = [100, 120, 150, 180, 200, 220];
        const selectedBatteryAh = batterySizes.find((s) => s >= batteryAh / Math.ceil(batteryAh / 220)) || 220;
        const numBatteriesParallel = Math.ceil(batteryAh / selectedBatteryAh);
        const numBatteriesSeries = batteryVoltage / 12;

        // Charge controller
        const chargeCurrent = panelWp / batteryVoltage;
        const ccSizes = [10, 20, 30, 40, 50, 60, 80, 100];
        const selectedCC = ccSizes.find((s) => s >= chargeCurrent * 1.25) || ccSizes[ccSizes.length - 1];

        // Inverter
        const inverterVA = peak > 0 ? Math.ceil((peak / 0.8) * 1.25) : 0;
        const inverterSizes = [600, 800, 1000, 1500, 2000, 3000, 5000];
        const selectedInverter = inverterSizes.find((s) => s >= inverterVA) || inverterSizes[inverterSizes.length - 1];

        return {
            panelWp: panelWp.toFixed(0),
            recommended330,
            recommended440,
            batteryAh: batteryAh.toFixed(0),
            selectedBatteryAh,
            numBatteriesParallel,
            numBatteriesSeries,
            totalBatteries: numBatteriesParallel * numBatteriesSeries,
            chargeCurrent: chargeCurrent.toFixed(1),
            selectedCC,
            selectedInverter,
            actualDailyWh: actualDailyWh.toFixed(0),
            batteryWh: batteryWh.toFixed(0),
        };
    }, [dailyLoad, peakLoad, sunHours, batteryVoltage, autonomyDays, dod, panelLoss, inverterEfficiency]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader title="Solar Load Calculator" description="Size your solar panel array, battery bank, charge controller, and inverter based on your daily load and sun hours." />
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                        <CardHeader className="space-y-2">
                            <div className="flex items-center space-x-2"><Sun className="h-5 w-5 text-amber-500" /><CardTitle className="text-xl font-bold">System Requirements</CardTitle></div>
                            <CardDescription>Enter your load and location details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Daily Energy Consumption (Wh/day)</Label>
                                <Input type="number" value={dailyLoad} onChange={(e) => setDailyLoad(e.target.value)} placeholder="2000" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" />
                                <p className="text-xs text-gray-400">Use the AC Load Calculator to find this value</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Peak Load (Watts)</Label>
                                <Input type="number" value={peakLoad} onChange={(e) => setPeakLoad(e.target.value)} placeholder="500" className="text-lg h-12 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-1"><Label>Peak Sun Hours</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>India averages 4–6 peak sun hours. Southern India: 5–6h, Northern: 4–5h.</TooltipContent></Tooltip></TooltipProvider></div>
                                <Input type="number" value={sunHours} onChange={(e) => setSunHours(e.target.value)} placeholder="5" className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>System Voltage</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[12, 24, 48].map((v) => (
                                        <button key={v} onClick={() => setBatteryVoltage(v)} className={`py-2 rounded-lg border text-sm font-bold transition-all ${batteryVoltage === v ? "bg-ksp-blue border-ksp-blue text-white" : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500"}`}>{v}V</button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1"><Label>Autonomy (days)</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="h-3.5 w-3.5 text-gray-400 cursor-help" /></TooltipTrigger><TooltipContent>Number of cloudy/no-sun days the battery should sustain</TooltipContent></Tooltip></TooltipProvider></div>
                                    <Input type="number" value={autonomyDays} onChange={(e) => setAutonomyDays(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" />
                                </div>
                                <div className="space-y-2"><Label>DoD (%)</Label><Input type="number" value={dod} onChange={(e) => setDod(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>System Losses (%)</Label><Input type="number" value={panelLoss} onChange={(e) => setPanelLoss(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                                <div className="space-y-2"><Label>Inverter Eff (%)</Label><Input type="number" value={inverterEfficiency} onChange={(e) => setInverterEfficiency(e.target.value)} className="h-10 dark:bg-[#0a0f1a] dark:border-white/10" /></div>
                            </div>
                            <Button onClick={() => { setDailyLoad("2000"); setPeakLoad("500"); setSunHours("5"); setBatteryVoltage(12); setAutonomyDays("1"); setDod("50"); setPanelLoss("20"); setInverterEfficiency("85"); }} variant="outline" className="w-full h-10 dark:border-white/10"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
                        </CardContent>
                    </Card>

                    {result && (
                        <div className="space-y-6">
                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Recommended Solar System</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Solar Panels */}
                                    <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800/30">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Sun className="h-3.5 w-3.5" />Solar Panels</div>
                                        <div className="text-3xl font-black text-amber-600 dark:text-amber-500">{result.panelWp} Wp Total</div>
                                        <div className="text-xs text-gray-500 mt-1">{result.recommended330} × 330W panels or {result.recommended440} × 440W panels</div>
                                    </div>
                                    {/* Battery */}
                                    <div className="p-5 bg-ksp-green/5 rounded-xl border border-ksp-green/20">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Battery Bank</div>
                                        <div className="text-3xl font-black text-ksp-green">{result.batteryAh} Ah @ {batteryVoltage}V</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {result.totalBatteries} × {result.selectedBatteryAh}Ah (12V) batteries
                                            {result.numBatteriesSeries > 1 ? ` — ${result.numBatteriesSeries}S` : ""}
                                            {result.numBatteriesParallel > 1 ? `${result.numBatteriesParallel}P` : ""}
                                        </div>
                                    </div>
                                    {/* Charge Controller */}
                                    <div className="p-5 bg-ksp-blue/5 rounded-xl border border-ksp-blue/20">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Charge Controller</div>
                                        <div className="text-3xl font-black text-ksp-blue">{result.selectedCC}A MPPT</div>
                                        <div className="text-xs text-gray-500 mt-1">Calculated charge current: {result.chargeCurrent}A</div>
                                    </div>
                                    {/* Inverter */}
                                    <div className="p-5 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-800/30">
                                        <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Inverter</div>
                                        <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{result.selectedInverter} VA</div>
                                        <div className="text-xs text-gray-500 mt-1">Pure sine wave recommended</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                                <CardHeader><CardTitle className="text-lg font-bold">Indian Sun Hours Reference</CardTitle></CardHeader>
                                <CardContent className="space-y-1.5 text-sm">
                                    {[
                                        { region: "Rajasthan / Gujarat", hours: "5.5 – 6.5" },
                                        { region: "Tamil Nadu / Karnataka", hours: "5.0 – 6.0" },
                                        { region: "Maharashtra / AP / Telangana", hours: "5.0 – 5.5" },
                                        { region: "UP / MP / Bihar", hours: "4.5 – 5.5" },
                                        { region: "Delhi / Haryana / Punjab", hours: "4.5 – 5.0" },
                                        { region: "West Bengal / Northeast", hours: "3.5 – 4.5" },
                                    ].map((r) => (
                                        <div key={r.region} className="flex justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                            <span className="text-gray-700 dark:text-gray-300">{r.region}</span>
                                            <span className="font-mono text-amber-600 font-bold text-xs">{r.hours}h</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SolarLoadCalculator;
