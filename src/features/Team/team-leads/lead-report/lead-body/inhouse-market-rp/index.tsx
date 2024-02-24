import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import ReactECharts from "echarts-for-react";
import {
  ICountryInHouseTotalRP,
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import { FC } from "react";

const InHouseMarketRp: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  // const { countryInHouseTotalRP } = useLeadReport();

  const sumTotalRp = staffRpSummaryData?.data?.projects?.reduce(
    (total: number, project: IProject) => total + parseFloat(project?.total_rp),
    0
  );
  const calculateCountryInHouseTotalRP = (
    projects: IProject[],
    sumTotalRp: number
  ) => {
    const countryInHouseTotalRP: ICountryInHouseTotalRP[] = [];

    projects.forEach((project: IProject) => {
      if (project.source === "In-House") {
        const existingCountryIndex = countryInHouseTotalRP.findIndex(
          (item) => item.country === project?.market
        );
        const totalRPToAdd = parseFloat(project?.total_rp);
        if (!isNaN(totalRPToAdd)) {
          if (existingCountryIndex === -1) {
            countryInHouseTotalRP.push({
              country: project?.market,
              totalRP: totalRPToAdd,
              percentage: (totalRPToAdd / sumTotalRp) * 100,
            });
          } else {
            countryInHouseTotalRP[existingCountryIndex].totalRP += totalRPToAdd;
            countryInHouseTotalRP[existingCountryIndex].percentage =
              (countryInHouseTotalRP[existingCountryIndex]?.totalRP /
                sumTotalRp) *
              100;
          }
        }
      }
    });

    // Adjust digit limit after .
    countryInHouseTotalRP.forEach((item) => {
      item.totalRP = parseFloat(item?.totalRP.toFixed(2));
      item.percentage = parseFloat(item?.percentage.toFixed(2));
    });

    return countryInHouseTotalRP;
  };

  const countryInHouseTotalRP = calculateCountryInHouseTotalRP(
    staffRpSummaryData?.data?.projects || [],
    sumTotalRp || 0
  );

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
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row?.getValue("country")}
        </div>
      ),
    },
    {
      id: "totalRP",
      accessorKey: "totalRP",
      header: "RP",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row?.getValue("totalRP")}
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
          {row?.getValue("percentage")}%
        </div>
      ),
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
