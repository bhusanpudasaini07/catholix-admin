import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { ICountryProjectDetails } from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface IProps {
  country: string;
  projects: ICountryProjectDetails[] | any;
  countryProjectColumn: ColumnDef<ICountryProjectDetails>[];
  setSearchText: (arg: string) => void;
  staffDataLoading: boolean;
  searchText: string;
}

const ProjectCountryTable = ({
  country,
  projects,
  countryProjectColumn,
  setSearchText,
  searchText,
  staffDataLoading,
}: IProps) => {
  const [countryName, setCountryName] = useState("");
  const filteredProjects = React.useMemo(() => {
    if (countryName === country) {
      return (
        projects?.filter((project: ICountryProjectDetails) =>
          project?.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchText.toLowerCase().replace(/\s+/g, ""))
        ) || projects
      );
    } else {
      return projects;
    }
  }, [projects, searchText, countryName]);

  const handleSearch = (text: string, value: string) => {
    setSearchText(text);
    setCountryName(value);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Project of {country}
          </p>
          <div className="flex items-center gap-2 px-3 py-2.5 w-full max-w-[240px] mw1024:max-w-[300px] border rounded-md shadow-sm border-zinc-200 text-zinc-700 bg-light-white">
            <SearchIcon
              width={20}
              height={20}
              stroke="#3F3F46"
              className="cursor-pointer"
            />
            <Input
              placeholder="Search Keyword"
              className="h-auto p-0 border-0 rounded-none shadow-none"
              onChange={(e) => handleSearch(e.target.value, country)}
            />
          </div>
        </div>
        <DataTable
          columns={countryProjectColumn}
          data={filteredProjects}
          border={true}
          headerSticky={true}
          loading={staffDataLoading}
          height="max-h-[400px]"
        />
      </CardContent>
    </Card>
  );
};

export default ProjectCountryTable;
