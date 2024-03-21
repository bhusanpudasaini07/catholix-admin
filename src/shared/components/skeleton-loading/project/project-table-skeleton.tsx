import React from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

const columns = [
  "S.N",
  "Project Info",
  "Planned RP",
  "RP",
  "Deadline",
  "Project Lead",
  "Offshore Members",
  "Status",
  "Task Status",
  "Actions",
];

const ProjectTableSkeleton = () => {
  return (
    <>
      <div className="rounded-md">
        <Table className="rounded-md bg-light-white">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-3 h-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[80px] h-3 mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                  <Skeleton className="w-[110px] h-3 mb-2" />
                  <Skeleton className="w-[50px] h-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[80px] h-3 mb-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[80px] h-3 mb-2" />
                  <Skeleton className="w-[110px] h-3 mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[110px] h-3 mb-2" />
                  <Skeleton className="w-full h-2 mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[110px] h-3 mb-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[80px] h-3 mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                  <Skeleton className="w-[110px] h-3 mb-2" />
                  <Skeleton className="w-[50px] h-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[110px] h-3 mb-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[110px] h-3 mb-2" />
                  <Skeleton className="w-full h-2 mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                  <Skeleton className="h-3 w-[130px] mb-2" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 mb-2 rounded-full" />
                    <Skeleton className="w-4 h-4 mb-2 rounded-full" />
                    <Skeleton className="w-4 h-4 mb-2 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProjectTableSkeleton;
