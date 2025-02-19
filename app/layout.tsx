import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Logo from "@/components/assets/logo";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/auth";
import { getOptions } from "@/lib/db/options";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let newClass = "lm";

  if (!!session?.user) {
    const options = await getOptions(session?.user.driverId);

    const parsedOptions = options?.options && JSON.parse(options.options);

    const choosed_station =
      parsedOptions?.hub == "LM" ? session?.user.station : parsedOptions?.hub;

    newClass =
      !parsedOptions?.hub || parsedOptions?.hub == "LM" ? "lm" : "ownflex";
  }

  return (
    <SessionProvider>
      <TooltipProvider>
        <html lang="en" className={newClass}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-1 grid-rows-8 h-screen md:max-w-lg m-auto`}
          >
            <header className="header md:row-span-2 relative">
              <Logo />
            </header>

            <section className="px-8 md:row-span-6">
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
