import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ohm's Law Calculator | Voltage, Current, Resistance | KSP Electronics",
    description:
        "Free online Ohm's Law calculator. Instantly calculate voltage (V), current (I), and resistance (R) with high precision for electronics and electrical engineering projects.",
    keywords: [
        "ohm's law calculator",
        "voltage calculator",
        "current calculator",
        "resistance calculator",
        "ohms law formula",
        "electrical calculator",
        "electronics tools",
    ],
    openGraph: {
        title: "Ohm's Law Calculator | Voltage, Current, Resistance",
        description:
            "Instantly calculate voltage (V), current (I), and resistance (R) for your electronics projects.",
        url: "https://tools.kspelectronics.in/ohms-law-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/ohms-law-calculator",
    },
};

export default function OhmsLawCalculatorPage() {
    return <ClientPage />;
}
