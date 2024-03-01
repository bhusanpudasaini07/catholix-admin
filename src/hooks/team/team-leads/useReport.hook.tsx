import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery, useQueryClient } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/shared/utils/utils";
import { useRouter } from "next/router";

import {
  ILeadDetail,
  ILeadReportSummary,
  IStaffRPReport,
} from "@/interface/team-leads-interface";
import { getTeamLeadRPSummary } from "@/services/teams/report-service";

import {
  getLeadsList,
  getStaffRpSummary,
} from "@/services/lead-report/lead-report-service";

const useReport = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [leadDetail, setLeadDetail] = useState<ILeadDetail>();
  const [countryProjectData, setCountryProjectData] = useState([]);

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

      // Convert the countryCount object into an array suitable for the chart
      const chartData: any = Object.entries(countryCount).map(
        ([name, value]: any) => ({
          name,
          value: value?.toFixed(2),
        })
      );
      setCountryProjectData(chartData);
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
          onClick={() => router.push(`?id=${row?.original?.username}`)}
        >
          {row.getValue("fullname")}
        </div>
      ),
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Total RP Executed",
      cell: ({ row }) => (
        <div className="font-medium">
          {Number(row?.original?.summary?.total_rp) ?? 0}
        </div>
      ),
    },
    {
      id: "client_rp",
      accessorKey: "client_rp",
      header: "Total RP Executed (Client)",
      cell: ({ row }) => (
        <div className="font-medium">
          {row?.original?.summary?.commercial_rp ?? 0}
        </div>
      ),
    },
    {
      id: "inhouse_rp",
      accessorKey: "inhouse_rp",
      header: "Total RP Executed (In-House)",
      cell: ({ row }) => (
        <div className="font-medium">
          {row?.original?.summary?.inhouse_rp ?? 0}
        </div>
      ),
    },
  ];

  const rpOptions = {
    tooltip: {
      trigger: "item",
    },
    color: ["#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
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
        data: leadDetail
          ? [
              {
                name: "Client Overall",
                value: leadDetail?.summary?.commercial_rp,
                selected: true,
              },
              {
                name: "In-house Overall",
                value: leadDetail?.summary?.inhouse_rp,
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
    color: ["#FACC15", "#84CC16", "#2DD4BF", "#0891B2", "#F472B6"],
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
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
    }
  }, [router?.query?.id, setLeadDetail, leadReportSummary]);

  /**
   * For grouping the projects and displaying it in chart
   */
  useEffect(() => {
    extractGroupedCountry();
  }, [staffRPSummary]);

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

  return {
    dateRange,
    setDateRange,
    dateRangeOpen,
    setDateRangeOpen,
    leadReportSummary,
    isLoading,
    columns,
    totalRP,
    totalCommercialRP,
    totalInhouseRP,
    rpOptions,
    countryOptions,
    staffRPLoading,
    leadDetail,
  };
};

export default useReport;
