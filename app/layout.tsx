import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Logo from "@/components/assets/logo";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shopee - Motorista Parceiro",
  description: "Painel do Motorista Shopee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-1 grid-rows-8 h-screen`}
          >
            <header className="header my-4 row-span-1">
              <Logo />
            </header>

            <section className="container row-span-7 p-[2rem]">
              {children}
              <Toaster />
            </section>

            {/* <footer className="h-[24px]"></footer> */}
          </body>
        </html>
      </TooltipProvider>
    </SessionProvider>
  );
}
