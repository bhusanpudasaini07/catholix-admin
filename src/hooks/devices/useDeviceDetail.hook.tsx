import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import {
  getDeviceChartData,
  getDeviceDetail,
  getDeviceDetailTable,
} from "@/services/devices/devices-service";
import {
  IChartCount,
  IDeviceDetail,
  IDeviceDetailTable,
  IRegisteredDevice,
} from "@/interface/device-interface";
import { ColumnDef } from "@tanstack/react-table";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import moment from "moment";

interface IProps {
  data: IDeviceDetail;
}

const useDeviceDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  // States
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

  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
  };
  const headerResetHandler = () => {
    setDateRange({
      from: moment().subtract(1, "month").toDate(),
      to: moment().toDate(),
    });
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

  // API CALLS
  const { data: deviceDetail, isLoading: deviceDetailLoading } =
    useQuery<IProps>({
      queryKey: ["deviceDetail", id],
      queryFn: async () => {
        if (id) {
          return await getDeviceDetail(id as string);
        }
      },
    });

  // Device detail table
  const { data: deviceDetailTable, isLoading: deviceDetailTableLoading } =
    useQuery<IDeviceDetailTable>({
      queryKey: [
        "deviceDetailTable",
        id,
        searchTrigger,
        page,
        perPage,
        headerSearchTrigger,
      ],
      queryFn: async () => {
        if (id) {
          return await getDeviceDetailTable(
            id as string,
            page,
            perPage,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            searchText
          );
        }
      },
    });

  // Chart data
  const { data: deviceChartData, isLoading: deviceChartDataLoading } =
    useQuery<IChartCount>({
      queryKey: ["deviceChartData", id, headerSearchTrigger],
      queryFn: async () => {
        if (id) {
          return await getDeviceChartData(
            id as string,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD")
          );
        }
      },
    });

  // COLUMNS
  const deviceDetailColumns: ColumnDef<IRegisteredDevice>[] = [
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
      header: "SIM Reg Kit",
      accessorKey: "simreg_kit_num_v",
      cell: ({ row }) => (
        <p className="font-semibold">{row?.original.simreg_kit_num_v}</p>
      ),
    },
    // vendor_channel
    {
      id: "vendor_channel",
      header: "Vendor Channel",
      accessorKey: "vendor_channel",
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
    },
    // action_code
    {
      id: "action_code_v",
      header: "Action Code",
      accessorKey: "action_code_v",
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

  // Chart
  const groupedChartData = useMemo(() => {
    if (
      deviceChartData &&
      dateRange &&
      moment(dateRange.to).diff(moment(dateRange.from), "months") > 1
    ) {
      const groupedData: any = deviceChartData?.data.reduce((acc, item) => {
        const month = moment(item.date).format("MMM");
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += parseInt(item.count, 10);
        return acc;
      }, {} as Record<string, number>);

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
        xAxisData: deviceChartData?.data?.map((item) =>
          moment(item.date).format("DD MMM")
        ),
        seriesData: deviceChartData?.data?.map((item) => item.count),
      };
    }
  }, [deviceChartData]);

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
            color: "#5470C6",
          },
        },
      ],
    };
  }, [groupedChartData]);

  // const chartOption = useMemo(() => {
  //   return {
  //     tooltip: {
  //       trigger: "axis",
  //       axisPointer: {
  //         type: "shadow",
  //       },
  //     },
  //     grid: {
  //       left: "3%",
  //       right: "4%",
  //       bottom: "10%",
  //       containLabel: true,
  //     },
  //     xAxis: {
  //       type: "category",
  //       data: deviceChartData?.data?.map((item) =>
  //         moment(item.date).format("DD")
  //       ),
  //     },
  //     yAxis: {
  //       type: "value",
  //     },
  //     series: [
  //       {
  //         data: deviceChartData?.data?.map((item) => item.count),
  //         type: "bar",
  //         itemStyle: {
  //           color: "#5470C6",
  //         },
  //       },
  //     ],
  //   };
  // }, [deviceChartData]);

  return {
    // States
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
    openMapModal,
    setOpenMapModal,
    headerSearchTrigger,
    setHeaderSearchTrigger,

    // Functions
    searchTextHandler,
    resetHandler,
    headerResetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    headerSearchTriggerHandler,

    // API CALLS
    deviceDetail,
    deviceDetailLoading,
    deviceDetailTable,
    deviceDetailTableLoading,
    deviceChartDataLoading,
    // Columns
    deviceDetailColumns,
    // Chart Option
    chartOption,
  };
};

export default useDeviceDetail;
