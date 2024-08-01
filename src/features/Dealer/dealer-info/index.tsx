import Image from "next/image";
import React, { useMemo } from "react";

import useDealerDetail from "@/hooks/dealer/useDealerDetail.hook";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dashboard, marker, userBriefcase } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";

const DealerInfo = () => {
  const { dealerDetail, dealerDetailLoading } = useDealerDetail();

  const dealerData = useMemo(() => {
    return [
      {
        id: 1,
        imageSrc: userBriefcase,
        altText: "User Briefcase",
        label: "Dealer Transaction",
        value: dealerDetail?.data?.dealer_transaction,
      },
      {
        id: 2,
        imageSrc: marker?.popup?.users,
        altText: "Total Agents",
        label: "Total Agents",
        value: dealerDetail?.data?.total_agents,
      },
      {
        id: 3,
        imageSrc: dashboard?.totalDevices,
        altText: "Total Devices",
        label: "Total Devices",
        value: dealerDetail?.data?.total_devices,
      },
      {
        id: 4,
        imageSrc: dashboard?.inactiveDevices,
        altText: "Inactive Devices",
        label: "Inactive Devices",
        value: "0",
      },
      {
        id: 5,
        imageSrc: dashboard?.activeDevices,
        altText: "Active Devices",
        label: "Active Devices",
        value: "0",
      },
      {
        id: 6,
        imageSrc: userBriefcase,
        altText: "Lost Devices",
        label: "Lost Devices",
        value: "0",
      },
      {
        id: 7,
        imageSrc: dashboard?.activeUsers,
        altText: "Found Devices",
        label: "Found Devices",
        value: "0",
      },
      {
        id: 8,
        imageSrc: dashboard?.noHeartbeatDevices,
        altText: "Shutdown Devices",
        label: "Shutdown Devices",
        value: "0",
      },
    ];
  }, [dealerDetail]);

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <Image
                src={marker.popup?.polygonUser}
                alt="Dealer Image"
                width={65}
                height={65}
                className="shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <Badge
                  variant={"warning"}
                  className={cn(
                    "h-6 font-medium capitalize rounded border-0 w-fit"
                  )}
                >
                  {dealerDetail?.data?.dealer_code_v}
                </Badge>
                <p className="text-sm text-zinc-500">Dealer Name</p>
                {dealerDetailLoading ? (
                  <Skeleton className="w-full h-7" />
                ) : (
                  <h4 className="text-lg font-semibold text-zinc-700">
                    {dealerDetail?.data?.dealer_name}
                  </h4>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Contact Number</p>
              {dealerDetailLoading ? (
                <Skeleton className="w-14 h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {/* (041) 387-1476 */} N/A
                </p>
              )}
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Address</p>
              {dealerDetailLoading ? (
                <Skeleton className="w-14 h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {/* 31 GAA OPOOLA AREA */} N/A
                </p>
              )}
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Sales Rep Location</p>
              {dealerDetailLoading ? (
                <Skeleton className="w-14 h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {/* 12 ADEKUNLE STREET AKUTE */} N/A
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {dealerData.map((dealer) => (
                <div
                  key={dealer.id}
                  className="flex gap-3 items-center p-3 rounded-xl shadow"
                >
                  <Image
                    src={dealer.imageSrc}
                    alt={dealer.altText}
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="mb-3 text-sm text-zinc-500">{dealer.label}</p>
                    {dealerDetailLoading ? (
                      <Skeleton className="w-14 h-3" />
                    ) : (
                      <p className="text-lg font-semibold leading-3 text-zinc-7000">
                        {dealer.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerInfo;
