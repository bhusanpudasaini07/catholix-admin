import ReactECharts, { EChartsInstance } from "echarts-for-react";
import { FC, useEffect, useRef } from "react";

import {
  ICountryInHouseTotalRP,
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { useCommonStore } from "@/store/common-store";
import Image from "next/image";

const InHouseMarketRp: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  const { filterConfig } = useCommonStore();

  // REF for Chart
  const chartRef = useRef<EChartsInstance>(null);

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
    // color: ["#2DD4BF", "#0891B2", "#818CF8", "#7C3AED", "#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          fontSize: 20,
          formatter: (item: any) => {
            return "{a|" + item?.value + "%" + "}\n{b|" + item?.name + "}";
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
      cell: ({ row }) => {
        const flag = filterConfig?.markets?.find(
          (item: any) => item?.title === row?.original?.country
        )?.flag;
        return (
          <div className="flex gap-3 items-center font-medium text-zinc-700">
            <Image
              src={flag}
              height={16}
              width={16}
              style={{ objectFit: "contain" }}
              alt="Flag"
            />
            <p>{row?.getValue("country")}</p>
          </div>
        );
      },
    },
    {
      id: "totalRP",
      accessorKey: "totalRP",
      header: "Budget",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(Number(row?.original?.totalRP))}
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
          {row?.getValue("percentage")}%
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
    <Card>
      <CardContent>
        <div className="grid grid-row-1">
          <div className="flex flex-wrap gap-2 items-center mb-8">
            <h5 className="font-medium text-zinc-700">
              In-House Market Wise Budget
            </h5>
          </div>
          <div className="my-auto">
            <ReactECharts
              className="h-[400px]"
              option={option}
              ref={chartRef}
              opts={{ renderer: "svg" }}
            />
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
