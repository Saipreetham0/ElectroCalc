import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'LC Resonant Frequency Calculator | Free Electronics Tools',
    description: 'Calculate the resonant frequency of an LC circuit given its inductance and capacitance. Free, instant, and accurate electronics calculator.',
    keywords: 'lc resonant frequency calculator, resonance calculator, lc tank circuit, inductance capacitance frequency, calculate fr, electronics tools',
    openGraph: {
        title: 'LC Resonant Frequency Calculator | ElectroCalc',
        description: 'Calculate the resonant frequency of an LC circuit given its inductance and capacitance. Free, instant, and accurate electronics calculator.',
        url: 'https://tools.kspelectronics.in/lc-resonant-frequency-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/lc-resonant-frequency-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LC Resonant Frequency Calculator | Free Electronics Tools",
    "description": "Calculate the resonant frequency of an LC circuit given its inductance and capacitance. Free, instant, and accurate electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function LCResonantFrequencyCalculatorPage() {
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
