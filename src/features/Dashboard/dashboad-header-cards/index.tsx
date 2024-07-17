"use client";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { dashboard } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import useDashboard from "@/hooks/dashboard/useDashboard.hook";

const DashboardHeaderCards = () => {
  const { deviceStats, deviceStatsLoading } = useDashboard();

  const dashboardData = [
    // GC
    {
      id: "connectedDevices",
      title: "Connected Devices",
      value: deviceStats?.data?.connected_device_gc_count ?? 0,
      icon: dashboard?.connectedDevices,
      footerText: "GC 6:00am",
      footerIconColor: "text-blue-500",
      tooltipText: "Connected devices since 6:00am",
    },
    // GA
    {
      id: "registeredDevices",
      title: "Registered Devices",
      value: deviceStats?.data?.registered_device_ga_count ?? 0,
      icon: dashboard?.registeredDevices,
      footerText: "GA 6:00am",
      footerIconColor: "text-green-500",
      tooltipText: "Registered devices since 6:00am",
    },
    // Total Devices
    {
      id: "totalDevices",
      title: "Total Device",
      value: deviceStats?.data?.total_device_count ?? 0,
      icon: dashboard?.totalDevices,
      footerText: "All Deployed 6:00am",
      footerIconColor: "text-purple-500",
      tooltipText: "Number of all devices deployed since 6am",
    },
    // Heartbeat Devices
    {
      id: "heartbeatDevices",
      title: "Heartbeat Devices",
      value: deviceStats?.data?.heartbeat_device_count ?? 0,
      icon: dashboard?.heartbeatDevices,
      footerText: "6:00am Prepared",
      footerIconColor: "text-red-500",
      tooltipText: "Devices ready for transaction since 6am",
    },
    // Inactive Devices
    {
      id: "inactiveDevices",
      title: "Inactive Devices",
      value: deviceStats?.data?.inactive_device_count ?? 0,
      icon: dashboard?.inactiveDevices,
      pageUrl: "/",
      // pageUrl: "/inactive-devices",
      footerText: "6:00am Ideal",
      footerIconColor: "text-orange-500",
      tooltipText: "Devices yet to compute any registration since 6am",
    },
    // No Heartbeat Devices
    {
      id: "noHeartbeatDevices",
      title: "No Heartbeat Devices",
      value: deviceStats?.data?.noheartbeat_device_count ?? 0,
      icon: dashboard?.noHeartbeatDevices,
      pageUrl: "/",
      // pageUrl: "/no-heartbeat-devices",
      footerText: "6:00am Offline",
      footerIconColor: "text-gray-500",
      tooltipText: "Devices that are offline",
    },
    // Active Users
    {
      id: "activeUsers",
      title: "Active Users",
      value: deviceStats?.data?.active_users ?? 0,
      icon: dashboard?.activeUsers,
      footerText: "6:00am Registered",
      footerIconColor: "text-blue-500",
      tooltipText: "Number of registration done since 6am",
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="grid grid-cols-1 gap-4 grow md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        {dashboardData.map((item) => (
          <Card key={item.id}>
            <CardContent className="relative p-3 xl:p-3">
              {item.pageUrl && (
                <Link
                  href={item.pageUrl}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xs" }),
                    "absolute top-3 right-3 p-0 w-5 h-5 rounded-sm 2xl:w-6 2xl:h-6"
                  )}
                >
                  <ChevronRight size={14} />
                </Link>
              )}
              <div className="flex gap-2 items-center">
                {item.icon && (
                  <div className="shrink-0 size-[32px] 2xl:size-[44px]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={44}
                      height={44}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold 2xl:text-2xl text-zinc-700">
                    {item.value}
                  </h3>
                  <p className="text-[10px] text-nowrap 2xl:text-sm text-zinc-500">
                    {item.title}
                  </p>
                </div>
              </div>
              <div className="flex justify-between p-1 mt-4 rounded-lg bg-slate-100">
                <div className="flex gap-1 items-center">
                  <div className={`${item.footerIconColor}`}>
                    <Clock size={18} />
                  </div>
                  <p className="text-[10px] font-medium text-black 2xl:text-xs">
                    {item.footerText}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={dashboard?.helpIcon}
                      alt="help"
                      width={14}
                      height={14}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="max-w-[200px] p-4 text-sm"
                    align="start"
                  >
                    <p>{item.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHeaderCards;
