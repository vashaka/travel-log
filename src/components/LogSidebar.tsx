"use client";

import React from "react";
import { Button } from "./ui/button";
import { landmarks } from "../data/landmarks";
import { Log } from "@/models/Log";
import { useThemeContext } from "@/context/store";

const LogSidebar = ({ logs }: { logs: Log[] }) => {
  const { onPositionChange, onZoomChange }: any = useThemeContext();
  const [isOpen, setIsOpen] = React.useState(true);
  const [landmarksToSee, setLandmarksToSee] = React.useState<any[]>([]);

  React.useEffect(() => {
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
    <>
      {isOpen ? (
        <div className="fixed left-0 top-0 h-full w-[300px] bg-black z-[999] opacity-95">
          <div className="absolute left-3 top-3.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-white text-center text-lg font-semibold mt-3">
            Landmarks to visit in <br />
            the future
          </h1>

          <div className="flex justify-center mt-5 flex-col items-center">
            {landmarksToSee.map((landmark) => (
              <div
                key={landmark.id}
                className="bg-[hsl(224,64%,18%)] text-[hsl(0,0%,93%)] h-[40px] flex my-1.5 justify-center items-center text-md rounded-lg w-[90%] hover:bg-[hsl(224,64%,23%)] duration-300 cursor-pointer"
                onClick={() => {
                  onPositionChange([landmark.latitude, landmark.longitude]);
                  onZoomChange(landmark.zoom);
                }}
              >
                <h1>{landmark.place}</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-6 h-6 ml-1.5"
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Button
          className="fixed z-[999] top-2 left-2"
          onClick={() => setIsOpen(true)}
        >
          Explore best landmarks
        </Button>
      )}
    </>
  );
};

export default LogSidebar;
