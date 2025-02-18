import { auth } from "@/auth";
import { getClusters } from "@/lib/db/clusters";
import { getHubInfo } from "@/gsheets/locations";
import MapComponent from "@/components/map-container";
import { getPrevClusters } from "@/lib/db/clusters";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

export default async function Preferences() {
  const session = await auth();

  // const preloadedPreferences = await getPreferences(
  //   session?.user.driverId.toString()
  // );

  const clusters = await getClusters(
    session?.user.ownflex ? "OF-Lapa" : session?.user.station
  );

  console.log(clusters);

  if (clusters.length == 0) {
    redirect("/driver-panel/preferencias");
  }
  const hubInfo = await getHubInfo(
    session?.user.ownflex ? "OwnFlex" : session?.user.station
  );

  const prevClusters = await getPrevClusters(session?.user.driverId.toString());

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
      />
    </Card>
  );
}
