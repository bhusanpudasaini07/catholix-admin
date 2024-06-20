import "leaflet/dist/leaflet.css";

import { LatLngBoundsExpression } from "leaflet";
import { Minus, Plus } from "lucide-react";
import React, { useRef } from "react";
import { GeoJSON, Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";

import nigeriaJson from "../../../../public/map-json/coordinates.json";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

interface IProps {
  children: React.ReactNode;
}

const MapContent = ({ children }: IProps) => {
  const mapRef = useRef(null);
  const zoomHandler = (type: "increase" | "decrease") => {};

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
        {children}
      </MapContainer>

      <div className="flex absolute p-2 right-4 bottom-4 flex-col gap-2 bg-white rounded-lg shadow-lg z-[400] text-primary">
        <Button
          onClick={() => zoomHandler("increase")}
          variant={"ghost"}
          className="p-0 h-auto hover:bg-transparent"
          size={"sm"}
        >
          <Plus size={18} />
        </Button>
        <Separator />
        <Button
          variant={"ghost"}
          className="p-0 h-auto hover:bg-transparent"
          size={"sm"}
          onClick={() => zoomHandler("decrease")}
        >
          <Minus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MapContent;
