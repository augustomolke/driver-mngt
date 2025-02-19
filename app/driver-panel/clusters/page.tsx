import { auth } from "@/auth";
import { getClusters } from "@/lib/db/clusters";
import { getHubInfo } from "@/gsheets/locations";
import MapComponent from "@/components/map-container";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getPreferences } from "@/lib/db/preferences";
import { getOptions } from "@/lib/db/options";

export default async function Preferences() {
  const session = await auth();

  const options = await getOptions(session?.user.driverId);

  const choosed_station = options?.options
    ? JSON.parse(options.options)?.hub
    : session?.user.station;

  const station =
    choosed_station !== "LM" ? choosed_station : session?.user.station;

  const clusters = await getClusters(station);
  if (clusters.length == 0) {
    redirect("/driver-panel/preferencias");
  }
  const hubInfo = await getHubInfo(station);

  const prevClusters = await getPreferences(
    session?.user.driverId.toString(),
    station
  );

  return (
    <Card className="m-0 p-0">
      <MapComponent
        serverSession={session}
        closed={[]}
        clusters={clusters.map((cluster) => ({
          ...cluster,
          zone_detail: JSON.parse(cluster.zone_detail),
        }))}
        center={[hubInfo.latitude, hubInfo.longitude]}
        defaultClusters={prevClusters.map((cluster) => cluster.cep)}
        style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
        choosed_station={choosed_station}
      />
    </Card>
  );
}
