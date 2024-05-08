import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CalendarDays, Link as LinkIcon, Tag, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";

const StoryDetailOverviewStatus = () => {
  return (
    <div className="grid grid-cols-1 gap-4 2xl:grid-cols-3">
      {/* Overview */}
      <Card className="2xl:col-span-2">
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">Overview</p>
          </div>
          <div className="grid grid-cols-3 grid-flow-row-dense gap-6 xl:grid-rows-2 2xl:grid-cols-5">
            {/* Total Estimated Time */}
            <div
              className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
            >
              {/* {hours < 1 ? (
                <p className="text-4xl font-semibold">{`${minutes}M`}</p>
              ) : (
                <p className="text-4xl font-semibold">{`${calculateTime(
                  Number(time)
                )}H`}</p>
              )} */}
              <p className="text-4xl font-semibold">0M</p>
              <p className="text-base font-medium">Total Estimated Time</p>
            </div>
            {/* Total Commits */}
            <div
              className={`flex flex-col gap-3 justify-center items-center py-6 text-green-500 bg-green-50 rounded-md border-green-100 h-[148px] border-[1px]`}
            >
              <p className="text-4xl font-semibold"> {0}</p>
              <p className="text-base font-semibold">Total Commits</p>
            </div>
            {/* Open */}
            <div
              className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100"
            >
              <p className="text-4xl font-semibold">{0}</p>
              <p className="text-base font-medium">Open Tasks</p>
            </div>
            {/* Closed */}
            <div
              className={`flex flex-col gap-3 justify-center items-center py-6 text-green-500 bg-green-50 rounded-md border-green-100 h-[148px] border-[1px]`}
            >
              <p className="text-4xl font-semibold"> {0}</p>
              <p className="text-base font-semibold">Closed Tasks</p>
            </div>

            {/* Bugs */}
            <div
              className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
            >
              <p className="text-4xl font-semibold"> {0}</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
            {/* Total Time Spent */}
            <div
              className={`flex flex-col col-span-2 gap-3 justify-center items-center py-6 text-blue-500 bg-blue-50 rounded-md border-blue-100 h-[148px] border-[1px]`}
            >
              {/* {spentHours < 1 ? (
                <p className="text-4xl font-semibold">{`${spentMinutes}M`}</p>
              ) : (
                <p className="text-4xl font-semibold">{`${calculateTime(
                  Number(timeSpent)
                )}H`}</p>
              )} */}
              <p className="text-4xl font-semibold">0H</p>
              <p className="text-base font-semibold">Total Time Spent</p>
            </div>
            {/* Total Task */}
            <div
              className={`flex flex-col gap-3 justify-center items-center py-6 rounded-md 2xl:col-span-2 h-[148px] bg-zinc-50 text-zinc-500 border-[1px] border-zinc-100`}
            >
              <p className="text-4xl font-semibold"> {0}</p>
              <p className="text-base font-semibold">Total Task</p>
            </div>

            {/* Bug Ratio */}
            <div
              className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
            >
              <p className="text-4xl font-semibold"> {0}%</p>
              <p className="text-base font-semibold">Bug Ratio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 2xl:grid-cols-1">
        {/* Task Details */}
        <Card className="h-auto">
          <CardContent>
            <div className="flex gap-4 justify-start items-center mb-10">
              <p className="text-lg font-medium text-zinc-700">Task Details</p>
              <Button size={"sm"} variant={"white"}>
                View Detail in Repo
              </Button>
            </div>

            <div className="flex gap-2 items-start">
              <div className="flex gap-2 items-center min-w-[115px] text-zinc-500">
                <LinkIcon size={16} strokeWidth={2} />
                <span>Dev-Link</span>
              </div>
              <div>
                <Link
                  href={"/"}
                  target="_blank"
                  className="font-medium underline text-primary hover:text-blue-700"
                >
                  Link Here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-10">
              <p className="text-lg font-medium text-zinc-700">Status</p>
            </div>
            <div className="flex flex-wrap gap-8 items-center">
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

              <div className="flex gap-4 justify-between items-center">
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
      </div>
    </div>
  );
};

export default StoryDetailOverviewStatus;
