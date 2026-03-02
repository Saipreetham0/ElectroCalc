import React from "react";

interface StarConnectionProps {
    resistances?: {
        r1: string | number;
        r2: string | number;
        r3: string | number;
    };
}

const StarConnection: React.FC<StarConnectionProps> = ({
    resistances = { r1: "0", r2: "0", r3: "0" }
}) => {
    const { r1, r2, r3 } = resistances;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-50 dark:bg-white/5 rounded-2xl border dark:border-white/10 flex items-center justify-center overflow-hidden">
                <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-sm">
                    {/* Connection Lines */}
                    <line x1="80" y1="80" x2="80" y2="20" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />
                    <line x1="80" y1="80" x2="25" y2="120" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />
                    <line x1="80" y1="80" x2="135" y2="120" className="stroke-gray-300 dark:stroke-white/20" strokeWidth="3" strokeLinecap="round" />

                    {/* Neutral Point */}
                    <circle cx="80" cy="80" r="6" className="fill-ksp-blue" />

                    {/* Terminal Points */}
                    <circle cx="80" cy="20" r="5" className="fill-gray-400 dark:fill-gray-500" />
                    <circle cx="25" cy="120" r="5" className="fill-gray-400 dark:fill-gray-500" />
                    <circle cx="135" cy="120" r="5" className="fill-gray-400 dark:fill-gray-500" />

                    {/* Labels */}
                    <text x="90" y="35" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue">Ra: {r1} Ω</text>
                    <text x="15" y="145" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue">Rb: {r2} Ω</text>
                    <text x="110" y="145" className="text-[10px] font-bold fill-ksp-blue dark:fill-ksp-blue">Rc: {r3} Ω</text>
                </svg>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Star (Y) Model</p>
        </div>
    );
};

export default StarConnection;
