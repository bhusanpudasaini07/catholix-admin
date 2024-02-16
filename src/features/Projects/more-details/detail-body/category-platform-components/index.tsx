import React from "react";
import ReactECharts from "echarts-for-react";

import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/data-table/data-table";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useConsumptionType from "@/hooks/project/detail/useConsumptionType.hook";
import { Card, CardContent } from "@/shared/components/ui/card";

const CategoryPlatform = () => {
  const { rpSummary, rpLoading } = useProjectDetail();

  const columns = [
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: any) => <div>{row?.original?.category}</div>,
      enableHiding: false,
    },
    {
      id: "rp_consumed",
      accessorKey: "rp_consumed",
      header: "RP Consumed",
      cell: ({ row }: any) => <div>{row?.original?.rp_consumed}</div>,
      enableHiding: false,
    },

    {
      id: "utilization",
      accessorKey: "utilization",
      header: "Utilization",
      cell: ({ row }: any) => <div>{row?.original?.utilization}</div>,
      enableHiding: false,
    },
  ];

  const data = [
    {
      category: "CAT_BUG",
      rp_consumed: 100,
      utilization: 20,
    },
    // Add more data objects as needed
  ];
  const { staffColumns, roleColumns, option } = useConsumptionType();

  return (
    <div className="grid grid-cols-12 gap-6 mt-4 mb-4">
      {/* Team Wise */}
      <div className="col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">Category</p>
                <Button variant={"white"} size={"sm"}>
                  More Details
                </Button>
              </div>
            </div>
            <div className="">
              <ReactECharts option={option} />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                columns={columns}
                border={true}
                loading={rpLoading}
                data={data}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Wise */}
      <div className="col-span-6 ">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-start gap-3">
                <p className="text-lg font-medium text-zinc-700">
                  Platform/Component
                </p>
                <Button variant={"white"} size={"sm"}>
                  More Details
                </Button>
              </div>
            </div>
            <div className="">
              <ReactECharts option={option} />
            </div>
            <div className="overflow-hidden rounded-md grow ">
              <DataTable
                columns={columns}
                border={true}
                loading={rpLoading}
                data={data}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPlatform;
