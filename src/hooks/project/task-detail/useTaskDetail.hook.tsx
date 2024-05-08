import {
  ChevronDown,
  ChevronUp,
  Clock,
  Hourglass,
  Lock,
  PencilLine,
  Pin,
  Tag,
  Timer,
  TrendingDown,
  Unlock,
  Users,
} from "lucide-react";
import moment from "moment";
import React, { useState } from "react";

import { IActivitiesDetail } from "@/interface/project-interface";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

const useTaskDetail = () => {
  // STATES
  const [filterType, setFilterType] = useState("all");

  //   Overview data
  const taskSummaryData = [
    {
      id: "rp",
      value: 2.27,
      title: "Total Budget",
      icon: <TrendingDown size={24} stroke={"#71717A"} />,
    },
    {
      id: "tspent",
      value: "30M",
      title: "Total Time Spent",
      icon: <Timer size={24} stroke={"#71717A"} />,
    },
    {
      id: "estimate",
      value: "3H 0M",
      title: "Total Estimate",
      icon: <Hourglass size={24} stroke={"#71717A"} />,
    },
  ];

  //   For filter of activity table
  const filterSelectOptions = [
    { value: "all", title: "All" },
    { value: "new_issue", title: "New Task" },
    { value: "labels", title: "Label Update" },
    { value: "title", title: "Title Update" },
    { value: "estimate", title: "Estimate Update" },
    { value: "assignees", title: "Asignee Update" },
    { value: "close", title: "Task Close" },
    { value: "reopen", title: "Task Reopened" },
    { value: "timelog", title: "Timelog Added" },
  ];

  // to show different text and icon in different activity types
  const activityTye = (change_type: string) => {
    let changeText: string = "";
    let icon: any;
    switch (change_type) {
      case "new_issue":
        changeText = "New Task";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-blue-500 rounded-full">
            <Pin size={16} />
          </div>
        );
        break;

      case "labels":
        changeText = "Label Update";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Tag size={16} />{" "}
          </div>
        );
        break;

      case "title":
        changeText = "Title Update";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-red-500 rounded-full">
            <PencilLine size={16} />
          </div>
        );
        break;

      case "estimate":
        changeText = "Estimate Update";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Timer size={16} />
          </div>
        );
        break;

      case "assignees":
        changeText = "Asignee Update";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-red-500 rounded-full">
            <Users size={16} />
          </div>
        );
        break;

      case "close":
        changeText = "Task Close";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white rounded-full bg-zinc-500">
            <Lock size={16} />
          </div>
        );
        break;

      case "reopen":
        changeText = "Task Reopened";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-green-500 rounded-full">
            <Unlock size={16} />
          </div>
        );
        break;

      case "timelog":
        changeText = "Timelog Added";
        icon = (
          <div className="flex justify-center items-center w-6 h-6 text-white bg-cyan-500 rounded-full">
            <Clock size={16} />
          </div>
        );
        break;
    }
    return { changeText, icon };
  };

  // activity page column
  const activityColumn: ColumnDef<IActivitiesDetail>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-zinc-700">
            {moment(row?.original?.date).format("YYYY-MM-DD")}
          </p>
          <p className="text-xs text-zinc-600">
            {moment(row?.original?.date).format("hh:mm:ss")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // Activity
    {
      id: "activity",
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => {
        const { changeText, icon } = activityTye(row?.original?.change_type);
        return (
          <div>
            <div className="flex gap-2 items-center">
              {icon}
              <div>
                <span className="text-sm font-medium text-zinc-700">
                  {changeText}
                </span>
              </div>
            </div>
          </div>
        );
      },
      enableHiding: false,
    },
    // Detail
    {
      id: "detail",
      accessorKey: "detail",
      header: "Detail",
      cell: ({ row }) => {
        return (
          <div>
            <p className="text-sm font-medium text-zinc-500">
              By: {row?.original?.by ?? "N/A"}
            </p>
          </div>
        );
      },
      enableHiding: false,
    },
  ];

  //   individual consumption column
  const individualConsumptionColumn: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Team Member",
      cell: ({ row }) => <p className="font-medium">{row?.getValue("name")}</p>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <p className="font-medium">{row?.getValue("role")}</p>,
    },
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
    {
      accessorKey: "utlization",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Utilization</p>
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
        <p className="font-medium">{row?.getValue("utlization")}</p>
      ),
    },
  ];

  //   Time log column
  const timeLogColumn: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Team Member",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-zinc-700">
            {moment(row?.original?.date).format("YYYY-MM-DD")}
          </p>
          <p className="text-xs text-zinc-600">
            {moment(row?.original?.date).format("hh:mm:ss")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "By",
      cell: ({ row }) => <p className="font-medium">{row?.getValue("name")}</p>,
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Time</p>
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
      cell: ({ row }) => <p className="font-medium">{row?.getValue("time")}</p>,
    },
    {
      accessorKey: "rp",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Budget</p>
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
  ];
  return {
    // STATES
    filterType,
    setFilterType,

    // Card DATAs
    taskSummaryData,
    filterSelectOptions,

    // Column
    activityColumn,
    individualConsumptionColumn,
    timeLogColumn,
  };
};

export default useTaskDetail;
