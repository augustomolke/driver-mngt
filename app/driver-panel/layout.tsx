import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getCurrentMode } from "@/lib/getCurrentMode";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { choosed_station, mode } = await getCurrentMode();

  const event = await getEvent(choosed_station, "AVAILABILITY");

  return (
    <div className="h-full relative">
      {children}
      <div className="h-[64px]"></div>

      <BottomNav hasDisp={mode == "OF" || (mode == "LM" && !!event)} />
    </div>
  );
}
