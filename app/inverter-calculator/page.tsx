import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inverter & Battery Sizing Calculator | Off-Grid Power | KSP Electronics",
    description:
        "Free online inverter calculator. Determine the required inverter size, battery bank capacity, and estimated backup time for your solar or off-grid power setup.",
    keywords: [
        "inverter calculator",
        "battery sizing calculator",
        "solar inverter sizing",
        "off grid power calculator",
        "battery backup time",
        "power systems tools",
    ],
    openGraph: {
        title: "Inverter & Battery Sizing Calculator | Off-Grid Power",
        description:
            "Determine required inverter size, battery capacity, and backup time.",
        url: "https://tools.kspelectronics.in/inverter-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/inverter-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Inverter & Battery Sizing Calculator | Off-Grid Power | KSP Electronics",
    "description": "Free online inverter calculator. Determine the required inverter size, battery bank capacity, and estimated backup time for your solar or off-grid power setup.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function InverterCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <ClientPage />
        </>
    );
}
