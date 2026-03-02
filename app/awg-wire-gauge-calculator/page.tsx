import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AWG Wire Gauge Calculator | American Wire Gauge | KSP Electronics",
    description:
        "Free online AWG wire gauge calculator. Find diameter, area, resistance, and maximum ampacity (current capacity) for any American Wire Gauge size.",
    keywords: [
        "awg calculator",
        "wire gauge calculator",
        "american wire gauge",
        "wire diameter calculator",
        "wire ampacity",
        "wire resistance",
        "electrical tools",
    ],
    openGraph: {
        title: "AWG Wire Gauge Calculator | American Wire Gauge",
        description:
            "Find diameter, area, resistance, and max current for any AWG wire size.",
        url: "https://tools.kspelectronics.in/awg-wire-gauge-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/awg-wire-gauge-calculator",
    },
};

export default function AWGWireGaugeCalculatorPage() {
    return <ClientPage />;
}
