import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { dashboard } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const DevicesSummary = () => {
  const devicesSummary = [
    {
      value: 64251,
      percentage: 100,
      title: "Total Devices",
      icon: dashboard?.totalDevices,
      label: "Vs Last Month",
    },
    {
      value: 60210,
      percentage: 12,
      title: "Active Devices",
      icon: dashboard?.activeDevices,
      label: "Vs Last Month",
    },
    {
      value: 60010,
      percentage: 12,
      title: "Active Agents",
      icon: dashboard?.activeUsers,
      label: "Vs Last Month",
    },
    {
      value: 45032,
      percentage: 12,
      title: "Devices that have done GC",
      icon: dashboard?.connectedDevices,
      label: "Vs Last Month",
    },
    {
      value: 4041,
      percentage: -12,
      title: "Inactive Devices",
      icon: dashboard?.noHeartbeatDevices,
      label: "Vs Last Month",
    },
  ];
  return (
    <div>
      <p className="font-medium mb-4">Devices</p>
      <div className="grid grid-cols-6 gap-3">
        {devicesSummary.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "col-span-2",
              (item?.title === "Devices that have done GC" ||
                item?.title === "Inactive Devices") &&
                "col-span-3"
            )}
          >
            <CardContent className="!p-3">
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt="device" width={45} height={45} />
                <div>
                  <p className="text-color text-2xl font-bold">{item.value}</p>
                  <p className="text-zinc-500 text-xs mt-1">{item.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <Badge variant={"destructiveLight"} className="p-1 text-xs">
                  <ArrowDown size={14} />
                  {item.percentage}%
                </Badge>
                <p className="text-gray-260 text-xs whitespace-nowrap">
                  {item.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DevicesSummary;
