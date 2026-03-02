import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Capacitor Code Calculator | Ceramic, Film & Tantalum | KSP Electronics",
    description:
        "Free online capacitor code calculator. Decode 3-digit and EIA codes for ceramic, film, and tantalum capacitors to find capacitance in pF, nF, and µF.",
    keywords: [
        "capacitor code calculator",
        "capacitor decoder",
        "ceramic capacitor code",
        "film capacitor decoder",
        "tantalum capacitor code",
        "electronics tools",
    ],
    openGraph: {
        title: "Capacitor Code Calculator | Ceramic, Film & Tantalum",
        description:
            "Decode 3-digit and EIA codes for ceramic, film, and tantalum capacitors.",
        url: "https://tools.kspelectronics.in/capacitor-code-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/capacitor-code-calculator",
    },
};

export default function CapacitorCodeCalculatorPage() {
    return <ClientPage />;
}
