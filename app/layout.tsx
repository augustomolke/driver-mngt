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

    newClass =
      !parsedOptions?.hub || parsedOptions?.hub == "LM" ? "lm" : "ownflex";
  }

  return (
    <SessionProvider>
      <TooltipProvider>
        <html lang="en" className={newClass} suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-1 grid-rows-8 h-screen  m-auto`}

          >
            <main className="flex flex-col min-h-screen w-full">
              <header className="relative flex justify-center items-center py-4">
                <Logo />
              </header>
              <section className="p-4  flex flex-col justify-center items-center flex-grow w-full">
              <div className="max-w-4xl w-full flex flex-col justify-center items-center">{children}</div>
                <Toaster />
              </section>
            </main>
          </body>
        </html>
      </TooltipProvider>
    </SessionProvider>
  );
}
