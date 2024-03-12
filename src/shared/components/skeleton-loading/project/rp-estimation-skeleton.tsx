import React from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '../../data-table/data-table';
import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const RPEstimationSkeleton = () => {
  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
    },
    // Role
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
    },
    // Allocated Days
    {
      id: "days",
      accessorKey: "days",
      header: "Allocated Days",
    },
    // Man Month
    {
      id: "man_month",
      accessorKey: "man_month",
      header: "Man Month",
    },
    // Allocated Units
    {
      id: "rp",
      accessorKey: "rp",
      header: "Allocated Units",
    },
    // % Allocated
    {
      id: "percentage_allocation",
      accessorKey: "percentage_allocation",
      header: "% Allocated",
    },
    // Member
    {
      id: "staff_name",
      accessorKey: "staff_name",
      header: "Member",
    },
    // Allocation Date
    {
      id: "allocation_date",
      accessorKey: "allocation_date",
      header: "Allocation Date",
    },
    // % use
    {
      id: "percentage_use",
      accessorKey: "percentage_use",
      header: "% Use",
    },
    // Allocated RP
    {
      id: "sum_rp",
      accessorKey: "sum_rp",
      header: "Allocated RP",
    },

    // Actions
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
    },
  ];
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-start gap-2">
            <div>
              <Skeleton className="w-40 h-3 mb-3" />
              <Skeleton className="w-20 h-3" />
            </div>
            <Skeleton className="w-16 h-4" />
          </div>
          <Skeleton className="w-20 h-6" />
        </div>

        <DataTable
          data={[]}
          loading={true}
          columns={columns}
          border
          loadingDataNum={8}
        />
      </CardContent>
    </Card>
  );
};

export default RPEstimationSkeleton;
