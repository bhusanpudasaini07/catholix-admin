import {
  AreaChart,
  ListRestart,
  Search,
  Smartphone,
  User2,
} from "lucide-react";
import moment from "moment-timezone";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import useDashboard from "@/hooks/dashboard/useDashboard.hook";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  const [watTime, setWatTime] = useState(moment().tz("Africa/Lagos"));

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

  //   For time change
  useEffect(() => {
    const interval = setInterval(() => {
      setWatTime(moment().tz("Africa/Lagos"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="absolute z-[400] top-6 left-6 flex flex-col gap-4">
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
          searchTriggerHandler={searchTriggerHandler}
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

      {/* Time */}
      <Card className="h-auto shadow-sm flex border border-primary flex-col justify-center w-[150px] absolute z-[400] top-3 right-6">
        <CardContent className="p-3 xl:py-4 xl:px-5">
          <p className="text-sm text-nowrap text-zinc-500">
            {watTime.format("LL")}
          </p>
          <p className="text-lg font-semibold text-zinc-700 2xl:text-2xl">
            {watTime.format("h:mm A")}
          </p>
          <p className="text-sm font-medium text-zinc-500">(GMT+1)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
