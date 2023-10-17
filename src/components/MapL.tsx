// var greenIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   shadowSize: [41, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;
"use client";

import React from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import L, { LatLngTuple } from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Log } from "@/models/Log";
import { useThemeContext } from "@/context/store";
import LogForm from "./LogForm";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
});

const MapL = ({ logs }: { logs: Log[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { position, zoom }: any = useThemeContext();

  const MyComponent = ({
    coords,
    _zoom,
  }: {
    coords: LatLngTuple;
    _zoom: number;
  }) => {
    const map = useMap();
    map.setView(coords, _zoom, { animate: true, duration: 1.0 });
    return null;
  };

  return (
    <div className="w-full h-screen">
      <MapContainer
        className="w-full h-full"
        // dragging={false}
        // scrollWheelZoom={false}
        // center={position}
        // minZoom={3}
        zoomControl={false}
        zoom={8}
        easeLinearity={0.35}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          // url={"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"}
        />

        <MyComponent coords={position} _zoom={zoom} />
        {logs.map((log: Log) => (
          <Marker
            icon={DefaultIcon}
            key={log.id}
            position={[Number(log.latitude), Number(log.longitude)]}
          >
            <Popup offset={[0, -27.5]}>
              <p className="text-lg font-bold">{log.place}</p>
              <div className="flex justify-center items-center w-[250px]">
                <picture>
                  <img alt={log.place} src={log.image} className="w-96" />
                </picture>
              </div>
              <p className="italic font-[spectral] text-lg max-w-[24rem]">
                {log.expression.length > 200
                  ? log.expression.substring(0, 200) + "..."
                  : log.expression}
              </p>
              <p className="text-sm italic">
                {new Date(log.visitDate).toLocaleDateString(undefined, {
                  timeZone: "UTC",
                })}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {isOpen ? (
        <div className="absolute right-0 top-0 z-[999] w-[400px] h-screen bg-black">
          <LogForm onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <div className="drawer-content" onClick={() => setIsOpen(true)}>
          <label
            className="btn absolute top-2 right-2 z-[997] capitalize text-gray-300"
            htmlFor="my-drawer"
          >
            Add New Logs
          </label>
        </div>
      )}
    </div>
  );
};

export default MapL;
