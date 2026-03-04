import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Battery Backup Time Calculator | How Long Will My Battery Last | KSP Electronics",
    description:
        "Free battery backup time calculator. Calculate how long your inverter battery will last based on battery capacity (Ah), load (watts), and voltage. Essential for Indian homes.",
    keywords: ["battery backup time calculator", "how long will my battery last", "inverter backup time", "battery Ah calculator", "UPS backup calculator"],
    openGraph: {
        title: "Battery Backup Time Calculator",
        description: "Calculate how long your inverter battery will last based on load and battery capacity.",
        url: "https://tools.kspelectronics.in/battery-backup-time-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/battery-backup-time-calculator" },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Battery Backup Time Calculator | How Long Will My Battery Last | KSP Electronics",
    "description": "Free battery backup time calculator. Calculate how long your inverter battery will last based on battery capacity (Ah), load (watts), and voltage. Essential for Indian homes.",
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
