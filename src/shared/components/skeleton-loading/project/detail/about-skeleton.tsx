import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const AboutSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-20 h-3" />
        <div className="grid grid-cols-1 mt-8">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }, (_, index) => (
              <div className="flex items-center gap-8" key={index}>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                </div>
                <Skeleton className="w-full h-3" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSkeleton;
