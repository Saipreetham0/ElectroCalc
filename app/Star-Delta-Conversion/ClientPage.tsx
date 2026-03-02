"use client";

import ConversionForm from "@/components/ConversionForm";
import ToolPageHeader from "@/components/ToolPageHeader";

export default function StarDeltaConversion() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f1a]">
            <ToolPageHeader
                title="Star to Delta Conversion Tool"
                description="Convert between Star (Wye) and Delta (Mesh) resistor networks. Calculate equivalent values for circuit simplification and analysis."
            />

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <ConversionForm />
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-20">
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Understanding the Conversion</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-ksp-blue">Star (Y) to Delta (Δ)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                To find Delta resistances (R1, R2, R3) from Star resistances (Ra, Rb, Rc):
                            </p>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg font-mono text-xs">
                                R1 = (RaRb + RbRc + RcRa) / Rc<br />
                                R2 = (RaRb + RbRc + RcRa) / Ra<br />
                                R3 = (RaRb + RbRc + RcRa) / Rb
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-ksp-green">Delta (Δ) to Star (Y)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                To find Star resistances (Ra, Rb, Rc) from Delta resistances (R1, R2, R3):
                            </p>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg font-mono text-xs">
                                Ra = (R1 * R3) / (R1 + R2 + R3)<br />
                                Rb = (R1 * R2) / (R1 + R2 + R3)<br />
                                Rc = (R2 * R3) / (R1 + R2 + R3)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
