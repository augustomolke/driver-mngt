import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { getAllocations } from "@/lib/db/allocations";
import { getOpenOffers } from "@/lib/db/offers";

const showCrowdsourcingMenu = (allocations: any[], offers: any[], mode) => {
  if (mode != "OF") {
    return false;
  }
  if (offers.length == 0) {
    return false;
  }

  if (
    allocations.length >= 2 &&
    allocations.filter((a) => a.type == "CROWDSOURCING").length == 0
  ) {
    return false;
  }

  return true;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
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
          ["3333", "4444", "5555", "6666", "7777"].includes(
            session?.user.driverId.toString()
          ) && showCrowdsourcingMenu(allocations, openOffers, mode)
        }
      />
    </div>
  );
}
