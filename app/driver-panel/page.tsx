import { auth } from "@/auth";
import { getLocations } from "@/gsheets/locations";
import HomeOwnFlex from "@/components/home-ownflex";
import HomeLm from "@/components/home-lm";
import { getOptions } from "@/lib/db/options";

export default async function DriverPanel() {
  const session = await auth();
  const driverFirstName = session?.user.driverName.split(" ")[0];

  const options = await getOptions(session?.user.driverId);

  const choosed_station = options
    ? JSON.parse(options?.options || "")?.hub
    : session?.user.station;

  if (choosed_station !== "LM") {
    return <HomeOwnFlex driverFirstName={driverFirstName} />;
  }

  // const station = session?.user.station;

  // // const locations = await getLocations(station);

  return <HomeLm driverFirstName={driverFirstName} />;
}
