import { auth } from "@/auth";
import MapComponent from "@/components/crowdsourcing-map-container";
import { Card } from "@/components/ui/card";
import { getCrowdSourcingCluster } from "@/lib/getAllocations";
import { getClusters } from "@/lib/db/clusters";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { getHubInfo } from "@/gsheets/locations";
import { getCurrentCrowdSelection } from "@/lib/savecrowdSourcing";
import { Badge } from "@/components/ui/badge";
import { OwnFlexShifts } from "@/components/assets/shifts";

export default async function Preferences() {
  const session = await auth();

  const crowdSourcing = await getCrowdSourcingCluster();
  const { choosed_station } = await getCurrentMode();
  const hubInfo = await getHubInfo(choosed_station);

  const clusters = await getClusters(choosed_station);

  const currentSelection = await getCurrentCrowdSelection(
    session.user.driverId.toString()
  );

  const chosenCluster = clusters
    .map((cluster) => ({
      ...cluster,
      zone_detail: JSON.parse(cluster.zone_detail),
    }))
    .filter((c) => currentSelection?.chosen_cluster == c.zone_id);

  const bonds = chosenCluster.map((b) =>
    b.zone_detail.coordinates.map((tuple) => tuple.map((x) => [x[1], x[0]]))
  );

  if (!!currentSelection?.chosen_cluster) {
    return (
      <Card className="m-0 p-0">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col items-center gap-2">
            <span>
              Você confirmou seu interesse na região abaixo, para a janela:
            </span>
            <Badge key={currentSelection.shift}>
              {
                OwnFlexShifts.find((s) => s.id === currentSelection.shift)
                  ?.description
              }
            </Badge>
          </div>
        </div>
        <MapComponent
          serverSession={session}
          closed={[]}
          clusters={chosenCluster}
          center={[hubInfo.latitude, hubInfo.longitude]}
          defaultClusters={[]}
          bonds={bonds}
          style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
          choosed_station={choosed_station}
        />
      </Card>
    );
  }

  return (
    <Card className="m-0 p-0">
      <MapComponent
        serverSession={session}
        closed={[]}
        clusters={clusters
          .map((cluster) => ({
            ...cluster,
            zone_detail: JSON.parse(cluster.zone_detail),
          }))
          .filter((c) =>
            crowdSourcing.map((c) => c.Cluster).includes(c.zone_id)
          )}
        crowdSourcing={crowdSourcing}
        center={[hubInfo.latitude, hubInfo.longitude]}
        defaultClusters={[]}
        style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
        choosed_station={choosed_station}
      />
    </Card>
  );
}
