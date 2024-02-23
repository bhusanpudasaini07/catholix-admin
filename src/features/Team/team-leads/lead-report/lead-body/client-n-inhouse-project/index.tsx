import React, { FC } from "react";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import { IRpStaffSummaryProps } from "@/interface/team-lead-report-interface";

const ClientVsInHouseProject: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
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
    color: ["#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["50%", "75%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 0,
        },
        label: {
          show: false,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
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
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("category")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {" "}
          {row.getValue("rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {" "}
          {row.getValue("percentage")}
        </div>
      ),
      enableHiding: false,
    },
  ];
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
          <div className="">
            <div className="flex items-center gap-2 flex-wrap mb-16">
              <h5 className="font-medium text-zinc-700">
                Client Projects VS In-House Project
              </h5>
            </div>
            <DataTable
              loading={staffDataLoading}
              border={true}
              columns={columns}
              data={rows || []}
            />
          </div>
          <div className="my-auto">
            <ReactECharts className="min-h-[400px]" option={option} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientVsInHouseProject;
