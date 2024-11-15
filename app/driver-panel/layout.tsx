import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const event = await getEvent(session?.user.station, "AVAILABILITY");

  return (
    <div className="h-full">
      {children}
      <BottomNav hasDisp={!!event} />
      <footer className="h-[64px]"></footer>
    </div>
  );
}
