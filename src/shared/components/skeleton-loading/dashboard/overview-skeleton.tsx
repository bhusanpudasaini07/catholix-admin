import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { Separator } from "../../ui/separator";

const DashboardOverviewSkeleton = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[120px]"></Skeleton>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 items-start lg:flex-row">
        <div className="grow">
          <div className="flex justify-between items-center mb-10">
            <Skeleton className="w-40 h-3" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[88px]"></Skeleton>
            ))}
          </div>
        </div>
        <Separator orientation={"vertical"} className={"h-[250px]"} />
        <div className="grow">
          <div className="flex justify-between items-center mb-10">
            <Skeleton className="w-40 h-3" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[88px]"></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewSkeleton;
