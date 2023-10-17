"use client";

import React, { createContext, useContext } from "react";

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }: any) => {
  const [position, setPosition] = React.useState([42.3207845, 43.3713615]);
  const [zoom, setZoom] = React.useState(8);

  const onPositionChange = (coordinates: number[]) => {
    setPosition(coordinates);
  };

  const onZoomChange = (_zoom: number) => {
    setZoom(_zoom);
  };

  return (
    <ThemeContext.Provider
      value={{
        position,
        onPositionChange,
        zoom,
        onZoomChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
