import React from "react";

import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import FilterSearch from "@/shared/components/filter-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";

const ProjectStoriesTable = () => {
  const {
    storiesDetailsColumns,
    projectStories,
    isLoading,
    perPage,
    searchText,
    setPerPage,
    handleSearch,
    status,
    setStatus,
    clearFilters,
  } = useProjectStories();
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Stories</p>
          <div className="flex gap-4 justify-end items-center w-full">
            <Button
              size={"sm"}
              onClick={clearFilters}
              className="h-10"
              variant={"white"}
            >
              Clear Filters
            </Button>
            <FilterSearch
              searchText={searchText}
              setSearchText={handleSearch}
            />
            <Select value={status} onValueChange={(e) => setStatus(e)}>
              <SelectTrigger className="max-w-[250px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable
          border={true}
          columns={storiesDetailsColumns}
          loading={isLoading}
          data={projectStories?.data.slice(0, perPage) ?? []}
        />
        {perPage < projectStories?.data?.length && (
          <p
            onClick={() => setPerPage(perPage + 10)}
            className="py-4 text-sm font-medium text-center cursor-pointer text-zinc-700"
          >
            Load More
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStoriesTable;
