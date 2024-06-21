import "leaflet/dist/leaflet.css";

import { Icon, LatLngBoundsExpression } from "leaflet";
import { Minus, MonitorSpeaker, Plus } from "lucide-react";
import React, { useRef } from "react";
import { GeoJSON, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import MarkerClusterGroup from "react-leaflet-cluster";

// import nigeriaJson from "../../../../public/map-json/coordinates.json";

import ZoomControls from "@/shared/components/map/zoom-controls";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

interface IProps {}

const DashboardMapContent = ({}: IProps) => {
  const mapRef = useRef(null);

  const activeMarker = new Icon({
    iconUrl: "/markers/active-devices-marker.svg",
    iconSize: [10, 10],
  });
  const inactiveMarker = new Icon({
    iconUrl: "/markers/inactive-devices-marker.svg",
    iconSize: [10, 10],
  });
  const noHeartBeatMarker = new Icon({
    iconUrl: "/markers/no-heartbeat-marker.svg",
    iconSize: [10, 10],
  });
  const heartbeatMarker = new Icon({
    iconUrl: "/markers/heartbeat-devices-marker.svg",
    iconSize: [10, 10],
  });

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[9.082, 8.6753]}
        ref={mapRef}
        zoom={8}
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

        <MarkerClusterGroup>
          <Marker position={[9.082, 8.6753]} icon={activeMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[9.17, 8.6753]} icon={activeMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[9.11, 8.6753]} icon={activeMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MarkerClusterGroup>

        <ZoomControls />
      </MapContainer>
    </div>
  );
};

export default DashboardMapContent;
