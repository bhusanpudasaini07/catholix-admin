import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import IStaffsProfileProject from "@/interface/staff-profile";
import { IProject } from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CountryButtonCheckbox } from "@/shared/components/ui/country-checkbox";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import { useCommonStore } from "@/store/common-store";
import { Select } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";

import ProjectSummaryGraph from "./project-summary-graph";

interface IChartData {
  name: string;
  value: number;
}

interface IProps {
  projectSummaryLoading: boolean;
  projectSummaryData: any;
}

const StaffsProjectSummary: FC<IProps> = ({
  projectSummaryLoading,
  projectSummaryData,
}) => {
  const { filterConfig } = useCommonStore();
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<
    IStaffsProfileProject[]
  >([]);
  const [filterStates, setFilterStates] = useState({
    markets: "",
  });

  const changeFilterState = (key: keyof typeof filterStates, value: string) => {
    setFilterStates((prev) => ({ ...prev, [key]: value }));
  };

  // Function to handle checkbox change
  const handleCheckboxChange =
    (filterKey: keyof typeof filterStates, value: string) =>
    (isChecked: boolean) => {
      const currentValues = filterStates[filterKey]
        ? filterStates[filterKey].split(",")
        : [];
      const updatedValues = isChecked
        ? [...currentValues, value]
        : currentValues?.filter((v) => v !== value);
      changeFilterState(filterKey, updatedValues.join(","));
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
      id: "name",
      accessorKey: "name",
      header: "Project",
      cell: ({ row }) => (
        <Link
          href={`/projects/${row?.original?.code}`}
          className="text-sm font-semibold text-blue-500"
        >
          {row?.getValue("name")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="w-[120px]">
          <Badge
            variant={"outline"}
            className={`whitespace-nowrap 
        ${
          row.getValue("status") === "In Progress" &&
          " border-blue-500 text-blue-500 bg-blue-50 "
        }
        ${
          row.getValue("status") === "Client Support" &&
          " border-orange-500 text-orange-500 bg-orange-50"
        }
        ${
          row.getValue("status") === "On Hold" &&
          " border-red-500 text-red-500 bg-red-50"
        }
      ${
        ["Closed", "Delivered"].includes(row.getValue("status")) &&
        " border-green-500 text-green-500 bg-green-50"
      }
      ${
        row.getValue("status") === "Not Started" &&
        " border-zinc-500 text-zinc-500 bg-zinc-50"
      }
       capitalize border rounded-md`}
          >
            {row.getValue("status")}
          </Badge>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "market",
      accessorKey: "market",
      header: "Market",
      cell: ({ row }) => (
        <div className="">
          <Image
            src={row?.original?.flag}
            height={16}
            width={16}
            style={{ objectFit: "contain" }}
            alt="Flag"
          />
        </div>
      ),
      enableHiding: false,
    },

    {
      id: "source",
      accessorKey: "source",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("source")}
        </div>
      ),
      enableHiding: false,
    },

    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.getValue("time"));
        return (
          <div className="text-sm font-semibold text-zinc-700">
            {hours ? `${hours}H` : ""}
            {minutes}M
          </div>
        );
      },
      enableHiding: false,
    },
  ];

  const calculateTotalRp = (projects: IStaffsProfileProject[]) => {
    let totalClientRp = 0;
    let totalInHouseRp = 0;

    projects?.forEach((project: IStaffsProfileProject) => {
      if (project?.source === "Client") {
        totalClientRp += parseFloat(String(project?.rp));
      }
      if (project?.source === "In-House") {
        totalInHouseRp += parseFloat(String(project?.rp));
      }
    });
    return { totalClientRp, totalInHouseRp };
  };
  const handleTotalRpCalculation = (
    projects: IStaffsProfileProject
  ): IChartData[] => {
    if (!projects || !Array?.isArray(projects)) {
      return [];
    }

    const { totalClientRp, totalInHouseRp } = calculateTotalRp(projects);

    return [
      { name: "Client Overall", value: totalClientRp },
      { name: "In-House Overall", value: totalInHouseRp },
    ];
  };
  const plotData = filteredProjects?.map((item: IStaffsProfileProject) => ({
    name: item?.name,
    value: item?.rp,
  }));

  useEffect(() => {
    if (
      !projectSummaryData ||
      !projectSummaryData?.data ||
      !projectSummaryData?.data?.projects
    )
      return;

    const projectArray = projectSummaryData?.data?.projects?.map(
      (project: IStaffsProfileProject) => {
        const market = filterConfig?.markets?.find(
          (market: any) => market?.id === project?.market_id
        );
        const marketTitle = market ? market?.title : "Unknown Market";
        const marketFlag = market ? market?.flag : "";
        return {
          ...project,
          market: marketTitle,
          flag: marketFlag,
        };
      }
    );

    // Apply filters based on project type (client or in-house)
    let filteredProjectsByType = projectArray;
    if (searchText?.toLowerCase() !== "all") {
      filteredProjectsByType = projectArray?.filter(
        (project: IStaffsProfileProject) =>
          project?.source?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    }

    // Apply filters based on selected markets
    let filteredProjectsByMarket = filteredProjectsByType;
    if (filterStates?.markets && filterStates?.markets?.length > 0) {
      const selectedMarkets = filterStates?.markets?.split(",");
      filteredProjectsByMarket = filteredProjectsByType?.filter(
        (project: any) => selectedMarkets?.includes(project?.market)
      );
    }

    setFilteredProjects(filteredProjectsByMarket);
  }, [projectSummaryData, filterStates, searchText]);
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
            <Select onValueChange={(value) => setSearchText(value)}>
              <SelectTrigger className="min-w-[240px]">
                <SelectValue placeholder="All Project" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-auto">
                <SelectItem key={"all"} value={"All"}>
                  All Project
                </SelectItem>
                <SelectItem key={"client"} value={"Client"}>
                  Client Project
                </SelectItem>
                <SelectItem key={"in_house"} value={"In-House"}>
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
              flagImageUrl={market?.flag}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div className="col-span-2">
            <DataTable
              loading={projectSummaryLoading}
              height={"max-h-[500px]"}
              headerSticky
              border={true}
              columns={columns}
              data={filteredProjects || []}
            />
          </div>

          <div className="grid gap-2 grid-cols-2 col-span-2">
            <ProjectSummaryGraph
              title="Project Type"
              chartData={handleTotalRpCalculation(
                projectSummaryData?.data?.projects
              )}
            />
            <ProjectSummaryGraph title="Projects" chartData={plotData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffsProjectSummary;
