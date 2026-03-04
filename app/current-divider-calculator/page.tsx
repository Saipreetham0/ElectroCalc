import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Current Divider Calculator | Free Electronics Tools',
    description: 'Calculate branch currents in a parallel circuit using the current divider rule. Free, instant, and accurate electronics calculator.',
    keywords: 'current divider calculator, branch current, parallel circuit current, current divider rule formula, calculate i1 i2, electronics tools',
    openGraph: {
        title: 'Current Divider Calculator | ElectroCalc',
        description: 'Calculate branch currents in a parallel circuit using the current divider rule. Free, instant, and accurate electronics calculator.',
        url: 'https://tools.kspelectronics.in/current-divider-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/current-divider-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Current Divider Calculator | Free Electronics Tools",
    "description": "Calculate branch currents in a parallel circuit using the current divider rule. Free, instant, and accurate electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function CurrentDividerCalculatorPage() {
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
