import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getCurrentMode } from "@/lib/getCurrentMode";
import getAllocations from "@/lib/getAllocations";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const { choosed_station, mode } = await getCurrentMode();

  const allocations = await getAllocations(session?.user.driverId.toString());

  const event = await getEvent(choosed_station, "AVAILABILITY");

  return (
    <div className="h-full relative">
      {children}
      <div className="h-[64px]"></div>

      <BottomNav
        hasDisp={mode == "OF" || (mode == "LM" && !!event)}
        crowdSourcing={mode == "OF" && !allocations}
      />
    </div>
  );
}
