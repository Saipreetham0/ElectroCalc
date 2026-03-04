import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Signal Period to Frequency Converter | Free Tools',
    description: 'Convert between time Period (s, ms, us, ns) and Frequency (Hz, kHz, MHz, GHz). Free and instant signal converter tool.',
    keywords: 'period to frequency converter, frequency to period, hertz to seconds, milliseconds to hz, time and frequency calculator',
    openGraph: {
        title: 'Signal Period to Frequency Converter | ElectroCalc',
        description: 'Convert between time Period (T) and Frequency (F) using the f = 1/T formula.',
        url: 'https://tools.kspelectronics.in/period-frequency-converter',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/period-frequency-converter",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Signal Period to Frequency Converter | Free Tools",
    "description": "Convert between time Period (s, ms, us, ns) and Frequency (Hz, kHz, MHz, GHz). Free and instant signal converter tool.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function PeriodFrequencyPage() {
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
