import useInactiveDevices from "@/hooks/devices/useInactiveDevices.hook";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { dashboard } from "@/shared/lib/image-config";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";

const InactiveDeviceStats = () => {
  const { inactiveDevicesStats, inactiveDevicesStatsLoading } =
    useInactiveDevices();

  const stats = useMemo(
    () => [
      {
        id: 2,
        count: inactiveDevicesStats?.data?.["2"] ?? 0,
        label: "Inactive for 2 Days",
      },
      {
        id: 5,
        count: inactiveDevicesStats?.data?.["5"] ?? 0,
        label: "Inactive for 5 Days",
      },
      {
        id: 7,
        count: inactiveDevicesStats?.data?.["7"] ?? 0,
        label: "Inactive for 7 Days",
      },
      {
        id: 10,
        count: inactiveDevicesStats?.data?.["10"] ?? 0,
        label: "Inactive for 10 Days",
      },
      {
        id: 15,
        count: inactiveDevicesStats?.data?.["15"] ?? 0,
        label: "Inactive for 15 Days",
      },
      {
        id: 30,
        count: inactiveDevicesStats?.data?.["30"] ?? 0,
        label: "Inactive for a Month",
      },
      {
        id: 31,
        count: inactiveDevicesStats?.data?.total ?? 0,
        label: "Total Inactive Devices",
      },
    ],
    [inactiveDevicesStats]
  );

  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-4 p-3 bg-white rounded-lg border border-zinc-200"
        >
          <div className="flex gap-3 items-center">
            <Image
              src="/devices/inactive.svg"
              alt="Inactive Device Icon"
              width={32}
              height={32}
            />
            {inactiveDevicesStatsLoading ? (
              <Skeleton className="w-14 h-4" />
            ) : (
              <p className="text-xl font-semibold text-zinc-700">
                {stat.count}
              </p>
            )}
          </div>

          <div className="flex justify-between p-2 rounded bg-slate-100">
            <div className="flex gap-1 items-center">
              <div className="text-gray-400">
                <Clock size={18} />
              </div>
              <p className="text-xs text-black">{stat.label}</p>
            </div>
            {/* <Tooltip>
              <TooltipTrigger>
                <Image
                  src={dashboard?.helpIcon}
                  alt="help"
                  width={14}
                  height={14}
                />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[200px] p-2 text-sm"
                align="start"
              >
                <p>Inactive Devices</p>
              </TooltipContent>
            </Tooltip> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InactiveDeviceStats;
