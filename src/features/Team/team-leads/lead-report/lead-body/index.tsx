import { FC, useEffect, useState } from "react";
import RpUtilization from "./lead-rp-utilize";
import TimeUtilization from "./lead-time-utilize";
import RpSummary from "./lead-rp-summary";
import OtherInfo from "./lead-other-info";
import ProjectOverview from "./lead-projects-overview";
import RoleCountryTable from "./lead-role-country";
import ProjectRpConsumptionTable from "./lead-role-rp-table";
import ClientVsInHouseProject from "./client-n-inhouse-project";
import InHouseMarketRp from "./inhouse-market-rp";
import ClientMarketRP from "./client-market-rp";
import { calculateUsedAndUnusedRpPercentage } from "@/shared/utils/rp-utils";

interface IProps {
  staffRpSummaryData: any;
}

const LeadReportBody: FC<IProps> = ({ staffRpSummaryData }) => {
  const [totalAvailableRP, setTotalAvailableRP] = useState<string>("0");
  const [totalLossRP, setTotalLossRP] = useState<string>("0");
  const [totalActiveStaff, setTotalActiveStaff] = useState<string>("0");
  const [totalInhouseRP, setTotalInhouseRP] = useState<string>("0");
  const [totalCommercialRP, setTotalCommercialRP] = useState<string>("0");
  const [totalProjects, setTotalProjects] = useState<string>("0");
  const [totalClientProjects, setTotalClientProjects] = useState<string>("0");
  const [totalInhouseProjects, setTotalInhouseProjects] = useState<string>("0");
  const [totalUsedRP, setTotalUsedRP] = useState<string>("0");

  const [totalHighRiskProjects, setTotalHighRiskProjects] =
    useState<string>("0");

  const totalRP =
    staffRpSummaryData?.data?.summary?.available_rp +
    staffRpSummaryData?.data?.summary?.total_rp;

  const calculateUsedPercentage = (
    usedData: number,
    totalData: number
  ): number => {
    if (totalData === 0) {
      return 0; // to avoid division by zero
    }
    return (usedData / totalData) * 100;
  };

  const calculateUnusedPercentage = (
    unusedData: number,
    totalData: number
  ): number => {
    if (totalData === 0) {
      return 0; // to avoid division by zero
    }
    return (unusedData / totalData) * 100;
  };

  useEffect(() => {
    if (staffRpSummaryData) {
      let availableRPSum = 0;
      let lossRPSum = 0;
      let inhouseRPSum = 0;
      let commercialRPSum = 0;
      let activeStaffCount = 0;
      let spentRPCount = 0;

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

  console.log("staffRpSummaryData", staffRpSummaryData);
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <RpUtilization
          clientRP={staffRpSummaryData?.data?.summary?.total_rp}
          overallEmptyPercentage={calculateUnusedPercentage(
            staffRpSummaryData?.data?.summary?.available_rp,
            totalRP
          ).toFixed(2)}
          overallUsedPercentage={(
            100 -
            calculateUsedPercentage(
              staffRpSummaryData?.data?.summary?.total_rp,
              totalRP
            )
          ).toFixed(2)}
          clientEmptyPercentage={(
            100 -
            calculateUsedPercentage(
              staffRpSummaryData?.data?.summary?.commercial_rp,
              totalRP
            )
          ).toFixed(2)}
          clientUsedPercentage={calculateUsedPercentage(
            staffRpSummaryData?.data?.summary?.commercial_rp,
            totalRP
          ).toFixed(2)}
          overallRP={staffRpSummaryData?.data?.summary?.commercial_rp}
        />
        <TimeUtilization
          overallTime="100"
          overallEmptyPercentage={20}
          overallUsedPercentage={80}
          clientTime="200"
          clientEmptyPercentage={50}
          clientUsedPercentage={50}
        />

        <RpSummary
          available={totalAvailableRP}
          spent={totalUsedRP}
          loss={totalLossRP}
        />
        <OtherInfo
          staff={totalActiveStaff}
          client={totalCommercialRP}
          in_house={totalInhouseRP}
        />
      </div>
      <ProjectOverview
        total={totalProjects}
        risk={totalHighRiskProjects}
        in_house={totalInhouseProjects}
        client={totalClientProjects}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 mt-4">
        <RoleCountryTable data={staffRpSummaryData?.data?.staff} />
        <ProjectRpConsumptionTable data={staffRpSummaryData?.data?.projects} />
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
