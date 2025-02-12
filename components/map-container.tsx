"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { SelectionDrawer } from "@/components/selection-drawer";
import { SelectionDrawer as OwnFlexSelectionDrawer } from "@/components/selection-drawer-ownflex";

export default function MyPage({
  serverSession = null,
  closed,
  clusters,
  center,
  defaultClusters,
  style,
  defaultOptions,
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
      {serverSession && serverSession.user.ownflex ? (
        <OwnFlexSelectionDrawer
          serverSession={serverSession}
          defaultOptions={defaultOptions}
        />
      ) : (
        <SelectionDrawer serverSession={serverSession} />
      )}

      <Map
        zoom={9}
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
