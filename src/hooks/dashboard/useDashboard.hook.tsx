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
import { useCommonStore } from "@/store/common-store";
import config from "../../../config";
import axios from "axios";
import { axiosInstance } from "@/axios/axiosInstance";

const useDashboard = () => {
  const queryClient = useQueryClient();
  const { API_BASE_URL } = config;
  const { profileData } = useCommonStore();
  // STATES
  const [mapType, setMapType] = useState<string>("device");
  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [southWest, setSouthWest] = useState<string>("");
  const [northEast, setNorthEast] = useState<string>("");
  // FUNCTION
  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };
  const resetHandler = () => {
    setRegionId("all");
    setStateId("all");
    setLga([]);
    setSearchTrigger(!searchTrigger);
  };

  // DEVICE DATA FETCHING
  const fetchDeviceMapData = async (
    API_BASE_URL: string | undefined,
    regionId: string,
    stateId: string,
    lga: string[]
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/dashboard/device-map-data?region=${
        regionId || "all"
      }&state=${stateId || "all"}&lga=${
        lga.length > 0 ? lga.join(",") : "all"
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.body;
  };

  // PARSE STREAMED DATA
  const parseStreamedData = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();
    let buffer = "";
    let parsedData: { [key: string]: any[] } = {};

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split(/(?<=\})\s*(?=\{)/);

      parts.slice(0, -1).forEach((part) => {
        try {
          const jsonString = part.trim();
          if (jsonString) {
            const keyMatch = jsonString.match(/"(\w+)":/);
            const valueMatch = jsonString.match(/:\s*(\[.*\])/);
            if (keyMatch && valueMatch) {
              const key = keyMatch[1];
              const value = JSON.parse(valueMatch[1]);
              parsedData[key] = parsedData[key] || [];
              parsedData[key].push(...value);
            }
          }
        } catch (e) {
          console.error("Failed to process JSON:", e);
        }
      });

      buffer = parts[parts.length - 1];
    }

    if (buffer.trim()) {
      try {
        const keyMatch = buffer.match(/"(\w+)":/);
        const valueMatch = buffer.match(/:\s*(\[.*\])/);
        if (keyMatch && valueMatch) {
          const key = keyMatch[1];
          const value = JSON.parse(valueMatch[1]);
          parsedData[key] = parsedData[key] || [];
          parsedData[key].push(...value);
        }
      } catch (e) {
        console.error("Failed to process JSON:", e);
      }
    }

    return parsedData;
  };

  // Device Stats
  const { data: deviceStats, isLoading: deviceStatsLoading } =
    useQuery<IDeviceStats>({
      queryKey: ["deviceStats"],
      queryFn: getDeviceStats,
      refetchInterval: 20000,
    });

  // Device map
  const { data: deviceMapData, isLoading: deviceMapLoading } = useQuery<any>({
    queryKey: ["deviceMap", searchTrigger],
    queryFn: async () => {
      if (mapType === "device" && profileData && regionId && stateId) {
        const body = await fetchDeviceMapData(
          API_BASE_URL,
          regionId,
          stateId,
          lga
        );
        const reader = body?.getReader();
        return await parseStreamedData(reader!);
      }
    },
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
            lga?.length > 0 ? lga.map((l) => l).join(",") : "all"
            // southWest,
            // northEast
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
            lga?.length > 0 ? lga.map((l) => l).join(",") : "all"
            // southWest,
            // northEast
          );
        }
      },
      enabled: !!mapType && mapType === "agent",
    });

  useEffect(() => {
    if (mapType === "device") {
      const interval = setInterval(() => {
        queryClient.invalidateQueries(["deviceMap"]);
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [mapType]);

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
    southWest,
    setSouthWest,
    northEast,
    setNorthEast,
  };
};

export default useDashboard;
