import useDeviceDetail from "@/hooks/devices/useDeviceDetail.hook";
import CommonModal from "@/shared/components/common-modal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dashboard, marker } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import { MapPin } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

const MapContent = dynamic(import("./device-map-info"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const DeviceInfo = () => {
  const { deviceDetail, deviceDetailLoading, openMapModal, setOpenMapModal } =
    useDeviceDetail();

  return (
    <div className="flex flex-col gap-5">
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
              <div className="flex flex-col gap-0.5 grow">
                {deviceDetailLoading ? (
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
                    {deviceDetail?.data?.power_status === 1
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                )}
                <p className="text-sm text-zinc-500">Device Model</p>
                {deviceDetailLoading ? (
                  <Skeleton className="w-full h-7" />
                ) : (
                  <h4 className="text-lg font-semibold text-zinc-7000">
                    {deviceDetail?.data?.name}
                  </h4>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div>
                <p className="mb-3 text-sm text-zinc-500">Licence Expires At</p>

                {deviceDetailLoading ? (
                  <Skeleton className="w-14 h-6" />
                ) : (
                  <Badge variant={"warning"}>
                    {moment(deviceDetail?.data?.licence_expires_at).format(
                      "ll"
                    )}
                  </Badge>
                )}
              </div>
              <div className="text-end">
                <p className="mb-3 text-sm text-zinc-500">Trial</p>
                {deviceDetailLoading ? (
                  <Skeleton className="ml-auto w-14 h-6" />
                ) : (
                  <Badge variant={"info"}>
                    {deviceDetail?.data?.in_trial === 1 ? "Yes" : "No"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">OS Version</p>
              {deviceDetailLoading ? (
                <Skeleton className="w-10 h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-700">
                  {deviceDetail?.data?.os_version}
                </p>
              )}
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Licence Name</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                {/* {deviceDetail?.data?.} */} N/A
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">User Role</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                {/* Normal User */} N/A
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">
                Last Login Date & Time
              </p>
              {deviceDetailLoading ? (
                <Skeleton className="w-full h-8" />
              ) : (
                <p className="text-lg font-semibold leading-3 text-zinc-7000">
                  {moment(deviceDetail?.data?.last_connected_at).format("lll")}
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
                  {/* DTP443 */} N/A
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
                {/* (041) 387-1476 */} N/A
              </p>
            </div>
            <div className="p-3">
              <p className="mb-3 text-sm text-zinc-500">Address</p>
              <p className="text-lg font-semibold leading-3 text-zinc-700">
                {/* 31 GAA OPOOLA AREA */} N/A
              </p>
            </div>
            <div className="p-3 pb-0">
              <p className="mb-3 text-sm text-zinc-500">Sales Rep Location</p>
              <p className="text-lg font-semibold leading-3 text-zinc-7000">
                {/* 12 ADEKUNLE STREET AKUTE */} N/A
              </p>
            </div>
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
            {!deviceDetailLoading && (
              <MapContent
                deviceDetail={deviceDetail?.data}
                latitude={deviceDetail?.data?.location_lat!}
                longitude={deviceDetail?.data?.location_lng!}
              />
            )}
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default DeviceInfo;
