import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const SummaryReportSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-40 h-3" />
        <div className="grid grid-cols-1 gap-8 mt-10 xl:grid-cols-5">
          <div className="col-span-1 xl:col-span-2">
            <div className="flex items-center justify-around ">
              <div className="relative mt-auto overflow-hidden h-[200px]">
                <Skeleton className="w-[350px] h-[350px] mt-auto rounded-full" />
                <Skeleton className="w-[200px] h-[200px] rounded-full absolute z-[2] top-[35%] bg-white bottom-0 left-[22%] right-0" />
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <Skeleton className="w-20 h-5" />

                <div className="flex items-center gap-2 text-sm">
                  <Skeleton className="w-40 h-3" />
                </div>
                <div className="text-center">
                  <Skeleton className="w-20 h-3 m-auto" />

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Skeleton className="rounded-full size-7" />
                    <Skeleton className="rounded-full size-7" />
                    <Skeleton className="rounded-full size-7" />
                    <Skeleton className="rounded-full size-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:pl-8 xl:border-l xl:col-span-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className="flex flex-col h-full justify-evenly">
                  <div className="grid grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-2 mb-4">
                          <Skeleton className="w-5 h-8" />
                          <Skeleton className="w-12 h-3" />
                        </div>
                        <Skeleton className="w-20 h-3 ml-7" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="w-full h-20" />
                </div>
              </div>
              <div className="col-span-4">
                <Skeleton className="size-[200px] rounded-full m-auto" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryReportSkeleton;
