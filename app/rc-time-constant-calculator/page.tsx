import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'RC Time Constant Calculator | Free Electronics Tools',
    description: 'Calculate the RC time constant (Tau) and charging/discharging voltage of a capacitor. Free and instant electronics calculator.',
    keywords: 'rc time constant calculator, calculate tau, resistor capacitor time constant, capacitor charging voltage, rc circuit equation, electronics tools',
    openGraph: {
        title: 'RC Time Constant Calculator | ElectroCalc',
        description: 'Calculate the RC time constant (Tau) and charging/discharging voltage of a capacitor. Free and instant electronics calculator.',
        url: 'https://tools.kspelectronics.in/rc-time-constant-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/rc-time-constant-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RC Time Constant Calculator | Free Electronics Tools",
    "description": "Calculate the RC time constant (Tau) and charging/discharging voltage of a capacitor. Free and instant electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function RCTimeConstantCalculatorPage() {
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
