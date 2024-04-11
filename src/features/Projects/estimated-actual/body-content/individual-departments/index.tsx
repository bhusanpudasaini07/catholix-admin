import ReactEcharts, { EChartsInstance } from "echarts-for-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { IProjectIndivRole } from "@/interface/project-interface";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface IProps {
  column: ColumnDef<any>[];
  departmentData: {
    department_title: string;
    roles: IProjectIndivRole[];
  };
}

const EstimatedActualDepartmentWise = ({ column, departmentData }: IProps) => {
  const individualRolesOption = {
    grid: {
      top: "10%",
      bottom: "10%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //   left: "right",
    //   itemWidth: 16,
    //   itemHeight: 16,
    // },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: departmentData?.roles?.map((item) => item?.title) ?? [],
        axisLabel: {
          interval: 0,
          showMaxLabel: true,
          width: 80,
          overflow: "truncate",
          ellipsis: "...",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    // series: [
    //   {
    //     name: "Actual Spent Budget",
    //     type: "bar",
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: departmentData?.roles?.map((item) => item?.actual) ?? [],
    //   },
    //   {
    //     name: "Budget",
    //     type: "bar",
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: departmentData?.roles?.map((item) => item?.quote) ?? [],
    //   },
    //   {
    //     name: "Estimated",
    //     type: "bar",
    //     barGap: 0.2,
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: departmentData?.roles?.map((item) => item?.estimated) ?? [],
    //   },
    // ],
    series: [
      // Estimated stack
      {
        name: "Used from Estimated",
        type: "bar",
        stack: "estimated",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item?.estimated === 0
                ? 0
                : item?.actual > item?.estimated
                ? Math.round(item?.estimated)
                : Math.round(item?.actual),
            itemStyle: {
              color: "#3B82F6", // Dark blue for used from estimated
            },
          })) ?? [],
      },
      {
        name: "Estimated",
        type: "bar",
        stack: "estimated",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item?.actual > item?.estimated
                ? 0
                : Math.round(item.estimated - item?.actual),
            itemStyle: {
              color: "#CEE6FF", // Light blue for estimated
            },
          })) ?? [],
      },
      {
        name: "Over Estimated",
        type: "bar",
        stack: "estimated",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item.actual > item.estimated
                ? Math.round(item.actual - item.estimated)
                : 0,
            itemStyle: {
              color: "#EF4444", // Red for over estimated
            },
          })) ?? [],
      },
      // Budget stack
      {
        name: "Used from Budget",
        type: "bar",
        stack: "budget",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item?.quote === 0
                ? 0
                : item?.actual > item?.quote
                ? Math.round(item?.quote)
                : Math.round(item?.actual),
            itemStyle: {
              color: "#22C55E", // Dark green for used from budget
            },
          })) ?? [],
      },
      {
        name: "Budget",
        type: "bar",
        stack: "budget",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item?.actual > item?.quote
                ? 0
                : Math.round(item.quote - item?.actual),
            itemStyle: {
              color: "#A7F3D0", // Light green for budget
            },
          })) ?? [],
      },
      {
        name: "Over Budget",
        type: "bar",
        stack: "budget",
        data:
          departmentData?.roles?.map((item) => ({
            value:
              item.actual > item.quote
                ? Math.round(item.actual - item.quote)
                : 0,
            itemStyle: {
              color: "#EF4444", // Red for over budget
            },
          })) ?? [],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-9">
          <p className="text-lg font-medium text-zinc-700">
            {departmentData?.department_title}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="flex gap-6 justify-end items-center">
              <div className="flex gap-1.5 items-center">
                <div className="bg-red-500 rounded-sm size-4"></div>
                <p className="text-sm text-zinc-700">Over</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="bg-green-100 rounded-sm size-4"></div>
                <p className="text-sm text-zinc-700">Budget</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="bg-blue-100 rounded-sm size-4"></div>
                <p className="text-sm text-zinc-700">Estimate</p>
              </div>
            </div>
            <ReactEcharts option={individualRolesOption} />
          </div>

          <DataTable
            columns={column}
            data={departmentData?.roles ?? []}
            border
            total={[
              {
                columnId: "estimated",
                format: (value: number) => {
                  return changeNumberFormat(value);
                },
              },
              {
                columnId: "quote",
                format: (value: number) => {
                  return changeNumberFormat(value);
                },
              },
              {
                columnId: "actual",
                format: (value: number) => {
                  return changeNumberFormat(value);
                },
              },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimatedActualDepartmentWise;
