import { EChartsInstance } from "echarts-for-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery, useQueryClient } from "react-query";

import {
  ILeadDetail,
  ILeadReportSummary,
  IProjectMarket,
  IProjectType,
  IStaffRPReport,
} from "@/interface/team-leads-interface";
import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";
import { getTeamLeadRPSummary } from "@/services/teams/report-service";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const useReport = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const rpChartRef = useRef<EChartsInstance>(null);
  const countryChartRef = useRef<EChartsInstance>(null);

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [leadId, setLeadId] = useState<string>("");
  const [leadDetail, setLeadDetail] = useState<ILeadDetail>();
  const [countryProjectData, setCountryProjectData] = useState<
    IProjectMarket[]
  >([]);
  const [leadData, setLeadData] = useState<IProjectType[]>([]);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: oneMonthAgo,
    to: new Date(),
  });

  //   Lead Report Summary
  const { data: leadReportSummary, isLoading } = useQuery<ILeadReportSummary>({
    queryFn: () =>
      getTeamLeadRPSummary(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD")
      ),
    queryKey: ["leadReportSummary", dateRange?.to],
  });

  //   For getting team leads staff
  const { data: teamLeads } = useQuery({
    queryFn: async () => {
      if (router?.query?.id) {
        const response = await getLeadsList(String(router?.query?.id)); //need to change
        return response;
      }
    },
    queryKey: ["teamLeads", router?.query?.id],
    onSuccess: () => {
      queryClient.invalidateQueries("staffRPSummary");
    },
  });

  const teamLeadStaffs = teamLeads?.data[0]?.staffs?.map(
    (staff: any) => staff?.id
  );

  const { data: staffRPSummary, isLoading: staffRPLoading } =
    useQuery<IStaffRPReport>({
      queryFn: async () => {
        if (teamLeadStaffs) {
          const response = await getStaffRpSummary(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            teamLeadStaffs
          );
          return response;
        }
      },
      queryKey: [
        "staffRPSummary",
        teamLeadStaffs,
        router?.query?.id,
        dateRange?.to,
      ],
    });

  const changeLeadData = (data: any) => {
    router.push(`?id=${data?.username}`);
    setLeadId(data?.username);
  };

  /**
   * In order to group the number of projects country wise
   */
  const extractGroupedCountry = () => {
    if (staffRPSummary) {
      const countryCount: any = {};

      staffRPSummary?.data?.projects?.forEach((project) => {
        const country = project?.market;

        if (!country) return;

        if (countryCount[country]) {
          countryCount[country] += Number(project?.total_rp);
        } else {
          countryCount[country] = Number(project?.total_rp);
        }
      });
      const totalRp = Object.entries(countryCount).reduce(
        (acc, [key, value]: any) => acc + value,
        0
      );

      // Convert the countryCount object into an array suitable for the chart
      const chartData: any = Object.entries(countryCount).map(
        ([name, value]: any) => ({
          name,
          value: Math.round(value),
          percentage: Number(((Number(value) / totalRp) * 100).toFixed(2)),
        })
      );
      setCountryProjectData(chartData);
    }
  };
  const getLeadData = () => {
    let leadArray = [];
    if (leadDetail) {
      const totalRp =
        leadDetail?.summary?.commercial_rp + leadDetail?.summary?.inhouse_rp;

      leadArray = [
        {
          source: "Client",
          rp: leadDetail?.summary?.commercial_rp,
          percentage:
            leadDetail?.summary?.commercial_rp === 0
              ? 0
              : Number(
                  (
                    (leadDetail?.summary?.commercial_rp / totalRp) *
                    100
                  ).toFixed(2)
                ),
        },
        {
          source: "In-House",
          rp: leadDetail?.summary?.inhouse_rp,
          percentage:
            leadDetail?.summary?.inhouse_rp === 0
              ? 0
              : Number(
                  ((leadDetail?.summary?.inhouse_rp / totalRp) * 100).toFixed(2)
                ),
        },
      ];

      setLeadData(leadArray);
    }
  };

  //   Total RP collection
  const totalRP: number = useMemo(
    () =>
      leadReportSummary?.data
        ? leadReportSummary?.data?.reduce(
            (acc, item) => acc + item?.summary?.total_rp,
            0
          )
        : 0,
    [leadReportSummary?.data]
  );

  //   Total Commercial (Client) RP collection
  const totalCommercialRP: number = useMemo(
    () =>
      leadReportSummary?.data
        ? leadReportSummary?.data?.reduce(
            (acc, item) => acc + item?.summary?.commercial_rp,
            0
          )
        : 0,
    [leadReportSummary?.data]
  );

  //   Total InHouse RP collection
  const totalInhouseRP: number = useMemo(
    () =>
      leadReportSummary?.data
        ? leadReportSummary?.data?.reduce(
            (acc, item) => acc + item?.summary?.inhouse_rp,
            0
          )
        : 0,
    [leadReportSummary?.data]
  );

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="font-medium text-zinc-700">{serialNumber}.</div>;
  };

  const columns: ColumnDef<ILeadDetail>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => <SerialNumberCell row={row} />,
    },
    {
      id: "fullname",
      accessorKey: "fullname",
      header: "Name",
      cell: ({ row }) => (
        <div
          className={cn(
            router?.query?.id &&
              router?.query?.id === row?.original?.username &&
              "text-primary",
            "font-semibold cursor-pointer hover:text-primary"
          )}
          onClick={() => changeLeadData(row?.original)}
        >
          {row.getValue("fullname")}
        </div>
      ),
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: () => (
        <div>
          Total Budget <br />
          Exceeded
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {changeNumberFormat(row?.original?.summary?.total_rp) ?? 0}
        </div>
      ),
    },
    {
      id: "client_rp",
      accessorKey: "client_rp",
      header: () => (
        <div>
          Client Budget <br />
          Exceeded
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {changeNumberFormat(row?.original?.summary?.commercial_rp) ?? 0}
        </div>
      ),
    },
    {
      id: "inhouse_rp",
      accessorKey: "inhouse_rp",
      header: () => (
        <div>
          In-House Budget <br />
          Exceeded
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {changeNumberFormat(row?.original?.summary?.inhouse_rp) ?? 0}
        </div>
      ),
    },
  ];

  const rpOptions = {
    tooltip: {
      trigger: "item",
    },
    // color: ["#FACC15", "#84CC16"],

    series: [
      {
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
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 25,
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
        },
        labelLine: {
          show: false,
        },
        data: leadDetail
          ? [
              {
                name: "Client Overall",
                value: Math.round(leadDetail?.summary?.commercial_rp),
                selected: true,
              },
              {
                name: "In-house Overall",
                value: Math.round(leadDetail?.summary?.inhouse_rp),
              },
            ]
          : [],
      },
    ],
  };

  const countryOptions = {
    tooltip: {
      trigger: "item",
    },
    // color: ["#FACC15", "#84CC16", "#2DD4BF", "#0891B2", "#F472B6"],
    series: [
      {
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
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 25,
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
        },
        labelLine: {
          show: false,
        },
        data: countryProjectData ?? [],
      },
    ],
  };

  const projectTypeColumn: ColumnDef<IProjectType>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">{row?.index + 1}.</div>
      ),
    },
    {
      id: "source",
      accessorKey: "source",
      header: "Type",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">
          {row?.getValue("source")}
        </div>
      ),
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">
          {Math.round(row?.getValue("rp"))}
        </div>
      ),
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">
          {row?.getValue("percentage")}%
        </div>
      ),
    },
  ];

  const projectMarketColumn: ColumnDef<IProjectMarket>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">{row?.index + 1}.</div>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Market",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">{row?.getValue("name")}</div>
      ),
    },
    {
      id: "value",
      accessorKey: "value",
      header: ({ column }) => (
        <div className="flex justify-between items-center">
          <p>Budget</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">
          {row?.getValue("value")}
        </div>
      ),
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: ({ column }) => (
        <div className="flex justify-between items-center">
          <p>%</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">
          {row?.getValue("percentage")}%
        </div>
      ),
    },
  ];

  //   EFFECTS

  /**
   * For setting each team lead detail when clicked their name in table.
   */
  useEffect(() => {
    if (router?.query?.id) {
      const detail = leadReportSummary?.data?.find(
        (lead) => lead?.username === router?.query?.id
      );
      setLeadDetail(detail);
      setLeadId(detail?.id!);
    }
  }, [router?.query?.id, setLeadDetail, leadReportSummary]);

  /**
   * For grouping the projects and displaying it in chart
   */
  useEffect(() => {
    extractGroupedCountry();
  }, [staffRPSummary]);

  /**
   * For Lead client and inhouse data
   */
  useEffect(() => {
    getLeadData();
  }, [leadDetail]);

  /**
   * Changes route if the id is not there to username of 1st index of leadReportSummary array
   */
  useEffect(() => {
    if (router?.query?.id) {
      router?.push(`/team-leads/report?id=${router?.query?.id}`);
    } else {
      if (leadReportSummary) {
        router?.push(
          `/team-leads/report?id=${leadReportSummary?.data[0]?.username}`
        );
      }
    }
  }, [router?.query?.id, leadReportSummary]);

  //hover effect to show data in rp chart
  useEffect(() => {
    const myChart = rpChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params.name + "}";
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

    rpOptions && myChart.setOption(rpOptions);

    return () => {
      myChart.off("mouseover");
    };
  }, [rpOptions]);

  //hover effect to show data in country chart
  useEffect(() => {
    const myChart = countryChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params.name + "}";
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

    countryOptions && myChart.setOption(countryOptions);

    return () => {
      myChart.off("mouseover");
    };
  }, [countryOptions]);

  return {
    dateRange,
    setDateRange,
    dateRangeOpen,
    setDateRangeOpen,
    leadReportSummary,
    countryProjectData,
    leadData,
    isLoading,
    columns,
    totalRP,
    totalCommercialRP,
    totalInhouseRP,
    rpOptions,
    countryOptions,
    staffRPLoading,
    leadDetail,
    rpChartRef,
    countryChartRef,
    leadId,
    projectMarketColumn,
    projectTypeColumn,
  };
};

export default useReport;
