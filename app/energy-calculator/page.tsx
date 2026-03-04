import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Energy Calculator (Wh / kWh) | Free Electronics Tools',
    description: 'Calculate electrical energy consumption in Watt-hours (Wh), Kilowatt-hours (kWh), and Joules based on power and time. Free electronics calculator.',
    keywords: 'energy calculator, wh calculator, kwh calculator, power to energy, watt hours to kilowatt hours, calculate joules',
    openGraph: {
        title: 'Energy Calculator (Wh / kWh) | ElectroCalc',
        description: 'Calculate electrical energy consumption in Watt-hours (Wh), Kilowatt-hours (kWh), and Joules based on power and time. Free electronics calculator.',
        url: 'https://tools.kspelectronics.in/energy-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/energy-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Energy Calculator (Wh / kWh) | Free Electronics Tools",
    "description": "Calculate electrical energy consumption in Watt-hours (Wh), Kilowatt-hours (kWh), and Joules based on power and time. Free electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function EnergyCalculatorPage() {
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
