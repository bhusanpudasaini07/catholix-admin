import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const DashboardTimeLogSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px]"></Skeleton>
        ))}
      </div>
    </div>
  );
};

export default DashboardTimeLogSkeleton;
