import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Rise Time & Bandwidth Calculator | Free Signal Tools',
    description: 'Calculate the relationship between Rise Time (tr) and Bandwidth (BW) using the 0.35 constant rule for single-pole systems. Free electronics calculator.',
    keywords: 'rise time calculator, bandwidth to rise time, tr = 0.35 / bw, oscilloscope rise time, signal integrity calculator',
    openGraph: {
        title: 'Rise Time & Bandwidth Calculator | ElectroCalc',
        description: 'Calculate the relationship between Rise Time (tr) and Bandwidth (BW) using the 0.35 constant rule.',
        url: 'https://tools.kspelectronics.in/rise-time-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/rise-time-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rise Time & Bandwidth Calculator | Free Signal Tools",
    "description": "Calculate the relationship between Rise Time (tr) and Bandwidth (BW) using the 0.35 constant rule for single-pole systems. Free electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function RiseTimePage() {
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
