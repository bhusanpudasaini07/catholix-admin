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
    legend: {
      left: "right",
      itemWidth: 16,
      itemHeight: 16,
    },
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
    series: [
      {
        name: "Actual Spent Budget",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: departmentData?.roles?.map((item) => item?.actual) ?? [],
      },
      {
        name: "Budget",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: departmentData?.roles?.map((item) => item?.quote) ?? [],
      },
      {
        name: "Estimated",
        type: "bar",
        barGap: 0.2,
        emphasis: {
          focus: "series",
        },
        data: departmentData?.roles?.map((item) => item?.estimated) ?? [],
      },
    ],
  };

  console.log(departmentData?.roles);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">
            {departmentData?.department_title}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
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
