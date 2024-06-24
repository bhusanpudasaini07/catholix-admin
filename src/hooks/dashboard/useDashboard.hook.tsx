import { IRegionProps } from "@/interface/common-interface";
import { getRegions } from "@/services/admin/admin-service";
import { useState } from "react";
import { useQuery } from "react-query";

const useDashboard = () => {
  // STATES
  const [mapType, setMapType] = useState<string>("device");
  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  return {
    // States
    mapType,
    setMapType,
    regionId,
    setRegionId,
    stateId,
    setStateId,

    // API
    regionsList,
    regionsLoading,
  };
};

export default useDashboard;
