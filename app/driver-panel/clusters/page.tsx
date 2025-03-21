import { auth } from "@/auth";
import { getClusters } from "@/lib/db/clusters";
import { getHubInfo } from "@/gsheets/locations";
import MapComponent from "@/components/map-container";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getPreferences } from "@/lib/db/preferences";
import { getCurrentMode } from "@/lib/getCurrentMode";
import ContentMapClusters from "@/app/components/clusters/contentMapClusters"

export default async function Preferences() {
  const session = await auth();

  const { choosed_station } = await getCurrentMode();

  const clusters = await getClusters(choosed_station);
  if (clusters.length == 0) {
    redirect("/driver-panel/preferencias");
  }
  const hubInfo = await getHubInfo(choosed_station);

  const prevClusters = await getPreferences(
    session?.user.driverId.toString(),
    choosed_station
  );

  return (
    <Card className="m-0 p-0 bg-white w-full h-auto  rounded-md flex gap-2 flex-col md:w-96 ">
      {/* <MapComponent
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
      /> */}
       <ContentMapClusters
           serverSession={session}
           closed={[]}
           clusters={clusters.map((cluster) => ({
             ...cluster,
             zone_detail: JSON.parse(cluster.zone_detail),
           }))}
           center={[hubInfo.latitude, hubInfo.longitude]}
           defaultClusters={prevClusters.map((cluster) => cluster.cep)}
           style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
           choosed_station={choosed_station}/> 
    </Card>
  );
}
