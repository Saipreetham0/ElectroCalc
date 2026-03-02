import "@/styles/globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import AdScript from "../components/Adsense/AdScript";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.kspelectronics.in"),
  title: {
    default: "ElectroCalc - Free Electronics Calculators | KSP Electronics",
    template: "%s | ElectroCalc",
  },
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
    title: "ElectroCalc - Free Electronics Calculators",
    description:
      "Free online electronics and electrical calculators for engineers and students.",
    url: "https://tools.kspelectronics.in",
    siteName: "ElectroCalc",
    images: [
      {
        url: "/preview.jpg",
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
    title: "ElectroCalc - Free Electronics Calculators",
    description:
      "Free online electronics and electrical calculators for engineers and students.",
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
      <AdScript />
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
