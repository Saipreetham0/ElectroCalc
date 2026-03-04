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

// Speed of light in vacuum
const C_SPEED_OF_LIGHT = 299792458; // m/s

type FreqUnit = "hz" | "khz" | "mhz" | "ghz";
type WaveUnit = "m" | "cm" | "mm";

const FREQ_UNITS: { value: FreqUnit; label: string; mult: number }[] = [
    { value: "hz", label: "Hz", mult: 1 },
    { value: "khz", label: "kHz", mult: 1e3 },
    { value: "mhz", label: "MHz", mult: 1e6 },
    { value: "ghz", label: "GHz", mult: 1e9 },
];

const WAVE_UNITS: { value: WaveUnit; label: string; mult: number }[] = [
    { value: "m", label: "Meters (m)", mult: 1 },
    { value: "cm", label: "Centimeters (cm)", mult: 1e-2 },
    { value: "mm", label: "Millimeters (mm)", mult: 1e-3 },
];

const FrequencyWavelengthCalculator: React.FC = () => {
    // Mode
    const [calcMode, setCalcMode] = useState<"f2w" | "w2f">("f2w");

    // Inputs
    const [freqInput, setFreqInput] = useState<string>("");
    const [freqUnit, setFreqUnit] = useState<FreqUnit>("mhz");

    const [waveInput, setWaveInput] = useState<string>("");
    const [waveUnit, setWaveUnit] = useState<WaveUnit>("m");

    const [error, setError] = useState<string>("");

    const resetCalculator = () => {
        setFreqInput("");
        setWaveInput("");
        setError("");
    };

    const result = useMemo(() => {
        setError("");

        let targetFreqHz = 0;
        let targetWaveM = 0;

        try {
            if (calcMode === "f2w") {
                if (!freqInput) return null;
                const f = parseFloat(freqInput);
                if (isNaN(f) || f <= 0) {
                    setError("Please enter a valid positive frequency");
                    return null;
                }
                const fMult = FREQ_UNITS.find(u => u.value === freqUnit)?.mult || 1;
                targetFreqHz = f * fMult;
                targetWaveM = C_SPEED_OF_LIGHT / targetFreqHz;
            } else {
                if (!waveInput) return null;
                const w = parseFloat(waveInput);
                if (isNaN(w) || w <= 0) {
                    setError("Please enter a valid positive wavelength");
                    return null;
                }
                const wMult = WAVE_UNITS.find(u => u.value === waveUnit)?.mult || 1;
                targetWaveM = w * wMult;
                targetFreqHz = C_SPEED_OF_LIGHT / targetWaveM;
            }

            // Formatting outputs
            const fHz = targetFreqHz;
            const wM = targetWaveM;

            // Auto-format frequency
            let displayF = "";
            let displayFUnit = "";
            if (fHz >= 1e9) { displayF = (fHz / 1e9).toFixed(4); displayFUnit = "GHz"; }
            else if (fHz >= 1e6) { displayF = (fHz / 1e6).toFixed(4); displayFUnit = "MHz"; }
            else if (fHz >= 1e3) { displayF = (fHz / 1e3).toFixed(4); displayFUnit = "kHz"; }
            else { displayF = fHz.toFixed(2); displayFUnit = "Hz"; }

            // Auto-format wavelength
            let displayW = "";
            let displayWUnit = "";
            if (wM >= 1) { displayW = wM.toFixed(4); displayWUnit = "m"; }
            else if (wM >= 0.01) { displayW = (wM * 100).toFixed(4); displayWUnit = "cm"; }
            else if (wM >= 0.001) { displayW = (wM * 1000).toFixed(4); displayWUnit = "mm"; }
            else { displayW = (wM * 1e6).toFixed(4); displayWUnit = "µm"; }

            // Determine RF band roughly
            let band = "Unknown";
            if (fHz < 3e3) band = "ELF/SLF/ULF";
            else if (fHz < 30e3) band = "VLF";
            else if (fHz < 300e3) band = "LF (Low Frequency)";
            else if (fHz < 3e6) band = "MF (Medium Frequency / AM Radio)";
            else if (fHz < 30e6) band = "HF (High Frequency / Shortwave)";
            else if (fHz < 300e6) band = "VHF (Very High Frequency / FM Radio)";
            else if (fHz < 3e9) band = "UHF (Ultra High Frequency / Wi-Fi / Cellular)";
            else if (fHz < 30e9) band = "SHF (Super High Frequency / Radar / Satellite)";
            else if (fHz < 300e9) band = "EHF (Extremely High Frequency / 5G mmWave)";
            else if (fHz < 400e12) band = "Infrared";
            else if (fHz < 790e12) band = "Visible Light";
            else if (fHz < 30e15) band = "Ultraviolet";
            else band = "X-Rays / Gamma Rays";

            return {
                freq: displayF,
                fUnit: displayFUnit,
                wave: displayW,
                wUnit: displayWUnit,
                band
            };

        } catch {
            setError("Calculation error");
            return null;
        }
    }, [calcMode, freqInput, freqUnit, waveInput, waveUnit]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Frequency to Wavelength Calculator"
                description="Convert between frequency and wavelength for electromagnetic waves using the speed of light."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <Card className="border shadow-sm dark:bg-[#111827] dark:border-white/10">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-5 w-5 text-ksp-blue" />
                                    <CardTitle className="text-xl font-bold">RF Converter</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Conversion Mode</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => { setCalcMode("f2w"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "f2w"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Frequency → Wavelength
                                        </button>
                                        <button
                                            onClick={() => { setCalcMode("w2f"); setError(""); }}
                                            className={`text-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${calcMode === "w2f"
                                                ? "bg-ksp-blue border-ksp-blue text-white shadow-md"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                                                }`}
                                        >
                                            Wavelength → Frequency
                                        </button>
                                    </div>
                                </div>

                                {calcMode === "f2w" ? (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="freqInput">Enter Frequency (f)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="freqInput"
                                                type="number"
                                                value={freqInput}
                                                onChange={(e) => setFreqInput(e.target.value)}
                                                placeholder="e.g. 2.4"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 px-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-ksp-blue"
                                                value={freqUnit}
                                                onChange={(e) => setFreqUnit(e.target.value as FreqUnit)}
                                            >
                                                {FREQ_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="waveInput">Enter Wavelength (λ)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="waveInput"
                                                type="number"
                                                value={waveInput}
                                                onChange={(e) => setWaveInput(e.target.value)}
                                                placeholder="e.g. 1"
                                                className="text-lg h-12 flex-1 dark:bg-[#0a0f1a] dark:border-white/10"
                                            />
                                            <select
                                                className="h-12 px-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1a] text-sm font-semibold text-ksp-green"
                                                value={waveUnit}
                                                onChange={(e) => setWaveUnit(e.target.value as WaveUnit)}
                                            >
                                                {WAVE_UNITS.map(u => (
                                                    <option key={u.value} value={u.value}>{u.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    onClick={resetCalculator}
                                    variant="outline"
                                    className="w-full h-10 dark:border-white/10 dark:hover:bg-white/5 mt-2"
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
                                <CardHeader className="bg-slate-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                                    <CardTitle className="text-lg font-bold">Result</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className={`p-6 rounded-xl border ${calcMode === 'f2w' ? 'bg-ksp-blue/5 border-ksp-blue/30' : 'bg-ksp-green/5 border-ksp-green/30'} text-center shadow-sm`}>
                                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                {calcMode === "f2w" ? "Calculated Wavelength (λ)" : "Calculated Frequency (f)"}
                                            </div>
                                            <div className={`text-5xl font-bold ${calcMode === 'f2w' ? 'text-ksp-blue' : 'text-ksp-green'}`}>
                                                {calcMode === "f2w" ? result.wave : result.freq}
                                                <span className="text-2xl ml-2">{calcMode === "f2w" ? result.wUnit : result.fUnit}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg">
                                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Equivalent / Band</div>
                                        <div className="flex justify-between items-center text-sm font-mono text-gray-900 dark:text-gray-300">
                                            <span>
                                                {calcMode === "f2w" ? (
                                                    <>{result.freq} {result.fUnit}</>
                                                ) : (
                                                    <>{result.wave} {result.wUnit}</>
                                                )}
                                            </span>
                                            <span className="mx-2">→</span>
                                            <span className="font-bold text-orange-500">{result.band}</span>
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
                                            The Universal Wave Equation
                                        </h3>
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 flex items-center justify-center">
                                            <div className="font-mono text-lg text-ksp-blue font-bold flex gap-4">
                                                <span>c = λ × f</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                                            <p><strong className="text-gray-900 dark:text-gray-300">c</strong> = Speed of light in a vacuum ($299,792,458$ m/s)</p>
                                            <p><strong className="text-gray-900 dark:text-gray-300">λ (Lambda)</strong> = Wavelength in meters</p>
                                            <p><strong className="text-gray-900 dark:text-gray-300">f</strong> = Frequency in Hertz (1/s)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                            Inverse Relationship
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Frequency and wavelength are inversely proportional. As frequency goes up (e.g. 5GHz Wi-Fi), the wavelength goes down (making antenna sizes smaller).
                                        </p>
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

export default FrequencyWavelengthCalculator;
