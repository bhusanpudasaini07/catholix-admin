import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { IDeviceMap, IDeviceStats } from "@/interface/dashboard-interface";
import {
  getDeviceMapData,
  getDeviceStats,
} from "@/services/dashboard/dashboard-service";

const useDashboard = () => {
  const queryClient = useQueryClient();
  // STATES
  const [mapType, setMapType] = useState<string>("device");
  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");
  const [lga, setLga] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  // FUNCTION
  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  // Device Stats
  const { data: deviceStats, isLoading: deviceStatsLoading } =
    useQuery<IDeviceStats>({
      queryKey: ["deviceStats"],
      queryFn: getDeviceStats,
      // refetchInterval: 20000,
    });

  const { data: deviceMapData, isLoading: deviceMapLoading } =
    useQuery<IDeviceMap>({
      queryKey: ["deviceMap", searchTrigger],
      queryFn: () =>
        getDeviceMapData(
          regionId,
          stateId,
          lga?.length > 0 ? lga.map((l) => l).join(",") : "0"
        ),
      // refetchInterval: 20000
    });

  return {
    // States
    mapType,
    setMapType,
    regionId,
    setRegionId,
    stateId,
    setStateId,
    lga,
    setLga,
    searchTrigger,

    // FUNCTION
    searchTriggerHandler,

    // API
    deviceStats,
    deviceStatsLoading,
    deviceMapData,
    deviceMapLoading,
  };
};

export default useDashboard;
