import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";

const StaffProjectsList = () => {
  const { projectsOverviewColumns } = useStaffDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Projects Overview
            </p>
            <Button variant={"white"} size={"sm"}>
              View All
            </Button>
          </div>
          <div className="flex items-center justify-end gap-4 grow">
            {/* Filter Search */}
            <FilterSearch className="h-10" setSearchText={() => ""} />

            {/* Role */}
            <Select defaultValue="role">
              <SelectTrigger className="max-w-[200px] h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select defaultValue="status">
              <SelectTrigger className="max-w-[200px] h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="role">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable
          columns={projectsOverviewColumns}
          data={[]}
          border
          headerSticky
          height="max-h-[500px]"
        />
      </CardContent>
    </Card>
  );
};

export default StaffProjectsList;
