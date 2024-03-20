import ReactECharts from "echarts-for-react";
import React, { FC } from "react";

import {
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import Image from "next/image";
import { useCommonStore } from "@/store/common-store";

const ClientMarketRP: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  const { filterConfig } = useCommonStore();
  const sumTotalRp = staffRpSummaryData?.data?.projects?.reduce(
    (total: number, project: IProject) => total + parseFloat(project?.total_rp),
    0
  );
  const calculateCountryClientTotalRP = (
    projects: IProject[],
    sumTotalRp: number
  ) => {
    const countryClientTotalRP: {
      country: string;
      totalRP: number;
      percentage: number;
    }[] = [];

    projects?.forEach((project: IProject) => {
      if (project.source === "Client") {
        const existingCountryIndex = countryClientTotalRP?.findIndex(
          (item) => item?.country === project?.market
        );
        const totalRPToAdd = parseFloat(project?.total_rp);
        if (!isNaN(totalRPToAdd)) {
          if (existingCountryIndex === -1) {
            countryClientTotalRP.push({
              country: project?.market,
              totalRP: totalRPToAdd,
              percentage: (totalRPToAdd / sumTotalRp) * 100,
            });
          } else {
            countryClientTotalRP[existingCountryIndex].totalRP += totalRPToAdd;
            countryClientTotalRP[existingCountryIndex].percentage =
              (countryClientTotalRP[existingCountryIndex].totalRP /
                sumTotalRp) *
              100;
          }
        }
      }
    });

    // Adjust digit limit after .
    countryClientTotalRP.forEach((item) => {
      item.totalRP = parseFloat(item?.totalRP?.toFixed(2));
      item.percentage = parseFloat(item?.percentage?.toFixed(2));
    });

    return countryClientTotalRP;
  };

  const countryClientTotalRP = calculateCountryClientTotalRP(
    staffRpSummaryData?.data?.projects || [],
    sumTotalRp || 0
  );

  const PieData = countryClientTotalRP?.map((item) => ({
    name: `${item?.country} Client`, // Add "In-House" suffix to country name
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
      cell: ({ row }) => {
        const flag = filterConfig?.markets?.find(
          (item: any) => item?.title === row?.original?.country
        )?.flag;
        return (
          <div className="flex items-center gap-3 font-medium text-zinc-700">
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
  return (
    <Card>
      <CardContent>
        <div className="grid grid-row-1">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <h5 className="font-medium text-zinc-700">
              Client Market Wise Budget
            </h5>
          </div>
          <div className="my-auto">
            <ReactECharts
              className="min-h-[500px]"
              option={option}
              opts={{ renderer: "svg" }}
            />
          </div>
          <div className="">
            <DataTable
              loading={staffDataLoading}
              border={true}
              columns={columns}
              data={countryClientTotalRP || []}
              height="max-h-[400px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientMarketRP;
