import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const UtilizationSummaryCard = () => {
  return (
    <Card className="col-span-2">
      <CardContent>
        <Skeleton className="w-40 h-6 mb-4" />

        <div className="grid grid-cols-1 gap-4 mb-4 xl:grid-cols-2">
          <div className="flex justify-start items-start flex-col ">
            <Card className="mb-4 w-full">
              <CardContent>
                <Skeleton className="w-40 h-6" />
                <div className="flex flex-wrap items-center justify-between mt-8">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div className="flex items-start gap-2" key={index}>
                      <Skeleton className="w-12 h-12 mb-2" />
                      <div>
                        <Skeleton className="w-32 h-8 mb-2" />
                        <Skeleton className="w-32 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <Skeleton className="w-40 h-6" />
                <div className="flex flex-wrap items-center justify-between mt-8">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div className="flex items-start gap-2" key={index}>
                      <Skeleton className="w-12 h-12 mb-2" />
                      <div>
                        <Skeleton className="w-32 h-8 mb-2" />
                        <Skeleton className="w-32 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationSummaryCard;
