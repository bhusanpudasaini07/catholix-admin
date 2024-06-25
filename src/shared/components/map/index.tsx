import "leaflet/dist/leaflet.css";

import { LatLngBoundsExpression } from "leaflet";
import { Minus, Plus } from "lucide-react";
import React, { useRef } from "react";
import { GeoJSON, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import nigeriaJson from "../../../../public/map-json/coordinates.json";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ZoomControls from "./zoom-controls";
import DashboardContent from "@/features/Dashboard/dashboard-content";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

interface IProps {
  children: React.ReactNode;
}

const MapContent = ({ children }: IProps) => {
  const mapRef = useRef(null);

  return (
    <div className="w-full h-full">
      <MapContainer
        // center={[9.082, 8.6753]}
        ref={mapRef}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full my-custom-map"
        bounds={nigeriaBounds}
        maxBounds={nigeriaBounds}
        zoomControl={false}
      >
        {/* <GeoJSON
          // style={geoJsonStyles}
          data={nigeriaJson as any}
          //   onEachFeature={onEachFeature}
        /> */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControls />
        {children}
      </MapContainer>
    </div>
  );
};

export default MapContent;
