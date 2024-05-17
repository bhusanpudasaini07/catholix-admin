import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Skeleton } from "../../../ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

const ProjectListSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="m-auto mb-4 w-40 h-3" />
        <Skeleton className="m-auto mb-4 w-10 h-3" />
        <Skeleton className="m-auto mb-4 w-40 h-3" />
        <Separator />
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="my-4 w-10 h-3" />
            <Skeleton className="w-20 h-3" />
          </div>
          <div>
            <Skeleton className="my-4 ml-auto w-10 h-3" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectListSkeleton;
