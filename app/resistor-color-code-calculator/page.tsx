import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resistor Color Code Calculator | 4 & 5 Band | KSP Electronics",
    description:
        "Free online resistor color code calculator. Easily decode 4-band and 5-band resistors to find their exact resistance values and tolerances.",
    keywords: [
        "resistor color code calculator",
        "resistor calculator",
        "4 band resistor",
        "5 band resistor",
        "decode resistor colors",
        "resistance calculator",
        "electronics tools",
    ],
    openGraph: {
        title: "Resistor Color Code Calculator | 4 & 5 Band",
        description:
            "Easily decode 4-band and 5-band resistors to find their exact resistance values and tolerances.",
        url: "https://tools.kspelectronics.in/resistor-color-code-calculator",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/resistor-color-code-calculator",
    },
};

export default function ResistorColorCodeCalculatorPage() {
    return <ClientPage />;
}
