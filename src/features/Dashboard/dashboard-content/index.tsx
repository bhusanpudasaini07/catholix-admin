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
import { Button } from "@/shared/components/ui/button";

import RegionalFilter from "@/shared/components/regional-filter";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
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
  } = useDashboard();

  return (
    <div className="relative w-full h-full">
      <MapContent
        mapType={mapType}
        loading={deviceMapLoading || dealerMapLoading || agentMapLoading}
        deviceData={deviceMapData?.data}
        dealerData={dealerMapData?.data ?? []}
        agentData={agentMapData?.data ?? []}
      />

      {/* Options */}
      <div className="absolute  z-[400] top-6 left-6 flex flex-col gap-4">
        {mapOptions.map((option) => (
          <Button
            key={option.id}
            variant={mapType === option.id ? "active" : "inactive"}
            size="xl"
            className="gap-2.5"
            onClick={() => setMapType(option.id)}
          >
            {option.icon}
            {option.title}
          </Button>
        ))}
      </div>

      {/* Filter */}
      <div
        className="absolute bottom-6 left-6 bg-white z-[400] rounded-lg flex items-end gap-3
       py-3 px-4 shadow"
      >
        <RegionalFilter
          regionId={regionId}
          stateId={stateId}
          setRegionId={setRegionId}
          setStateId={setStateId}
          lga={lga}
          setLga={setLga}
        />
        <Button
          variant={"white"}
          size={"icon"}
          className="gap-1 p-2 h-9"
          onClick={resetHandler}
        >
          <ListRestart size={20} />
        </Button>
        <Button
          variant={"primary"}
          size={"icon"}
          className="gap-1 p-2 h-9"
          onClick={searchTriggerHandler}
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default DashboardContent;
