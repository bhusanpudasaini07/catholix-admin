import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  columns: ColumnDef<any>[];
}
const DHTaskMissedDeadlines = ({ columns }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Task Missed Deadlines
            </p>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Deadline</TabsTrigger>
              <TabsTrigger value="today">Today&apos;s Deadline</TabsTrigger>
              <TabsTrigger value="missed">Missed Deadline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <DataTable
          columns={columns}
          data={[]}
          border
          headerSticky
          height="max-h-[250px]"
          lottieHeight={80}
          loading={false}
          loadingDataNum={5}
        />
      </CardContent>
    </Card>
  );
};

export default DHTaskMissedDeadlines;
