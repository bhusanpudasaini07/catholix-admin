import React from "react";

import useLatestActivities from "@/hooks/project/detail/useLatestActivities.hook";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const LatestActivity = () => {
  const { columns, latestActivities, isLoading } = useLatestActivities();
  return (
    <Card className="mt-6 grow">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Latest Activities
            </p>
            <Button variant={"white"} size={"sm"}>
              View All
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md grow">
          <DataTable
            border={true}
            loading={isLoading}
            columns={columns}
            data={latestActivities?.data?.slice(0, 10) || []}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestActivity;
