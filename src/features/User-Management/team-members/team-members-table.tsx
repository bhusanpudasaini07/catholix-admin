import React from "react";

import useTeamMemberList from "@/hooks/user-management/team-member-list/useTeamMemberList.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Card, CardContent } from "@/shared/components/ui/card";

import ListCardFilter from "./header-filter";

const TeamMembersTable = () => {
  const { memberColumn, perPage, setPerPage, changePageNum } =
    useTeamMemberList();
  return (
    <Card>
      <CardContent>
        <ListCardFilter />

        <DataTable
          columns={memberColumn}
          data={[]}
          border
          headerSticky
          height="max-h-[600px]"
        />
        <DataTablePagination
          totalPages={3}
          perPage={perPage}
          setPerPage={setPerPage}
          currentPage={1}
          pageChange={changePageNum}
        />
      </CardContent>
    </Card>
  );
};

export default TeamMembersTable;
