import React, { FC } from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DataTable } from "@/shared/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { getStaffDailySummary } from "@/services/lead-report/lead-report-service";
import moment from "moment";

interface IProps {
  start_date: any;
  end_date: any;
  id: any;
}

interface StaffSummaryData {
  [date: string]: {
    available: string;
    used: string;
    commercial_rp?: string;
  };
}

const TrendingGraphBody: FC<IProps> = ({ start_date, end_date, id }) => {
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

  const { data: staffDailySummary, isLoading: staffDailySummaryLoading } =
    useQuery<any>(
      ["getStaffDailySummary", start_date, end_date, id],
      async () => {
        if (id) {
          const response = await getStaffDailySummary(
            moment(start_date).format("YYYY-MM-DD"),
            moment(end_date).format("YYYY-MM-DD"),
            id
          );
          return response;
        }
      }
    );

  const staffData: StaffSummaryData = staffDailySummary?.data || {};

  const tableData = Object.entries(staffData).map(
    ([date, { available, used, commercial_rp }]) => ({
      date,
      available_rp: parseFloat(available).toFixed(2),
      used_rp: parseFloat(used).toFixed(2),
      commercial_rp: commercial_rp
        ? parseFloat(commercial_rp).toFixed(2)
        : undefined,
    })
  );

  console.log("tableData", tableData);

  const columns: ColumnDef<any>[] = [
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          <p className="text-sm text-zinc-500">
            {moment(row.getValue("date")).format("MMM DD")}
          </p>
          <p className="text-sm text-zinc-500">
            {moment(row.getValue("date")).format("ddd")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available RP",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-500">
          {row.getValue("available_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "used_rp",
      accessorKey: "used_rp",
      header: "Used RP",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-500">{row.getValue("used_rp")}</div>
      ),
      enableHiding: false,
    },
    {
      id: "commercial_rp",
      accessorKey: "commercial_rp",
      header: "Commercial RP",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-500">
          {row.getValue("commercial_rp")}
        </div>
      ),
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
            loading={staffDailySummaryLoading}
            border={true}
            columns={columns}
            headerSticky
            height="max-h-[500px]"
            data={tableData || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingGraphBody;
