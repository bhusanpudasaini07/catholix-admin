import "leaflet/dist/leaflet.css";

import {
  Icon,
  LatLngBoundsExpression,
  LatLngExpression,
  divIcon,
} from "leaflet";
import L from "leaflet";

import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import MarkerClusterGroup from "react-leaflet-cluster";

// import nigeriaJson from "../../../../public/map-json/coordinates.json";

import ZoomControls from "@/shared/components/map/zoom-controls";
import { buttonVariants } from "@/shared/components/ui/button";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/ui/badge";
import Image from "next/image";
import { marker } from "@/shared/lib/image-config";
import { useCommonStore } from "@/store/common-store";
import { regions } from "@/constants/regionPoints";
import { IDeviceDetail } from "@/interface/device-interface";
import { IDashboardDeviceDetail } from "@/interface/dashboard-interface";
import { isValidLatLng } from "@/shared/utils/map-utils/lat-lng-utils";

const nigeriaBounds: LatLngBoundsExpression = [
  [2.0, 0.0], // Southwest coordinates
  [16.0, 16.0], // Northeast coordinates
];

interface IProps {
  loading: boolean;
  southWest: string;
  northEast: string;
  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
  inactiveDeviceData: any;
}

/**
 * Map event handler
 * @param param0
 * @returns southwest and northeast coordinates
 */
function MapEventHandler({
  setSouthWest,
  setNorthEast,
  setZoomLevel,
}: {
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
  setZoomLevel: (zoomLevel: number) => void;
}) {
  useMapEvents({
    load: () => {},
    moveend: (e) => {
      const bounds = e.target.getBounds();
      const southWest = `${bounds.getWest()},${bounds.getSouth()}`;
      const northEast = `${bounds.getEast()},${bounds.getNorth()}`;
      setSouthWest(southWest);
      setNorthEast(northEast);
      setZoomLevel(e.target.getZoom());
    },
  });
  return null;
}

// Map component returning southwest and northeast coordinates on initial load
function MapComponent({
  setSouthWest,
  setNorthEast,
  setZoomLevel,
}: {
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
  setZoomLevel: (zoomLevel: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = map.getBounds();
    const southWest = `${bounds.getWest()},${bounds.getSouth()}`;
    const northEast = `${bounds.getEast()},${bounds.getNorth()}`;
    setSouthWest(southWest);
    setNorthEast(northEast);
    setZoomLevel(map.getZoom());
  }, [map]);
  return null;
}

const mapConstants = {
  center: [10.0, 8.0] as [number, number], // New coordinates for the center
  zoom: 8, // Example zoom level
};

const sumClusterValues = (cluster: any) => {
  const markers = cluster.getAllChildMarkers();
  const totalValue = markers.reduce((sum: any, marker: any) => {
    return sum + Number(marker.options.icon.options.text);
  }, 0);
  return totalValue;
};
const ZoomableMarker = ({
  position,
  icon,
  zoomIncrement = 1,
}: {
  position: [number, number];
  icon: L.DivIcon;
  zoomIncrement?: number;
}) => {
  const map = useMap();

  const handleClick = () => {
    map.setView(position, map.getZoom() + zoomIncrement);
  };

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    />
  );
};

const InactiveMapContent = ({
  loading,
  setSouthWest,
  setNorthEast,
  inactiveDeviceData,
  zoomLevel,
  setZoomLevel,
}: IProps) => {
  const { profileData } = useCommonStore();
  const [mapRef, setMapRef] = useState<any>(null);
  const [centerPoint, setCenterPoint] = useState<LatLngExpression>();

  const inactiveMarker = new Icon({
    iconUrl: "/markers/inactive-devices-marker.svg",
    iconSize: [10, 10],
  });

  const deviceCustomClusterIcon = (cluster: any) => {
    const totalValue = sumClusterValues(cluster);
    return divIcon({
      html: `<div class="device-cluster-icon-wrapper"><div class="cluster-icon">${totalValue}</div></div>`,
      className: "device-custom-cluster-icon",
      iconSize: [20, 20],
    });
  };

  useEffect(() => {
    if (profileData && profileData?.regionId !== 0) {
      const region = Object.values(regions).find(
        (region) => region.id === profileData?.regionId
      )?.centralPoint;
      if (region) {
        setCenterPoint([region.lat, region.lng]);
      }
    } else {
      setCenterPoint(mapConstants.center);
    }
  }, [profileData]);
  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="flex absolute justify-center rounded-lg items-center w-full h-full z-[401] bg-black/40">
          {/* <ButtonLoader /> */}
        </div>
      )}
      {centerPoint && centerPoint !== undefined && (
        <MapContainer
          center={centerPoint}
          ref={setMapRef}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg my-custom-map"
          // bounds={nigeriaBounds}
          maxBounds={nigeriaBounds}
          zoomControl={false}
          minZoom={5}
        >
          <MapComponent
            setSouthWest={setSouthWest}
            setNorthEast={setNorthEast}
            setZoomLevel={setZoomLevel}
          />
          <MapEventHandler
            setSouthWest={setSouthWest}
            setNorthEast={setNorthEast}
            setZoomLevel={setZoomLevel}
          />
          {/* <GeoJSON
          // style={geoJsonStyles}
          data={nigeriaJson as any}
          //   onEachFeature={onEachFeature}
        /> */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {zoomLevel <= 12 && (
            <MarkerClusterGroup
              chunkedLoading={true}
              iconCreateFunction={deviceCustomClusterIcon}
            >
              {inactiveDeviceData &&
                Object.entries(inactiveDeviceData).map(([key, value]) => {
                  return (value as any[])
                    .filter(
                      (device) =>
                        device?.avg_lat &&
                        device?.avg_lng &&
                        isValidLatLng(device?.avg_lat, device?.avg_lng)
                    )
                    .map((device, index) => (
                      <ZoomableMarker
                        key={device?.device_id}
                        position={[
                          Number(device?.avg_lat),
                          Number(device?.avg_lng),
                        ]}
                        icon={L.divIcon({
                          className: "device-custom-cluster-icon",
                          html: `<div class="device-cluster-icon-wrapper"><div class="cluster-icon">${device?.total}</div></div>`,
                          iconSize: [30, 42],
                          iconAnchor: [15, 42],
                          text: device?.total,
                        } as L.DivIconOptions)}
                      />
                    ));
                })}
            </MarkerClusterGroup>
          )}
          {zoomLevel > 12 &&
            inactiveDeviceData &&
            Object?.entries(inactiveDeviceData)?.map(([key, value]) => {
              return (value as IDashboardDeviceDetail[])
                .filter(
                  (device) =>
                    device?.location_lat &&
                    device?.location_lng &&
                    isValidLatLng(device?.location_lat, device?.location_lng)
                )
                .map((device, index) => (
                  <Marker
                    key={device?.id + index}
                    position={[device?.location_lat, device?.location_lng]}
                    icon={inactiveMarker}
                  >
                    <Popup
                      closeOnEscapeKey={true}
                      closeButton={false}
                      className="w-[380px] min-w-0"
                    >
                      <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold">
                            {device?.name}
                          </span>
                          <div className="flex gap-2 items-center">
                            <div className="flex gap-1.5 items-center">
                              <Image
                                src={marker?.popup?.battery}
                                alt="Battery"
                                width={12}
                                height={12}
                              />
                              <span className="text-sm font-medium text-green-600">
                                {device?.battery_status}%
                              </span>
                            </div>

                            <Badge
                              variant={
                                key === "active_device" ||
                                key === "heartbeat_device"
                                  ? "success"
                                  : "secondary"
                              }
                              className={cn(
                                "h-6 text-xs font-medium capitalize rounded border-0"
                              )}
                            >
                              {key.split("_")[0]}
                            </Badge>
                          </div>
                        </div>
                        {/* <span className="text-xs text-gray-500">
              {device?.gsuite_account}
            </span> */}
                        <div className="flex gap-2 items-center mt-2">
                          <Image
                            src={marker?.popup?.polygonUser}
                            alt="User"
                            width={20}
                            height={20}
                          />
                          <span className="text-xs">
                            {device?.group_name ?? "-"}
                          </span>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <Image
                            src={marker?.popup?.roundUser}
                            alt="User"
                            width={20}
                            height={20}
                          />
                          <span className="text-xs">
                            {device?.profile_name}
                          </span>
                        </div>
                        <Link
                          href={`/devices/${device.id}`}
                          className={cn(
                            buttonVariants({
                              variant: "primary",
                              size: "sm",
                            }),
                            "mt-4"
                          )}
                        >
                          View Detail
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ));
            })}

          <ZoomControls />
        </MapContainer>
      )}
    </div>
  );
};

export default InactiveMapContent;
