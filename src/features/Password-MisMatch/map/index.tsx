import "leaflet/dist/leaflet.css";

import {
  Icon,
  LatLngBoundsExpression,
  LatLngExpression,
  divIcon,
} from "leaflet";

import React, { useEffect, useState } from "react";
import { Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import MarkerClusterGroup from "react-leaflet-cluster";

import ZoomControls from "@/shared/components/map/zoom-controls";
import { useCommonStore } from "@/store/common-store";
import { regions } from "@/constants/regionPoints";
import { PasswordMismatchDetails } from "@/interface/security-interface";

const nigeriaBounds: LatLngBoundsExpression = [
  [4.272, 2.676], // Southwest coordinates
  [13.892, 14.678], // Northeast coordinates
];

function MapEventHandler({
  setSouthWest,
  setNorthEast,
}: {
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
}) {
  useMapEvents({
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
  center: [10.0, 8.0] as [number, number],
  zoom: 12,
};

interface IProps {
  loading: boolean;
  setSouthWest: (southWest: string) => void;
  setNorthEast: (northEast: string) => void;
  passwordMisMatchMap: any;
}

const PasswordMisMatchMap = ({
  loading,
  setSouthWest,
  setNorthEast,
  passwordMisMatchMap,
}: IProps) => {
  const { profileData } = useCommonStore();
  const [mapRef, setMapRef] = useState<any>(null);
  const [centerPoint, setCenterPoint] = useState<LatLngExpression>();

  const activeMarker = new Icon({
    iconUrl: "/markers/mismatch-device-marker.svg",
    iconSize: [10, 10],
  });

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
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MarkerClusterGroup
            chunkedLoading={true}
            iconCreateFunction={deviceCustomClusterIcon}
          >
            {passwordMisMatchMap &&
              Object.entries(passwordMisMatchMap).map(([key, value]) => {
                return (value as PasswordMismatchDetails[]).map(
                  (device, index) => (
                    <Marker
                      key={device?.device_id + index}
                      position={[device?.latitude, device?.longitude]}
                      icon={activeMarker}
                    >
                      {/* You can add a Popup component here if needed */}
                    </Marker>
                  )
                );
              })}
          </MarkerClusterGroup>

          <ZoomControls />
        </MapContainer>
      )}
    </div>
  );
};

export default PasswordMisMatchMap;
