import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const TotalSalesSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-40 h-3" />
        <div className="flex items-center justify-between mt-8">
          <div>
            <Skeleton className="w-40 h-5 mb-2" />
            <Skeleton className="w-32 h-2" />
          </div>
          <div className="relative">
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-[50px] h-[50px] m-auto bg-white rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSalesSkeleton;
