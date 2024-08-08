import { IDealerDetails, IDealerTable } from "@/interface/dealer-interface";
import { IRegisteredDevice } from "@/interface/device-interface";
import {
  exportDealerData,
  getDealerChartData,
  getDealerDetail,
  getDealerTableData,
} from "@/services/dealer/dealer-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";

interface IProps {
  data: IDealerDetails;
}

const useDealerDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //   STATES
  const [type, setType] = useState("agent");
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "month").toDate(),
    to: moment().toDate(),
  });
  const [headerSearchTrigger, setHeaderSearchTrigger] =
    useState<boolean>(false);

  // FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setPage(1);
    setSearchTrigger(!searchTrigger);
  };
  const headerResetHandler = () => {
    setDateRange({
      from: moment().subtract(1, "month").toDate(),
      to: moment().toDate(),
    });
    setPage(1);
    setHeaderSearchTrigger(!headerSearchTrigger);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };
  const headerSearchTriggerHandler = () => {
    setHeaderSearchTrigger(!headerSearchTrigger);
    setPage(1);
  };
  //   API CALLS
  const { data: dealerDetail, isLoading: dealerDetailLoading } =
    useQuery<IProps>({
      queryKey: ["dealerDetail", id],
      queryFn: async () => {
        if (id) {
          return await getDealerDetail(id as string);
        }
      },
    });

  // Dealer Chart
  const { data: dealerChart, isLoading: dealerChartLoading } = useQuery<any>({
    queryKey: ["dealerChart", id, headerSearchTrigger],
    queryFn: async () => {
      if (id) {
        return await getDealerChartData(
          id as string,
          moment(dateRange?.from).format("YYYY-MM-DD"),
          moment(dateRange?.to).format("YYYY-MM-DD"),
          type
        );
      }
    },
  });

  // Dealer Table
  const { data: dealerTable, isLoading: dealerTableLoading } =
    useQuery<IDealerTable>({
      queryKey: [
        "dealerTable",
        id,
        searchTrigger,
        headerSearchTrigger,
        page,
        perPage,
      ],
      queryFn: async () => {
        if (id) {
          return await getDealerTableData(
            id as string,
            page,
            perPage,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            type,
            searchText
          );
        }
      },
    });

  const exportDealerDataMutation = useMutation({
    mutationFn: () =>
      exportDealerData(
        id as string,
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        type,
        searchText
      ),
    onSuccess: (data) => {
      const fileName = `dealer_data_(${id})_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportDealerDataMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  const deviceColumns: ColumnDef<IRegisteredDevice>[] = [
    // SN
    {
      id: "sn",
      header: "S.N",
      accessorKey: "sn",
      cell: (props) => {
        return (
          <SerialNumberCell {...props} pageNumber={page} perPage={perPage} />
        );
      },
    },
    // simreg_kit_num_v
    {
      id: "simreg_kit_num_v",
      header: "Sim Reg Kit No.",
      accessorKey: "simreg_kit_num_v",
      cell: ({ row }) => <p>{row?.original.simreg_kit_num_v ?? "-"}</p>,
    },
    // vendor_channel
    {
      id: "vendor_channel",
      header: "Vendor Channel",
      accessorKey: "vendor_channel",
      cell: ({ row }) => <p>{row?.original.vendor_channel ?? "-"}</p>,
    },
    // status
    {
      id: "status_v",
      header: "Status",
      accessorKey: "status_v",
      cell: ({ row }) => {
        return <Badge variant={"info"}>{row?.original.status_v}</Badge>;
      },
    },
    // device_user_id
    {
      id: "device_user_id",
      header: "Device User ID",
      accessorKey: "device_user_id",
      cell: ({ row }) => <p>{row?.original.device_user_id ?? "-"}</p>,
    },
    // action_code
    {
      id: "action_code_v",
      header: "Action Code",
      accessorKey: "action_code_v",
      cell: ({ row }) => <p>{row?.original.action_code_v ?? "-"}</p>,
    },
    // update_dt
    {
      id: "updated_dt",
      header: "Updated Date",
      accessorKey: "updated_dt",
      cell: ({ row }) => {
        return (
          <Badge variant={"secondary"}>
            {moment(row?.original.updated_dt).format("YYYY-MM-DD")}
            <br />
            {moment(row?.original.updated_dt).format("HH:mm:ss")}
          </Badge>
        );
      },
    },
  ];

  // Grouped Chart Data
  const groupedChartData = useMemo(() => {
    if (
      dealerChart &&
      dateRange &&
      moment(dateRange.to).diff(moment(dateRange.from), "months") > 1
    ) {
      const groupedData: any = dealerChart?.data?.reduce(
        (acc: any, item: any) => {
          const month = moment(item.date).format("MMM");
          if (!acc[month]) {
            acc[month] = 0;
          }
          if (item?.agents) {
            acc[month] += item.agents.reduce(
              (sum: any, agent: any) => sum + parseInt(agent.count, 10),
              0
            );
          } else {
            acc[month] += item?.devices?.reduce(
              (sum: any, device: any) => sum + parseInt(device.count, 10),
              0
            );
          }
          return acc;
        },
        {} as Record<string, number>
      );

      // Ensure all months are included
      const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      allMonths.forEach((month) => {
        if (!groupedData[month]) {
          groupedData[month] = 0;
        }
      });

      return {
        xAxisData: allMonths,
        seriesData: allMonths.map((month) => groupedData[month]),
      };
    } else {
      return {
        xAxisData: dealerChart?.data?.map((item: any) =>
          moment(item.date).format("DD MMM")
        ),
        seriesData: dealerChart?.data?.map((item: any) =>
          type === "agent"
            ? item?.agents?.reduce(
                (sum: any, agent: any) => sum + parseInt(agent.count, 10),
                0
              )
            : item?.devices?.reduce(
                (sum: any, agent: any) => sum + parseInt(agent.count, 10),
                0
              )
        ),
      };
    }
  }, [dealerChart]);

  const chartOption = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: groupedChartData?.xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: groupedChartData?.seriesData,
          type: "bar",
          itemStyle: {
            color: type === "agent" ? "#5470C6" : "#9747FF",
          },
        },
      ],
    };
  }, [groupedChartData]);

  return {
    // STATES
    type,
    setType,
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,
    searchTrigger,
    setSearchTrigger,
    dateRange,
    setDateRange,
    headerSearchTrigger,
    setHeaderSearchTrigger,

    // API
    dealerDetail,
    dealerDetailLoading,
    dealerTable,
    dealerTableLoading,
    dealerChart,
    dealerChartLoading,
    exportDealerDataMutation,

    // FUNCTIONS
    searchTextHandler,
    resetHandler,
    headerResetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    headerSearchTriggerHandler,
    exportHandler,

    // Columns
    deviceColumns,
    // Chart
    chartOption,
  };
};

export default useDealerDetail;
