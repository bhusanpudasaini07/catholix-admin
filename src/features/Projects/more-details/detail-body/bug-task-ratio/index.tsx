import { IProjectTaskBugRatio } from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface IProps {
  columns: ColumnDef<IProjectTaskBugRatio>[];
  data: IProjectTaskBugRatio[];
  loading: boolean;
}

const BugTaskRatio = ({ data, columns, loading }: IProps) => {
  return (
    <div className="card">
      <div className="flex items-center justify-start gap-3 mb-4">
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
