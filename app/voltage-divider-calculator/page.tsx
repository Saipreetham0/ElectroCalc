import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voltage Divider Calculator | Resistor Network | KSP Electronics",
    description:
        "Free online voltage divider calculator. Instantly calculate output voltage, resistor values, or input voltage for resistor divider circuits used in electronics design.",
    keywords: [
        "voltage divider calculator",
        "resistor divider",
        "voltage divider formula",
        "voltage divider circuit",
        "resistor network calculator",
        "electronics calculator",
    ],
    openGraph: {
        title: "Voltage Divider Calculator | Resistor Network",
        description:
            "Calculate output voltage, resistor values, or input voltage for voltage divider circuits.",
        url: "https://tools.kspelectronics.in/voltage-divider-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/voltage-divider-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Voltage Divider Calculator | Resistor Network | KSP Electronics",
    "description": "Free online voltage divider calculator. Instantly calculate output voltage, resistor values, or input voltage for resistor divider circuits used in electronics design.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function VoltageDividerCalculatorPage() {
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
