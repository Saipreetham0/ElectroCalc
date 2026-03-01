import "@/styles/globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import AdScript from "../components/Adsense/AdScript";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ReactNode } from "react";

// Define the type for the component's props
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AdScript />
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Free online electronics and electrical calculators by KSP Electronics. Ohm's Law, Resistor Color Code, Wire Gauge, Capacitor Code, and more." />
        <title>
          ElectroCalc - Free Electronics Calculators | KSP Electronics
        </title>
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
