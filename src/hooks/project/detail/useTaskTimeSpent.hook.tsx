import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import moment from "moment";

import { useDebounce } from "@/hooks/debounce.hooks";
import { ITimeLogs } from "@/interface/project-interface";
import { ILogEntry } from "@/interface/project-interface";

import { getTimeLogs } from "@/services/project/project-service";

import { Badge } from "@/shared/components/ui/badge";
import { calculateTimeLog } from "@/shared/utils/rp-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import { Edit } from "lucide-react";

const useTaskTimeSpent = () => {
  const router = useRouter();
  const { code } = router?.query;

  //   STATES
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const debouncedSearchValue = useDebounce(searchText, 300);

  const { data: timeLogs, isLoading: timeLogLoading } = useQuery<ITimeLogs>({
    queryFn: async () => {
      if (code) {
        const response = await getTimeLogs(
          code,
          searchText,
          pageNumber,
          perPage
        );
        return response;
      }
    },
    queryKey: ["timeLogs", code, debouncedSearchValue, pageNumber],
  });

  const columns: ColumnDef<ILogEntry>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <p>{moment(row.getValue("date")).format("YYYY-MM-DD")}</p>
          <p>{moment(row.getValue("date")).format("HH:mm:ss")}</p>
        </div>
      ),
      enableHiding: false,
    },
    // Member
    {
      id: "member",
      accessorKey: "member",
      header: "Member",
      cell: ({ row }) => (
        <div className="w-[150px]">
          <Link
            href={`/staffs/${row?.original?.log_by?.username}`}
            className="font-semibold text-primary hover:text-blue-600"
          >
            {row?.original?.log_by?.fullname}
          </Link>
          <p className="text-xs text-zinc-500">
            {row?.original?.log_by?.role_name}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // Task
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div>
          <Link
            className="text-base font-medium text-primary hover:text-blue-700"
            href={row?.original?.task_url}
            target="_blank"
          >
            {row?.original?.title}
          </Link>
          <div className="flex flex-wrap items-center gap-3 my-2">
            {row?.original?.label.map((item, index) => (
              <Badge
                style={{
                  backgroundColor: `${item?.color}20`,
                  color: item?.color,
                  borderColor: item?.color,
                }}
                key={index}
                className="py-0.5 rounded-md "
              >
                {item?.title}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-zinc-700">
            Author: {row?.original?.author?.name}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // Time
    {
      id: "time",
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("time"));
        return <div className="w-[100px]">{`${hours}H ${minutes}M`}</div>;
      },
    },
    // RP
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    // Action
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger>
            {/* <Button
              variant={"ghost"}
              className="h-auto p-0 hover:bg-transparent"
            > */}
            <Edit size={20} className="stroke-zinc-700 hover:stroke-primary" />
            {/* </Button> */}
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      ),
      enableHiding: false,
    },
  ];

  const timeConusmedOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  return {
    timeLogLoading,
    timeLogs,
    searchText,
    setSearchText,
    columns,
    perPage,
    setPerPage,
    setPageNumber,
    timeConusmedOption,
  };
};

export default useTaskTimeSpent;
