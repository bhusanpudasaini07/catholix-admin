import { useRouter } from "next/router";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ComboBox } from "@/shared/components/ui/combobox";
import { useCommonStore } from "@/store/common-store";
import useHrDashboard from "@/hooks/dashboard/hr/useHrDashboard.hook";

interface IConfigProps {
  title: string;
  id: string;
}

const HrDashboardMemberUtilization = () => {
  const router = useRouter();
  const { filterConfig } = useCommonStore();

  const {
    teamMemberListLoading,
    searchText,
    setSearchText,
    department,
    setDepartment,
    memberColumns,
    memberUtilizationData,
  } = useHrDashboard();

  const departmentData = [
    { title: "All Departments", value: "all" },
    ...(filterConfig?.departments?.map(({ title, id }: IConfigProps) => ({
      title,
      value: id,
    })) || []),
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Member Utilization
            </p>
            <Button
              onClick={() => router.push(`/user-management/team-members`)}
              size={"sm"}
              variant={"white"}
            >
              View All
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <FilterSearch
              setSearchText={setSearchText}
              searchText={searchText}
            />

            <ComboBox
              selectables={departmentData}
              value={department}
              setValue={setDepartment}
              module="Department"
            />
          </div>
        </div>

        <DataTable
          columns={memberColumns}
          data={memberUtilizationData ?? []}
          border
          headerSticky
          loading={teamMemberListLoading}
          loadingDataNum={5}
          height="max-h-[calc(100vh-290px)]"
        />
      </CardContent>
    </Card>
  );
};

export default HrDashboardMemberUtilization;
