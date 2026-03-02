"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface ToolPageHeaderProps {
    title: string;
    description: string;
}

const ToolPageHeader: React.FC<ToolPageHeaderProps> = ({ title, description }) => {
    return (
        <div className="bg-[#0a0f1a] text-white py-12 mb-8 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6 font-medium">
                    <Link
                        href="/"
                        className="hover:text-white transition-colors flex items-center gap-1"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-gray-500">Tools</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-ksp-blue font-semibold">{title}</span>
                </nav>

                {/* Title & Description */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ToolPageHeader;
