import React from "react";

import LeaveRequestHeader from "@/features/Leave-Request/leave-req-header";
import LeaveRequestTable from "@/features/Leave-Request/leave-req-table";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import useLeaveRequest from "@/hooks/leave-request/useLeaveRequest.hook";

const LeaveRequest: NextPageWithLayout = () => {
  const {
    // STATES
    status,
    searchText,
    perPage,
    pageNum,
    date,

    // FUNCTIONS
    changePerPage,
    changePageNumber,
    searchHandler,
    changeDate,
    changeStatus,

    // For API
    columns,
    staffLeavesLoading,
    filteredStaffLeaves,
  } = useLeaveRequest();

  return (
    <>
      <LeaveRequestHeader
        status={status}
        date={date}
        searchHandler={searchHandler}
        changeDate={changeDate}
        changeStatus={changeStatus}
        searchText={searchText}
      />

      <div className="p-6 max-h-[calc(100vh-115px)]">
        <LeaveRequestTable
          columns={columns}
          data={filteredStaffLeaves ?? []}
          loading={staffLeavesLoading}
        />
      </div>
    </>
  );
};

export default LeaveRequest;

export const getStaticProps = getI18nProps;

LeaveRequest.getLayout = (page) => {
  return <MainLayout title="Leave Requests">{page}</MainLayout>;
};
