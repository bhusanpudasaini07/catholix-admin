import React from "react";

import { IProjectTaskBugRatio } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<IProjectTaskBugRatio>[];
  data: IProjectTaskBugRatio[];
  loading: boolean;
}

const BugTaskRatio = ({ data, columns, loading }: IProps) => {
  return (
    <div className="card">
      <div className="flex gap-3 justify-start items-center mb-4">
        <p className="text-lg font-medium text-zinc-700">
          Bugs Vs Task Ratio (Platform/Component)
        </p>
      </div>
      <DataTable
        columns={columns}
        border={true}
        loading={loading}
        data={data}
      />
    </div>
  );
};

export default BugTaskRatio;
