import "leaflet/dist/leaflet.css";

import { Icon, LatLngBoundsExpression, divIcon } from "leaflet";

import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import MarkerClusterGroup from "react-leaflet-cluster";

// import nigeriaJson from "../../../../public/map-json/coordinates.json";
import L from "leaflet";
import ZoomControls from "@/shared/components/map/zoom-controls";
import { buttonVariants } from "@/shared/components/ui/button";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/ui/badge";
import Image from "next/image";
import { marker } from "@/shared/lib/image-config";
import {
  IAgentDetail,
  IDashboardDeviceDetail,
  IDealerDetail,
  IDeviceGroup,
} from "@/interface/dashboard-interface";
import { isValidLatLng } from "@/shared/utils/map-utils/lat-lng-utils";
import ButtonLoader from "@/shared/components/loader/button-loader";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

interface IProps {
  mapType: string;
  loading: boolean;
  deviceData: IDeviceGroup | undefined;
  dealerData: IDealerDetail[];
  agentData: IAgentDetail[];
  southWest: string;
  northEast: string;
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
}

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

const mapConstants = {
  center: [10.0, 8.0] as [number, number], // New coordinates for the center
  zoom: 8, // Example zoom level
};

const DashboardMapContent = ({
  mapType,
  loading,
  deviceData,
  dealerData,
  agentData,
  southWest,
  northEast,
  setSouthWest,
  setNorthEast,
}: IProps) => {
  const mapRef = useRef(null);
  const initialBounds = L.latLng(mapConstants.center).toBounds(
    mapConstants.zoom * 1000
  );
  const initialSouthWest = `${initialBounds.getWest()},${initialBounds.getSouth()}`;
  const initialNorthEast = `${initialBounds.getEast()},${initialBounds.getNorth()}`;
  // const [southWest, setSouthWest] = useState<string>(initialSouthWest);
  // const [northEast, setNorthEast] = useState<string>(initialNorthEast);
  const [filteredDeviceData, setFilteredDeviceData] = useState<
    IDeviceGroup | undefined
  >(undefined);

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
  const agentMarker = new Icon({
    iconUrl: "/markers/agent-marker.svg",
    iconSize: [10, 10],
  });
  const dealerMarker = new Icon({
    iconUrl: "/markers/dealer-marker.svg",
    iconSize: [15, 15],
  });

  const DealerCustomMarker = ({
    position,
    text,
    children,
  }: {
    position: [number, number];
    text: string;
    children: React.ReactNode;
  }) => {
    const icon = L.divIcon({
      className: "dealer-custom-icon",
      html: `<div class="dealer-icon-container">${text}</div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });

    return (
      <Marker position={position} icon={icon}>
        {children}
      </Marker>
    );
  };
  const createCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<div class="cluster-icon-wrapper"><div class="cluster-icon">${cluster.getChildCount()}</div></div>`,
      className: "custom-cluster-icon",
      iconSize: [20, 20],
    });
  };
  const deviceCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<div class="device-cluster-icon-wrapper"><div class="cluster-icon">${cluster.getChildCount()}</div></div>`,
      className: "device-custom-cluster-icon",
      iconSize: [20, 20],
    });
  };
  const agentCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<div class="agent-cluster-icon-wrapper"><div class="cluster-icon">${cluster.getChildCount()}</div></div>`,
      className: "device-custom-cluster-icon",
      iconSize: [20, 20],
    });
  };

  const filterData = () => {
    if (deviceData && southWest && northEast) {
      const [swLng, swLat] = southWest.split(",").map(Number);
      const [neLng, neLat] = northEast.split(",").map(Number);

      const filteredData: IDeviceGroup = Object.entries(deviceData).reduce(
        (acc: any, [key, value]) => {
          acc[key] = (value as IDashboardDeviceDetail[]).filter((device) => {
            const lat = device?.location_lat;
            const lng = device?.location_lng;
            return lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng;
          });
          return acc;
        },
        {} as IDeviceGroup
      );

      setFilteredDeviceData(filteredData);
    }
  };

  useEffect(() => {
    if (deviceData) filterData();
  }, [deviceData, southWest, northEast]);

  useEffect(() => {
    setSouthWest(initialSouthWest);
    setNorthEast(initialNorthEast);
  }, []);

  // const dealerDummyData = [
  //   {
  //     dealer_code: "D001",
  //     latitude: "6.5244",
  //     longitude: "3.3792",
  //     name: "Dealer One",
  //     address: "123 Lagos Street, Lagos, Nigeria",
  //     phone: "+234 800 123 4567",
  //     email: "dealerone@example.com",
  //   },
  //   {
  //     dealer_code: "D002",
  //     latitude: "9.0578",
  //     longitude: "7.4951",
  //     name: "Dealer Two",
  //     address: "456 Abuja Avenue, Abuja, Nigeria",
  //     phone: "+234 800 234 5678",
  //     email: "dealertwo@example.com",
  //   },
  //   {
  //     dealer_code: "D003",
  //     latitude: "4.8156",
  //     longitude: "7.0498",
  //     name: "Dealer Three",
  //     address: "789 Port Harcourt Road, Port Harcourt, Nigeria",
  //     phone: "+234 800 345 6789",
  //     email: "dealerthree@example.com",
  //   },
  // ];
  return (
    <div className="relative w-full h-full">
      {/* {loading && (
        <div className="flex absolute justify-center items-center w-full h-full z-[401] bg-black/50">
          <ButtonLoader />
        </div>
      )} */}
      <MapContainer
        center={mapConstants.center}
        ref={mapRef}
        zoom={mapConstants.zoom}
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

        {mapType === "device" && (
          <MarkerClusterGroup
            chunkedLoading={true}
            iconCreateFunction={deviceCustomClusterIcon}
          >
            {/* Devices */}
            {filteredDeviceData &&
              Object.entries(filteredDeviceData).map(([key, value]) => {
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
                      icon={
                        key === "active_device"
                          ? activeMarker
                          : key === "inactive_device"
                          ? inactiveMarker
                          : key === "noheartbeat_device"
                          ? noHeartBeatMarker
                          : heartbeatMarker
                      }
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
                            href={`/`}
                            // href={`/devices/${device.id}`}
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
          </MarkerClusterGroup>
        )}

        {mapType === "agent" && (
          <MarkerClusterGroup
            chunkedLoading={true}
            iconCreateFunction={agentCustomClusterIcon}
          >
            {/* Agents */}
            {agentData &&
              agentData
                ?.filter((agent) =>
                  isValidLatLng(
                    Number(agent?.latitude),
                    Number(agent?.longitude)
                  )
                )
                .map((agent) => (
                  <Marker
                    key={agent?.code}
                    position={[
                      Number(agent?.latitude),
                      Number(agent?.longitude),
                    ]}
                    icon={agentMarker}
                  >
                    <Popup
                      closeOnEscapeKey={true}
                      closeButton={false}
                      className="w-[410px] min-w-0"
                    >
                      <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
                        <div className="flex gap-1 justify-between items-center min-w-0 max-w-full">
                          <div className="flex gap-2 items-center min-w-0">
                            <Image
                              src={marker?.popup?.polygonUser}
                              width={22}
                              height={22}
                              alt="Agent Image"
                              className="shrink-0"
                            />
                            <span className="text-base font-semibold uppercase truncate">
                              {agent?.name}
                            </span>
                          </div>
                          <Badge
                            variant={"success"}
                            className={cn(
                              "h-6 font-medium capitalize rounded border-0"
                            )}
                          >
                            {agent?.code}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2 ml-1">
                          <div className="flex gap-2 items-center">
                            <Image
                              src={marker?.popup?.phone}
                              alt="User"
                              width={20}
                              height={20}
                            />
                            <span className="text-sm">
                              {agent?.alter_mobile_num}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Image
                              src={marker?.popup?.chart}
                              alt="User"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-zinc-700">0</span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center mt-2 ml-1">
                          <Image
                            src={marker?.popup?.roundUserAdd}
                            alt="User"
                            width={20}
                            height={20}
                          />
                          <span className="text-sm">{agent?.address1}</span>
                        </div>
                        <Link
                          href={`/`}
                          // href={`/agent/${agent?.code}`}
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
                ))}
          </MarkerClusterGroup>
        )}
        {mapType === "dealer" &&
          // <MarkerClusterGroup
          //   chunkedLoading={true}
          //   iconCreateFunction={createCustomClusterIcon}
          // >
          //   {dealerData &&

          // </MarkerClusterGroup>
          dealerData
            .filter((dealer) =>
              isValidLatLng(Number(dealer?.latitude), Number(dealer?.longitude))
            )
            .map((dealer) => (
              <DealerCustomMarker
                key={dealer?.dealer_code}
                position={[Number(dealer?.latitude), Number(dealer?.longitude)]}
                text={"0"}
              >
                <Popup
                  closeOnEscapeKey={true}
                  closeButton={false}
                  className="w-[380px] min-w-0"
                >
                  <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
                    <div className="flex gap-1 justify-between items-center min-w-0 max-w-full">
                      <div className="flex gap-2 items-center min-w-0">
                        <span className="text-base font-semibold uppercase truncate">
                          {dealer?.dealer_name}
                        </span>
                      </div>
                      <Badge
                        variant={"success"}
                        className={cn(
                          "h-6 font-bold capitalize rounded border-0"
                        )}
                      >
                        {dealer?.dealer_code}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2 ml-1">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={marker?.popup?.phone}
                          alt="User"
                          width={20}
                          height={20}
                        />
                        <span className="text-sm">
                          {dealer?.dealer_contact ?? "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start mt-2 ml-1">
                      <Image
                        src={marker?.popup?.mapPin}
                        alt="User"
                        width={18}
                        height={18}
                      />
                      <span className="text-sm">
                        {dealer?.dealer_address ?? "N/A"}
                      </span>
                    </div>
                    {/* <div className="flex gap-2 items-start mt-2 ml-1">
                      <Image
                        src={marker?.popup?.roundUserAdd}
                        alt="User"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm">
                        {dealer?.dealer_type ?? "N/A"}
                      </span>
                    </div> */}
                    <Link
                      href={`/`}
                      // href={`/agent/${agent?.code}`}
                      className={cn(
                        buttonVariants({ variant: "primary", size: "sm" }),
                        "mt-4"
                      )}
                    >
                      View Detail
                    </Link>
                  </div>
                </Popup>
              </DealerCustomMarker>
              // <Marker
              //   key={dealer?.dealer_code}
              //   position={[Number(dealer?.latitude), Number(dealer?.longitude)]}
              //   icon={dealerMarker}
              // >
              //   <Popup
              //     closeOnEscapeKey={true}
              //     closeButton={false}
              //     className="w-[380px] min-w-0"
              //   >
              //     <div className="px-6 py-4 w-full min-w-0 bg-white rounded-lg">
              //       <div className="flex justify-between items-center">
              //         <span className="text-base font-semibold">
              //           Meretricious_model_3
              //         </span>
              //         <div className="flex gap-2 items-center">
              //           <div className="flex gap-1.5 items-center">
              //             <Image
              //               src={marker?.popup?.battery}
              //               alt="User"
              //               width={12}
              //               height={12}
              //             />
              //             <span className="text-sm font-medium text-green-600">
              //               90%
              //             </span>
              //           </div>

              //           <Badge
              //             variant={
              //               "success"
              //               // : "secondary"
              //             }
              //             className={cn(
              //               "h-6 font-medium capitalize rounded border-0"
              //             )}
              //           >
              //             {"Active"}
              //           </Badge>
              //         </div>
              //       </div>
              //       <span className="text-xs text-gray-500">Zainab Khoury</span>
              //       <div className="flex gap-2 items-center mt-2">
              //         <Image
              //           src={marker?.popup?.polygonUser}
              //           alt="User"
              //           width={20}
              //           height={20}
              //         />
              //         <span className="text-xs">
              //           MACSWORTH SERVICES NIGERIA LTD
              //         </span>
              //       </div>
              //       <div className="flex gap-2 items-center mt-2">
              //         <Image
              //           src={marker?.popup?.roundUser}
              //           alt="User"
              //           width={20}
              //           height={20}
              //         />
              //         <span className="text-xs">ABDUL AHAD TUJJANI</span>
              //       </div>
              //       <Link
              //         href="/devices/1"
              //         className={cn(
              //           buttonVariants({ variant: "primary", size: "sm" }),
              //           "mt-4"
              //         )}
              //       >
              //         View Detail
              //       </Link>
              //     </div>
              //   </Popup>
              // </Marker>
            ))}

        <MapEventHandler
          setSouthWest={setSouthWest}
          setNorthEast={setNorthEast}
        />
        <ZoomControls />
      </MapContainer>
    </div>
  );
};

export default DashboardMapContent;
