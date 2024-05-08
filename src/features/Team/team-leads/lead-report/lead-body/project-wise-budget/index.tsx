import {
  ICountryInHouseTotalRP,
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import ReactECharts, { EChartsInstance } from "echarts-for-react";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

const ProjectWiseBudget: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  const { filterConfig } = useCommonStore();
  const ProjectChartRef = useRef<EChartsInstance>(null);

  const [market, setMarket] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");

  // Total
  const sumTotalRp = staffRpSummaryData?.reduce(
    (total: number, project: IProject) => total + parseFloat(project?.total_rp),
    0
  );
  const calculateCountryTotalRP = (
    projects: IProject[],
    sumTotalRp: number
  ) => {
    const countryTotalRP: ICountryInHouseTotalRP[] = [];

    projects.forEach((project: IProject) => {
      const existingCountryIndex = countryTotalRP.findIndex(
        (item) => item.country === project?.market
      );
      const totalRPToAdd = parseFloat(project?.total_rp);
      if (!isNaN(totalRPToAdd)) {
        if (existingCountryIndex === -1) {
          countryTotalRP.push({
            country: project?.market,
            totalRP: totalRPToAdd,
            percentage: (totalRPToAdd / sumTotalRp) * 100,
          });
        } else {
          countryTotalRP[existingCountryIndex].totalRP += totalRPToAdd;
          countryTotalRP[existingCountryIndex].percentage =
            (countryTotalRP[existingCountryIndex]?.totalRP / sumTotalRp) * 100;
        }
      }
    });

    // Adjust digit limit after .
    countryTotalRP.forEach((item) => {
      item.totalRP = parseFloat(item?.totalRP.toFixed(2));
      item.percentage = parseFloat(item?.percentage.toFixed(2));
    });

    return countryTotalRP;
  };
  const countryTotalRP = calculateCountryTotalRP(
    staffRpSummaryData || [],
    sumTotalRp || 0
  );

  // In House
  const sumInhouseTotalRp = staffRpSummaryData?.reduce(
    (total: number, project: IProject) => {
      if (project.source === "In-House") {
        return total + parseFloat(project.total_rp);
      }
      return total;
    },
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
    staffRpSummaryData || [],
    sumInhouseTotalRp || 0
  );

  // Client
  const sumClientTotalRp = staffRpSummaryData?.reduce(
    (total: number, project: IProject) => {
      if (project.source === "Client") {
        return total + parseFloat(project.total_rp);
      }
      return total;
    },
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
    staffRpSummaryData || [],
    sumClientTotalRp || 0
  );

  console.log("countryInHouseTotalRP", country);

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
          <div
            onClick={() => setCountry(row?.original?.country)}
            className="flex gap-3 items-center font-medium text-zinc-700 w-full"
          >
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
        <div
          onClick={() => setCountry(row?.original?.country)}
          className="font-semibold text-zinc-700 w-full"
        >
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
        <div
          onClick={() => setCountry(row?.original?.country)}
          className="font-semibold text-zinc-700 w-full"
        >
          {row?.getValue("percentage")}%
        </div>
      ),
      enableHiding: false,
    },
  ];

  const PieData =
    market === "all"
      ? staffRpSummaryData
          ?.filter(
            (item: IProject) => country === "all" || item?.market === country
          )
          .map((item: IProject) => ({
            name: `${item?.title}`,
            value: parseFloat(item?.total_rp),
          }))
      : market === "in_house"
      ? staffRpSummaryData
          ?.filter(
            (item: IProject) =>
              item?.source === "In-House" &&
              (country === "all" || item?.market === country)
          )
          .map((item: IProject) => ({
            name: `${item?.title} In-House`,
            value: parseFloat(item?.total_rp),
          }))
      : market === "client"
      ? staffRpSummaryData
          ?.filter(
            (item: IProject) =>
              item?.source === "Client" &&
              (country === "all" || item?.market === country)
          )
          .map((item: IProject) => ({
            name: `${item?.title} Client`,
            value: parseFloat(item?.total_rp),
          }))
      : [];

  const option = {
    title: {
      text: `${
        market === "in_house"
          ? "In-House"
          : market === "client"
          ? "Client"
          : "All"
      } Projects`,
    },
    tooltip: {
      trigger: "item",
    },
    // color: ["#2DD4BF", "#0891B2", "#818CF8", "#7C3AED", "#FACC15", "#84CC16"],
    series: [
      {
        type: "pie",
        radius: ["70%", "100%"],
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
            return "{a|" + item?.value + "" + "}\n{b|" + item?.name + "}";
          },
          rich: {
            a: {
              fontSize: 34,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
              fontWeight: 600,
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

  useEffect(() => {
    const myChart = ProjectChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "" + "}\n{b|" + params.name + "}";
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
        <div className="">
          <div className="flex justify-between flex-wrap gap-2 items-center mb-8">
            <h5 className="font-medium text-zinc-700">Project Wise Budget</h5>
            <Select onValueChange={(value) => setMarket(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Project</SelectItem>
                  <SelectItem value="in_house">In-House Project</SelectItem>
                  <SelectItem value="client">Client Project</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4 xl:grid-cols-6">
            <div className="col-span-3">
              <DataTable
                hover
                loading={staffDataLoading}
                border={true}
                columns={columns}
                data={
                  (market === "all"
                    ? countryTotalRP
                    : market === "in_house"
                    ? countryInHouseTotalRP
                    : market === "client"
                    ? countryClientTotalRP
                    : countryTotalRP) || []
                }
                height="max-h-[400px]"
              />
            </div>
            <div className="my-auto col-span-3">
              <ReactECharts
                className="h-[400px]"
                option={option}
                opts={{ renderer: "svg" }}
                ref={ProjectChartRef}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectWiseBudget;
