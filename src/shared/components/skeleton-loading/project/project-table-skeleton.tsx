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
import { useRouter } from "next/router";

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

const requiredRolesColumns = [
  "S.N",
  "Project Info",
  "Status",
  "Project Lead",
  "Deadline",
  "Task Status",
  "Project Health",
  "Needed Roles",
  "Potential Members",
];

const ProjectTableSkeleton = () => {
  const router = useRouter();

  const isRequiredRoles = router?.pathname === "/project-required-roles";
  return (
    <>
      <div className="overflow-hidden overflow-x-auto rounded-md">
        <Table className="rounded-md bg-light-white">
          <TableHeader>
            <TableRow>
              {isRequiredRoles
                ? requiredRolesColumns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))
                : columns.map((column) => (
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
                  <Skeleton className="mb-2 w-full h-2" />
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
                {isRequiredRoles ? (
                  <TableCell>
                    <Skeleton className="w-[110px] h-3 mb-2" />
                    <Skeleton className="mb-2 w-full h-2" />
                    <Skeleton className="h-3 w-[130px] mb-2" />
                    <Skeleton className="h-3 w-[130px] mb-2" />
                  </TableCell>
                ) : (
                  <TableCell>
                    <Skeleton className="w-[110px] h-3 mb-2" />
                  </TableCell>
                )}

                {!isRequiredRoles && (
                  <TableCell>
                    <Skeleton className="w-[110px] h-3 mb-2" />
                    <Skeleton className="mb-2 w-full h-2" />
                    <Skeleton className="h-3 w-[130px] mb-2" />
                    <Skeleton className="h-3 w-[130px] mb-2" />
                  </TableCell>
                )}

                {isRequiredRoles ? (
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <Skeleton className="mb-2 w-4 h-4 rounded-full" />
                    </div>
                  </TableCell>
                ) : (
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <Skeleton className="mb-2 w-4 h-4 rounded-full" />
                      <Skeleton className="mb-2 w-4 h-4 rounded-full" />
                      <Skeleton className="mb-2 w-4 h-4 rounded-full" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProjectTableSkeleton;
