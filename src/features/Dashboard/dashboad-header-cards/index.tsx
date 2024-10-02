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
    // Total Devices
    {
      id: "totalDevices",
      title: "Total Device",
      value: deviceStats?.data?.total_device_count || 0,
      icon: dashboard?.totalDevices,
      footerText: "All Deployed 6:00am",
      footerIconColor: "text-purple-500",
      tooltipText: "Number of all devices deployed since 6:00am",
      child: {
        childLabel: "Live Devices",
        childValue: deviceStats?.data?.total_live_device_count || 0,
      },
    },
    // Heartbeat Devices
    {
      id: "heartbeatDevices",
      title: "Heartbeat Devices",
      value: deviceStats?.data?.heartbeat_device_count || 0,
      icon: dashboard?.heartbeatDevices,
      footerText: "6:00am Prepared",
      footerIconColor: "text-red-500",
      tooltipText: "Devices ready for transaction since 6:00am",
    },
    // Inactive Devices
    {
      id: "inactiveDevices",
      title: "Idle Devices",
      value: deviceStats?.data?.inactive_device_count || 0,
      icon: dashboard?.inactiveDevices,
      pageUrl: "/inactive-devices",
      footerText: "6:00am Ideal",
      footerIconColor: "text-orange-500",
      tooltipText: "Devices yet to compute any registration since 6:00am",
    },
    // Active Users
    {
      id: "activeUsers",
      title: "Active Agent Users",
      value: deviceStats?.data?.active_users || 0,
      icon: dashboard?.activeUsers,
      footerText: "6:00am Registered",
      footerIconColor: "text-blue-500",
      tooltipText: "Number of devices that have registered since 6:00am",
      child: {
        childLabel: "Offline Agents",
        childValue: deviceStats?.data?.offline_users || 0,
      },
    },
    // GA
    {
      id: "registeredDevices",
      title: "GA Count",
      value: deviceStats?.data?.registered_ga_count || 0,
      icon: dashboard?.registeredDevices,
      footerText: "GA 6:00am",
      footerIconColor: "text-green-500",
      tooltipText: "No. of registrations done since 6:00am",
      child: {
        childLabel: "Devices",
        childValue: deviceStats?.data?.registered_device_ga_count || 0,
      },
    },
    // GC
    {
      id: "connectedDevices",
      title: "GC Count",
      value: deviceStats?.data?.connected_gc_count || "0",
      icon: dashboard?.connectedDevices,
      footerText: "GC 6:00am",
      footerIconColor: "text-blue-500",
      tooltipText: "Gross connected devices since 6:00am",
      child: {
        childLabel: "Devices",
        childValue: deviceStats?.data?.connected_device_gc_count || 0,
      },
    },
    // No Heartbeat Devices
    {
      id: "noHeartbeatDevices",
      title: "Inactive Devices",
      value: deviceStats?.data?.noheartbeat_device_count || 0,
      icon: dashboard?.noHeartbeatDevices,
      pageUrl: "/no-heartbeat-devices",
      footerText: "6:00am Offline",
      footerIconColor: "text-gray-500",
      tooltipText: "Devices that are offline",
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="grid grid-cols-1 gap-4 grow md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        {dashboardData.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex relative flex-col justify-between p-3 h-full xl:p-3">
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
              <div className="flex gap-2 items-start">
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
                  <div>
                    <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-zinc-500">
                      {item.title}
                    </p>
                    <h3 className="text-xl font-semibold 2xl:text-2xl text-zinc-700">
                      {item.value}
                    </h3>
                  </div>
                  {item.child && (
                    <div className="mt-1">
                      <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-zinc-500">
                        {item.child.childLabel}
                      </p>
                      <h3 className="text-xl font-semibold 2xl:text-2xl text-zinc-700">
                        {item.child.childValue}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between p-1 mt-1 rounded-lg bg-slate-100">
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
