import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import React from "react";

const BugTaskRatio = () => {
  const columns = [
    {
      id: "platform",
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }: any) => <div>{row?.original?.platform}</div>,
      enableHiding: false,
    },
    {
      id: "regular",
      accessorKey: "regular",
      header: "Regular",
      cell: ({ row }: any) => <div>{row?.original?.regular}</div>,
      enableHiding: false,
    },

    {
      id: "bug",
      accessorKey: "bug",
      header: "Bug",
      cell: ({ row }: any) => <div>{row?.original?.bug}</div>,
      enableHiding: false,
    },
    {
      id: "bug_to_task_ratio",
      accessorKey: "bug_to_task_ratio",
      header: "Bug to Task Ratio",
      cell: ({ row }: any) => <div>{row?.original?.bug_to_task_ratio}</div>,
      enableHiding: false,
    },
  ];

  const data = [
    {
      platform: "API",
      regular: "909.3",
      bug: "0.99",
      bug_to_task_ratio: "3.339",
    },
    // Add more data objects as needed
  ];
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
        // loading={rpLoading}
        data={data}
      />
    </div>
  );
};

export default BugTaskRatio;
