"use client";
import { ChevronRight, Clock } from "lucide-react";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { dashboard } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";

const DashboardHeaderCards = () => {
  const [watTime, setWatTime] = useState(moment().tz("Africa/Lagos"));

  const dashboardData = [
    // Active Devices
    {
      id: "activeDevices",
      title: "Active Devices",
      value: 1090,
      icon: dashboard?.activeDevices,
      footerText: "Completed GC 6:00am",
      footerIconColor: "text-blue-500",
      tooltipText: "Active devices that have done minimum 1GC",
    },
    // Total Devices
    {
      id: "totalDevices",
      title: "Total Device",
      value: 1250,
      icon: dashboard?.totalDevices,
      footerText: "All Deployed 6:00am",
      footerIconColor: "text-purple-500",
      tooltipText: "Number of all devices deployed since 6am",
    },
    // Heartbeat Devices
    {
      id: "heartbeatDevices",
      title: "Heartbeat Devices",
      value: 1090,
      icon: dashboard?.heartbeatDevices,
      footerText: "6:00am Prepared",
      footerIconColor: "text-red-500",
      tooltipText: "Devices ready for transaction since 6am",
    },
    // Inactive Devices
    {
      id: "inactiveDevices",
      title: "Inactive Devices",
      value: 160,
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
      value: 90,
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
      value: 1090,
      icon: dashboard?.activeUsers,
      footerText: "6:00am Registered",
      footerIconColor: "text-blue-500",
      tooltipText: "Number of registration done since 6am",
    },
  ];

  //   For time change
  useEffect(() => {
    const interval = setInterval(() => {
      setWatTime(moment().tz("Africa/Lagos"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4">
      <div className="grid grid-cols-1 gap-4 grow md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={44}
                    height={44}
                  />
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
      {/* Time */}
      <Card className="h-auto flex flex-col justify-center shrink-0 w-[150px]">
        <CardContent className="p-3 xl:py-3 xl:px-4">
          <p className="text-sm  text-nowrap text-zinc-500">
            {watTime.format("LL")}
          </p>
          <p className="text-lg font-semibold text-zinc-700 2xl:text-xl">
            {watTime.format("h:mm A")}
          </p>
          <p className="text-sm font-medium text-zinc-500">(GMT+2)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeaderCards;
