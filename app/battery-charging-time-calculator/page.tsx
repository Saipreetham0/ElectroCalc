import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Battery Charging Time Calculator | KSP Electronics",
    description:
        "Free battery charging time calculator. Estimate how long it takes to fully charge your inverter or solar battery based on Ah capacity, charger current, and depth of discharge.",
    keywords: ["battery charging time calculator", "how long to charge battery", "inverter battery charging time", "battery charge rate calculator"],
    openGraph: {
        title: "Battery Charging Time Calculator",
        description: "Estimate charging time for inverter and solar batteries.",
        url: "https://tools.kspelectronics.in/battery-charging-time-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/battery-charging-time-calculator" },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Battery Charging Time Calculator | KSP Electronics",
    "description": "Free battery charging time calculator. Estimate how long it takes to fully charge your inverter or solar battery based on Ah capacity, charger current, and depth of discharge.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function Page() { return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <ClientPage />
        </>
    ); }
