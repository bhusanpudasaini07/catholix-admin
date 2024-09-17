import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/shared/utils/utils";

const FullTableSkeleton = ({ border = true }) => {
  const columns = Array(8).fill(null);
  const rows = Array(10).fill(null);

  return (
    <div
      className={cn(
        "overflow-x-auto mt-6 rounded-md",
        border && "border-2 border-slate-100"
      )}
    >
      <Table className="rounded-md bg-light-white">
        <TableHeader>
          <TableRow>
            {columns.map((_, index) => (
              <TableHead
                key={index}
                className={cn(
                  "whitespace-nowrap",
                  border &&
                    "border-b-2 border-r-2 border-slate-100 last:border-r-0"
                )}
              >
                <Skeleton className="w-full h-6" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={border ? "[&>*]:last:border-b-0" : ""}
            >
              {columns.map((_, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={
                    border
                      ? "border-r-2 border-b-2 border-slate-100 last:border-r-0"
                      : ""
                  }
                >
                  <Skeleton className="w-full h-4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FullTableSkeleton;
