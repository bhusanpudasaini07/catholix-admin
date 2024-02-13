import React from "react";
import { CalendarDays, Tag } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";

const RPStatus = () => {
  return (
    <Card>
      <CardContent>
        <p className="text-lg font-medium text-zinc-700">Status</p>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>Start Date</span>
              </div>
              <p className="text-sm font-medium text-zinc-700">9th Nov, 2023</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>End Date</span>
              </div>
              <p className="text-sm font-medium text-zinc-700">9th Nov, 2023</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>Added On</span>
              </div>
              <div className="text-sm text-zinc-700">
                <p className="mb-0.5 font-medium">2024-01-11</p>
                <p>17:42:08</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <Tag size={20} />
                <span>Status</span>
              </div>
              <div>
                {/* <Badge
          variant={"outline"}
          className={`
          ${
            projectDetail?.data?.status === "In Progress" &&
            " border-blue-500 text-blue-500 "
          }
          ${
            projectDetail?.data?.status === "Client Support" &&
            " border-orange-500  text-orange-500"
          }
          ${
            projectDetail?.data?.status === "On Hold" &&
            " border-red-500 text-red-500 "
          }
          ${
            ["Closed", "Delivered"].includes(
              projectDetail?.data?.status!
            ) && " border-green-500 text-green-500 "
          }
          ${
            projectDetail?.data?.status === "Not Started" &&
            " border-zinc-500 text-zinc-500"
          }
          capitalize border rounded-md`}
        >
          {projectDetail?.data?.status}
        </Badge> */}
                badge here
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RPStatus;
