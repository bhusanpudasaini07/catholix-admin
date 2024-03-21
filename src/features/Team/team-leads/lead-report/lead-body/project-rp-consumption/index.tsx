import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import {
  IProject,
  IRpStaffSummaryProps,
} from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CountryButtonCheckbox } from "@/shared/components/ui/country-checkbox";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { getConfig } from "@/services/dashboard/dashboard-service";
import Image from "next/image";

const ProjectRpConsumptionTable: FC<IRpStaffSummaryProps> = ({
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

  const { data: filterData, isLoading: filterLoading } = useQuery<any>(
    "getConfig",
    async () => {
      const response = await getConfig();
      return response;
    }
  );
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
      id: "market",
      accessorKey: "market",
      header: "Country",
      cell: ({ row }) => {
        const market = filterData?.data?.markets?.find(
          (item: any) => item?.title === row?.original?.market
        );
        return (
          <div className="flex gap-2 font-medium text-zinc-700">
            {market && (
              <Image
                src={market?.flag}
                height={16}
                width={16}
                style={{ objectFit: "contain" }}
                alt="Flag"
              />
            )}{" "}
            <p>{row?.getValue("market")}</p>
          </div>
        );
      },
      enableHiding: false,
    },
    {
      id: "total_rp",
      accessorKey: "total_rp",
      header: "Budget Consumed",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row?.getValue("total_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {calculatePercentage(row?.original?.total_rp, total).toFixed(2)}%
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
            <h5 className="font-medium text-zinc-700">
              Project Budget Consumption
            </h5>
            <Button
              variant={"white"}
              onClick={() =>
                router?.push(
                  `/team-leads/lead-report/project-rp-consumption?lead_id=${
                    router?.query?.lead_id ? router?.query?.lead_id : "all"
                  }`
                )
              }
              size={"sm"}
            >
              View All
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <FilterSearch setSearchText={setSearchText} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1 mb-3">
          {filterConfig?.markets?.map((market: any, index: number) => (
            <CountryButtonCheckbox
              label={market?.title}
              value={market?.title}
              key={index}
              checked={filterStates?.markets
                ?.split(",")
                .includes(market?.title)}
              onCheckedChange={handleCheckboxChange("markets", market?.title)}
              flagImageUrl={market.flag}
            />
          ))}
        </div>
        <DataTable
          loading={staffDataLoading}
          height={"max-h-[500px]"}
          headerSticky
          border={true}
          columns={columns}
          data={filteredProjects || []}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectRpConsumptionTable;
