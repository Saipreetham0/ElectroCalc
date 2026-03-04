import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inverter Battery Matching Calculator | KSP Electronics",
    description:
        "Free inverter battery matching calculator. Find the right inverter VA rating and battery Ah capacity for your home or office load and desired backup hours.",
    keywords: ["inverter battery matching", "which inverter for my home", "inverter size calculator", "battery capacity for inverter", "inverter VA calculator India"],
    openGraph: {
        title: "Inverter Battery Matching Calculator",
        description: "Match the right inverter and battery size for your home load.",
        url: "https://tools.kspelectronics.in/inverter-battery-matching-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/inverter-battery-matching-calculator" },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Inverter Battery Matching Calculator | KSP Electronics",
    "description": "Free inverter battery matching calculator. Find the right inverter VA rating and battery Ah capacity for your home or office load and desired backup hours.",
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
