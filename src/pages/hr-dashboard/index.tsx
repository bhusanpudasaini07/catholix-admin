import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import DashboardHRLeaveReq from "@/features/Dashboard/hr-view/leave-req";
import HrDashboardMemberUtilization from "@/features/Dashboard/hr-view/member-utilization";

const HrDashboard: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            HR Dashboard
          </h1>
          <p className="text-base text-zinc-500">
            Welcome back! Your central hub for detailed insights and a complete
            overview of all HR processes.
          </p>
        </div>
      </div>

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DashboardHRLeaveReq />
          <HrDashboardMemberUtilization />
        </div>
      </div>
    </>
  );
};

export default HrDashboard;
export const getStaticProps = getI18nProps;

HrDashboard.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
