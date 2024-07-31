import { IAgent, IAgentDetailTable } from "@/interface/agent-interface";
import { IChartCount } from "@/interface/device-interface";
import {
  getAgentChartData,
  getAgentDetail,
  getAgentDetailTable,
} from "@/services/agent/agent-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

interface IProps {
  data: IAgent;
}

const useAgentDetail = () => {
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

  const { data: agentDetail, isLoading: agentDetailLoading } = useQuery<IProps>(
    {
      queryKey: ["agentDetail", id],
      queryFn: async () => {
        if (id) {
          return await getAgentDetail(id as string);
        }
      },
    }
  );

  // Chart data
  const { data: agentChartData, isLoading: agentChartDataLoading } =
    useQuery<IChartCount>({
      queryKey: ["agentChartData", id, headerSearchTrigger],
      queryFn: async () => {
        if (id) {
          return await getAgentChartData(
            id as string,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD")
          );
        }
      },
    });

  // agent detail table
  const { data: agentDetailTable, isLoading: agentDetailTableLoading } =
    useQuery<IAgentDetailTable>({
      queryKey: [
        "agentDetailTable",
        id,
        searchTrigger,
        page,
        perPage,
        headerSearchTrigger,
      ],
      queryFn: async () => {
        if (id) {
          return await getAgentDetailTable(
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

  // COLUMNS
  const agentDetailColumns: ColumnDef<IAgent>[] = [
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
    // SIM Reg Kit
    {
      id: "simreg_kit_num_v",
      header: "SIM Reg Kit No.",
      accessorKey: "simreg_kit_num_v",
      cell: ({ row }) => (
        <Badge variant={"info"}>{row?.original.simreg_kit_num_v}</Badge>
      ),
    },
    // Action Code
    {
      id: "action_code_v",
      header: "Action Code",
      accessorKey: "action_code_v",
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
    // SSP IMEI
    {
      id: "imei1",
      header: "SSP IMEI",
      accessorKey: "imei1",
    },
    // MDM IMEI
    {
      id: "imei_no",
      header: "MDM IMEI",
      accessorKey: "imei_no",
    },
  ];

  // Chart
  const groupedChartData = useMemo(() => {
    if (
      agentChartData &&
      dateRange &&
      moment(dateRange.to).diff(moment(dateRange.from), "months") > 1
    ) {
      const groupedData: any = agentChartData?.data.reduce((acc, item) => {
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
        xAxisData: agentChartData?.data?.map((item) =>
          moment(item.date).format("DD MMM")
        ),
        seriesData: agentChartData?.data?.map((item) => item.count),
      };
    }
  }, [agentChartData]);

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
            color: "#FF0000",
          },
        },
      ],
    };
  }, [groupedChartData]);

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
    agentDetail,
    agentDetailLoading,
    agentDetailTable,
    agentDetailTableLoading,
    agentChartDataLoading,
    // Columns
    agentDetailColumns,
    // Chart Option
    chartOption,
  };
};

export default useAgentDetail;
