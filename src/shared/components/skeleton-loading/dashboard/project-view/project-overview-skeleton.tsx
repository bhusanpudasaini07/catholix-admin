import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const DashboardProjectOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-center 2xl:gap-6 2xl:flex-row">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Skeleton className="w-20 h-5" />

        <div className="flex gap-2 items-center text-sm">
          <Skeleton className="w-40 h-3" />
        </div>
      </div>
      <div className="2xl:w-0.5 h-[80px] 2xl:border" />
      <div className="grid grid-cols-3 gap-8 grow">
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index}>
            <div className="flex gap-2 items-center mb-4">
              <Skeleton className="w-5 h-8" />
              <Skeleton className="w-12 h-3" />
            </div>
            <Skeleton className="ml-7 w-20 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProjectOverviewSkeleton;
