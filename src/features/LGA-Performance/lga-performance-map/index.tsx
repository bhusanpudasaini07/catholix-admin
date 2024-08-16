import "leaflet/dist/leaflet.css";

import {
  Icon,
  LatLngBoundsExpression,
  LatLngExpression,
  divIcon,
} from "leaflet";

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
import { IDashboardDeviceDetail } from "@/interface/dashboard-interface";
import { isValidLatLng } from "@/shared/utils/map-utils/lat-lng-utils";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

/**
 * Map event handler
 * @param param0
 * @returns southwest and northeast coordinates
 */
function MapEventHandler({
  setSouthWest,
  setNorthEast,
}: {
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
}) {
  useMapEvents({
    load: () => {},
    moveend: (e) => {
      const bounds = e.target.getBounds();
      const southWest = `${bounds.getWest()},${bounds.getSouth()}`;
      const northEast = `${bounds.getEast()},${bounds.getNorth()}`;
      setSouthWest(southWest);
      setNorthEast(northEast);
    },
  });
  return null;
}

// Map component returning southwest and northeast coordinates on initial load
function MapComponent({
  setSouthWest,
  setNorthEast,
}: {
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = map.getBounds();
    const southWest = `${bounds.getWest()},${bounds.getSouth()}`;
    const northEast = `${bounds.getEast()},${bounds.getNorth()}`;
    setSouthWest(southWest);
    setNorthEast(northEast);
  }, [map]);
  return null;
}

const mapConstants = {
  center: [10.0, 8.0] as [number, number], // New coordinates for the center
  zoom: 12, // Example zoom level
};
interface IProps {
  loading: boolean;
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
  lgaPerformanceMap: any;
}

const LGAPerformanceMap = ({
  loading,
  setSouthWest,
  setNorthEast,
  lgaPerformanceMap,
}: IProps) => {
  const { profileData } = useCommonStore();
  const [mapRef, setMapRef] = useState<any>(null);
  const [centerPoint, setCenterPoint] = useState<LatLngExpression>();

  const activeMarker = new Icon({
    iconUrl: "/markers/active-devices-marker.svg",
    iconSize: [10, 10],
  });
  // const inactiveMarker = new Icon({
  //   iconUrl: "/markers/inactive-devices-marker.svg",
  //   iconSize: [10, 10],
  // });
  // const noHeartBeatMarker = new Icon({
  //   iconUrl: "/markers/no-heartbeat-marker.svg",
  //   iconSize: [10, 10],
  // });
  // const heartbeatMarker = new Icon({
  //   iconUrl: "/markers/heartbeat-devices-marker.svg",
  //   iconSize: [10, 10],
  // });

  const deviceCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<div class="device-cluster-icon-wrapper"><div class="cluster-icon">${cluster.getChildCount()}</div></div>`,
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
          zoom={mapConstants.zoom}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg my-custom-map"
          // bounds={nigeriaBounds}
          // maxBounds={nigeriaBounds}
          zoomControl={false}
        >
          <MapComponent
            setSouthWest={setSouthWest}
            setNorthEast={setNorthEast}
          />
          <MapEventHandler
            setSouthWest={setSouthWest}
            setNorthEast={setNorthEast}
          />
          {/* <GeoJSON
          // style={geoJsonStyles}
          data={nigeriaJson as any}
          //   onEachFeature={onEachFeature}
        /> */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MarkerClusterGroup
            chunkedLoading={true}
            iconCreateFunction={deviceCustomClusterIcon}
          >
            {lgaPerformanceMap &&
              Object?.entries(lgaPerformanceMap)?.map(([key, value]) => {
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
                      icon={activeMarker}
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
            {/* <Marker position={[9.082, 8.6753]} icon={inactiveMarker}>
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
                    <span className="text-xs">ABDUL AHAD TUJJANI</span>
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
            </Marker> */}
          </MarkerClusterGroup>

          <ZoomControls />
        </MapContainer>
      )}
    </div>
  );
};

export default LGAPerformanceMap;
