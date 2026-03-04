import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "DC Load Calculator | Total Watts for DC Systems | KSP Electronics",
    description:
        "Free DC load calculator. Add up your DC appliances to find total load in watts and amps. Ideal for 12V, 24V, and 48V off-grid and solar systems.",
    keywords: ["DC load calculator", "12V load calculator", "solar DC load", "total DC watts calculator", "off-grid load calculator"],
    openGraph: {
        title: "DC Load Calculator",
        description: "Calculate total DC load for off-grid and solar power systems.",
        url: "https://tools.kspelectronics.in/dc-load-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/dc-load-calculator" },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DC Load Calculator | Total Watts for DC Systems | KSP Electronics",
    "description": "Free DC load calculator. Add up your DC appliances to find total load in watts and amps. Ideal for 12V, 24V, and 48V off-grid and solar systems.",
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
