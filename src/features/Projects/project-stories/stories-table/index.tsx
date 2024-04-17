import React from "react";

import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import FilterSearch from "@/shared/components/filter-search";

const ProjectStoriesTable = () => {
  const {
    storiesDetailsColumns,
    projectStories,
    isLoading,
    perPage,
    setPerPage,
    handleSearch,
  } = useProjectStories();
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <p className="text-lg font-medium text-zinc-700">Stories</p>
          <FilterSearch setSearchText={handleSearch} />
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
