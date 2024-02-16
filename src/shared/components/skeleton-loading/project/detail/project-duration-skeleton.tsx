import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const ProjectDurationSkeleton = () => {
  return (
    <Card>
      <CardContent className="">
        <Skeleton className="w-40 h-3" />
        <div className="mt-8">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-32 h-2 mt-4 mb-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-32 h-2 mt-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDurationSkeleton;
