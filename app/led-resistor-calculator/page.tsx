import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LED Series Resistor Calculator | Current Limiting | KSP Electronics",
    description:
        "Free online LED resistor calculator. Calculate the correct current-limiting resistor value and wattage for single or multiple LEDs in series.",
    keywords: [
        "led resistor calculator",
        "current limiting resistor",
        "led series resistor",
        "led circuit calculator",
        "led forward voltage",
        "electronics calculator",
    ],
    openGraph: {
        title: "LED Series Resistor Calculator | Current Limiting",
        description:
            "Calculate the correct current-limiting resistor for your LED circuits.",
        url: "https://tools.kspelectronics.in/led-resistor-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/led-resistor-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LED Series Resistor Calculator | Current Limiting | KSP Electronics",
    "description": "Free online LED resistor calculator. Calculate the correct current-limiting resistor value and wattage for single or multiple LEDs in series.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function LEDResistorCalculatorPage() {
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
