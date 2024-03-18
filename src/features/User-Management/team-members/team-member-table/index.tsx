import { ITeamMemberDetails } from "@/interface/team-member-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  column: ColumnDef<ITeamMemberDetails>[];
  tableData: ITeamMemberDetails[];
  loading: boolean;
  currentPage: number;
  totalPage: number;
  perPage: number;
  setPerPage: (arg: number) => void;
  changePageNum: (arg: number) => void;
}

const TeamMemberTable = ({
  column,
  tableData,
  loading,
  currentPage,
  totalPage,
  perPage,
  setPerPage,
  changePageNum,
}: IProps) => {
  return (
    <>
      <DataTable
        columns={column}
        data={tableData ?? []}
        border
        headerSticky
        height="max-h-[525px]"
        loading={loading}
        loadingDataNum={20}
      />
      <DataTablePagination
        totalPages={totalPage}
        perPage={perPage}
        setPerPage={setPerPage}
        currentPage={currentPage}
        pageChange={changePageNum}
      />
    </>
  );
};

export default TeamMemberTable;
