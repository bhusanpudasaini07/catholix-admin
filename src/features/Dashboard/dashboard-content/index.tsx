import dynamic from "next/dynamic";
import React from "react";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  return (
    <div className="w-full h-full">
      <MapContent />
    </div>
  );
};

export default DashboardContent;
