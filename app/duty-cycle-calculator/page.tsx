import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: 'Duty Cycle Calculator | Pulse Width & Frequency Converter | Free Tools',
    description: 'Calculate Duty Cycle, Pulse Width, Period, and Frequency of PWM signals. Free and instant electronics calculator.',
    keywords: 'duty cycle calculator, pwm calculator, pulse width to duty cycle, frequency to period, electronics signal tools',
    openGraph: {
        title: 'Duty Cycle Calculator | ElectroCalc',
        description: 'Calculate Duty Cycle, Pulse Width, Period, and Frequency of PWM signals.',
        url: 'https://tools.kspelectronics.in/duty-cycle-calculator',
        type: 'website',
        siteName: 'ElectroCalc',
    },
    alternates: {
        canonical: "https://tools.kspelectronics.in/duty-cycle-calculator",
    },
};


const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Duty Cycle Calculator | Pulse Width & Frequency Converter | Free Tools",
    "description": "Calculate Duty Cycle, Pulse Width, Period, and Frequency of PWM signals. Free and instant electronics calculator.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function DutyCyclePage() {
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
