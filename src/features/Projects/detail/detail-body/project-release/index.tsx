import useProjectReleases from "@/hooks/project/detail/useProjectReleases.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import React from "react";

const ProjectRelease = () => {
  const { columns, projectReleases, isLoading } = useProjectReleases();

  return (
    <div className="mt-6 card !p-6 grow">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center justify-start gap-3">
          <p className="text-lg font-medium text-zinc-700">Project Releases</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-md grow">
        <DataTable
          loading={isLoading}
          border={true}
          columns={columns}
          data={projectReleases?.data ?? []}
        />
      </div>
    </div>
  );
};

export default ProjectRelease;
