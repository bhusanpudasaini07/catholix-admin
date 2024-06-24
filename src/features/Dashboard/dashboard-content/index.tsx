import { AreaChart, Phone, Smartphone, User2 } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

import useDashboard from "@/hooks/dashboard/useDashboard.hook";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

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

  const { mapType, setMapType, regionsList, regionsLoading } = useDashboard();

  return (
    <div className="relative w-full h-full">
      <MapContent />

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
        className="absolute bottom-6 left-6 bg-white z-[400] rounded-lg
       py-3 px-4 shadow-sm flex items-center gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Select Region</Label>
          <Select>
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="z-[400]">
              <SelectItem value="0">All</SelectItem>
              {regionsList?.data?.regions?.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Select State</Label>
          <Select>
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="z-[400]">
              <SelectItem value="0">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Select LGA</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="z-[400]">
              <SelectItem value="0">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
