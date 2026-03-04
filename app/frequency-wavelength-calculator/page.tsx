import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Frequency to Wavelength Calculator | Free RF Tools',
    description: 'Convert between Frequency (Hz, MHz, GHz) and Wavelength (meters, cm, mm) using the speed of light. Free electronics RF calculator.',
    keywords: 'frequency to wavelength calculator, wavelength to frequency, calculate lambda, rf calculator, speed of light, hertz to meters',
    openGraph: {
        title: 'Frequency to Wavelength Calculator | ElectroCalc',
        description: 'Convert between Frequency (Hz, MHz, GHz) and Wavelength (meters, cm, mm) using the speed of light.',
        url: 'https://tools.kspelectronics.in/frequency-wavelength-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/frequency-wavelength-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Frequency to Wavelength Calculator | Free RF Tools",
    "description": "Convert between Frequency (Hz, MHz, GHz) and Wavelength (meters, cm, mm) using the speed of light. Free electronics RF calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function FrequencyWavelengthPage() {
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
