import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { dashboard, marker, userBriefcase } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";
import React from "react";

const DealerInfo = () => {
  const dealerData = [
    {
      id: 1,
      imageSrc: userBriefcase,
      altText: "User Briefcase",
      label: "Dealer Transaction",
      value: "22,152",
    },
    {
      id: 2,
      imageSrc: marker?.popup?.users,
      altText: "Total Agents",
      label: "Total Agents",
      value: "43,896",
    },
    {
      id: 3,
      imageSrc: dashboard?.totalDevices,
      altText: "Total Devices",
      label: "Total Devices",
      value: "43,896",
    },
    {
      id: 4,
      imageSrc: dashboard?.inactiveDevices,
      altText: "Inactive Devices",
      label: "Inactive Devices",
      value: "10,825",
    },
    {
      id: 5,
      imageSrc: dashboard?.activeDevices,
      altText: "Active Devices",
      label: "Active Devices",
      value: "10,825",
    },
    {
      id: 6,
      imageSrc: userBriefcase,
      altText: "Lost Devices",
      label: "Lost Devices",
      value: "10,825",
    },
    {
      id: 7,
      imageSrc: dashboard?.activeUsers,
      altText: "Found Devices",
      label: "Found Devices",
      value: "10,825",
    },
    {
      id: 8,
      imageSrc: dashboard?.noHeartbeatDevices,
      altText: "Shutdown Devices",
      label: "Shutdown Devices",
      value: "10,825",
    },
  ];

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
              />
              <div className="flex flex-col gap-0.5">
                <Badge
                  variant={"warning"}
                  className={cn(
                    "h-6 font-medium capitalize rounded border-0 w-fit"
                  )}
                >
                  DTP443
                </Badge>
                <p className="text-sm text-zinc-500">Dealer Name</p>
                <h4 className="text-lg font-semibold text-zinc-700">
                  Kingsley Onoefejewq
                </h4>
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Contact Number</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                (041) 387-1476
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Address</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                31 GAA OPOOLA AREA
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Sales Rep Location</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                12 ADEKUNLE STREET AKUTE
              </p>
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
                    <p className="text-lg font-semibold leading-3 text-zinc-700">
                      {dealer.value}
                    </p>
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
