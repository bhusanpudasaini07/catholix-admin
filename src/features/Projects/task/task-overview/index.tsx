import { CalendarDays, LinkIcon, Tag, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";

import useTaskDetail from "@/hooks/project/task-detail/useTaskDetail.hook";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const TaskOverview = () => {
  const { taskSummaryData } = useTaskDetail();
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {/* Summary */}
      <Card>
        <CardContent>
          <div className="flex gap-4 justify-start items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">Summary</p>
          </div>

          <div className="grid grid-cols-3">
            {taskSummaryData?.map((item) => (
              <div key={item?.id} className="flex items-center">
                <div className="flex gap-2 items-baseline">
                  {item?.icon}
                  <div className="">
                    <p className="mb-1 text-2xl font-semibold text-zinc-700">
                      {item?.value}
                    </p>
                    <p className="text-sm text-zinc-700">{item?.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent>
          <div className="flex gap-4 justify-start items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">Status</p>
          </div>

          <div className="grid grid-cols-3 items-start">
            <div className="flex gap-4 justify-between items-center">
              <div className="text-zinc-500 w-[115px] font-normal text-sm flex items-center">
                <Tag className="me-2" size={16} /> Status:
              </div>
              <div className="grow text-start">
                <Badge
                  variant={"outline"}
                  className={`capitalize rounded-md border`}
                  //   ${
                  //     projectDetail?.data?.status === "In Progress" &&
                  //     " border-blue-500 bg-blue-50 text-blue-500 "
                  //   }
                  //   ${
                  //     projectDetail?.data?.status ===
                  //       "Client Support" &&
                  //     " border-orange-500 bg-orange-50 text-orange-500"
                  //   }
                  //   ${
                  //     projectDetail?.data?.status === "On Hold" &&
                  //     " border-red-500 bg-red-50 text-red-500 "
                  //   }
                  // ${
                  //   ["Closed", "Delivered"].includes(
                  //     projectDetail?.data?.status!
                  //   ) && " border-green-500 bg-green-50 text-green-500 "
                  // }
                  // ${
                  //   projectDetail?.data?.status === "Not Started" &&
                  //   " border-zinc-500 bg-zinc-50 text-zinc-500"
                  // }
                >
                  {/* {projectDetail?.data?.status}  */}
                  asdasd
                </Badge>
              </div>
            </div>

            <div>
              <div className="flex gap-4 justify-between items-center mb-4">
                <div className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                  <UserCog className="me-2" size={16} /> Created by:
                </div>
                <div className="grow text-start">
                  <Link
                    href={"/"}
                    className="text-sm font-medium text-zinc-700 hover:text-primary"
                  >
                    User Name
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center">
                <div className="text-zinc-500 w-[120px] font-normal text-sm flex items-center">
                  <UserCog className="me-2" size={16} /> Assigned to:
                </div>
                <div className="grow text-start">
                  <Link
                    href={"/"}
                    className="text-sm font-medium text-zinc-700 hover:text-primary"
                  >
                    User Name
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-between items-start">
              <div className="text-zinc-500 w-[115px] font-normal text-sm flex items-center">
                <CalendarDays className="me-2" size={16} /> Added On:
              </div>
              <div className="text-sm grow text-start">
                <p className="font-medium text-zinc-700">2024-01-11</p>
                <p className="text-zinc-600">17:42:08</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Details */}
      <Card>
        <CardContent>
          <div className="flex gap-4 justify-start items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">Task Details</p>
            <Button size={"sm"} variant={"white"}>
              View Detail in Repo
            </Button>
          </div>

          <div>Detail COntent here</div>
        </CardContent>
      </Card>

      {/* Links*/}
      <Card>
        <CardContent>
          <div className="flex gap-4 justify-start items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">Links</p>
          </div>
          <div className="flex gap-2 items-start">
            <div className="flex gap-2 items-center min-w-[115px] text-sm text-zinc-500">
              <LinkIcon size={16} strokeWidth={2} />
              <span>Dev-Link</span>
            </div>
            <div>
              <Link
                href={"/"}
                target="_blank"
                className="text-sm font-medium underline text-primary hover:text-blue-700"
              >
                Link Here
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskOverview;
