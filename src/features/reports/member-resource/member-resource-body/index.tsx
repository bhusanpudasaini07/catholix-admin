import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import FilterSearch from "@/shared/components/filter-search";

const MemberResourceBody = () => {
  const columns: ColumnDef<any>[] = [
    {
      header: "S. No.",
      accessorKey: "sn",
      id: "sn",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="text-sm font-medium text-zinc-700 ps-3">
          {row.getValue("sn")}
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      id: "role",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("role")}
        </div>
      ),
    },
    {
      accessorKey: "commercial_time",
      id: "commercial_time",
      enableHiding: true,
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Commercial Time</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("commercial_time")}
        </div>
      ),
    },
    {
      accessorKey: "inHouseTime",
      id: "inHouseTime",
      enableHiding: true,
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>In-House Time</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("inHouseTime")}
        </div>
      ),
    },
    {
      accessorKey: "totalTime",
      id: "totalTime",
      enableHiding: true,

      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Total Time</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("totalTime")}
        </div>
      ),
    },
    {
      accessorKey: "unusedTime",
      id: "unusedTime",
      enableHiding: true,

      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Unused Time</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("unusedTime")}
        </div>
      ),
    },
    {
      accessorKey: "usedPercentage",
      id: "usedPercentage",
      enableHiding: true,
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Used Percentage</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("usedPercentage")}
        </div>
      ),
    },
  ];

  const data = [
    {
      sn: 1,
      memberInfo: "John Doe",
      role: "Developer",
      commercial_time: 120,
      inHouseTime: 80,
      totalTime: 200,
      unusedTime: 50,
      usedPercentage: "75%",
    },
    {
      sn: 2,
      memberInfo: "Jane Smith",
      role: "Designer",
      commercial_time: 100,
      inHouseTime: 60,
      totalTime: 160,
      unusedTime: 40,
      usedPercentage: "80%",
    },
  ];
  return (
    <div className="p-6">
      <Card>
        <CardContent>
          {" "}
          <DataTable
            height={"max-h-[500px]"}
            headerSticky
            border={true}
            columns={columns}
            data={data}
            showManageColumn
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberResourceBody;
