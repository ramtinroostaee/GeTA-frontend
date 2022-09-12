import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ReactMapGL, { NavigationControl } from "react-map-gl";
import { FlyToInterpolator } from "@deck.gl/core";

// 3rd-party easing functions
import * as d3 from "d3-ease";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

/* eslint import/no-webpack-loader-syntax: off */
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
  mapboxgl.setRTLTextPlugin(
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
    null,
    true // Lazy load the plugin
  );
}

// Set mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFtdGlubm92aW4iLCJhIjoiY2w1M3Z1Mnh2MHRnMDNjcWlvYmsyYnM4eSJ9.U7sFWxBmxO7TEhefs5KGHQ";

const Map = ({ children }) => {
  const [viewport, setViewport] = useState({
    // latitude: 36.915,
    // longitude: 50.67,
    // zoom: 13.5,
    latitude: 32.4279,
    longitude: 53.688,
    zoom: 5,
    pitch: 80,
  });

  const [mouseCordinates, setMouseCordinates] = useState({
    lat: 51.389,
    lng: 35.6892,
  });

  const mapRef = useRef(null);
  const onMove = useCallback((evt) => setViewport(evt.viewState), []);

  const onMouseMove = useCallback(
    (event) => setMouseCordinates(event.lngLat),
    []
  );

  // useEffect(() => {
  //   if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
  //     mapboxgl.setRTLTextPlugin(
  //       "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  //       null,
  //       true // Lazy load the plugin
  //     );
  //   }
  // }, [mapboxgl]);

  const travel = useCallback(
    (long, lat, zoom) => {
      setViewport(() => ({
        longitude: long,
        latitude: lat,
        zoom: zoom ?? 14,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic,
      }));
    },
    [setViewport]
  );

  const renderMouse = useMemo(
    () =>
      mouseCordinates && (
        <div className="w-160 py-8 flex flex-col items-center justify-center absolute right-52 top-10 opacity-80 bg-blue-gray-A200 rounded-8">
          <div style={{ fontSize: "18px" }}>مختصات نقطه</div>
          <div>
            lat:{" "}
            <span style={{ fontWeight: "bold" }}>
              {mouseCordinates.lat.toFixed(4)}
            </span>
            , long:{" "}
            <span style={{ fontWeight: "bold" }}>
              {mouseCordinates.lng.toFixed(4)}
            </span>
          </div>
        </div>
      ),
    [mouseCordinates]
  );

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      {...viewport}
      width="100%"
      height="100%"
      onMove={onMove}
      mapStyle="mapbox://styles/ramtinnovin/cl558ah61005k17p64z3407op"
      // mapStyle="mapbox://styles/mapbox/streets-v11"
      onMouseMove={onMouseMove}
      attributionControl={false}
    >
      <NavigationControl />

      {renderMouse}

      {children}
    </ReactMapGL>
  );
};

export default Map;
