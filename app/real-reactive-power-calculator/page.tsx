import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Real vs Reactive Power Calculator | Power Triangle | Free Tools',
    description: 'Calculate Real Power (W), Reactive Power (VAR), Apparent Power (VA), Power Factor, and Phase Angle using the AC Power Triangle. Free online calculator.',
    keywords: 'power triangle calculator, real vs reactive power, apparent power, power factor from phase angle, kw kvar kva calculator',
    openGraph: {
        title: 'Real vs Reactive Power Calculator | ElectroCalc',
        description: 'Calculate Real Power (W), Reactive Power (VAR), Apparent Power (VA), Power Factor, and Phase Angle using the AC Power Triangle.',
        url: 'https://tools.kspelectronics.in/real-reactive-power-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/real-reactive-power-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Real vs Reactive Power Calculator | Power Triangle | Free Tools",
    "description": "Calculate Real Power (W), Reactive Power (VAR), Apparent Power (VA), Power Factor, and Phase Angle using the AC Power Triangle. Free online calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function RealReactivePowerPage() {
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
