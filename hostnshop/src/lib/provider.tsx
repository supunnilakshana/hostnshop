// src/lib/providers.tsx
"use client";

import {ReactNode} from "react";
import {ThemeProvider} from "next-themes";
import React from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({children}: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
