"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { SelectionDrawer } from "./selection-drawer-crowdsourcing";

export default function MyPage({
  serverSession = null,
  closed,
  clusters,
  center,
  defaultClusters,
  style,
  choosed_station,
  crowdSourcing,
  bonds,
  availableShifts,
  disableSelection,
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/crowdsourcing-map"), {
        loading: () => <div></div>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      {!disableSelection && (
        <SelectionDrawer
          serverSession={serverSession}
          choosed_station={choosed_station}
          crowdSourcing={crowdSourcing}
          availableShifts={availableShifts}
        />
      )}

      <Map
        zoom={10}
        bonds={bonds}
        serverSession={serverSession}
        disableSelection={disableSelection}
        closed={closed}
        clusters={clusters}
        center={center}
        defaultClusters={defaultClusters}
        style={style}
        bonds={bonds}
      />
    </>
  );
}
