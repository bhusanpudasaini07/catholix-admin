import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";

import TeamMemberTable from "./team-member-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  ITeamMemberDetails,
  ITeamMemberList,
} from "@/interface/team-member-interface";
import { IMembersLog } from "@/interface/team-lead-report-interface";

interface IProps {
  memberColumn: ColumnDef<ITeamMemberDetails>[];
  teamMemberList: ITeamMemberList | undefined;
  isLoading: boolean;
  currentPage: number;
  totalPage: number;
  perPage: number;
  setPerPage: (arg: number) => void;
  changePageNum: (arg: number) => void;
  modalOpen: boolean;
  changeStaffLog: () => void;
  staffDailyLog: IMembersLog;
  staffDailyLogLoading: boolean;
  staffId: string;
}

const TeamMembersTable = ({
  memberColumn,
  teamMemberList,
  isLoading,
  perPage,
  setPerPage,
  changePageNum,
  modalOpen,
  changeStaffLog,
  staffDailyLog,
  staffDailyLogLoading,
  staffId,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <TeamMemberTable
          column={memberColumn}
          tableData={teamMemberList?.data ?? []}
          loading={isLoading}
          currentPage={teamMemberList?.pagination?.page ?? 0}
          totalPage={teamMemberList?.pagination?.total_page ?? 0}
          perPage={perPage}
          setPerPage={setPerPage}
          changePageNum={changePageNum}
          modalOpen={modalOpen}
          changeStaffLog={changeStaffLog}
          staffDailyLog={staffDailyLog}
          staffDailyLogLoading={staffDailyLogLoading}
          staffId={staffId}
        />
      </CardContent>
    </Card>
  );
};

export default TeamMembersTable;
