import { auth } from "@/auth";
import MapComponent from "@/components/crowdsourcing-map-container";
import { Card } from "@/components/ui/card";
import { getOpenOffers } from "@/lib/db/offers";
import { getClusters } from "@/lib/db/clusters";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { getHubInfo } from "@/gsheets/locations";
import { getAllocations } from "@/lib/db/allocations";
import { Badge } from "@/components/ui/badge";
import { HandshakeIcon, TriangleAlertIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { getDescription } from "@/lib/utils";

export default async function Preferences() {
  const session = await auth();

  const crowdSourcing = await getOpenOffers();
  const { choosed_station } = await getCurrentMode();
  const hubInfo = await getHubInfo(choosed_station);

  const clusters = await getClusters(choosed_station);

  const currentSelection = await getAllocations();

  const chosenCluster = currentSelection.reduce((acc, curr) => {
    return [
      ...acc,
      ...clusters
        .map((cluster) => ({
          ...cluster,
          zone_detail: JSON.parse(cluster.zone_detail),
        }))
        .filter((c) => curr?.offer?.cluster == c.zone_id),
    ];
  }, []);

  const bonds = chosenCluster.map((b) =>
    b.zone_detail.coordinates.map((tuple) => tuple.map((x) => [x[1], x[0]]))
  );

  if (
    // !(availableShifts.AM || availableShifts.PM) ||
    // (filteredClusters.length === 0 &&
    //   (availableShifts.AM || availableShifts.PM))
    crowdSourcing.length == 0 &&
    currentSelection.length > 0
  ) {
    return (
      <Card className="m-0 p-0">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex justift-start items-center gap-2">
            <HandshakeIcon height={36} width={48} />

            <div className="flex flex-col gap-1 justify-start items-cente w-[80%]">
              <span className="font-bold">Rotas confirmadas:</span>
              <div className="flex flex-col gap-2">
                {currentSelection.map((a) => (
                  <div className="flex border rounded-full justify-between pr-4 drop-shadow-md w-[90%]">
                    <Badge className="font-bold">{a.offer.cluster}</Badge>
                    <span key={a.offer.id} className="">
                      {getDescription(a)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
          disableSelection={true}
        />
      </Card>
    );
  }

  const availableShifts = {
    AM: currentSelection.filter((s) => s.offer.shift === "AM").length == 0,
    PM: currentSelection.filter((s) => s.offer.shift === "PM").length == 0,
    // SD: currentSelection.filter((s) => s.shift === "SD"),
  };

  const filteredClusters = clusters
    .filter((c) => crowdSourcing.map((a) => a.cluster).includes(c.zone_id))
    .map((cluster) => ({
      ...cluster,
      zone_detail: JSON.parse(cluster.zone_detail),
    }));

  const bondsSelection = filteredClusters.map((cluster) =>
    cluster.zone_detail.coordinates.map((tuple) =>
      tuple.map((x) => [x[1], x[0]])
    )
  );

  if (filteredClusters.length === 0) {
    redirect("/driver-panel");
  }

  return (
    <Card className="m-0 p-0">
      <div className="z-1 m-auto mt-0 p-1">
        <div className="flex gap-4 justify-start items-center">
          <TriangleAlertIcon height={36} width={36} />
          <span className="font-bold max-w-[80%] flex justify-center">
            Temos rotas disponíveis para as regiões abaixo. Escolha a sua e
            garanta sua corrida!
          </span>
        </div>
      </div>
      <MapComponent
        serverSession={session}
        closed={[]}
        availableShifts={availableShifts}
        clusters={filteredClusters}
        crowdSourcing={crowdSourcing}
        bonds={bondsSelection}
        center={[hubInfo.latitude, hubInfo.longitude]}
        defaultClusters={[]}
        style={{ width: "100%", height: "75vh", borderRadius: "0.8rem" }}
        choosed_station={choosed_station}
      />
    </Card>
  );
}
