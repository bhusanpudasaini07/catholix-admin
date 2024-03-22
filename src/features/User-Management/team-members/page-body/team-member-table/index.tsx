import MemberTimeLogModal from "@/features/Team/team-leads/lead-report/lead-body/member-wise-log-table/member-timelog-modal";
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
        height="max-h-[calc(100vh-260px)]"
        loading={loading}
        loadingDataNum={20}
      />

      {/* Member Daily Log */}
      <Dialog onOpenChange={changeStaffLog} open={modalOpen} key={staffId}>
        <DialogContent className="min-w-[800px]">
          <MemberTimeLogModal
            staffDailyLog={staffDailyLog}
            staffDailyLogLoading={staffDailyLogLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamMemberTable;
