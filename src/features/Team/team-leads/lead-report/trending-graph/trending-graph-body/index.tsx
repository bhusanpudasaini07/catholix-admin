import ReactECharts from "echarts-for-react";
import moment from "moment";
import React, { FC } from "react";
import { useQuery } from "react-query";

import { getStaffDailySummary } from "@/services/lead-report/lead-report-service";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  start_date: Date | undefined;
  end_date: Date | undefined;
  id: any;
}

interface StaffSummaryData {
  [date: string]: {
    available: string;
    used: string;
    commercial: string;
  };
}

const TrendingGraphBody: FC<IProps> = ({ start_date, end_date, id }) => {
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

  const tableData =
    staffData &&
    Object.entries(staffData)?.map(
      ([date, { available, used, commercial }]) => ({
        date,
        available_rp: parseFloat(available).toFixed(2),
        used_rp: parseFloat(used).toFixed(2),
        commercial: parseFloat(commercial).toFixed(2),
      })
    );

  const columns: ColumnDef<any>[] = [
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          <p className="text-sm text-zinc-500">
            {moment(row.getValue("date"))?.format("MMM DD")}
          </p>
          <p className="text-sm text-zinc-500">
            {moment(row.getValue("date"))?.format("ddd")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
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
      header: "Used Budget",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-500">{row.getValue("used_rp")}</div>
      ),
      enableHiding: false,
    },
    {
      id: "commercial",
      accessorKey: "commercial",
      header: "Commercial Budget",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-500">
          {row.getValue("commercial")}
        </div>
      ),
      enableHiding: false,
    },
  ];

  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Available RP", "Used RP", "Commercial RP"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: tableData?.map((item) => item?.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Available RP",
        type: "line",
        stack: "",

        data: tableData?.map((item) => item?.available_rp),
        lineStyle: {
          color: "#FACC15",
        },
        itemStyle: {
          color: "#FACC15",
        },
        smooth: true,
      },
      {
        name: "Used RP",
        type: "line",
        stack: "",
        data: tableData?.map((item) => item?.used_rp),
        lineStyle: {
          color: "#EE6666",
        },
        itemStyle: {
          color: "#EE6666",
        },
        smooth: true,
      },
      {
        name: "Commercial RP",
        type: "line",
        stack: "",
        data: tableData?.map((item) => item?.commercial),
        lineStyle: {
          color: "#3F3F46",
        },
        itemStyle: {
          color: "#3F3F46",
        },
        smooth: true,
      },
    ],
  };

  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardContent>
          <h5 className="font-medium text-zinc-700">Trendline Chart</h5>
          <div className="w-full h-[500px]">
            <ReactECharts
              option={option}
              style={{ height: "500px" }}
              opts={{ renderer: "svg" }}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <p className="my-6 text-lg font-medium text-center text-zinc-700">
              Budget Consumption List
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
