import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const DashboardTimeLogSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div>
          <div className="flex items-center justify-between mb-10">
            <Skeleton className="w-40 h-3" />
            <Skeleton className="w-40 h-5" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-[120px]"></Skeleton>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardTimeLogSkeleton;
