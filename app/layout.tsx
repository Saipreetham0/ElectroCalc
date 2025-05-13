import "@/styles/globals.css";
import Providers from "./providers";
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
