import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const preLoadedEvents = await fetchQuery(api.events.get, {
    station: session?.user.station,
  });

  return (
    <div class="h-full">
      {children}
      <BottomNav preloadedEvents={preLoadedEvents} />
      <footer className="h-[64px]"></footer>
    </div>
  );
}
