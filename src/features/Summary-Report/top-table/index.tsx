import { DataTable } from "@/shared/components/data-table/data-table";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

interface SummaryTopTableProps {
  data: any;
  title: string;
  columns: ColumnDef<any>[];
  loading: boolean;
}

const SummaryTopTable = ({
  data,
  title,
  columns,
  loading,
}: SummaryTopTableProps) => {
  return (
    <div>
      <p className="-mb-2 font-medium">{title}</p>

      <DataTable
        data={data}
        columns={columns}
        border
        headerBgClass="bg-gray-100"
        loading={loading}
        loadingDataNum={5}
        headerSticky
        height="max-h-[350px]"
        lottieHeight={150}
      />
    </div>
  );
};

export default SummaryTopTable;
