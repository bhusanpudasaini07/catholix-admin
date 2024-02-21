import { useState } from "react";
import LeadHeader from "./lead-header";
import LeadReportBody from "./lead-body";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report.service";
import { DateRange } from "react-day-picker";
import moment from "moment";

const LeadReportContent = () => {
  const router = useRouter();
  const current_id = router.query?.lead_id;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 31);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneWeekAgo,
    to: new Date(),
  });
  const { data: teamLeadStaffs, isLoading: leadLoading } = useQuery<any>(
    ["getTeamLeadStaffs", current_id],
    async () => {
      if (current_id === "all") {
        const response = getLeadsList(`2`);

        return response;
      } else {
        const response = getLeadsList(`${current_id}`);
        return response;
      }
    }
  );

  const staffIdArray = teamLeadStaffs?.data[0]?.staffs?.map(
    (item: any) => item?.id
  );
  const staffIdJson = JSON.stringify(staffIdArray);

  const { data: staffRpSummaryData, isLoading: staffDataLoading } =
    useQuery<any>(
      ["getStaffRpSummaryData", staffIdJson, dateRange],
      async () => {
        if (current_id && current_id !== "all") {
          const response = getStaffRpSummary(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            JSON.parse(staffIdJson)
          );
          console.log("staffRpSummaryData", response);
          return response;
        }
      }
    );

  return (
    <div>
      <LeadHeader setDateRange={setDateRange} dateRange={dateRange} />
      <LeadReportBody staffRpSummaryData={staffRpSummaryData} />
    </div>
  );
};

export default LeadReportContent;
