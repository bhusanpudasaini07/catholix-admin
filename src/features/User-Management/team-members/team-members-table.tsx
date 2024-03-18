import React from "react";

import useTeamMemberList from "@/hooks/user-management/team-member-list/useTeamMemberList.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Card, CardContent } from "@/shared/components/ui/card";

import ListCardFilter from "./header-filter";

const TeamMembersTable = () => {
  const {
    memberColumn,
    perPage,
    teamMemberList,
    isLoading,
    setPerPage,
    changePageNum,
  } = useTeamMemberList();
  return (
    <Card>
      <CardContent>
        <ListCardFilter />

        <DataTable
          columns={memberColumn}
          data={teamMemberList?.data ?? []}
          border
          headerSticky
          height="max-h-[525px]"
          loading={isLoading}
          loadingDataNum={20}
        />
        <DataTablePagination
          totalPages={teamMemberList?.pagination?.total_page ?? 0}
          perPage={perPage}
          setPerPage={setPerPage}
          currentPage={teamMemberList?.pagination?.page ?? 0}
          pageChange={changePageNum}
        />
      </CardContent>
    </Card>
  );
};

export default TeamMembersTable;
