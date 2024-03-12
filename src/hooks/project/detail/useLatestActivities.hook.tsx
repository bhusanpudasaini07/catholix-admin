import { Clock, Lock, PencilLine, Pin, Tag, Timer, Unlock, Users } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from 'react-query';

import { IActivitiesDetail, IProjectActivities } from '@/interface/project-interface';
import { getProjectLatestActivities } from '@/services/project/project-service';
import { ColumnDef } from '@tanstack/react-table';

const useLatestActivities = () => {
  const {
    query: { code },
  } = useRouter();

  // STATES
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [filterType, setFilterType] = useState("all");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { data: latestActivities, isLoading } = useQuery<IProjectActivities>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectLatestActivities(
          code,
          pageNumber,
          perPage,
          filterType !== "all" ? filterType : "",
          dateRange?.from || dateRange?.to !== undefined
            ? `${moment(dateRange?.from).format("YYYY-MM-DD")} - ${moment(
                dateRange?.to
              ).format("YYYY-MM-DD")}`
            : ""
        );
        return response;
      }
    },
    queryKey: [
      "latestActivities",
      code,
      pageNumber,
      perPage,
      filterType,
      dateRange?.to,
    ],
  });

  // for pagination change
  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  // to show different text and icon in different activity types
  const activityTye = (change_type: string) => {
    let changeText: string = "";
    let icon: any;
    switch (change_type) {
      case "new_issue":
        changeText = "New Task";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
            <Pin size={16} />
          </div>
        );
        break;

      case "labels":
        changeText = "Label Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Tag size={16} />{" "}
          </div>
        );
        break;

      case "title":
        changeText = "Title Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
            <PencilLine size={16} />
          </div>
        );
        break;

      case "estimate":
        changeText = "Estimate Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Timer size={16} />
          </div>
        );
        break;

      case "assignees":
        changeText = "Asignee Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
            <Users size={16} />
          </div>
        );
        break;

      case "close":
        changeText = "Task Close";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-zinc-500">
            <Lock size={16} />
          </div>
        );
        break;

      case "reopen":
        changeText = "Task Reopened";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
            <Unlock size={16} />
          </div>
        );
        break;

      case "timelog":
        changeText = "Timelog Added";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-cyan-500">
            <Clock size={16} />
          </div>
        );
        break;
    }
    return { changeText, icon };
  };

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

  // Project Detail page column
  const columns: ColumnDef<IActivitiesDetail>[] = [
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
            <div className="flex items-center gap-2">
              {icon}
              <div>
                <span className="text-xs font-medium text-zinc-700">
                  {changeText}
                </span>
                <p className="text-xs font-medium text-zinc-500">
                  By: {row?.original?.by ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      },
      enableHiding: false,
    },
    // Task
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div className="max-w-[400px]">
          <Link
            href={row?.original?.issue?.url}
            target="_blank"
            className="font-medium text-primary hover:text-blue-700"
          >
            {row?.original?.issue?.title}
          </Link>
        </div>
      ),
      enableHiding: false,
    },
  ];

  // Detail page column
  const detailsColumn: ColumnDef<IActivitiesDetail>[] = [
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
            <div className="flex items-center gap-2">
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
    // Task
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div className="max-w-[600px]">
          <Link
            href={row?.original?.issue?.url}
            target="_blank"
            className="font-medium text-primary hover:text-blue-700"
          >
            {row?.original?.issue?.title}
          </Link>
        </div>
      ),
      enableHiding: false,
    },
  ];

  return {
    columns,
    latestActivities,
    isLoading,
    detailsColumn,
    pageNumber,
    setPageNumber,
    perPage,
    setPerPage,
    handlePageChange,
    filterSelectOptions,
    setFilterType,
    dateRangeOpen,
    setDateRangeOpen,
    dateRange,
    setDateRange,
  };
};

export default useLatestActivities;
