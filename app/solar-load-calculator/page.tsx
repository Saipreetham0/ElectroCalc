import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solar Load Calculator | Panel & Battery Sizing | KSP Electronics",
    description:
        "Free solar load calculator. Size your solar panel array, battery bank, and charge controller based on your daily load and available sun hours. Perfect for Indian rooftop solar.",
    keywords: ["solar load calculator", "solar panel sizing calculator", "solar battery calculator", "rooftop solar calculator India", "solar system sizing"],
    openGraph: {
        title: "Solar Load Calculator",
        description: "Size your solar panels, batteries, and charge controller for your load.",
        url: "https://tools.kspelectronics.in/solar-load-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/solar-load-calculator" },
};

export default function Page() { return <ClientPage />; }
