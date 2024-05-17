import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  column: ColumnDef<any>[];
  loading: boolean;
}

const ProjectDashboardDeadines = ({ column, loading }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">Deadlines</p>
          </div>
          <div className="flex gap-4 justify-end items-center grow">
            <Select defaultValue="sprint">
              <SelectTrigger className="max-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sprint">Sprint</SelectItem>
              </SelectContent>
            </Select>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Deadline</TabsTrigger>
                <TabsTrigger value="today">Todays Deadline</TabsTrigger>
                <TabsTrigger value="missed">Missed Deadline</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <DataTable
          data={[]}
          columns={column}
          loading={loading}
          loadingDataNum={10}
          height="max-h-[400px]"
          border
          headerSticky
        />
      </CardContent>
    </Card>
  );
};

export default ProjectDashboardDeadines;
