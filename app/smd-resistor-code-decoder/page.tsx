import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SMD Resistor Code Decoder | EIA-96 & 3/4 Digit | KSP Electronics",
    description:
        "Free online SMD resistor code calculator. Instantly decode 3-digit, 4-digit, and EIA-96 surface-mount resistor markings to find their exact resistance values.",
    keywords: [
        "smd resistor calculator",
        "smd resistor code",
        "EIA-96 decoder",
        "3 digit smd resistor",
        "4 digit smd resistor",
        "surface mount resistor",
        "electronics tools",
    ],
    openGraph: {
        title: "SMD Resistor Code Decoder | EIA-96 & 3/4 Digit",
        description:
            "Instantly decode 3-digit, 4-digit, and EIA-96 surface-mount resistor markings.",
        url: "https://tools.kspelectronics.in/smd-resistor-code-decoder",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/smd-resistor-code-decoder",
    },
};

export default function SMDResistorCodeDecoderPage() {
    return <ClientPage />;
}
