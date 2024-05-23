import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import WorkLoadChart from "@/features/User-Management/team-members/page-body/work-load-chart";
import { ITeamLead } from "@/interface/dh-interface";
import { IStaffRPReport } from "@/interface/team-leads-interface";
import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { EChartsInstance } from "echarts-for-react";

const useDhDashboard = () => {
  const { profileData } = useCommonStore();
  // REF
  const chartRef = useRef<EChartsInstance>(null);

  const [staffIds, setStaffIds] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });

  const { data: teamLeadData, isLoading: teamLeadDataLoading } =
    useQuery<ITeamLead>({
      queryFn: async () => {
        if (profileData) {
          // if (profileData && profileData?.is_team_lead === "Yes") {
          // const response = await getLeadsList(profileData?.username);
          const response = await getLeadsList("jeetendra");
          return response;
        }
      },
      queryKey: ["teamLeadData"],
      onSuccess: (data) => {
        const joinedId = data?.data[0]?.staffs
          .map((staff) => staff?.id)
          .join(",");

        setStaffIds(joinedId);
      },
    });

  const { data: staffTimeLog, isLoading: staffTimeLogLoading } =
    useQuery<IStaffRPReport>({
      queryFn: async () => {
        if (staffIds) {
          const response = await getStaffRpSummary(
            moment(dateRange?.from).format("YYYY-MM-DD"), //start_date
            moment(dateRange?.to).format("YYYY-MM-DD"), //end_date
            staffIds
          );
          return response;
        }
      },
      queryKey: ["staffTimeLog", staffIds, dateRange?.to],
    });

  // Missed Deadline Columns
  const missedDeadlineColumns: ColumnDef<any>[] = [
    {
      id: "assignee",
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => <div>{row?.getValue("assignee")}</div>,
    },
    {
      id: "project_count",
      accessorKey: "project_count",
      header: "No. of Projects",
      cell: ({ row }) => <div>#{row?.getValue("project_count")}</div>,
    },
    {
      id: "missed_deadlines",
      accessorKey: "missed_deadlines",
      header: "Deadlines Missed",
      cell: ({ row }) => <div>#{row?.getValue("missed_deadlines")}</div>,
    },
  ];

  const memberTimeLogSummaryColumns: ColumnDef<any>[] = [
    {
      id: "fullname",
      accessorKey: "fullname",
      header: "Team Member",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 w-[150px]">
          <Link
            href={`/staffs/${row?.original?.username}`}
            className="font-semibold bock text-primary hover:text-blue-700"
          >
            {row?.original?.fullname}
          </Link>
          <div>
            <p className="text-xs font-medium text-zinc-700">
              {row?.original?.role?.name}
            </p>
            Dots here
          </div>
        </div>
      ),
    },
    // total Task
    {
      id: "total_task",
      accessorKey: "total_task",
      header: () => <div>Total Task</div>,
    },
    // Open Task
    {
      id: "open_task",
      accessorKey: "open_task",
      header: () => <div>Added Task</div>,
    },
    // Closed Task
    {
      id: "closed",
      accessorKey: "closed",
      header: () => <div>Closed Task</div>,
    },
    // Bug %
    {
      id: "bug_percentage",
      accessorKey: "bug_percentage",
      header: () => <div>Bug %</div>,
    },
    // Utilization %
    {
      id: "utilization_percentage",
      accessorKey: "utilization_percentage",
      header: () => <div>Utilization %</div>,
    },
    // Work-load Remarks
    {
      id: "work_load",
      accessorKey: "work_load",
      header: () => <div>Time-Log</div>,
      cell: ({ row }) => <WorkLoadChart data={row?.original} />,
    },
  ];

  const taskMissedDeadlinesColumns: ColumnDef<any>[] = [
    // Task
    {
      id: "title",
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <Link
          href={"/"}
          className="font-medium text-primary hover:text-blue-700"
        >
          {row?.getValue("title")}
        </Link>
      ),
    },
    // Assignee
    {
      id: "assignee",
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("assignee")}</div>
      ),
    },
    // Deadline
    {
      id: "deadline",
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("deadline")}</div>
      ),
    },
    // Completion CHances
    {
      id: "chances",
      accessorKey: "chances",
      header: () => (
        <div>
          Completion <br /> Chances
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("deadline")}</div>
      ),
    },
  ];

  // Chart
  const teamOverviewOption = {
    legend: {
      show: true,
      bottom: "-5px",
      itemWidth: 16,
      itemHeight: 16,
    },

    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["50%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "%" + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: "Client Budget",
            value: staffTimeLog
              ? Math.round(
                  (staffTimeLog?.data?.summary?.commercial_rp /
                    staffTimeLog?.data?.summary?.available_rp) *
                    100
                )
              : 0,
          },
          {
            name: "In-House Budget",
            value: staffTimeLog
              ? Math.round(
                  (staffTimeLog?.data?.summary?.inhouse_rp /
                    staffTimeLog?.data?.summary?.available_rp) *
                    100
                )
              : 0,
          },
          {
            name: "Loss Budget",
            value: staffTimeLog
              ? Math.round(
                  ((staffTimeLog?.data?.summary?.commercial_rp +
                    staffTimeLog?.data?.summary?.inhouse_rp) /
                    staffTimeLog?.data?.summary?.available_rp) *
                    100
                )
              : 0,
            itemStyle: {
              color: "#EE6666",
            },
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const myChart = chartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                );
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 14,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    teamOverviewOption && myChart.setOption(teamOverviewOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [teamOverviewOption]);

  return {
    // STATES
    dateRange,
    setDateRange,
    // API
    staffTimeLog,
    staffTimeLogLoading,
    teamLeadDataLoading,

    // Columns
    missedDeadlineColumns,
    memberTimeLogSummaryColumns,
    taskMissedDeadlinesColumns,

    // Chart
    teamOverviewOption,

    // REF
    chartRef,
  };
};

export default useDhDashboard;
