import { getClustersById } from "@/lib/db/clusters";
import MapComponent from "@/components/map-container";
import { getHubInfo } from "@/gsheets/locations";

export default async function Page({
  params,
}: {
  params: Promise<{ station: string }>;
}) {
  const station = (await params).station;

  const clusters = await getClustersById(Number(station));

  const hubInfo = await getHubInfo(clusters[0].station_name);

  return (
    <MapComponent
      serverSession={null}
      defaultClusters={[]}
      closed={[]}
      clusters={clusters.map((cluster) => ({
        ...cluster,
        zone_detail: JSON.parse(cluster.zone_detail),
      }))}
      center={[hubInfo.latitude, hubInfo.longitude]}
    />
  );
}
