import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";
import Image from "next/image";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { IDeviceDetail } from "@/interface/device-interface";
import ZoomControls from "@/shared/components/map/zoom-controls";
import { Badge } from "@/shared/components/ui/badge";
import { marker } from "@/shared/lib/image-config";

interface IProps {
  deviceDetail: IDeviceDetail | undefined;
  latitude: number;
  longitude: number;
}

const DeviceMapLocation = ({ deviceDetail, latitude, longitude }: IProps) => {
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
    <MapContainer
      center={[latitude, longitude]}
      zoom={8}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg my-custom-map"
      // bounds={nigeriaBounds}
      // maxBounds={nigeriaBounds}
      zoomControl={false}
    >
      {/* <GeoJSON
  // style={geoJsonStyles}
  data={nigeriaJson as any}
  //   onEachFeature={onEachFeature}
/> */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* <MarkerClusterGroup
        chunkedLoading={true}
        iconCreateFunction={deviceCustomClusterIcon}
      >
        {inactiveDeviceData &&
          Object?.entries(inactiveDeviceData)?.map(([key, value]) => {
            return (value as IDashboardDeviceDetail[])
              .filter(
                (device) =>
                  device?.location_lat &&
                  device?.location_lng &&
                  isValidLatLng(device?.location_lat, device?.location_lng)
              )
              .map((device, index) => (
              
              ));
          })}
      </MarkerClusterGroup> */}
      <Marker position={[latitude, longitude]} icon={inactiveMarker}>
        <Popup
          closeOnEscapeKey={true}
          closeButton={false}
          className="w-[380px] min-w-0"
        >
          <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold">
                {deviceDetail?.name}
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
                    {deviceDetail?.battery_status}%
                  </span>
                </div>

                {/* <Badge
                  variant={
                    key === "active_device" || key === "heartbeat_device"
                      ? "success"
                      : "secondary"
                  }
                  className={cn(
                    "h-6 text-xs font-medium capitalize rounded border-0"
                  )}
                >
                  {key.split("_")[0]}
                </Badge> */}
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
              <span className="text-xs">{deviceDetail?.group_name ?? "-"}</span>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <Image
                src={marker?.popup?.roundUser}
                alt="User"
                width={20}
                height={20}
              />
              <span className="text-xs">{deviceDetail?.profile_name}</span>
            </div>
          </div>
        </Popup>
      </Marker>

      <ZoomControls />
    </MapContainer>
  );
};

export default DeviceMapLocation;
