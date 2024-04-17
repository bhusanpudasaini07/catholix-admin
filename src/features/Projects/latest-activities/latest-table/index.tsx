import React from "react";

import useLatestActivities from "@/hooks/project/detail/useLatestActivities.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import DateRangeFilter from "@/shared/components/date-range-filter";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const LatestActivityTable = () => {
  const {
    detailsColumn,
    latestActivities,
    isLoading,
    perPage,
    setPerPage,
    setPageNumber,
    handlePageChange,
    filterSelectOptions,
    setFilterType,
    dateRange,
    changeDateRange,
    dateRangeOpen,
    setDateRangeOpen,
  } = useLatestActivities();
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-10">
            <p className="text-lg font-medium text-zinc-700">
              Latest Activities
            </p>
            <div className="flex items-center gap-4 w-[30%]">
              <DateRangeFilter
                dateRangeOpen={dateRangeOpen}
                setDateRangeOpen={setDateRangeOpen}
                setDateRange={changeDateRange}
                dateRange={dateRange}
              />
              {/* Filter by type */}
              <Select
                defaultValue="all"
                onValueChange={(e) => {
                  setFilterType(e);
                  setPageNumber(1);
                }}
              >
                <SelectTrigger className="max-w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent align="end">
                  {filterSelectOptions?.map((filter) => (
                    <SelectItem key={filter?.value} value={filter?.value}>
                      {filter?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DataTable
            columns={detailsColumn}
            border={true}
            loading={isLoading}
            headerSticky={true}
            height="max-h-[62vh]"
            data={latestActivities?.data?.activities ?? []}
          />
          <DataTablePagination
            currentPage={latestActivities?.pagination?.page!}
            totalPages={latestActivities?.pagination?.total_page!}
            pageChange={handlePageChange}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default LatestActivityTable;
