import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

import useAgentDetail from "@/hooks/agent/useAgentDetail.hook";
import CommonModal from "@/shared/components/common-modal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dashboard, marker, userBriefcase } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import moment from "moment";
import dynamic from "next/dynamic";

const MapContent = dynamic(
  import("../../../Devices/details/device-info/device-map-info"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const AgentInfo = () => {
  const { agentDetail, agentDetailLoading, openMapModal, setOpenMapModal } =
    useAgentDetail();
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
                {agentDetailLoading ? (
                  <Skeleton className="w-14 h-6" />
                ) : (
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
                )}

                <p className="text-sm text-zinc-500">Agent Name</p>
                {agentDetailLoading ? (
                  <Skeleton className="w-full h-7" />
                ) : (
                  <h4 className="text-lg font-semibold text-zinc-70">
                    {agentDetail?.data?.agent_name_v_from_table ?? "N/A"}
                  </h4>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Contact Number</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                N/A
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Address</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                N/A
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Sales Rep Location</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                N/A
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
                {agentDetailLoading ? (
                  <Skeleton className="w-10 h-3" />
                ) : (
                  <p className="text-lg font-semibold leading-3 text-zinc-700">
                    {agentDetail?.data?.agent_transaction ?? 0}
                  </p>
                )}
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
                {agentDetailLoading ? (
                  <Skeleton className="w-14 h-6" />
                ) : (
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
                )}
                <p className="text-sm text-zinc-500">Device Model</p>
                {agentDetailLoading ? (
                  <Skeleton className="w-full h-7" />
                ) : (
                  <h4 className="text-lg font-semibold text-zinc-700">
                    {agentDetail?.data?.name}
                  </h4>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div>
                <p className="mb-3 text-sm text-zinc-500">Licence Expires At</p>
                {agentDetailLoading ? (
                  <Skeleton className="w-14 h-6" />
                ) : (
                  <Badge variant={"warning"}>
                    {agentDetail?.data?.licence_expires_at}
                  </Badge>
                )}
              </div>
              <div className="text-end">
                <p className="mb-3 text-sm text-zinc-500">Trial</p>
                {agentDetailLoading ? (
                  <Skeleton className="w-14 h-6" />
                ) : (
                  <Badge variant={"info"}>
                    {agentDetail?.data?.in_trial === 0 ? "No" : "Yes"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">OS Version</p>
              {agentDetailLoading ? (
                <Skeleton className="w-14 h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {agentDetail?.data?.os_version}
                </p>
              )}
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">
                Last Login Date & Time
              </p>
              {agentDetailLoading ? (
                <Skeleton className="w-full h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {moment(agentDetail?.data?.last_connected_at).format(
                    "DD MMM YYYY, h:mmA"
                  )}
                </p>
              )}
            </div>
            <Button
              variant={"warning"}
              size={"sm"}
              className="gap-2 justify-start p-2 h-auto"
              onClick={() => setOpenMapModal(true)}
            >
              <MapPin />
              View Location on map
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Modal */}
      <CommonModal
        className="max-w-4xl"
        open={openMapModal}
        onClose={setOpenMapModal}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-zinc-70">
            Device Location
          </h4>

          <div className="h-[450px] overflow-hidden">
            {!agentDetailLoading && (
              <MapContent
                deviceDetail={{
                  name: agentDetail?.data?.name ?? "",
                  model: agentDetail?.data?.model ?? "",
                  app_version_name: agentDetail?.data?.app_version_name ?? "",
                  os_version: agentDetail?.data?.os_version ?? "",
                  licence_expires_at:
                    agentDetail?.data?.licence_expires_at ?? "",
                }}
                latitude={agentDetail?.data?.location_lat!}
                longitude={agentDetail?.data?.location_lng!}
              />
            )}
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default AgentInfo;
