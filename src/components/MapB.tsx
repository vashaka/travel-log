"use client";

import React, { useMemo, useState } from "react";

import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  lightingEffect,
  material,
  INITIAL_VIEW_STATE,
  colorRange,
} from "../lib/mapconfig.js";
import Map, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin.tsx";
import { cities } from "@/data/cities.js";

const MapB = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 44.783333,
        // latitude: 40.6643,
        // longitude: -73.9385,
        latitude: 41.716667,
        zoom: 6.8,
        // pitch: 40.5,
        // bearing: 30,
      }}
      style={{ width: "100%", height: "100vh" }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24"
    >
      {cities.map((city) => {
        return (
          <Marker
            key={`marker-${city.city}`}
            longitude={city.longitude}
            latitude={city.latitude}
            anchor="bottom"
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(city);
            }}
          >
            {/* <Pin /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-9 h-9 cursor-pointer hover:scale-125 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            {popupInfo && (
              <Popup
                offset={[0, -25]}
                anchor="bottom"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                onClose={() => setPopupInfo(null)}
                className="bg-black"
              >
                <div>
                  {popupInfo.city}, {popupInfo.state} |{" "}
                  <a
                    target="_new"
                    href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                  >
                    Wikipedia
                  </a>
                </div>
                <img width="100%" src={popupInfo.image} />
              </Popup>
            )}
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapB;
