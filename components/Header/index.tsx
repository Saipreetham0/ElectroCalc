/* eslint-disable @next/next/no-img-element */
import React from "react";
import Script from "next/script";
import { Metadata } from "next";

const GTM_ID = "GTM-XXXXXXX"; // Replace with actual GTM ID

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ElectroCalc - KSP Electronics | Free Electronics Calculators",
  description:
    "Free online electronics and electrical calculators for engineers and students. From Ohm's Law to circuit analysis, ElectroCalc by KSP Electronics has it all.",
  applicationName: "ElectroCalc",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "electronics calculator",
    "electrical tools",
    "Ohm's law calculator",
    "resistor calculator",
    "circuit analysis",
    "ElectroCalc",
    "KSP Electronics",
    "kspelectronics",
    "wire gauge calculator",
    "capacitor code calculator",
    "SMD resistor decoder",
  ],
  authors: [{ name: "KSP Electronics" }, { name: "Sai Preetham" }],
  creator: "KSP Electronics",
  publisher: "KSP Electronics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ElectroCalc - KSP Electronics | Free Electronics Calculators",
    description:
      "Free online electronics and electrical calculators for engineers and students.",
    url: "https://tools.kspelectronics.in",
    siteName: "ElectroCalc",
    images: [
      {
        url: "https://tools.kspelectronics.in/preview.jpg",
        width: 1200,
        height: 630,
        alt: "ElectroCalc - KSP Electronics Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectroCalc - KSP Electronics | Free Electronics Calculators",
    description:
      "Free online electronics and electrical calculators for engineers and students.",
    images: ["https://tools.kspelectronics.in/preview.jpg"],
    creator: "@kspelectronics",
    site: "@kspelectronics",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        rel: "icon",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        rel: "icon",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
  alternates: {
    canonical: "https://tools.kspelectronics.in",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ElectroCalc",
    startupImage: [],
  },
  other: {
    "msapplication-TileColor": "#1d4ed8",
    "theme-color": "#1d4ed8",
  },
};

const Header: React.FC = () => {
  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* GTM NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* JSON-LD Schema */}
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ElectroCalc",
            url: "https://tools.kspelectronics.in",
            publisher: {
              "@type": "Organization",
              name: "KSP Electronics",
              logo: {
                "@type": "ImageObject",
                url: "https://tools.kspelectronics.in/logo.png",
              },
            },
            sameAs: [
              "https://kspelectronics.in/",
            ],
          }),
        }}
      />

      {/* Microsoft Clarity */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "n6vruy6vlg");
          `,
        }}
      />

      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  );
};

export default Header;
