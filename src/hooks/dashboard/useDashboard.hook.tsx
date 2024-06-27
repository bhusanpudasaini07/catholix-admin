import { useState } from "react";
import { useQuery } from "react-query";

const useDashboard = () => {
  // STATES
  const [mapType, setMapType] = useState<string>("device");
  const [regionId, setRegionId] = useState<string>("0");
  const [stateId, setStateId] = useState<string>("0");
  const [lga, setLga] = useState<string[]>([]);

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
  };
};

export default useDashboard;
