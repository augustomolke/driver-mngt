import { auth } from "@/auth";
import MapComponent from "@/components/crowdsourcing-map-container";
import { Card } from "@/components/ui/card";
import { getOpenOffers } from "@/lib/db/offers";
import { getClusters } from "@/lib/db/clusters";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { getHubInfo } from "@/gsheets/locations";
import { getAllocations } from "@/lib/db/allocations";
import { Badge } from "@/components/ui/badge";
import { OwnFlexShifts } from "@/components/assets/shifts";

export default async function Preferences() {
  const session = await auth();

  const crowdSourcing = await getOpenOffers();
  const { choosed_station } = await getCurrentMode();
  const hubInfo = await getHubInfo(choosed_station);

  const clusters = await getClusters(choosed_station);

  const currentSelection = await getAllocations();

  const chosenCluster = clusters
    .map((cluster) => ({
      ...cluster,
      zone_detail: JSON.parse(cluster.zone_detail),
    }))
    .filter((c) => currentSelection[0]?.cluster == c.zone_id);

  const bonds = chosenCluster.map((b) =>
    b.zone_detail.coordinates.map((tuple) => tuple.map((x) => [x[1], x[0]]))
  );

  const availableShifts = {
    AM: currentSelection.filter((s) => s.shift === "AM").length == 0,
    PM: currentSelection.filter((s) => s.shift === "PM").length == 0,
    // SD: currentSelection.filter((s) => s.shift === "SD"),
  };

  if (!(availableShifts.AM || availableShifts.PM)) {
    return (
      <Card className="m-0 p-0">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col items-center gap-2">
            <span>
              Você confirmou seu interesse na região abaixo, para a janela:
            </span>
            <Badge key={currentSelection[0].shift}>
              {
                OwnFlexShifts.find((s) => s.id === currentSelection[0].shift)
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

  const filteredClusters = clusters.map((cluster) => ({
    ...cluster,
    zone_detail: JSON.parse(cluster.zone_detail),
  }));

  return (
    <Card className="m-0 p-0">
      <MapComponent
        serverSession={session}
        closed={[]}
        availableShifts={availableShifts}
        clusters={filteredClusters}
        crowdSourcing={crowdSourcing}
        center={[hubInfo.latitude, hubInfo.longitude]}
        defaultClusters={[]}
        style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
        choosed_station={choosed_station}
      />
    </Card>
  );
}
