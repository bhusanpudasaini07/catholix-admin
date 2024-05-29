import { IMembersLog } from "@/interface/team-lead-report-interface";
import { ITeamMemberDetails } from "@/interface/team-member-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  column: ColumnDef<ITeamMemberDetails>[];
  tableData: ITeamMemberDetails[];
  loading: boolean;
  modalOpen: boolean;
  changeStaffLog: () => void;
  staffDailyLog: IMembersLog;
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
