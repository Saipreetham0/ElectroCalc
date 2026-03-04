import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'AC Power Calculator | Free Electronics Tools',
    description: 'Calculate Active, Apparent, and Reactive Power for single-phase and three-phase AC systems. Free and instant electronics calculator.',
    keywords: 'ac power calculator, real power, apparent power, reactive power, three phase power calculator, kva kw kvar calculator',
    openGraph: {
        title: 'AC Power Calculator | ElectroCalc',
        description: 'Calculate Active, Apparent, and Reactive Power for single-phase and three-phase AC systems. Free and instant electronics calculator.',
        url: 'https://tools.kspelectronics.in/ac-power-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/ac-power-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AC Power Calculator | Free Electronics Tools",
    "description": "Calculate Active, Apparent, and Reactive Power for single-phase and three-phase AC systems. Free and instant electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function ACPowerCalculatorPage() {
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
