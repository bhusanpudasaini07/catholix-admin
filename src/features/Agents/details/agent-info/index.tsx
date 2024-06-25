import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { dashboard, marker, userBriefcase } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const AgentInfo = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <Image
                src={marker.popup.polygonUser}
                alt="Device Image"
                width={65}
                height={65}
              />
              <div className="flex flex-col gap-0.5">
                <Badge
                  variant={
                    "warning"
                    // : "secondary"
                  }
                  className={cn(
                    "h-6 font-medium capitalize rounded border-0 w-fit"
                  )}
                >
                  DTP443
                </Badge>
                <p className="text-sm text-zinc-500">Agent Name</p>
                <h4 className="text-lg font-semibold text-zinc-700">
                  Kingsley onoefejewq
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
              <p className="text-lg font-semibold leading-3 text-zinc-7000">
                12 ADEKUNLE STREET AKUTE
              </p>
            </div>

            <div className="flex gap-3 items-center p-3 rounded-xl shadow">
              <Image
                src={userBriefcase}
                alt="User Briefcase"
                width={24}
                height={24}
              />
              <div>
                <p className="mb-3 text-sm text-zinc-500">Agent Transaction</p>
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  22,152
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <Image
                src={dashboard?.totalDevices}
                alt="Device Image"
                width={65}
                height={65}
              />
              <div className="flex flex-col gap-0.5">
                <Badge
                  variant={
                    "success"
                    // : "secondary"
                  }
                  className={cn(
                    "h-6 font-medium capitalize rounded border-0 w-fit"
                  )}
                >
                  {"Active"}
                </Badge>
                <p className="text-sm text-zinc-500">Device Model</p>
                <h4 className="text-lg font-semibold text-zinc-700">
                  Meretricious Model 3
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div>
                <p className="mb-3 text-sm text-zinc-500">Licence Expires At</p>
                <Badge variant={"warning"}>5/9/2021</Badge>
              </div>
              <div className="text-end">
                <p className="mb-3 text-sm text-zinc-500">Trial</p>
                <Badge variant={"info"}>Yes</Badge>
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">OS Version</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                14.0.1
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">
                Last Login Date & Time
              </p>
              <p className="text-lg font-semibold leading-3 text-zinc-7000">
                27 Dec 2024, 7:52am
              </p>
            </div>
            <Button
              variant={"warning"}
              size={"sm"}
              className="gap-2 justify-start p-2 h-auto"
            >
              <MapPin />
              View Location on map
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentInfo;
