import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const ProjectCountryTable = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Project of Country
          </p>
          <FilterSearch setSearchText={() => ""} />
        </div>
        <DataTable
          columns={[]}
          data={[]}
          border={true}
          headerSticky={true}
          height="max-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default ProjectCountryTable;
