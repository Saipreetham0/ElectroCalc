import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AC Load Calculator | Total Power Consumption | KSP Electronics",
    description:
        "Free AC load calculator. Add up your household or office AC appliances with power factor to find total real power (watts), apparent power (VA), and monthly energy consumption (kWh).",
    keywords: ["AC load calculator", "total watts calculator", "home power consumption calculator", "electricity bill calculator", "appliance load calculator India"],
    openGraph: {
        title: "AC Load Calculator",
        description: "Calculate total AC power consumption for home and office.",
        url: "https://tools.kspelectronics.in/ac-load-calculator",
        type: "website",
    },
    alternates: { canonical: "https://tools.kspelectronics.in/ac-load-calculator" },
};

export default function Page() { return <ClientPage />; }
