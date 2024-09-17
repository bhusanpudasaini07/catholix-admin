import { IRegionProps } from "@/interface/common-interface";
import { getRegions } from "@/services/admin/admin-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

const usePerformanceReport = () => {
  const { profileData } = useCommonStore();
  // STATES
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [regionId, setRegionId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [lga, setLga] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  // Functions
  const exportHandler = () => {
    console.log("exportHandler");
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const resetHandler = () => {
    if (profileData && profileData?.regionId !== null) {
      const region = regionsList?.data?.regions?.find(
        (region) => region.id === profileData?.regionId
      );
      const state = regionsList?.data?.regions
        ?.find((region) => region?.id === profileData?.regionId)
        ?.states?.find((state) => state?.id === profileData?.stateId);

      const localGovs = state?.localGovernments
        ?.filter((lg) => profileData.localGovId?.includes(lg.id))
        ?.map((lg) => lg.code);

      if (profileData?.regionId !== 0) {
        setRegionId(region?.code!);
        setStateId(profileData?.stateId !== 0 ? state?.code! : "all");
        setLga(localGovs || []);
        searchTriggerHandler && searchTriggerHandler();
      } else {
        setRegionId("all");
        setStateId("all");
        setLga([]);
      }
    }

    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  //   Columns
  const columns: ColumnDef<any>[] = [
    // Fetching
    {
      id: "ranking",
      accessorKey: "ranking",
      header: "Ranking",
      cell: ({ row }) => <p>{row.original.ranking}</p>,
    },
    // Agents
    {
      id: "agents",
      accessorKey: "agents",
      header: "Agents",
      cell: ({ row }) => <p>{row.original.agents}</p>,
    },
    // Dealer
    {
      id: "dealer",
      accessorKey: "dealer",
      header: "Dealer",
      cell: ({ row }) => <p>{row.original.dealer}</p>,
    },
    // Region
    {
      id: "region",
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => <p>{row.original.region}</p>,
    },
    // State
    {
      id: "state",
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => <p>{row.original.state}</p>,
    },
    // LGA
    {
      id: "lga",
      accessorKey: "lga",
      header: "LGA",
      cell: ({ row }) => <p>{row.original.lga}</p>,
    },
    // GA
    {
      id: "ga",
      accessorKey: "ga",
      header: "GA",
      cell: ({ row }) => <p>{row.original.ga}</p>,
    },
    // GC
    {
      id: "gc",
      accessorKey: "gc",
      header: "GC",
      cell: ({ row }) => <p>{row.original.gc}</p>,
    },
    // Conversion Rate
    {
      id: "conversionRate",
      accessorKey: "conversionRate",
      header: "Conversion Rate",
      cell: ({ row }) => (
        <Badge variant={"warning"}>{row.original.conversionRate}%</Badge>
      ),
    },
  ];

  return {
    // STATES
    perPage,
    page,
    setPerPage,
    setPage,
    regionId,
    stateId,
    setRegionId,
    setStateId,
    lga,
    setLga,
    dateRange,
    setDateRange,

    // FUNCTIONS
    exportHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,

    // COLUMNS
    columns,
  };
};

export default usePerformanceReport;
