import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import ReactECharts from "echarts-for-react";

import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CountryButtonCheckbox } from "@/shared/components/ui/country-checkbox";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const StaffsProjectSummary: FC<IRpStaffSummaryProps> = ({
  staffDataLoading,
  staffRpSummaryData,
}) => {
  const router = useRouter();
  const { filterConfig } = useCommonStore();
  const [searchText, setSearchText] = useState("");

  const [filteredProjects, setFilteredProjects] = useState<any>();
  const [filterStates, setFilterStates] = useState({
    markets: "",
  });

  const changeFilterState = (key: keyof typeof filterStates, value: string) => {
    setFilterStates((prev) => ({ ...prev, [key]: value }));
  };
  const handleCheckboxChange =
    (filterKey: keyof typeof filterStates, value: string) =>
    (isChecked: boolean) => {
      const currentValues = filterStates[filterKey]
        ? filterStates[filterKey].split(",")
        : [];
      const updatedValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      changeFilterState(filterKey, updatedValues.join(","));
    };

  const total = staffRpSummaryData?.data?.projects?.reduce(
    (acc: number, obj: any) => acc + parseFloat(obj.total_rp),
    0
  );

  const calculatePercentage = (used: number, total: number): number => {
    if (total === 0) {
      return 0; // to avoid division by zero
    }
    return (used / total) * 100;
  };
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
            value: 90,
            selected: true,
          },
          {
            name: "In-house's Projects",
            value: 10,
          },
        ],
      },
    ],
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-sm font-medium ps-3 w-[40px]">
          {row.index + 1}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => (
        <Link
          href={`/projects/${row?.original?.code}`}
          className="text-sm font-semibold text-blue-500"
        >
          {row?.getValue("title")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("status")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "market",
      accessorKey: "market",
      header: "Country",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("market")}
        </div>
      ),
      enableHiding: false,
    },

    {
      id: "type",
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {calculatePercentage(row?.original?.total_rp, total).toFixed(2)}%
        </div>
      ),
      enableHiding: false,
    },

    {
      id: "budget",
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("budget")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("time")}
        </div>
      ),
      enableHiding: false,
    },
  ];
  useEffect(() => {
    // Filtering projects based on the selected countries if filterStates.markets is not empty
    if (filterStates?.markets && filterStates?.markets?.length > 0) {
      const filteredProjects = staffRpSummaryData?.data?.projects?.filter(
        (project: IProject) =>
          filterStates?.markets.split(",").includes(project?.market)
      );
      const filteredAndSearchedProjects = filteredProjects?.filter(
        (project: IProject) =>
          !searchText ||
          project?.title?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filteredAndSearchedProjects || []);
    } else {
      // If filterStates?.markets is empty, display all projects
      const filteredAndSearchedProjects =
        staffRpSummaryData?.data?.projects?.filter(
          (project: IProject) =>
            !searchText ||
            project?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
      setFilteredProjects(filteredAndSearchedProjects || []);
    }
  }, [staffRpSummaryData, filterStates, searchText]);
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6 ">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">Project Summary</h5>
            <Button variant={"white"} size={"sm"}>
              View Full List
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* <FilterSearch setSearchText={setSearchText} /> */}
            <Select onValueChange={(value) => setSearchText(value)}>
              <SelectTrigger className="min-w-[240px]">
                <SelectValue placeholder="All Project" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-auto">
                <SelectItem key={"all"} value={"all"}>
                  All Project
                </SelectItem>
                <SelectItem key={"client"} value={"all"}>
                  Client Project
                </SelectItem>
                <SelectItem key={"in_house"} value={"all"}>
                  In-House Project
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-1 mb-3">
          {filterConfig?.markets?.map((market: any) => (
            <CountryButtonCheckbox
              label={market?.title}
              value={market?.title}
              key={market?.title}
              checked={filterStates?.markets
                ?.split(",")
                .includes(market?.title)}
              onCheckedChange={handleCheckboxChange("markets", market?.title)}
              flagImageUrl={market.flag}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="col-span-3">
            <DataTable
              loading={staffDataLoading}
              height={"max-h-[500px]"}
              headerSticky
              border={true}
              columns={columns}
              data={filteredProjects || []}
            />
          </div>

          <div className="grid gap-4 grid-cols-2 col-span-2">
            <ReactECharts
              className="min-h-[300px]"
              option={option}
              opts={{ renderer: "svg" }}
            />
            <ReactECharts
              className="min-h-[300px]"
              option={option}
              opts={{ renderer: "svg" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffsProjectSummary;
