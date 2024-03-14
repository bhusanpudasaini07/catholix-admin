import moment from "moment";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useQuery } from "react-query";

import { IStaffLogs, IStaffProjects } from "@/interface/staff-interface";
import IStaffsProfileProject from "@/interface/staff-profile";
import {
  getStaffProjects,
  getStaffTimeLogs,
} from "@/services/staff/staff-service";

import AllTimeProjects from "./all-time-projects";
import BudgetUtilization from "./budget-utilization";
import LogTable from "./log-table";
import ProjectsOverview from "./projects-overview";
import StaffsProjectSummary from "./projects-summary";
import RpSummary from "./rp-summary";
import TimeUtilization from "./time-utilization";
import UtilizationSkeletonCard from "@/shared/components/skeleton-loading/lead-report/utilization-card-skeleton";
import SummaryCardSkeleton from "@/shared/components/skeleton-loading/lead-report/summary-skeleton";

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
        updateProjectStates(res?.data?.projects);
      },
    });
  const updateProjectStates = (projects: IStaffsProfileProject[]) => {
    const totalProjects = projects?.length;
    const clientProjects = projects?.filter(
      (item) => item?.source === "Client"
    ).length;
    const inhouseProjects = projects?.filter(
      (item) => item?.source === "In-House"
    ).length;
    const riskProjects = projects?.filter(
      (item) => item?.risk_status === "High"
    ).length;

    setProjectStates({
      total: totalProjects,
      client: clientProjects,
      inhouse: inhouseProjects,
      risk: riskProjects,
    });
  };

  function calcPercentage(data: IStaffLogs | undefined) {
    if (!data || !data?.data?.report) {
      // Return an object with all properties set to null if data is undefined or does not contain the expected structure
      return {
        totalUsedRpPercentage: null,
        clientRpPercentage: null,
        totalUnusedRpPercentage: null,
        clientUnusedRpPercentage: null,
        totalUsedTimePercentage: null,
        clientTimePercentage: null,
        totalUnusedTimePercentage: null,
        clientUnusedTimePercentage: null,
      };
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
    const totalUsedRpPercentage =
      (total_rp / (available_rp + total_rp + client_rp)) * 100;
    const clientRpPercentage =
      (client_rp / (available_rp + total_rp + client_rp)) * 100;
    const totalUnusedRpPercentage = 100 - totalUsedRpPercentage;
    const clientUnusedRpPercentage = 100 - clientRpPercentage;

    // Calculate time percentages
    const totalUsedTimePercentage =
      (total_time / (available_time + total_time + client_time)) * 100;
    const clientTimePercentage =
      (client_time / (available_time + total_time + client_time)) * 100;
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
  const spentBudget = staffLog?.data?.report?.total_rp;

  const spentTime =
    (staffLog?.data?.report?.client_time ?? 0) +
    (staffLog?.data?.report?.total_time ?? 0);
  const percentage = calcPercentage(staffLog);
  const lossRp = Number(
    staffLog?.data?.report?.available_rp
      ? staffLog?.data?.report?.available_rp - Number(spentBudget)
      : 0
  ).toFixed(2);

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {!staffLogLoading ? (
          <BudgetUtilization
            spentBudget={spentBudget}
            spentBudgetPercentage={percentage?.totalUsedRpPercentage}
            emptyBudgetPercentage={percentage?.totalUnusedRpPercentage}
            clientBudget={staffLog?.data?.report?.client_rp}
            clientBudgetPercentage={percentage?.clientRpPercentage}
            clientEmptyPercentage={percentage?.clientUnusedRpPercentage}
          />
        ) : (
          <UtilizationSkeletonCard />
        )}

        {!staffLogLoading ? (
          <TimeUtilization
            spentTime={spentTime}
            emptyTimePercentage={percentage?.totalUsedTimePercentage}
            spentTimePercentage={percentage?.totalUnusedTimePercentage}
            clientTime={staffLog?.data?.report?.client_time}
            clientEmptyPercentage={percentage?.clientTimePercentage}
            clientTimePercentage={percentage?.clientUnusedTimePercentage}
          />
        ) : (
          <UtilizationSkeletonCard />
        )}
        {!staffLogLoading ? (
          <RpSummary
            available={staffLog?.data?.report?.available_rp}
            spent={spentBudget}
            loss={lossRp}
          />
        ) : (
          <SummaryCardSkeleton />
        )}
        {!staffLogLoading ? (
          <ProjectsOverview
            client={projectStates?.client}
            in_house={projectStates?.inhouse}
            risk={projectStates?.risk}
            total={projectStates?.total}
          />
        ) : (
          <SummaryCardSkeleton />
        )}

        <div className=" xl:col-span-2">
          {!staffLogLoading ? (
            <StaffsProjectSummary
              projectSummaryLoading={staffProjectLoading}
              projectSummaryData={staffProjects}
            />
          ) : (
            <SummaryCardSkeleton />
          )}
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
            allTimeProjectLoading={staffProjectLoading}
            allTimeProjectData={staffProjects?.data?.projects ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffsBody;
