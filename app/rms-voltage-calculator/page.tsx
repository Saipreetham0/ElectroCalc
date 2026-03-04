import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'RMS Voltage Calculator | Peak, P-P, Avg Converter',
    description: 'Convert between RMS, Peak, Peak-to-Peak, and Average voltages for sine waves. Free, instant electronics calculator.',
    keywords: 'rms voltage calculator, peak to peak to rms, vrms to vpeak, average voltage, ac voltage converter',
    openGraph: {
        title: 'RMS Voltage Calculator | ElectroCalc',
        description: 'Convert between RMS, Peak, Peak-to-Peak, and Average voltages for sine waves.',
        url: 'https://tools.kspelectronics.in/rms-voltage-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/rms-voltage-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RMS Voltage Calculator | Peak, P-P, Avg Converter",
    "description": "Convert between RMS, Peak, Peak-to-Peak, and Average voltages for sine waves. Free, instant electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function RMSVoltagePage() {
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
