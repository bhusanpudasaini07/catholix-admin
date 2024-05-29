import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  column: ColumnDef<any>[];
  tableData: any[];
  loading: boolean;
  modalOpen: boolean;
  changeStaffLog: () => void;
  staffDailyLog: any;
  staffDailyLogLoading: boolean;
  staffId: string;
}

const TeamMemberTable = ({
  column,
  tableData,
  loading,
  modalOpen,
  changeStaffLog,
  staffDailyLog,
  staffDailyLogLoading,
  staffId,
}: IProps) => {
  return (
    <>
      <DataTable
        columns={column}
        data={tableData ?? []}
        border
        headerSticky
        height="max-h-[calc(100vh-280px)]"
        loading={loading}
        loadingDataNum={20}
      />
    </>
  );
};

export default TeamMemberTable;
