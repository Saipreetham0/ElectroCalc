import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Power Calculator (P=VI) | Free Electronics Tools',
    description: 'Calculate electrical power, voltage, current, and resistance. Free, instant, and accurate Ohm\'s Law power wheel calculator.',
    keywords: 'power calculator, p vi calculator, electrical power calculator, watts calculator, ohms law wheel, calculate power voltage current resistance',
    openGraph: {
        title: 'Power Calculator (P=VI) | ElectroCalc',
        description: 'Calculate electrical power, voltage, current, and resistance. Free, instant, and accurate Ohm\'s Law power wheel calculator.',
        url: 'https://tools.kspelectronics.in/power-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/power-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Power Calculator (P=VI) | Free Electronics Tools",
    "description": "Calculate electrical power, voltage, current, and resistance. Free, instant, and accurate Ohm",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function PowerCalculatorPage() {
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
