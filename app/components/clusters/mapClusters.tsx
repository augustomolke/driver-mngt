"use client";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { useClusters } from "@/hooks/useClusters";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Cluster {
  zone_id: number;
  zone_detail: {
    coordinates: number[][][];
  };
}

interface ServerSession {
  user?: {
    ownflex?: boolean;
  };
}

interface MyMapProps {
  serverSession?: ServerSession | null;
  closed: any[];
  clusters: Cluster[];
  center: [number, number];
  zoom?: number;
  defaultClusters: string[];
  style?: React.CSSProperties;
}

const defaultStyle = {
  fillColor: "gray",
  fillOpacity: 0.5,
  weight: 2,
  opacity: 1,
  dashArray: "3",
  color: "white",
};

const selectedStyle = {
  dashArray: "",
  fillColor: "#FD8D3C",
  fillOpacity: 0.7,
  weight: 3,
  opacity: 1,
  color: "white",
};

const hubIcon = new Icon({
  iconUrl: "/SHOPIN.png",
  iconSize: [48, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -32],
});

const Clusters: React.FC<{ clusters: Cluster[] }> = ({ clusters }) => {
  const { selected, setSelected, setBound } = useClusters();
  const map = useMap();

  useEffect(() => {
    setBound(map);
  }, [map, setBound]);

  return (
    <>
      {clusters.map((cluster) => {
        const positions: [number, number][][] = cluster.zone_detail.coordinates.map(
          (tuple: number[][]) =>
            tuple.map((x: number[]) => [x[1], x[0]] as [number, number])
        );

        return (
          <Polygon
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle(selectedStyle);
              },
              mouseout: (e) => {
                if (!selected.includes(cluster.zone_id)) {
                  const layer = e.target;
                  layer.setStyle(defaultStyle);
                }
              },
              click: (e) => {
                const layer = e.target;
                layer.setStyle(
                  selected.includes(cluster.zone_id)
                    ? defaultStyle
                    : selectedStyle
                );
                setSelected(cluster.zone_id);
              },
            }}
            key={cluster.zone_id}
            positions={positions}
            pathOptions={
              selected.includes(cluster.zone_id) ? selectedStyle : defaultStyle
            }
          />
        );
      })}
    </>
  );
};

const SelectedList: React.FC<{ selected: number[]; clusters: Cluster[] }> = ({
  selected,
  clusters,
}) => {
  if (selected.length === 0)
    return (
      <div className="z-1 mt-0 ml-2 p-1 flex gap-2">
        <MapPin />
        <span className="font-bold">Selecione no mapa as regiões</span>
      </div>
    );

  const { bound } = useClusters();

  return (
    <div className="  max-w-96 min-w-96 bg-red">
      <span className="font-bold ml-2">{`Você selecionou ${selected.length} ${
        selected.length > 1 ? "regiões" : "região"
      }`}</span>

      <div className="flex gap-2 overscroll-auto overflow-x-scroll">
        {selected.map((s) => (
          <Slide
            key={s}
            className="shrink-0"
            triggerOnce
            direction="left"
            duration={300}
          >
            <Badge
              onClick={() => {
                const newBound = clusters
                  .find((c) => c.zone_id === s)
                  ?.zone_detail.coordinates.map((tuple) =>
                    tuple.map((x) => [x[1], x[0]])
                  );

                if (newBound) {
                  bound.fitBounds(newBound);
                }
              }}
            >
              {s}
            </Badge>
          </Slide>
        ))}
      </div>
    </div>
  );
};

export default function MyMap({
  serverSession,
  closed,
  clusters,
  center,
  zoom = 10,
  defaultClusters,
  style = { width: "100vw" },
}: MyMapProps) {
  const { setSelected, selected, setBound } = useClusters();

  useEffect(() => {
    if (defaultClusters.some((c: string) => clusters.some((a) => String(a.zone_id) === c))) {
      setSelected(defaultClusters);
    }
  }, [defaultClusters, clusters, setSelected]);

  return (
    <>
      <SelectedList selected={selected} clusters={clusters} />
      <MapContainer
        style={{ height: "70vh", borderRadius: "0 0 0.8rem 0.8rem" }}
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={hubIcon}>
          <Popup>Este é seu ponto de coleta.</Popup>
        </Marker>

        <Clusters clusters={clusters} />
      </MapContainer>
    </>
  );
}
