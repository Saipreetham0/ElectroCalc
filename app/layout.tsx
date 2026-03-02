import "@/styles/globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.kspelectronics.in"),
  title: {
    default: "ElectroCalc — Free Online Electronics Calculators | KSP Electronics",
    template: "%s | ElectroCalc",
  },
  description:
    "11 free electronics calculators — Ohm's Law, resistor color codes, voltage divider, LED resistor, inverter battery sizing, wire gauge, capacitor codes, star-delta conversion, pull-up/pull-down resistor, and more. By KSP Electronics.",
  applicationName: "ElectroCalc",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "electronics calculator",
    "electrical engineering tools",
    "Ohm's law calculator",
    "resistor color code calculator",
    "voltage divider calculator",
    "LED resistor calculator",
    "pull-up resistor calculator",
    "capacitor code calculator",
    "SMD resistor decoder",
    "wire gauge calculator",
    "AWG calculator",
    "SWG calculator",
    "inverter battery calculator",
    "star delta conversion",
    "circuit analysis tools",
    "ElectroCalc",
    "KSP Electronics",
    "kspelectronics",
    "free electronics tools online",
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
    title: "ElectroCalc — Free Online Electronics Calculators",
    description:
      "11 professional-grade electronics calculators — Ohm's Law, voltage dividers, resistor codes, LED resistors, inverter sizing, and more. Instant, accurate, and free.",
    url: "https://tools.kspelectronics.in",
    siteName: "ElectroCalc",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "ElectroCalc — Free Electronics Calculators by KSP Electronics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectroCalc — Free Online Electronics Calculators",
    description:
      "11 free electronics calculators for engineers and students. Ohm's Law, resistor codes, voltage dividers, and more.",
    images: ["/preview.jpg"],
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
  },
  other: {
    "msapplication-TileColor": "#1d4ed8",
    "theme-color": "#1d4ed8",
  },
};

// Define the type for the component's props
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <Header />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
