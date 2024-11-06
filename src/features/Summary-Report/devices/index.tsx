import { ISummaryDevice } from "@/interface/report-interface";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dashboard } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { DateRange } from "react-day-picker";

interface IProps {
  devices: ISummaryDevice[] | undefined;
  loading: boolean;
  dateRange: DateRange | undefined;
}

const DevicesSummary = ({ devices, loading, dateRange }: IProps) => {
  const router = useRouter();
  const findEachDevice = (type: string) => {
    return devices?.find((item) => item.type === type);
  };

  const devicesSummary = [
    {
      value: findEachDevice("total_devices")?.current_count || 0,
      percentage: findEachDevice("total_devices")?.change_percent || 0,
      title: "Total Devices",
      slug: "total_devices",
      icon: dashboard?.totalDevices,
      // label: `Vs ${
      //   tabValue === "yesterday"
      //     ? "Previous Day"
      //     : tabValue === "weekly"
      //     ? "Previous Week"
      //     : "Previous Month"
      // }`,
    },
    {
      value: findEachDevice("active_devices")?.current_count || 0,
      percentage: findEachDevice("active_devices")?.change_percent || 0,
      title: "Active Devices",
      slug: "active_devices",
      icon: dashboard?.activeDevices,
      // label: `Vs ${
      //   tabValue === "yesterday"
      //     ? "Previous Day"
      //     : tabValue === "weekly"
      //     ? "Previous Week"
      //     : "Previous Month"
      // }`,
    },
    {
      value: findEachDevice("active_agents")?.current_count || 0,
      percentage: findEachDevice("active_agents")?.change_percent || 0,
      title: "Active Agents",
      slug: "active_agents",
      icon: dashboard?.activeUsers,
      // label: `Vs ${
      //   tabValue === "yesterday"
      //     ? "Previous Day"
      //     : tabValue === "weekly"
      //     ? "Previous Week"
      //     : "Previous Month"
      // }`,
    },
    {
      value: findEachDevice("gc_devices")?.current_count || 0,
      percentage: findEachDevice("gc_devices")?.change_percent || 0,
      title: "Devices that have done GC",
      slug: "gc_devices",
      icon: dashboard?.connectedDevices,
      // label: `Vs ${
      //   tabValue === "yesterday"
      //     ? "Previous Day"
      //     : tabValue === "weekly"
      //     ? "Previous Week"
      //     : "Previous Month"
      // }`,
    },
    {
      value: findEachDevice("inactive_devices")?.current_count || 0,
      percentage: findEachDevice("inactive_devices")?.change_percent || 0,
      title: "Inactive Devices",
      slug: "inactive_devices",
      icon: dashboard?.noHeartbeatDevices,
      // label: `Vs ${
      //   tabValue === "yesterday"
      //     ? "Previous Day"
      //     : tabValue === "weekly"
      //     ? "Previous Week"
      //     : "Previous Month"
      // }`,
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
              "col-span-2 cursor-pointer",
              (item?.title === "Devices that have done GC" ||
                item?.title === "Inactive Devices") &&
                "col-span-3"
            )}
            onClick={() => {
              router.push(
                `/summary-report/${item.slug}?startDate=${moment(
                  dateRange?.from
                ).format("YYYY-MM-DD")}&endDate=${moment(dateRange?.to).format(
                  "YYYY-MM-DD"
                )}`
              );
            }}
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
                    className="p-1 text-[10px]"
                  >
                    {item?.percentage < 0 ? (
                      <ArrowDown size={12} />
                    ) : (
                      <ArrowUp size={12} />
                    )}
                    {Math.abs(item?.percentage)}%
                  </Badge>
                )}
                {/* <p className="text-[11px] whitespace-nowrap text-gray-260">
                  {item.label}
                </p> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DevicesSummary;
