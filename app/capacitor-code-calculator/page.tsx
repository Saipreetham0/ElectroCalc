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


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Capacitor Code Calculator | Ceramic, Film & Tantalum | KSP Electronics",
    "description": "Free online capacitor code calculator. Decode 3-digit and EIA codes for ceramic, film, and tantalum capacitors to find capacitance in pF, nF, and µF.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function CapacitorCodeCalculatorPage() {
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
