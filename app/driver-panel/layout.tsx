import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getOptions } from "@/lib/db/options";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const options = await getOptions(session?.user.driverId);

  const choosed_station = options
    ? JSON.parse(options?.options || "")?.hub
    : session?.user.station;

  const event = await getEvent(session?.user.station, "AVAILABILITY");

  return (
    <div className="h-full">
      {children}
      <BottomNav
        hasDisp={
          choosed_station != "LM" || (choosed_station == "LM" && !!event)
        }
      />
      <footer className="h-[64px]"></footer>
    </div>
  );
}
