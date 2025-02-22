import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { getAllocations } from "@/lib/db/allocations";
import { getOpenOffers } from "@/lib/db/offers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { choosed_station, mode } = await getCurrentMode();

  const allocations = await getAllocations();
  const openOffers = await getOpenOffers();

  const event = await getEvent(choosed_station, "AVAILABILITY");

  return (
    <div className="h-full relative">
      {children}
      <div className="h-[64px]"></div>

      <BottomNav
        hasDisp={mode == "OF" || (mode == "LM" && !!event)}
        crowdSourcing={
          mode == "OF" &&
          allocations.filter((a) => a.type != "CROWDSOURCING").length < 2 &&
          openOffers.length > 0
        }
      />
    </div>
  );
}
