"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Battery,
  Zap,
  RotateCcw,
  Clock,
  Download,
  Info,
  AlertCircle,
} from "lucide-react";
import ToolPageHeader from "@/components/ToolPageHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  icon: string;
  category: string;
}

const APPLIANCES: Appliance[] = [
  // Fans and Coolers
  { id: "ceiling-fan", name: "Ceiling Fan", watts: 75, icon: "🌀", category: "Fans and Coolers" },
  { id: "table-fan", name: "Table Fan", watts: 50, icon: "🌬️", category: "Fans and Coolers" },
  { id: "room-cooler", name: "Room Cooler", watts: 250, icon: "❄️", category: "Fans and Coolers" },

  // Laptops and Computers
  { id: "laptop", name: "Laptop", watts: 65, icon: "💻", category: "Laptops and Computers" },
  { id: "desktop-pc", name: "Desktop PC", watts: 250, icon: "🖥️", category: "Laptops and Computers" },
  { id: "printer", name: "Printer", watts: 150, icon: "🖨️", category: "Laptops and Computers" },

  // Lights
  { id: "led-bulb", name: "LED Bulb", watts: 9, icon: "💡", category: "Lights" },
  { id: "tube-light", name: "Tube Light", watts: 40, icon: "🔦", category: "Lights" },
  { id: "cfl", name: "CFL", watts: 25, icon: "💡", category: "Lights" },

  // Home Appliances
  { id: "refrigerator", name: "Refrigerator", watts: 200, icon: "🧊", category: "Home Appliances" },
  { id: "washing-machine", name: "Washing Machine", watts: 500, icon: "🫧", category: "Home Appliances" },
  { id: "microwave-oven", name: "Microwave Oven", watts: 1200, icon: "♨️", category: "Home Appliances" },
  { id: "iron", name: "Iron", watts: 1000, icon: "👔", category: "Home Appliances" },
  { id: "water-purifier", name: "Water Purifier", watts: 60, icon: "💧", category: "Home Appliances" },

  // TV & Other Entertainment
  { id: "led-tv-32", name: "LED TV (32\")", watts: 80, icon: "📺", category: "TV & Other Entertainment" },
  { id: "led-tv-40", name: "LED TV (40\")", watts: 100, icon: "📺", category: "TV & Other Entertainment" },
  { id: "led-tv-55", name: "LED TV (55\")", watts: 150, icon: "📺", category: "TV & Other Entertainment" },
  { id: "set-top-box", name: "Set Top Box", watts: 25, icon: "📡", category: "TV & Other Entertainment" },
  { id: "music-system", name: "Music System", watts: 100, icon: "🔊", category: "TV & Other Entertainment" },

  // ACs
  { id: "ac-1t-3star", name: "AC (1 Ton, 3 Star)", watts: 1200, icon: "🧊", category: "ACs" },
  { id: "ac-1.5t-3star", name: "AC (1.5 Ton, 3 Star)", watts: 1700, icon: "🧊", category: "ACs" },
  { id: "ac-2t-3star", name: "AC (2 Ton, 3 Star)", watts: 2300, icon: "🧊", category: "ACs" },
  { id: "ac-1t-inv", name: "AC (1 Ton, Inverter)", watts: 1100, icon: "❄️", category: "ACs" },
  { id: "ac-1.5t-inv", name: "AC (1.5 Ton, Inverter)", watts: 1600, icon: "❄️", category: "ACs" },
  { id: "ac-2t-inv", name: "AC (2 Ton, Inverter)", watts: 2100, icon: "❄️", category: "ACs" },

  // Others
  { id: "wifi-router", name: "WiFi Router", watts: 15, icon: "📶", category: "Others" },
  { id: "mobile-charger", name: "Mobile Charger", watts: 10, icon: "📱", category: "Others" },
  { id: "cctv-system", name: "CCTV System", watts: 50, icon: "📹", category: "Others" },
  { id: "exhaust-fan", name: "Exhaust Fan", watts: 40, icon: "🌀", category: "Others" },

  // Motors
  { id: "pump-0.5hp", name: "Water Pump (0.5 HP)", watts: 375, icon: "🔧", category: "Motors" },
  { id: "pump-1hp", name: "Water Pump (1 HP)", watts: 750, icon: "🔧", category: "Motors" },
  { id: "mixer-grinder", name: "Mixer Grinder", watts: 750, icon: "🔄", category: "Motors" },
];

const InverterCalculator: React.FC = () => {
  const [selectedAppliances, setSelectedAppliances] = useState<{ [key: string]: number }>({});
  const [runtime, setRuntime] = useState<number>(4);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12);
  const [efficiency, setEfficiency] = useState<number>(85);

  const totalLoad = useMemo(() => {
    return Object.entries(selectedAppliances).reduce((acc, [type, count]) => {
      const appliance = APPLIANCES.find((a) => a.id === type);
      return acc + (appliance?.watts || 0) * count;
    }, 0);
  }, [selectedAppliances]);

  const recommendedInverterVA = useMemo(() => {
    // 25% safety margin
    return Math.ceil((totalLoad * 1.25) / (efficiency / 100));
  }, [totalLoad, efficiency]);

  const requiredBatteryAh = useMemo(() => {
    if (totalLoad === 0) return 0;
    // Ah = (Watts * Hours) / (Volts * Efficiency)
    return Math.ceil((totalLoad * runtime) / (batteryVoltage * (efficiency / 100)));
  }, [totalLoad, runtime, batteryVoltage, efficiency]);

  const toggleAppliance = useCallback((id: string, count: number) => {
    setSelectedAppliances((prev) => {
      const newCount = (prev[id] || 0) + count;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  }, []);

  const resetCalculator = () => {
    setSelectedAppliances({});
    setRuntime(4);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="Inverter & Battery Calculator"
        description="Calculate the required inverter capacity (VA) and battery size (Ah) based on your appliance load and desired backup time."
      />

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Selection */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-ksp-blue" />
                  Select Your Appliances
                </CardTitle>
                <CardDescription>Add the devices you want to run during power backup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {APPLIANCES.map((app) => (
                    <div
                      key={app.id}
                      className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${selectedAppliances[app.id]
                        ? 'border-ksp-blue bg-ksp-blue/5 dark:bg-ksp-blue/10'
                        : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{app.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white leading-tight">{app.name}</p>
                          <p className="text-xs text-gray-500">{app.watts}W <span className="opacity-50">/ each</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 shrink-0 rounded-full border border-gray-200 dark:border-white/10 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          onClick={() => toggleAppliance(app.id, -1)}
                          disabled={!selectedAppliances[app.id]}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center font-bold text-ksp-blue text-lg">
                          {selectedAppliances[app.id] || 0}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 shrink-0 rounded-full border border-gray-200 dark:border-white/10 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                          onClick={() => toggleAppliance(app.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-ksp-blue" />
                  Backup Requirements
                </CardTitle>
                <CardDescription>Set your desired run time and system parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Desired Backup Time (Hours)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={runtime}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val) && val > 0 && val <= 72) setRuntime(val);
                        }}
                        className="w-16 h-8 text-center font-bold bg-white dark:bg-[#0a0f1a] dark:border-white/10 border-gray-200"
                        min={0.5}
                        max={72}
                        step={0.5}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[Math.min(runtime, 24)]}
                    min={1}
                    max={24}
                    step={0.5}
                    onValueChange={(val) => setRuntime(val[0])}
                    className="py-4 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                    <span>1h</span>
                    <span>12h</span>
                    <span>24h</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">System Voltage</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[12, 24, 48].map((v) => (
                        <button
                          key={v}
                          onClick={() => setBatteryVoltage(v)}
                          className={`py-2 rounded-lg border text-sm font-bold transition-all ${batteryVoltage === v
                            ? 'bg-ksp-blue border-ksp-blue text-white shadow-lg shadow-ksp-blue/20'
                            : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500 hover:border-ksp-blue/50'
                            }`}
                        >
                          {v}V
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-semibold">Inverter Efficiency</Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[efficiency]}
                        min={70}
                        max={98}
                        step={1}
                        onValueChange={(val) => setEfficiency(val[0])}
                        className="flex-grow cursor-pointer"
                      />
                      <div className="relative">
                        <Input
                          type="number"
                          value={efficiency}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 50 && val <= 100) setEfficiency(val);
                          }}
                          className="w-20 h-8 pr-7 text-center font-bold text-gray-900 dark:text-white bg-white dark:bg-[#0a0f1a] dark:border-white/10 border-gray-200"
                          min={50}
                          max={100}
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-700 dark:text-gray-300 font-bold pointer-events-none">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-8 sticky top-24 hidden lg:block">
            <Card className="border shadow-sm dark:bg-[#111827] border-ksp-blue/20 bg-ksp-blue/[0.02]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold uppercase tracking-widest text-gray-500">Summary Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="pb-6 border-b border-gray-100 dark:border-white/5 relative">
                  <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Total Power Consumption</p>
                  <p className="text-5xl font-black text-gray-900 dark:text-white flex items-baseline gap-2">
                    {totalLoad} <span className="text-xl font-bold text-ksp-blue">Watts</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-[#111827] dark:to-ksp-blue/10 border border-blue-100 dark:border-ksp-blue/20 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-ksp-blue/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-ksp-blue" />
                        <span className="text-sm font-bold uppercase text-gray-500 tracking-tight">Required Inverter</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>Includes 25% safety margin</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-4xl font-black text-ksp-blue dark:text-ksp-blue relative z-10">
                      {recommendedInverterVA} <span className="text-lg font-bold opacity-70">VA</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-medium relative z-10">Standard Recommendation</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-green-50 dark:from-[#111827] dark:to-ksp-green/10 border border-green-100 dark:border-ksp-green/20 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-ksp-green/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <Battery className="h-5 w-5 text-ksp-green" />
                        <span className="text-sm font-bold uppercase text-gray-500 tracking-tight">Battery Capacity</span>
                      </div>
                    </div>
                    <p className="text-4xl font-black text-ksp-green dark:text-ksp-green relative z-10">
                      {requiredBatteryAh} <span className="text-lg font-bold opacity-70">Ah</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-medium relative z-10">For {runtime} Hours backup</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 font-bold"
                    onClick={resetCalculator}
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset All
                  </Button>
                  <Button disabled className="w-full h-12 font-bold transition-all shadow-lg bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500 cursor-not-allowed">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF Report (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl">
              <h4 className="flex items-center gap-2 text-amber-900 dark:text-amber-400 font-bold mb-3">
                <AlertCircle className="h-5 w-5" />
                Expert Tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-500/80 leading-relaxed mb-4">
                Calculate with <strong>maximum load</strong> you expect to run simultaneously. Most household inverters work best when loaded up to 60-70% of their actual capacity.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-400 opacity-70 uppercase tracking-widest">Efficiency Benchmarks:</div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-amber-900 dark:text-amber-400 font-medium text-center">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">Modified Sine: ~80%</div>
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">Pure Sine: ~94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterCalculator;
