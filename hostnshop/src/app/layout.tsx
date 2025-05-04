// src/app/layout.tsx
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import Footer from "@/presentation/components/footer";

import {Providers} from "@/lib/provider";
import NavBar from "@/presentation/components/client/header/NavBar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "HostNShop | Your One-Stop Online Shop",
  description: "Premium products with excellent service",
  manifest: "/manifest.json",
  icons: [
    {rel: "icon", url: "assets/images/logo.png"},
    {rel: "apple-touch-icon", url: "icons/icon-192x192.png"},
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
