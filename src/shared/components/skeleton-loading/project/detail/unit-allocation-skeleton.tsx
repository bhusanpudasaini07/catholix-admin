import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const UnitAllocationSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-40 h-3" />
        <div className="flex items-center justify-between mt-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="flex items-start gap-2" key={index}>
              <Skeleton className="w-10 h-10 mb-2" />
              <div>
                <Skeleton className="w-40 h-5 mb-2" />
                <Skeleton className="w-32 h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitAllocationSkeleton;
