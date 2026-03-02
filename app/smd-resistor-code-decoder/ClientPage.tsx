"use client";
import SMDResistorCalculator from "@/components/SMDResistorCalculator";
import ToolPageHeader from "@/components/ToolPageHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <ToolPageHeader
        title="SMD Resistor Code Decoder"
        description="Decode 3-digit and 4-digit surface mount (SMD) resistor marking codes into resistance values."
      />
      <div className="max-w-6xl mx-auto">
        <SMDResistorCalculator />
      </div>
    </div>
  );
}