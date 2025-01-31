"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { SelectionDrawer } from "@/components/selection-drawer";
import Loading from "@/components/loading-overlay";
export default function MyPage({
  serverSession = null,
  closed,
  clusters,
  center,
  defaultClusters,
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/grouped-map"), {
        loading: () => <div></div>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      {serverSession && <SelectionDrawer serverSession={serverSession} />}
      <Map
        zoom={12}
        serverSession={serverSession}
        closed={closed}
        clusters={clusters}
        center={center}
        defaultClusters={defaultClusters}
      />
    </>
  );
}
