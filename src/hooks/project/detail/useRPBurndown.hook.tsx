import { IBurndownDate, IBurndownDetail } from "@/interface/project-interface";
import { getProjectBurndown } from "@/services/project/project-service";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useRPBurndown = () => {
  const router = useRouter();
  const { code } = router?.query;

  const { data: burndownData, isLoading } = useQuery<IBurndownDetail>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectBurndown(code);
        return response;
      }
    },
    queryKey: ["burndownData", code],
  });

  // Consumption List Column
  const columns: ColumnDef<IBurndownDate>[] = [
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row?.getValue("date")}</div>,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Used RP",
      cell: ({ row }) => <div>{row?.getValue("rp")}</div>,
    },
  ];

  // Consumption List Data
  const burndownTableData: any =
    burndownData &&
    Object?.entries(burndownData?.data?.daily_data)
      .reverse()
      .map(([key, value]: any) => {
        return {
          date: key,
          rp: value?.real_sales_rp ?? 0,
        };
      });

  const burndownOption = {
    color: ["#60a5fa", "#f87171"],

    dataset: [
      {
        // Original dataset
        id: "burndown_data",
        source: burndownData
          ? Object?.entries(burndownData?.data?.daily_data).map(
              ([key, value]: any) => {
                return [key, value?.ideal_sales_rp, value?.real_sales_rp];
              }
            )
          : [],
      },
      // ideal_data
      {
        id: "burndown_ideal_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Adjust the condition according to your needs
            and: [{ dimension: 1, ">": 0 }],
          },
        },
      },
      // real_data
      {
        id: "burndown_real_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Corrected to filter out entries where real_sales_rp (third column, hence dimension: 2) is greater than 0
            and: [{ dimension: 2, ">": 0 }],
          },
        },
      },
    ],
    series: [
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_ideal_data",
        showSymbol: false,
        encode: {
          // Assuming the first column is 'date', the second is 'ideal_sales_rp', and the third is 'real_sales_rp'
          x: 0, // date
          y: 1, // ideal_sales_rp
        },
      },
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_real_data", // Use the filtered dataset
        showSymbol: false,
        encode: {
          x: 0, // date
          y: 2, // real_sales_rp
        },
      },
    ],
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: "",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let result = params[0].axisValueLabel + "<br/>";
        params.forEach(function (item: any) {
          result +=
            item.marker +
            " " +
            (item.seriesIndex === 0 ? "Ideal" : "Utilized") +
            ": " +
            item.value[item.seriesIndex + 1] +
            "<br/>";
        });
        return result;
      },
    },
  };

  return {
    burndownData,
    isLoading,
    columns,
    burndownTableData,
    burndownOption,
  };
};

export default useRPBurndown;
