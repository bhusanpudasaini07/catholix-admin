import ReactECharts, { EChartsInstance } from "echarts-for-react";
import React, { FC, useEffect, useRef } from "react";

import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { IRpStaffSummaryProps } from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

const ClientVsInHouseProject: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  // REF for Chart
  const chartRef = useRef<EChartsInstance>(null);

  const { calculateUsedPercentage } = useLeadReport();
  const totalInhouseRpPercentage = calculateUsedPercentage(
    staffRpSummaryData?.data?.summary?.inhouse_rp,
    staffRpSummaryData?.data?.summary?.total_rp
  );

  const totalClientRpPercentage = calculateUsedPercentage(
    staffRpSummaryData?.data?.summary?.commercial_rp,
    staffRpSummaryData?.data?.summary?.total_rp
  );

  const option = {
    tooltip: {
      trigger: "item",
    },
    // color: ["#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["50%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 0,
        },
        label: {
          show: true,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item.value + "%" + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 25,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: "Client's Projects",
            value: totalClientRpPercentage.toFixed(2),
            selected: true,
          },
          {
            name: "In-house's Projects",
            value: totalInhouseRpPercentage.toFixed(2),
          },
        ],
      },
    ],
  };

  const rows = [
    {
      category: "Inhouse's Project",
      rp: staffRpSummaryData?.data?.summary?.inhouse_rp,
      percentage: `${totalInhouseRpPercentage.toFixed(2)}%`,
    },
    {
      category: "Client's Project",
      rp: staffRpSummaryData?.data?.summary?.commercial_rp,
      percentage: `${totalClientRpPercentage.toFixed(2)}%`,
    },
    {
      category: "Total",
      rp: staffRpSummaryData?.data?.summary?.total_rp,
      percentage: "100%",
    },
  ];

  const columns: ColumnDef<any>[] = [
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row.getValue("category")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(Number(row?.original?.rp))}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {" "}
          {row.getValue("percentage")}
        </div>
      ),
      enableHiding: false,
    },
  ];

  useEffect(() => {
    const myChart = chartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" + params.value + "%" + "}\n{b|" + params.name + "}"
                );
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 14,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    option && myChart.setOption(option);

    return () => {
      myChart.off("mouseover");
    };
  }, [option]);
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="flex flex-wrap gap-2 items-center mb-0">
          <h5 className="font-medium text-zinc-700">
            Client Projects VS In-House Project
          </h5>
        </div>
        <div className="grid grid-cols-1 gap-4 items-center xl:grid-cols-2">
          <div>
            <DataTable
              loading={staffDataLoading}
              border={true}
              columns={columns}
              data={rows || []}
            />
          </div>
          <div className="my-auto">
            <ReactECharts
              className="h-[400px]"
              ref={chartRef}
              option={option}
              opts={{ renderer: "svg" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientVsInHouseProject;
