import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";

const InHouseMarketRp = () => {
  const { countryInHouseTotalRP, staffDataLoading, sumTotalRp } =
    useLeadReport();

  const PieData = countryInHouseTotalRP?.map((item) => ({
    name: `${item?.country} In-House`, // Add "In-House" suffix to country name
    value: item?.percentage, // Use totalRP as value
  }));
  const option = {
    tooltip: {
      trigger: "item",
    },
    color: ["#2DD4BF", "#0891B2", "#818CF8", "#7C3AED", "#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item?.value + "}\n{b|" + item?.name + "}";
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
        data: PieData || [],
      },
    ],
  };
  const columns: ColumnDef<any>[] = [
    {
      id: "country",
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <div>{row?.getValue("country")}</div>,
    },
    {
      id: "totalRP",
      accessorKey: "totalRP",
      header: "RP",
      cell: ({ row }) => <div>{row?.getValue("totalRP")}</div>,
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => <div>{row?.getValue("percentage")}%</div>,
      enableHiding: false,
    },
  ];
  return (
    <Card>
      <CardContent>
        <div className="grid grid-row-1">
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <h5 className="font-medium text-zinc-700">
              In-House Market Wise RP
            </h5>
          </div>
          <div className="my-auto">
            <ReactECharts className="min-h-[500px]" option={option} />
          </div>
          <div className="">
            <DataTable
              loading={staffDataLoading}
              border={true}
              columns={columns}
              data={countryInHouseTotalRP || []}
              height="max-h-[400px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InHouseMarketRp;
