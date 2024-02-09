import React from "react";
import { TableCell } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <TableCell className="border-2 border-slate-100">
      <Skeleton className="w-[110px] h-3 mb-2" />
    </TableCell>
  );
};

export default TableSkeleton;
