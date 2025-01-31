"use client";
import { MapContainer, Marker, TileLayer, Popup, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useRef, useEffect } from "react";
import { useClusters } from "@/hooks/useClusters";

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

export default function MyMap(props: any) {
  const { serverSession, closed, clusters, center, zoom, defaultClusters } =
    props;

  const { selected, setSelected, setCloseBtn } = useClusters();

  useEffect(() => {
    if (
      defaultClusters.find((c) => clusters.map((a) => a.zone_id).includes(c))
    ) {
      setSelected(defaultClusters);
    }
  }, [defaultClusters]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="z-0"
      style={{ width: "100vw", height: "100vh" }}
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

      {clusters.map((cluster) => {
        const positions = cluster.zone_detail.coordinates.map((tuple) =>
          tuple.map((x) => [x[1], x[0]])
        );
        const poly = useRef(null);

        // const center = useMemo(() => {
        //   if (poly.current) {
        //     const bounds = poly.current.getBounds(); // Get polygon bounds
        //     const center = bounds.getCenter(); // Get center of bounds
        //     console.log(center);
        //     return [center.lat, center.lng];
        //   }

        //   return [0, 0];
        // }, [poly]);

        const isClosed = closed.includes(cluster.zone_id);

        return (
          <>
            {/* {selected.includes(cluster.zone_id) && (
              <Marker position={center} icon={checkIcon}>
                <Popup>{center}</Popup>
              </Marker>
            )} */}
            <Polygon
              ref={poly}
              eventHandlers={{
                mouseover: (e) => {
                  if (isClosed) return;

                  const layer = e.target;
                  layer.setStyle(selectedStyle);
                },
                mouseout: (e) => {
                  if (isClosed) return;
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
                  setSelected(isClosed ? "closed" : cluster.zone_id);
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
    </MapContainer>
  );
}
