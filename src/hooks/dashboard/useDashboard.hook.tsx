import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import {
  IAgentMap,
  IDealerMap,
  IDeviceMap,
  IDeviceStats,
} from "@/interface/dashboard-interface";
import {
  getAgentMapData,
  getDealerMapData,
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
  const resetHandler = () => {
    setRegionId("0");
    setStateId("0");
    setLga([]);
    setSearchTrigger(!searchTrigger);
  };

  // Device Stats
  const { data: deviceStats, isLoading: deviceStatsLoading } =
    useQuery<IDeviceStats>({
      queryKey: ["deviceStats"],
      queryFn: getDeviceStats,
      refetchInterval: 20000,
    });

  // Device map
  const { data: deviceMapData, isLoading: deviceMapLoading } =
    useQuery<IDeviceMap>({
      queryKey: ["deviceMap", searchTrigger],
      queryFn: async () => {
        if (mapType === "device") {
          return await getDeviceMapData(
            regionId,
            stateId,
            lga?.length > 0 ? lga.map((l) => l).join(",") : "0"
          );
        }
      },
      enabled: !!mapType && mapType === "device",
      refetchInterval: 20000,
    });

  // Dealer map
  const { data: dealerMapData, isLoading: dealerMapLoading } =
    useQuery<IDealerMap>({
      queryKey: ["dealerMap", searchTrigger],
      queryFn: async () => {
        if (mapType === "dealer") {
          const response = await getDealerMapData(
            regionId,
            stateId,
            lga?.length > 0 ? lga.map((l) => l).join(",") : "0"
          );
          return response;
        }
      },
      enabled: !!mapType && mapType === "dealer",
    });

  // Agent map
  const { data: agentMapData, isLoading: agentMapLoading } =
    useQuery<IAgentMap>({
      queryKey: ["agentMap", searchTrigger],
      queryFn: async () => {
        if (mapType === "agent") {
          return await getAgentMapData(
            regionId,
            stateId,
            lga?.length > 0 ? lga.map((l) => l).join(",") : "0"
          );
        }
      },
      enabled: !!mapType && mapType === "agent",
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
    resetHandler,

    // API
    deviceStats,
    deviceStatsLoading,
    deviceMapData,
    deviceMapLoading,
    dealerMapData,
    dealerMapLoading,
    agentMapData,
    agentMapLoading,
  };
};

export default useDashboard;
