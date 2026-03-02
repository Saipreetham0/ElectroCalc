import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SWG Wire Gauge Calculator | Standard Wire Gauge | KSP Electronics",
    description:
        "Free online SWG wire gauge calculator. Find diameter, area, resistance, and maximum ampacity (current capacity) for any Standard/British Wire Gauge size.",
    keywords: [
        "swg calculator",
        "standard wire gauge",
        "british wire gauge",
        "wire gauge calculator",
        "wire diameter calculator",
        "wire ampacity",
        "electrical tools",
    ],
    openGraph: {
        title: "SWG Wire Gauge Calculator | Standard Wire Gauge",
        description:
            "Find diameter, area, resistance, and max current for any SWG wire size.",
        url: "https://tools.kspelectronics.in/swg-wire-gauge-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/swg-wire-gauge-calculator",
    },
};

export default function SWGWireGaugeCalculatorPage() {
    return <ClientPage />;
}
