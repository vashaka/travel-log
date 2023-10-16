"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import L, { LatLngTuple } from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Log } from "@/models/Log";
import { landmarks } from "@/data/landmarks";
import { useThemeContext } from "@/context/store";

// const colorMode = "light";

// const colorModeUrl = [
//   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   "mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24",
// ];
// const position = [42.3207845, 43.3713615];
// L.Marker.prototype.options.icon = DefaultIcon;

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
});
var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const MapL = ({ logs }: { logs: Log[] }) => {
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

  const [landmarksToSee, setLandmarksToSee] = useState<any[]>([]);

  useEffect(() => {
    setLandmarksToSee(
      landmarks.filter((landmark) => {
        for (let i = 0; i < logs.length; i++) {
          return (
            landmark.latitude !== Number(logs[i].latitude) &&
            landmark.longitude !== Number(logs[i].longitude)
          );
        }
      })
    );
  }, [logs]);

  return (
    <div className="w-full h-screen">
      <MapContainer
        className="w-full h-full"
        // dragging={false}
        // scrollWheelZoom={false}
        // center={position}
        zoomControl={false}
        zoom={8}
        // mapStyle=""
        // animate={true}
        easeLinearity={0.35}
        // minZoom={3}
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

        {landmarksToSee.map((landmark: any) => (
          <Marker
            icon={greenIcon}
            key={landmark.id}
            position={[Number(landmark.latitude), Number(landmark.longitude)]}
          >
            <Popup offset={[0, -27.5]}>
              <p className="text-lg font-bold text-red-400">{landmark.place}</p>
              <div className="flex justify-center items-center w-[250px]">
                <picture>
                  <img
                    alt={landmark.id}
                    src={landmark.image}
                    className="w-96"
                  />
                </picture>
              </div>
              <p className="italic font-[spectral] text-lg max-w-[24rem]">
                {landmark.description.length > 200
                  ? landmark.description.substring(0, 200) + "..."
                  : landmark.description}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapL;
