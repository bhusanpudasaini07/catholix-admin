import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

const useStoryDetail = () => {
  // STATES
  const [roleWiseOption, setRoleWiseOption] = useState("utilization");
  const [taskListFilter, setTaskListFilter] = useState("all");

  const roleWiseSankeyOption = {
    series: {
      type: "sankey",
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      data: [
        {
          name: "a",
        },
        {
          name: "b",
        },
        {
          name: "a1",
        },
        {
          name: "a2",
        },
        {
          name: "b1",
        },
        {
          name: "c",
        },
      ],
      links: [
        {
          source: "a",
          target: "a1",
          value: 5,
        },
        {
          source: "a",
          target: "a2",
          value: 3,
        },
        {
          source: "b",
          target: "b1",
          value: 8,
        },
        {
          source: "a",
          target: "b1",
          value: 3,
        },
        {
          source: "b1",
          target: "a1",
          value: 1,
        },
        {
          source: "b1",
          target: "c",
          value: 2,
        },
      ],
    },
  };

  // Role wise table column
  const roleWiseConsumptionColumn: ColumnDef<any>[] = [
    // Team member
    {
      accessorKey: "name",
      header: "Team Member",
      cell: ({ row }) => (
        <Link
          href={`/staffs/${row?.original?.username}`}
          className="font-medium text-primary hover:text-blue-700"
        >
          {row?.getValue("name")}
        </Link>
      ),
    },
    // Role
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <p className="font-medium">{row?.getValue("role")}</p>,
    },
    // Budget Consumed
    {
      accessorKey: "rp",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Budget Consumed</p>
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
      cell: ({ row }) => <p className="font-medium">{row?.getValue("rp")}</p>,
    },
    // Budget Consumed
    {
      accessorKey: "utilization",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Budget Utilization</p>
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
        <p className="font-medium">{row?.getValue("utilization")}%</p>
      ),
    },
  ];

  const taskListColumn: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-zinc-700">
            {moment(row?.getValue("date")).format("YYYY-MM-DD")}
          </p>
          <p className="text-xs text-zinc-600">
            {moment(row?.getValue("date")).format("HH:mm")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <Link href={"/"} className="text-primary hover:text-blue-700">
          {row?.getValue("title")}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={"outline"}
          className={`  ${
            row?.getValue("status") === "In Progress" &&
            " border-blue-500 bg-blue-50 text-blue-500 "
          }
          ${
            row?.getValue("status") === "Client Support" &&
            " border-orange-500 bg-orange-50 text-orange-500"
          }
          ${
            row?.getValue("status") === "On Hold" &&
            " border-red-500 bg-red-50 text-red-500 "
          }
        ${
          ["Closed", "Delivered"].includes(row?.getValue("status")!) &&
          " border-green-500 bg-green-50 text-green-500 "
        }
        ${
          row?.getValue("status") === "Not Started" &&
          " border-zinc-500 bg-zinc-50 text-zinc-500"
        }capitalize rounded-md border`}
        >
          {row?.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "assigned",
      header: "Assigned Member",
      cell: ({ row }) => (
        <p className="font-medium">{row?.getValue("assigned")}</p>
      ),
    },
    {
      accessorKey: "commits",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Commits</p>
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
        <p className="font-medium">{row?.getValue("commits")}</p>
      ),
    },
    {
      accessorKey: "estimated_time",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Estimated Time</p>
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
        <p className="font-medium">{row?.getValue("estimated_time")}</p>
      ),
    },
    {
      accessorKey: "spent_time",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Time Spent</p>
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
        <p className="font-medium">{row?.getValue("spent_time")}</p>
      ),
    },
  ];

  return {
    // STATES
    roleWiseOption,
    setRoleWiseOption,
    taskListFilter,
    setTaskListFilter,

    // CHARTS
    roleWiseSankeyOption,

    // DATA TABLE
    roleWiseConsumptionColumn,
    taskListColumn,
  };
};

export default useStoryDetail;
