import { auth } from "@/auth";
import { getLocations } from "@/gsheets/locations";
import HomeOwnFlex from "@/components/home-ownflex";
import HomeLm from "@/components/home-lm";

export default async function DriverPanel() {
  const session = await auth();
  const driverFirstName = session?.user.driverName.split(" ")[0];

  if (session?.user.ownflex) {
    return <HomeOwnFlex driverFirstName={driverFirstName} />;
  }

  const station = session?.user.station;

  const locations = await getLocations(station);

  return <HomeLm driverFirstName={driverFirstName} />;
}
