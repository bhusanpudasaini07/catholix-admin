# Report Page Generation

The following steps are needed to create a new report page in our next js application:

## Steps

### 1. Create a new page

Create a new page in the `pages` directory.
Example: `src/pages/{moduleName}/index.tsx`

```
import { ExternalLink, ListRestart, Search } from "lucide-react";
import React from "react";

import {use{ModuleName}Hook} from "@/hooks/{moduleName}/use{ModuleName}.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import PageHeader from "@/shared/components/page-header";
import RegionalFilter from "@/shared/components/regional-filter";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "../_app";
import FullTableSkeleton from "@/shared/components/skeleton-loading/dynamic-header-table-skeleton";

const {ModuleName}: NextPageWithLayout = () => {
  const {
    columns,
    perPage,
    perPageHandler,
    pageChangeHandler,
    searchHandler,
    resetHandler,
    regionId,
    stateId,
    setRegionId,
    setStateId,
    lga,
    setLga,
    dateRange,
    setDateRange,
    {ModuleName}Data,
    {ModuleName}Loading,
    exportMutation,
    exportHandler,
  } = use{ModuleName}Hook();
  return (
    <div className="flex flex-col px-8 py-6 h-screen">
      <PageHeader title={moduleName}>
        {/* Filters */}
        <div className="flex gap-2 items-end px-5 py-2 rounded-lg bg-zinc-200">
          <div className="max-w-[250px]">
            <Label className="block mb-1.5 font-medium">
              Select Date Range
            </Label>
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
              disabled
            />
          </div>

          <RegionalFilter
            regionId={regionId}
            stateId={stateId}
            setRegionId={setRegionId}
            setStateId={setStateId}
            lga={lga}
            setLga={setLga}
            searchTriggerHandler={searchHandler}
          />

          {/* reset */}
          <Button
            variant={"white"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={resetHandler}
          >
            <ListRestart size={20} />
            Reset
          </Button>
          {/* Search */}
          <Button
            variant={"primary"}
            size={"sm"}
            className="gap-1 px-4 py-2 h-9"
            onClick={searchHandler}
          >
            <Search size={20} />
            Search
          </Button>
        </div>
      </PageHeader>

      <div className="overflow-y-auto grow no-scrollbar">
        {{moduleName}Loading ? (
          <FullTableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={{moudleName}Data?.data?.data?.results || []}
            headerSticky
            border
            height="max-h-[calc(100vh-230px)]"
            loading={{moduleName}Loading}
            loadingDataNum={10}
          />
        )}
        <div className="flex justify-between items-center">
          <Button
            variant={"white"}
            size={"md"}
            onClick={exportHandler}
            disabled={
              exportMutation.isLoading ||
              {moduleName}Data?.data?.data?.results.length === 0 ||
              {moduleName}Loading
            }
            className="py-2.5 h-auto text-sm gap-2 mt-6 "
          >
            <ExternalLink size={20} />
            Export
          </Button>
          <DataTablePagination
            currentPage={{moduleName}Data?.data?.data?.currentPage || 1}
            pageChange={pageChangeHandler}
            totalPages={{moduleName}Data?.data?.data?.totalPages || 1}
            perPage={perPage}
            setPerPage={perPageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default {ModuleName};

export const getStaticProps = getI18nProps;

{ModuleName}.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
```

### 2. Create a new hook

Create a new file in the `hooks` directory.
Example: `src/hooks/{moduleName}/use{ModuleName}.hook.tsx`

```
import { IRegionProps } from "@/interface/common-interface";
**import required interfaces
import { getRegions } from "@/services/admin/admin-service";
** import required services
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";

interface IProps {
  data: I{ModuleName};
}

const use{ModuleName}Hook = () => {
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

  const { data: {moduleName}Data, isLoading: {moduleName}Loading } =
    useQuery<IProps>({
      queryKey: ["{moduleName}", searchTrigger, page, perPage],
      queryFn: async () => {
        if (regionId && stateId) {
          return await get{ModuleName}(
            page,
            perPage,
            moment(dateRange.from).format("YYYY-MM-DD"),
            moment(dateRange.to).format("YYYY-MM-DD"),
            regionId,
            stateId,
            lga.length > 0 ? lga.join(",") : "all"
          );
        }
      },
    });

  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
  };

  // Functions
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
        searchHandler && searchHandler();
      } else {
        setRegionId("all");
        setStateId("all");
        setLga([]);
      }
    }

    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const exportMutation = useMutation({
    mutationFn: () =>
      export{ModuleName}(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD"),
        regionId,
        stateId,
        lga.length > 0 ? lga.join(",") : "all"
      ),

    onSuccess: (data) => {
      const fileName = `{moduleName}_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  //   Columns
  const generateColumns = (): ColumnDef<I{ModuleName}Response>[] => {
    const columns: ColumnDef<I{ModuleName}Response>[] = [
      {
        id: "sn",
        header: "S.N",
        cell: ({ row }) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
    ];

    if (conversionRateData?.data?.headers) {
      conversionRateData?.data?.headers?.forEach(
        (header: I{ModuleName}Header) => {
          columns.push({
            id: header?.access_key,
            accessorKey: header?.access_key,
            header: header?.display_name,
            cell: ({ row }: any) => {
              const value = row?.original?.[header?.access_key];
              if (
                header?.type === "number" &&
                header?.access_key === "conversion_rate"
              ) {
                return <Badge variant="warning">{value}%</Badge>;
              }
              return <p>{value || "-"}</p>;
            },
          });
        }
      );
    }

    return columns;
  };

  const columns = generateColumns();

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

    // API
    {moduleName}Data,
    {moduleName}Loading,
    exportMutation,
  };
};

export default use{ModuleName}Hook;

```

### 3. Create a new service

Create a new file in the `services` directory.
Example: `src/services/{moduleName}/service.ts`

Create service according to provided endpoints and query params or payload.
Take `src/services/conversion-rate/conversion-rate-service.ts` as an reference.

```
import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const get{ModuleName} = async (
  page: number,
  pageSize: number,
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/{apiEndpoint}", httpMethods.GET, {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
      region,
      state,
      lga,
      ...(searchTerm && { searchTerm }),
    },
  });
};

const export{ModuleName} = async (
  startDate: string,
  endDate: string,
  region: string,
  state: string,
  lga: string,
  searchTerm?: string
) => {
  return httpRequest("/{apiEndpoint}/export", httpMethods.GET, {
    params: {
      startDate,
      endDate,
      region,
      state,
      lga,
      ...(searchTerm && { searchTerm }),
    },
  });
};
```

### 4. Create a new interface

Create a new file in the `interface` directory.
Example: `src/interface/{moduleName}/interface.ts`

Create interface according to provided data.
Take `src/interface/conversion-rate/conversion-rate-interface.ts` as an example.
Use the same format that has been used in this file.

```
export interface I{ModuleName}Header {
  access_key: string;
  display_name: string;
  type: string;
}

export interface I{ModuleName} {
  headers: I{ModuleName}Header[];
  data: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    next: number;
    results: I{ModuleName}Response[];
  };
}
export interface I{ModuleName}Response {
[key: string]: string | number;
}

export interface I{ModuleName}Props {
  data: {
    data: I{ModuleName};
  };
}
```
