import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { ICountryProjectDetails } from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  country: string;
  projects: ICountryProjectDetails[] | any;
  countryProjectColumn: ColumnDef<ICountryProjectDetails>[];
  staffDataLoading: boolean;
}

const ProjectCountryTable = ({
  country,
  projects,
  countryProjectColumn,
  staffDataLoading,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Project of {country}
          </p>
        </div>
        <DataTable
          columns={countryProjectColumn}
          data={projects}
          border={true}
          headerSticky={true}
          loading={staffDataLoading}
          height="max-h-[400px]"
          total={[
            {
              columnId: "total_rp",
              format: (value) => `${value.toFixed(2)}`,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectCountryTable;
