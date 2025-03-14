"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface MyPageProps {
  serverSession?: boolean | null;
  closed: any[];
  clusters: {
    zone_id: number;
    zone_detail: {
      coordinates: number[][][];
    };
  }[];
  center: [number, number];
  defaultClusters: string[];
  style?: React.CSSProperties;
  choosed_station?: any;
}

export default function MyPage({
  serverSession = null,
  closed,
  clusters,
  center,
  defaultClusters,
  style,
  choosed_station,
}: MyPageProps) {


  console.log("defaultClusters:", defaultClusters);

  const Map = useMemo(
    () =>
      dynamic(() => import("./mapClusters"), {
        loading: () => <div></div>,
        ssr: false,
      }),
    []
  );

  return (
    <Map
      zoom={10}
      serverSession={serverSession}
      closed={closed}
      clusters={clusters}
      center={center}
      defaultClusters={defaultClusters}
      style={style}
    />
  );
}
