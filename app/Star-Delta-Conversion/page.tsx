import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Star-Delta Conversion Calculator | Y-Δ Transform | KSP Electronics",
    description:
        "Free online Wye-Delta (Star-Delta) conversion calculator. Accurately transform impedance and resistance networks in 3-phase electrical systems.",
    keywords: [
        "star delta conversion",
        "wye delta transform",
        "Y-Δ calculator",
        "3 phase networks",
        "electrical impedance calculator",
        "power systems tools",
    ],
    openGraph: {
        title: "Star-Delta Conversion Calculator | Y-Δ Transform",
        description:
            "Transform impedance and resistance networks in 3-phase systems.",
        url: "https://tools.kspelectronics.in/Star-Delta-Conversion",
        type: "website",
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/Star-Delta-Conversion",
    },
};

export default function StarDeltaConversionPage() {
    return <ClientPage />;
}
