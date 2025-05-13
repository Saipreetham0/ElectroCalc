"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// Define the type for the props
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

