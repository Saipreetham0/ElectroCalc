// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

// import "../app/styles/globals.css";
// import Header from "./components/Header";
// import Head from "next/head";
import "@/styles/globals.css";
import Script from "next/script";
import Providers from "./providers";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { notFound } from 'next/navigation'


// export const metadata = {
//   title: "Electrical Calculations",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Header /> */}
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

