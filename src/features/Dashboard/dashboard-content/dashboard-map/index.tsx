import "leaflet/dist/leaflet.css";

import { Icon, LatLngBoundsExpression } from "leaflet";
import {
  Battery,
  BatteryFull,
  Minus,
  MonitorSpeaker,
  Plus,
} from "lucide-react";
import React, { useRef } from "react";
import { GeoJSON, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import MarkerClusterGroup from "react-leaflet-cluster";

// import nigeriaJson from "../../../../public/map-json/coordinates.json";

import ZoomControls from "@/shared/components/map/zoom-controls";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/ui/badge";
import Image from "next/image";
import { marker } from "@/shared/lib/image-config";

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
        className="w-full h-full rounded-lg my-custom-map"
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
          {/* Devices */}
          <Marker position={[9.082, 8.6753]} icon={activeMarker}>
            <Popup
              closeOnEscapeKey={true}
              closeButton={false}
              className="w-[380px] min-w-0"
            >
              <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">
                    Meretricious_model_3
                  </span>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src={marker?.popup?.battery}
                        alt="User"
                        width={12}
                        height={12}
                      />
                      <span className="text-sm font-medium text-green-600">
                        90%
                      </span>
                    </div>

                    <Badge
                      variant={
                        "success"
                        // : "secondary"
                      }
                      className={cn(
                        "h-6 font-medium capitalize rounded border-0"
                      )}
                    >
                      {"Active"}
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Zainab Khoury</span>
                <div className="flex gap-2 items-center mt-2">
                  <Image
                    src={marker?.popup?.polygonUser}
                    alt="User"
                    width={20}
                    height={20}
                  />
                  <span className="text-xs">
                    MACSWORTH SERVICES NIGERIA LTD
                  </span>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <Image
                    src={marker?.popup?.roundUser}
                    alt="User"
                    width={20}
                    height={20}
                  />
                  <span className="text-xs">ABDUL'AHAD TUJJANI</span>
                </div>
                <Link
                  href="/devices/1"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "mt-4"
                  )}
                >
                  View Detail
                </Link>
              </div>
            </Popup>
          </Marker>
          {/* Agents */}
          <Marker position={[9.17, 8.6753]} icon={activeMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* Dealer */}
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
