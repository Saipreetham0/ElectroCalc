import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Decibel (dB) Calculator | Power & Voltage Gain',
    description: 'Calculate voltage, current, and power gain in Decibels (dB). Convert between linear ratios and logarithmic dB scales instantly.',
    keywords: 'decibel calculator, db calculator, power gain db, voltage gain db, calculate decibels, linear to log power',
    openGraph: {
        title: 'Decibel (dB) Calculator | ElectroCalc',
        description: 'Calculate voltage, current, and power gain in Decibels (dB). Convert between linear ratios and logarithmic dB scales.',
        url: 'https://tools.kspelectronics.in/decibel-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/decibel-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Decibel (dB) Calculator | Power & Voltage Gain",
    "description": "Calculate voltage, current, and power gain in Decibels (dB). Convert between linear ratios and logarithmic dB scales instantly.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function DecibelCalculatorPage() {
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
