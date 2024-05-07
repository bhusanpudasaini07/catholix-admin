import moment from "moment";
// React
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

//Hooks
import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { getStaffRpSummary } from "@/services/lead-report/lead-report-service";
import ProjectsOverviewSkeleton from "@/shared/components/skeleton-loading/lead-report/projects-overview-skeleton";

import ClientMarketRP from "./client-market-rp";
import ClientVsInHouseProject from "./client-n-inhouse-project";
import InHouseMarketRp from "./inhouse-market-rp";
import ProjectOverview from "./lead-projects-overview";
import RoleCountryTable from "./lead-role-country";
// Features
import MemberWiseLogTable from "./member-wise-log-table";
import ProjectPerformanceDetail from "./project-performance-detail";
import ProjectRpConsumptionTable from "./project-rp-consumption";
import { cn } from "@/shared/utils/utils";
import { useRouter } from "next/router";
import { IStaffDataStructure } from "@/interface/staff-interface";
import UtilizationSummary from "./utilization-summary";
import MemberTimeUtilization from "./member-time-log-utilization";
import UtilizationSummaryCard from "@/shared/components/skeleton-loading/lead-report/utilizarion-summary-skeleton";

const LeadReportBody = ({ dateRange }: any) => {
  const {
    totalAvailableRP,
    setTotalAvailableRP,
    totalLossRP,
    setTotalLossRP,
    totalActiveStaff,
    setTotalActiveStaff,
    totalInhouseRP,
    setTotalInhouseRP,
    totalCommercialRP,
    setTotalCommercialRP,
    totalProjects,
    setTotalProjects,
    totalClientProjects,
    setTotalClientProjects,
    totalInhouseProjects,
    setTotalInhouseProjects,
    totalUsedRP,
    setTotalUsedRP,
    totalHighRiskProjects,
    setTotalHighRiskProjects,
    calculateUsedPercentage,
    calculateUnusedPercentage,
    staffIdJson,
  } = useLeadReport();
  const router = useRouter();
  const current_id = router?.query?.lead_id;
  const [currentPage, setCurrentPage] = useState<string>("");
  const [leadReportData, setLeadReportData] = useState<IStaffDataStructure>();

  const { data: staffRpSummaryData, isLoading: staffDataLoading } =
    useQuery<any>(
      ["getStaffRpSummaryData", staffIdJson, dateRange?.to, current_id],
      async () => {
        if (staffIdJson) {
          const response = await getStaffRpSummary(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            JSON.parse(staffIdJson || "")
          );
          return response;
        } else {
          return null;
        }
      }
    );

  const totalRP =
    staffRpSummaryData?.data?.summary?.available_rp +
    staffRpSummaryData?.data?.summary?.total_rp;

  const totalTime =
    staffRpSummaryData?.data?.summary?.available_time +
    staffRpSummaryData?.data?.summary?.total_time;

  useEffect(() => {
    if (current_id) {
      setCurrentPage(String(current_id));
    } else {
      setCurrentPage("all");
    }
    if (staffRpSummaryData) {
      let availableRPSum = 0;
      let lossRPSum = 0;
      let inhouseRPSum = 0;
      let commercialRPSum = 0;
      let activeStaffCount = 0;
      let spentRPCount = 0;
      setLeadReportData(staffRpSummaryData);

      // Iterate over staff array and sum up available RP, loss RP, inhouse RP, and commercial RP
      staffRpSummaryData.data.staff.forEach((staff: any) => {
        availableRPSum += parseFloat(staff.available_rp);
        lossRPSum += parseFloat(staff.loss_rp);
        inhouseRPSum += parseFloat(staff.used_rp);
        commercialRPSum += parseFloat(staff.commercial_rp);
        spentRPCount += parseFloat(staff.used_rp);

        // Count active staff
        if (parseFloat(staff.used_time) > 0) {
          activeStaffCount++;
        }
      });

      // Set the values as strings
      setTotalAvailableRP(availableRPSum.toFixed(2));
      setTotalLossRP(lossRPSum.toFixed(2));
      setTotalInhouseRP(inhouseRPSum.toFixed(2));
      setTotalCommercialRP(commercialRPSum.toFixed(2));
      setTotalUsedRP(spentRPCount.toFixed(2));
      setTotalActiveStaff(activeStaffCount.toString());

      // Calculate project statistics
      let clientProjectCount = 0;
      let inhouseProjectCount = 0;
      let highRiskProjectCount = 0;

      staffRpSummaryData.data.projects.forEach((project: any) => {
        if (project.source === "Client") {
          clientProjectCount++;
        }

        if (project.source === "In-House") {
          inhouseProjectCount++;
        }

        if (project.risk_status === "High") {
          highRiskProjectCount++;
        }
      });
      setTotalProjects(
        `${staffRpSummaryData?.data?.summary?.all_projects_count}`
      );
      setTotalClientProjects(clientProjectCount.toString());
      setTotalInhouseProjects(inhouseProjectCount.toString());
      setTotalHighRiskProjects(highRiskProjectCount.toString());
    }
  }, [staffRpSummaryData]);
  return (
    <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
      <div className="grid grid-cols-1 gap-4 mb-4 xl:grid-cols-2">
        {staffDataLoading ? (
          <UtilizationSummaryCard />
        ) : (
          <UtilizationSummary data={staffRpSummaryData?.data?.summary} />
        )}
        {staffDataLoading ? (
          <ProjectsOverviewSkeleton />
        ) : (
          <ProjectOverview
            total={totalProjects}
            risk={totalHighRiskProjects}
            in_house={totalInhouseProjects}
            client={totalClientProjects}
          />
        )}

        {staffDataLoading ? (
          <ProjectsOverviewSkeleton />
        ) : (
          <MemberTimeUtilization
            data={staffRpSummaryData?.data?.summary?.utilization_range}
          />
        )}
      </div>
      {currentPage && currentPage !== "all" ? (
        <div className="mt-4">
          <ProjectPerformanceDetail
            staffRpSummaryData={staffRpSummaryData}
            staffDataLoading={staffDataLoading}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4 xl:grid-cols-2">
          <RoleCountryTable
            staffRpSummaryData={staffRpSummaryData}
            staffDataLoading={staffDataLoading}
          />
          <ProjectRpConsumptionTable
            staffRpSummaryData={staffRpSummaryData}
            staffDataLoading={staffDataLoading}
          />
        </div>
      )}
      {currentPage && currentPage !== "all" && (
        <div className="mt-4">
          <MemberWiseLogTable
            dateRange={dateRange}
            staffRpSummaryData={leadReportData}
            staffDataLoading={staffDataLoading}
          />
        </div>
      )}
      <div className="mt-4">
        <ClientVsInHouseProject
          staffRpSummaryData={staffRpSummaryData}
          staffDataLoading={staffDataLoading}
        />
      </div>
      <div
        className={cn(
          currentPage && currentPage === "all" && "mb-4",
          "grid grid-cols-1 gap-4 mt-4 xl:grid-cols-2"
        )}
      >
        <InHouseMarketRp
          staffRpSummaryData={staffRpSummaryData}
          staffDataLoading={staffDataLoading}
        />
        <ClientMarketRP
          staffRpSummaryData={staffRpSummaryData}
          staffDataLoading={staffDataLoading}
        />
      </div>
      {currentPage && currentPage === "all" && (
        <div className="">
          <MemberWiseLogTable
            dateRange={dateRange}
            staffRpSummaryData={leadReportData}
            staffDataLoading={staffDataLoading}
          />
        </div>
      )}
    </div>
  );
};

export default LeadReportBody;
