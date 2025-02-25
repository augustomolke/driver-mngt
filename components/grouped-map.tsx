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
import { useClusters } from "@/hooks/useClusters";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { Slide } from "react-awesome-reveal";

const defaultStyle = {
  fillColor: "gray",
  fillOpacity: 0.5,
  weight: 2,
  opacity: 1,
  dashArray: 3,
  color: "white",
};

const closedStyle = {
  fillColor: "gray",
  fillOpacity: 0.8,
  weight: 2,
  opacity: 1,
  dashArray: 3,
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

const checkIcon = new Icon({
  iconUrl: "/PIN CHECK.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Clusters = ({ clusters }) => {
  const { selected, setSelected, setBound } = useClusters();
  const map = useMap();

  useEffect(() => {
    setBound(map);
  }, [map]);

  return (
    <>
      {clusters.map((cluster) => {
        const positions = cluster.zone_detail.coordinates.map((tuple) =>
          tuple.map((x) => [x[1], x[0]])
        );
        // const center = useMemo(() => {
        //   if (poly.current) {
        //     const bounds = poly.current.getBounds(); // Get polygon bounds
        //     const center = bounds.getCenter(); // Get center of bounds
        //     console.log(center);
        //     return [center.lat, center.lng];
        //   }

        //   return [0, 0];
        // }, [poly]);

        // const isClosed = closed.includes(cluster.zone_id);

        return (
          <>
            {/* {selected.includes(cluster.zone_id) && (
          <Marker position={center} icon={checkIcon}>
            <Popup>{center}</Popup>
          </Marker>
        )} */}
            <Polygon
              eventHandlers={{
                mouseover: (e) => {
                  // if (isClosed) return;

                  const layer = e.target;
                  layer.setStyle(selectedStyle);
                },
                mouseout: (e) => {
                  // if (isClosed) return;
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
                selected.includes(cluster.zone_id)
                  ? selectedStyle
                  : defaultStyle
              }
            />
            {/* <Marker position={polyCenter}>
          <Popup>Este é seu ponto de coleta</Popup>
        </Marker> */}
          </>
        );
      })}
    </>
  );
};

const SelectedList = ({ selected, clusters }: any) => {
  if (selected.length == 0)
    return (
      <div className="z-1 mt-0 ml-2 p-1 flex gap-2">
        <MapPin></MapPin>
        <span className="font-bold">Selecione no mapa as regiões</span>
      </div>
    );

  const { bound } = useClusters();

  return (
    <div className="z-1 m-auto mt-0 p-1">
      <span className="font-bold ml-2">{`Você selecionou ${selected.length} ${
        selected.length > 1 ? "regiões" : "região"
      }`}</span>

      <div className="flex gap-2 overscroll-auto overflow-x-scroll">
        {selected.map((s) => (
          <Slide
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

                bound.fitBounds(newBound);
              }}
            >
              {s}
            </Badge>{" "}
          </Slide>
        ))}
      </div>
    </div>
  );
};

export default function MyMap(props: any) {
  const {
    serverSession,
    closed,
    clusters,
    center,
    zoom,
    defaultClusters,
    style = { width: "100vw" },
  } = props;

  const { setSelected, selected, bound, setBound } = useClusters();

  useEffect(() => {
    if (
      defaultClusters.find((c) => clusters.map((a) => a.zone_id).includes(c))
    ) {
      setSelected(defaultClusters);
    }
  }, [defaultClusters]);

  return (
    <>
      <SelectedList selected={selected} clusters={clusters} />
      <MapContainer
        style={{ height: "70vh", borderRadius: "0 0 0.8rem 0.8rem" }}
        center={center}
        zoom={zoom}
        // doubleClickZoom={true}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {serverSession ? (
          <Marker position={center} icon={hubIcon}>
            <Popup>Este é seu ponto de coleta.</Popup>
          </Marker>
        ) : (
          <Marker position={center}>
            <Popup>Este é seu ponto de coleta.</Popup>
          </Marker>
        )}

        <Clusters clusters={clusters} />
      </MapContainer>
    </>
  );
}
