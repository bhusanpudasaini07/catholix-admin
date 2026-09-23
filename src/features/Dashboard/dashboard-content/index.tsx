import {
  AreaChart,
  ListRestart,
  Search,
  Smartphone,
  User2,
} from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import useDashboard from "@/hooks/dashboard/useDashboard.hook";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { useCommonStore } from "@/store/common-store";
import DashboardTime from "./dashboard-time";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  const { profileData } = useCommonStore();

  const mapOptions = [
    {
      id: "device",
      title: "Device",
      icon: <Smartphone size={20} />,
    },
    {
      id: "dealer",
      title: "Dealer",
      icon: <AreaChart size={20} />,
    },
    {
      id: "agent",
      title: "Agent",
      icon: <User2 size={20} />,
    },
  ];

  const {
    mapType,
    setMapType,
    regionId,
    stateId,
    setRegionId,
    setStateId,
    lga,
    setLga,
    deviceMapData,
    deviceMapLoading,
    searchTriggerHandler,
    resetHandler,
    dealerMapData,
    dealerMapLoading,
    agentMapData,
    agentMapLoading,
    southWest,
    setSouthWest,
    northEast,
    changeMapType,
    setNorthEast,
    zoomLevel,
    setZoomLevel,
  } = useDashboard();

  return (
    <div className=" w-full h-full">
     
     <DashboardTime />

      {/* Options */}
      {/* <div className=" top-6 left-6 flex flex-col gap-4">
        {mapOptions.map((option) => (
          <Button
            key={option.id}
            variant={mapType === option.id ? "active" : "inactive"}
            size="xl"
            className="gap-2.5"
            onClick={() => changeMapType(option.id)}
          >
            {option.icon}
            {option.title}
          </Button>
        ))}
      </div> */}

     
    </div>
  );
};

export default DashboardContent;
