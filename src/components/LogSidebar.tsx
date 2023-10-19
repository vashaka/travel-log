"use client";

import React from "react";
import { Button } from "./ui/button";
import { landmarks } from "../data/landmarks";
import { Log } from "@/models/Log";
import { useThemeContext } from "@/context/store";

const LogSidebar = ({ logs }: { logs: any[] }) => {
  const { onPositionChange, onZoomChange }: any = useThemeContext();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            className="btn absolute top-2 left-2 z-[997] capitalize text-gray-300"
            htmlFor="my-drawer"
          >
            Explore My logs
          </label>
        </div>
        <div className="z-[999] drawer-side w-[400px]">
          <ul className="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
            <label htmlFor="my-drawer" aria-label="close sidebar">
              <div className="absolute left-3 top-5 duration-300 hover:rotate-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
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
            </label>
            <h1 className="text-white text-center text-xl font-bold">
              My Logs
            </h1>
            {/* Sidebar content here */}
            <div className="flex mt-4 justify-center flex-col items-center">
              {logs.map((log: Log) => (
                <div
                  key={log.id}
                  className="w-full"
                  onClick={() => {
                    onPositionChange([
                      Number(log.latitude),
                      Number(log.longitude),
                    ]);
                    onZoomChange(8);
                  }}
                >
                  <div className="collapse collapse-arrow bg-base-100 mt-3">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-gray-300 flex">
                      {log.place}
                    </div>
                    <div className="collapse-content">
                      <p className="text-gray-500">{log.expression}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogSidebar;
