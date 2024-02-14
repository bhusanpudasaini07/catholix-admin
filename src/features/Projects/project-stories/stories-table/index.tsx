import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const ProjectStoriesTable = () => {
  const {
    storiesDetailsColumns,
    projectStories,
    isLoading,
    perPage,
    setPerPage,
  } = useProjectStories();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">Stories</p>
        </div>
        <DataTable
          border={true}
          columns={storiesDetailsColumns}
          loading={isLoading}
          data={projectStories?.data.slice(0, perPage) ?? []}
        />
        <p
          onClick={() => setPerPage(perPage + 10)}
          className="py-4 text-sm font-medium text-center cursor-pointer text-zinc-700"
        >
          Load More
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectStoriesTable;
