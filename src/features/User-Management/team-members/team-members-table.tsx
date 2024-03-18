import React from "react";

import useTeamMemberList from "@/hooks/user-management/team-member-list/useTeamMemberList.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Card, CardContent } from "@/shared/components/ui/card";

import ListCardFilter from "./header-filter";
import TeamMemberTable from "./team-member-table";

const TeamMembersTable = () => {
  const {
    memberColumn,
    perPage,
    teamMemberList,
    isLoading,
    setPerPage,
    changePageNum,
    setDateRangeOpen,
    dateRangeOpen,
    dateRange,
    dateChangeHandler,
    setSearchText,
  } = useTeamMemberList();
  return (
    <Card>
      <CardContent>
        <ListCardFilter
          setDateRangeOpen={setDateRangeOpen}
          dateRangeOpen={dateRangeOpen}
          dateRange={dateRange}
          dateChangeHandler={dateChangeHandler}
          setSearchText={setSearchText}
        />

        <TeamMemberTable
          column={memberColumn}
          tableData={teamMemberList?.data ?? []}
          loading={isLoading}
          currentPage={teamMemberList?.pagination?.page ?? 0}
          totalPage={teamMemberList?.pagination?.total_page ?? 0}
          perPage={perPage}
          setPerPage={setPerPage}
          changePageNum={changePageNum}
        />
      </CardContent>
    </Card>
  );
};

export default TeamMembersTable;
