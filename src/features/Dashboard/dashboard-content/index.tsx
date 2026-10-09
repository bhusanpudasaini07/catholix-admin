import {
  AreaChart,
  Smartphone,
  User2,
} from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import { useCommonStore } from "@/store/common-store";
import DashboardTime from "./dashboard-time";

const MapContent = dynamic(import("./dashboard-map"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DashboardContent = () => {
  const { profileData } = useCommonStore();




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
