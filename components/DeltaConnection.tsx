import React from "react";

interface DeltaConnectionProps {
    resistances?: {
        r1: string | number;
        r2: string | number;
        r3: string | number;
    };
}

const DeltaConnection: React.FC<DeltaConnectionProps> = ({
    resistances = { r1: "0", r2: "0", r3: "0" }
}) => {
    const { r1, r2, r3 } = resistances;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-50 dark:bg-white/5 rounded-2xl border dark:border-white/10 flex items-center justify-center overflow-hidden">
                <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-sm">
                    {/* Delta Triangle Lines */}
                    <line x1="80" y1="30" x2="30" y2="120" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />
                    <line x1="30" y1="120" x2="130" y2="120" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />
                    <line x1="130" y1="120" x2="80" y2="30" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />

                    {/* Terminal Points */}
                    <circle cx="80" cy="30" r="5" className="fill-ksp-blue" />
                    <circle cx="30" cy="120" r="5" className="fill-ksp-blue" />
                    <circle cx="130" cy="120" r="5" className="fill-ksp-blue" />

                    {/* Labels */}
                    <text x="30" y="70" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue">R1: {r1} Ω</text>
                    <text x="80" y="140" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue text-center" textAnchor="middle">R2: {r2} Ω</text>
                    <text x="110" y="70" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue">R3: {r3} Ω</text>
                </svg>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Delta (Δ) Model</p>
        </div>
    );
};

export default DeltaConnection;
