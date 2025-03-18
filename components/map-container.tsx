"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { SelectionDrawer } from "@/components/selection-drawer";
import { SelectionDrawer as OwnFlexSelectionDrawer } from "@/components/selection-drawer-ownflex";
import { useClusters } from "@/hooks/useClusters";

export default function MyPage({
  serverSession = null,
  closed,
  clusters,
  center,
  defaultClusters,
  style,
  choosed_station,
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/grouped-map"), {
        loading: () => <div></div>,
        ssr: false,
      }),
    []
  );

  const { selected } = useClusters();




  return (
    <>
      {selected.length > 0 &&
        (serverSession && serverSession.user.ownflex ? (
          <OwnFlexSelectionDrawer
            serverSession={serverSession}
            choosed_station={choosed_station}
          />
        ) : (
          <SelectionDrawer serverSession={serverSession} />
        ))}

      <Map
        zoom={10}
        serverSession={serverSession}
        closed={closed}
        clusters={clusters}
        center={center}
        defaultClusters={defaultClusters}
        style={style}
      />
    </>
  );
}
