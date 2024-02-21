import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DataTable } from "@/shared/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";

const TrendingGraphBody = () => {
  const colors = ["#FACC15", "#EE6666"];

  const option = {
    color: colors,

    tooltip: {
      trigger: "none",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {},
    grid: {
      top: 70,
      bottom: 50,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                "Precipitation  " +
                params.value +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data
                  : "")
              );
            },
          },
        },

        // prettier-ignore
        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
      },
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                "Precipitation  " +
                params.value +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data
                  : "")
              );
            },
          },
        },

        // prettier-ignore
        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        type: "line",
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        type: "line",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [
          3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,
        ],
      },
    ],
  };

  const columns: ColumnDef<any>[] = [
    // Title
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="font-medium underline text-primary hover:text-blue-700"></div>
      ),
      enableHiding: false,
    },
    // Date
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "country",
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "man_days",
      accessorKey: "man_days",
      header: "Man Days",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "man_month",
      accessorKey: "man_month",
      header: "Man Month",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
  ];
  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardContent>
          <h5 className="font-medium text-zinc-700">Trendline Chart</h5>
          <div className="w-full h-[500px]">
            <ReactECharts option={option} style={{ height: "500px" }} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <p className="text-center text-zinc-700 font-medium text-lg my-6">
              RP Consumption List
            </p>
          </div>
          <DataTable
            // loading={isLoading}
            border={true}
            columns={columns}
            data={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingGraphBody;
