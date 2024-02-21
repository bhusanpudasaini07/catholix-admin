import moment from "moment";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery, useQueryClient } from "react-query";
import { ColumnDef } from "@tanstack/react-table";

import {
  ILeadDetail,
  ILeadReportSummary,
} from "@/interface/team-leads-interface";
import { getTeamLeadRPSummary } from "@/services/teams/report-service";
import { useRouter } from "next/router";

const useReport = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

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
  //   const { data: teamLeads } = useQuery({
  //     queryFn: async () => {
  //       if (router?.query?.id) {
  //         const response = await getTeamLeadIds(String(router?.query?.id)); //need to change
  //         return response;
  //       }
  //     },
  //     queryKey: ["teamLeads", router?.query?.id],
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("staffRPSummary");
  //     },
  //   });

  //   const teamLeadStaffs = teamLeads?.data[0]?.staffs?.map(
  //     (staff: any) => staff?.id
  //   );

  //   const { data: staffRPSummary, isLoading: staffRPLoading } = useQuery({
  //     queryFn: async () => {
  //       debugger;
  //       const response = await getStaffRpSummary(
  //         moment(dateRange?.from).format("YYYY-MM-DD"),
  //         moment(dateRange?.to).format("YYYY-MM-DD"),
  //         teamLeadStaffs
  //       );
  //       return response;
  //     },
  //     queryKey: ["staffRPSummary", teamLeadStaffs, router?.query?.id],
  //   });

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
          className="font-semibold cursor-pointer hover:text-primary"
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
          {row?.original?.summary?.total_rp ?? 0}
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
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          fontSize: 20,
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 20,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 0,
            name: "Client Overall",
          },
          {
            value: 0,
            name: "In House",
          },
        ],
        // data: rpSummary?.data?.rolewise?.map((role) => ({
        //   value: role?.rp,
        //   name: role?.role_name,
        // })),
      },
    ],
  };

  const countryOptions = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
        // data: rpSummary?.data?.rolewise?.map((role) => ({
        //   value: role?.rp,
        //   name: role?.role_name,
        // })),
      },
    ],
  };

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
  };
};

export default useReport;
