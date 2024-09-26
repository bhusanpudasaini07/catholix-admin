import { ISummaryDevice } from "@/interface/report-interface";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dashboard } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IProps {
  devices: ISummaryDevice[] | undefined;
  loading: boolean;
  tabValue: string;
}

const DevicesSummary = ({ devices, loading, tabValue }: IProps) => {
  const findEachDevice = (type: string) => {
    return devices?.find((item) => item.type === type);
  };

  const devicesSummary = [
    {
      value: findEachDevice("total_devices")?.current_count || 0,
      percentage: findEachDevice("total_devices")?.change_percent || 0,
      title: "Total Devices",
      icon: dashboard?.totalDevices,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
    },
    {
      value: findEachDevice("active_devices")?.current_count || 0,
      percentage: findEachDevice("active_devices")?.change_percent || 0,
      title: "Active Devices",
      icon: dashboard?.activeDevices,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
    },
    {
      value: findEachDevice("active_agents")?.current_count || 0,
      percentage: findEachDevice("active_agents")?.change_percent || 0,
      title: "Active Agents",
      icon: dashboard?.activeUsers,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
    },
    {
      value: findEachDevice("gc_devices")?.current_count || 0,
      percentage: findEachDevice("gc_devices")?.change_percent || 0,
      title: "Devices that have done GC",
      icon: dashboard?.connectedDevices,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
    },
    {
      value: findEachDevice("inactive_devices")?.current_count || 0,
      percentage: findEachDevice("inactive_devices")?.change_percent || 0,
      title: "Inactive Devices",
      icon: dashboard?.noHeartbeatDevices,
      label: `Vs ${
        tabValue === "yesterday"
          ? "Previous Day"
          : tabValue === "weekly"
          ? "Previous Week"
          : "Previous Month"
      }`,
    },
  ];
  return (
    <div>
      <p className="mb-4 font-medium">Devices</p>
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
              <div className="flex gap-2 items-center">
                <Image src={item.icon} alt="device" width={45} height={45} />
                <div>
                  {loading ? (
                    <Skeleton className="w-10 h-6" />
                  ) : (
                    <p className="text-2xl font-bold text-color">
                      {item.value}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-zinc-500">{item.title}</p>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-4">
                {loading ? (
                  <Skeleton className="w-10 h-6" />
                ) : (
                  <Badge
                    variant={
                      item?.percentage < 0 ? "destructiveLight" : "success"
                    }
                    className="p-1 text-xs"
                  >
                    {item?.percentage < 0 ? (
                      <ArrowDown size={14} />
                    ) : (
                      <ArrowUp size={14} />
                    )}
                    {Math.abs(item?.percentage)}%
                  </Badge>
                )}
                <p className="text-xs whitespace-nowrap text-gray-260">
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
