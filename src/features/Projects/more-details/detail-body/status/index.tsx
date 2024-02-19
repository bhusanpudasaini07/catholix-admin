import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import ReactECharts from "echarts-for-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";

const Status = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      // top: "5%",
      // left: "center",
      show: false,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],

        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
          {
            // make an record to fill the bottom 50%
            itemStyle: {
              // stop the chart from rendering this piece
              color: "none",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ],
  };

  const columns: ColumnDef<any>[] = [
    // status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
      enableHiding: false,
    },
    // RP consumption
    {
      id: "rp_consumption",
      accessorKey: "rp_consumption",
      header: "RP Consumption",
      cell: ({ row }) => (
        <div className="">{row.getValue("rp_consumption")}</div>
      ),
      enableHiding: false,
    },
    // Utilization
    {
      id: "utilization",
      accessorKey: "utilization",
      header: "Utilization",
      cell: ({ row }) => <div className="">{row.getValue("utilization")}</div>,
      enableHiding: false,
    },
  ];

  return (
    <Card className="mt-6">
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">Status</p>
            <Button variant={"white"} size={"sm"}>
              Detail View
            </Button>
          </div>
          <Select
          // defaultValue={dateType}
          // onValueChange={(e) => setDateType(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="RP Utilization"
                defaultValue={"RP Utilization"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utilization">RP Utilization</SelectItem>
              <SelectItem value="consumption">RP Consumption</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid items-start grid-cols-12 gap-4">
          <div className="col-span-6 overflow-hidden rounded-md grow">
            <DataTable
              border={true}
              // loading={isLoading}
              columns={columns}
              data={[]}
            />
          </div>
          <div className="col-span-6 max-h-[400px] w-auto">
            <ReactECharts style={{ minHeight: "400px" }} option={option} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Status;
