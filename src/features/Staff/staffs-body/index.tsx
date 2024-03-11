import React, { FC, useState } from "react";
import BudgetUtilization from "./budget-utilization";
import TimeUtilization from "./time-utilization";
import RpSummary from "./rp-summary";
import ProjectsOverview from "./projects-overview";
import StaffsProjectSummary from "./projects-summary";
import LogTable from "./log-table";
import AllTimeProjects from "./all-time-projects";
import { useRouter } from "next/router";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import { IStaffLogs, IStaffProjects } from "@/interface/staff-interface";
import useStaffProjectOverview from "@/hooks/staff/useStaffProjectOverview.hook";
import {
  getStaffProjects,
  getStaffTimeLogs,
} from "@/services/staff/staff-service";
import moment from "moment";

interface IProps {
  dateRange: any;
}
const StaffsBody: FC<IProps> = ({ dateRange }) => {
  const router = useRouter();
  const username = router?.query?.username;
  const [projectStates, setProjectStates] = useState({
    total: 0,
    client: 0,
    inhouse: 0,
    risk: 0,
  });
  const { data: staffLog, isLoading: staffLogLoading } = useQuery<IStaffLogs>({
    queryFn: async () => {
      if (username) {
        const response = await getStaffTimeLogs(
          username, //username
          dateRange?.to && moment(dateRange?.from).format("YYYY-MM-DD"), //date_from
          dateRange?.to && moment(dateRange?.to).format("YYYY-MM-DD") //date_to
        );
        return response;
      }
    },
    queryKey: ["staffLog", username, dateRange?.to],
  });

  const { data: staffProjects, isLoading: staffProjectLoading } =
    useQuery<IStaffProjects>({
      queryFn: async () => {
        const currentDate = moment().format("YYYY-MM-DD");
        const sixMonthsAgo = moment()
          .subtract(6, "months")
          .format("YYYY-MM-DD");
        const dateRange = { from: sixMonthsAgo, to: currentDate };
        if (username) {
          const response = await getStaffProjects(
            username, //staff id
            dateRange?.to
              ? moment(dateRange?.from).format("YYYY-MM-DD")
              : dateRange?.from, //date_from
            dateRange?.to
              ? moment(dateRange?.to).format("YYYY-MM-DD")
              : dateRange?.to //date_to
          );
          return response;
        }
      },

      queryKey: ["staffProjects", username, dateRange?.to],
      onSuccess: (res) => {
        const totalProjects = res?.data?.projects?.length;
        const clientProjects = res?.data?.projects?.filter(
          (item) => item?.source === "Client"
        ).length;
        const inhouseProjects = res?.data?.projects?.filter(
          (item) => item?.source === "In-House"
        ).length;
        const riskProjects = res?.data?.projects?.filter(
          (item) => item?.risk_status === "High"
        ).length;

        setProjectStates({
          total: totalProjects,
          client: clientProjects,
          inhouse: inhouseProjects,
          risk: riskProjects,
        });
      },
    });
  function calcPercentage(data: IStaffLogs | undefined) {
    if (!data || !data?.data?.report) {
      return null;
    }
    const {
      available_rp,
      total_rp,
      client_rp,
      available_time,
      total_time,
      client_time,
    } = data?.data?.report;

    // Calculate RP percentages
    const totalUsedRpPercentage = ((total_rp + client_rp) / available_rp) * 100;
    const clientRpPercentage = (client_rp / available_rp) * 100;
    const totalUnusedRpPercentage = 100 - totalUsedRpPercentage;
    const clientUnusedRpPercentage = 100 - clientRpPercentage;

    // Calculate time percentages
    const totalUsedTimePercentage =
      ((total_time + client_time) / available_time) * 100;
    const clientTimePercentage = (client_time / available_time) * 100;
    const totalUnusedTimePercentage = 100 - totalUsedTimePercentage;
    const clientUnusedTimePercentage = 100 - clientTimePercentage;

    return {
      totalUsedRpPercentage: totalUsedRpPercentage.toFixed(2),
      clientRpPercentage: clientRpPercentage.toFixed(2),
      totalUnusedRpPercentage: totalUnusedRpPercentage.toFixed(2),
      clientUnusedRpPercentage: clientUnusedRpPercentage.toFixed(2),
      totalUsedTimePercentage: totalUsedTimePercentage.toFixed(2),
      clientTimePercentage: clientTimePercentage.toFixed(2),
      totalUnusedTimePercentage: totalUnusedTimePercentage.toFixed(2),
      clientUnusedTimePercentage: clientUnusedTimePercentage.toFixed(2),
    };
  }
  const spentBudget =
    (staffLog?.data?.report?.client_rp ?? 0) +
    (staffLog?.data?.report?.total_rp ?? 0);
  const spentTime =
    (staffLog?.data?.report?.client_time ?? 0) +
    (staffLog?.data?.report?.total_time ?? 0);
  const percentage = calcPercentage(staffLog);
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <BudgetUtilization
          spentBudget={spentBudget}
          spentBudgetPercentage={percentage?.totalUsedRpPercentage}
          emptyBudgetPercentage={percentage?.totalUnusedRpPercentage}
          clientBudget={staffLog?.data?.report?.client_rp}
          clientBudgetPercentage={percentage?.clientRpPercentage}
          clientEmptyPercentage={percentage?.clientUnusedRpPercentage}
        />
        <TimeUtilization
          spentTime={spentTime}
          emptyTimePercentage={percentage?.totalUsedTimePercentage}
          spentTimePercentage={percentage?.totalUnusedTimePercentage}
          clientTime={staffLog?.data?.report?.client_time}
          clientEmptyPercentage={percentage?.clientTimePercentage}
          clientTimePercentage={percentage?.clientUnusedTimePercentage}
        />
        <RpSummary
          available={staffLog?.data?.report?.available_rp}
          spent={spentBudget}
          loss={"0"}
        />
        <ProjectsOverview
          client={projectStates?.client}
          in_house={projectStates?.inhouse}
          risk={projectStates?.risk}
          total={projectStates?.total}
        />
        <div className=" xl:col-span-2">
          <StaffsProjectSummary
            projectSummaryLoading={staffProjectLoading}
            projectSummaryData={staffProjects}
          />
        </div>
        <div className="xl:col-span-2">
          <LogTable
            logTableLoading={staffLogLoading}
            logTableData={staffLog}
            dateRange={""}
          />
        </div>
        <div className="xl:col-span-2">
          <AllTimeProjects
            staffDataLoading
            staffRpSummaryData={[]}
            dateRange={""}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default StaffsBody;
