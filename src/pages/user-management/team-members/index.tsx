import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";
import { NextPageWithLayout } from "../../_app";
import TeamMembersTable from "@/features/User-Management/team-members/page-body/team-members-table";
import TeamMemberPageHeader from "@/features/User-Management/team-members/page-header";
import useTeamMemberList from "@/hooks/user-management/team-member-list/useTeamMemberList.hook";

const TeamMembersList: NextPageWithLayout = () => {
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
    modalOpen,
    staffId,
    changeStaffLog,
    staffDailyLog,
    staffDailyLogLoading,
    setDepartment,
    searchHandler,
    department,
  } = useTeamMemberList();
  return (
    <div>
      {/* Header */}
      <TeamMemberPageHeader
        setDateRangeOpen={setDateRangeOpen}
        dateRangeOpen={dateRangeOpen}
        dateRange={dateRange}
        dateChangeHandler={dateChangeHandler}
        searchHandler={searchHandler}
        setDepartment={setDepartment}
        department={department}
      />

      {/* Body */}
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <TeamMembersTable
          memberColumn={memberColumn}
          teamMemberList={teamMemberList}
          isLoading={isLoading}
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
      </div>
    </div>
  );
};

export default TeamMembersList;

export const getStaticProps = getI18nProps;

TeamMembersList.getLayout = (page) => {
  return <MainLayout title="Report">{page}</MainLayout>;
};
