import React from "react";
import { DataTable } from "@/shared/components/data-table/data-table";
import PercentageGraph from "@/shared/components/percentage-graph";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import useProjectRpSummary from "@/hooks/project/detail/useProjectRpSummary.hook";

const ClientVsInHouseProject = () => {
  const Option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
  const columns: ColumnDef<any>[] = [
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => <div></div>,
      enableHiding: false,
    },
  ];
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
          <div className="">
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <h5 className="font-medium text-zinc-700">
                Client Projects VS In-House Project
              </h5>
            </div>
            <DataTable
              // loading={isLoading}
              border={true}
              columns={columns}
              data={[]}
            />
          </div>
          <div className="my-auto">
            <ReactECharts className="min-h-[500px]" option={Option} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientVsInHouseProject;
