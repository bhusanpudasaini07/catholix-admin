import dynamic from "next/dynamic";
import React from "react";
import { Marker, Popup } from "react-leaflet";

const MapContent = dynamic(import("@/shared/components/map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  return (
    <MapContent>
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      di
    </MapContent>
  );
};

export default DashboardContent;
