import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pull-up & Pull-down Resistor Calculator | KSP Electronics",
    description:
        "Free online pull-up and pull-down resistor calculator. Calculate the optimal resistor value, voltage levels, current draw, and power dissipation for digital logic circuits.",
    keywords: [
        "pull-up resistor calculator",
        "pull-down resistor calculator",
        "pull-up resistor value",
        "digital logic resistor",
        "I2C pull-up resistor",
        "GPIO pull-up",
        "electronics calculator",
    ],
    openGraph: {
        title: "Pull-up & Pull-down Resistor Calculator",
        description:
            "Calculate optimal pull-up or pull-down resistor values for digital logic circuits.",
        url: "https://tools.kspelectronics.in/pullup-pulldown-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/pullup-pulldown-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pull-up & Pull-down Resistor Calculator | KSP Electronics",
    "description": "Free online pull-up and pull-down resistor calculator. Calculate the optimal resistor value, voltage levels, current draw, and power dissipation for digital logic circuits.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function PullUpDownCalculatorPage() {
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
