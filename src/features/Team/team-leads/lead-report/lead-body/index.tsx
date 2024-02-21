import React, { useState } from "react";
import RpUtilization from "./lead-rp-utilize";
import TimeUtilization from "./lead-time-utilize";
import RpSummary from "./lead-rp-summary";
import OtherInfo from "./lead-other-info";
import ProjectOverview from "./lead-projects-overview";
import RoleCountryTable from "./lead-role-country";
import ProjectRpConsumptionTable from "./lead-role-rp-table";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  getStaffRpSummary,
  getTeamLeadReport,
  getTeamLeadStaff,
} from "@/services/lead-report/lead-report.service";
import ClientVsInHouseProject from "./client-n-inhouse-project";
import InHouseMarketRp from "./inhouse-market-rp";
import ClientMarketRP from "./client-market-rp";

const LeadReportBody = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <RpUtilization />
        <TimeUtilization />
        <RpSummary available="200" sales="20" loss="100" />
        <OtherInfo staff="3" client="5" in_house="10" />
      </div>
      <ProjectOverview total={1} risk={1} ongoing={1} success={1} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 mt-4">
        <RoleCountryTable />
        <ProjectRpConsumptionTable />
      </div>
      <ClientVsInHouseProject />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 mt-4">
        <InHouseMarketRp />
        <ClientMarketRP />
      </div>
    </div>
  );
};

export default LeadReportBody;
