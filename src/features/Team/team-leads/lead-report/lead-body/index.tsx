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
  const [totalAvailableTime, setTotalAvailableTime] = useState<number>(0);
  const [totalCommercialTime, setTotalCommercialTime] = useState<number>(0);
  const [totalUsedTime, setTotalUsedTime] = useState<number>(0);
  const [totalLossTime, setTotalLossTime] = useState<number>(0);
  const [totalHighRiskProjects, setTotalHighRiskProjects] =
    useState<string>("0");
  // const { usedPercentage, unusedPercentage } =
  //   calculateUsedAndUnusedRpPercentage(staffRpSummaryData?.data?.summary?.?.sales_rp, rp?.used_rp);

  useEffect(() => {
    if (staffRpSummaryData) {
      let availableRPSum = 0;
      let lossRPSum = 0;
      let inhouseRPSum = 0;
      let commercialRPSum = 0;
      let activeStaffCount = 0;
      let spentRPCount = 0;
      let availableTimeSum = 0;
      let commercialTimeSum = 0;
      let usedTimeSum = 0;
      let lossTimeSum = 0;

      // Iterate over staff array and sum up available RP, loss RP, inhouse RP, and commercial RP
      staffRpSummaryData.data.staff.forEach((staff: any) => {
        availableRPSum += parseFloat(staff.available_rp);
        lossRPSum += parseFloat(staff.loss_rp);
        inhouseRPSum += parseFloat(staff.used_rp);
        commercialRPSum += parseFloat(staff.commercial_rp);
        spentRPCount += parseFloat(staff.used_rp);
        availableTimeSum += parseFloat(staff.available_time);
        commercialTimeSum += parseFloat(staff.commercial_time);
        usedTimeSum += parseFloat(staff.used_time);
        lossTimeSum += parseFloat(staff.loss_time);

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
      setTotalAvailableTime(availableTimeSum);
      setTotalCommercialTime(commercialTimeSum);
      setTotalUsedTime(usedTimeSum);
      setTotalLossTime(lossTimeSum);

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
          clientRP="200"
          overallEmptyPercentage={20}
          overallUsedPercentage={80}
          clientEmptyPercentage={50}
          clientUsedPercentage={50}
          overallRP="100"
        />
        <TimeUtilization
          overallTime="100"
          overallEmptyPercentage={20}
          overallUsedPercentage={80}
          clientTime="200"
          clientEmptyPercentage={50}
          clientUsedPercentage={50}
        />
        {/* <div className="card m-5">
          totalAvailableTime:{totalAvailableTime} <br />
          totalCommercialTime: {totalCommercialTime}
          <br />
          totalUsedTime: {totalUsedTime}
          <br />
          totalLossTime : {totalLossTime}
          <br />
          <br />
        </div> */}
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
