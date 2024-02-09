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
import { Button } from "@/shared/components/ui/button";

import { Edit } from "lucide-react";

const useTaskTimeSpent = () => {
  const router = useRouter();
  const { code } = router?.query;

  //   STATES
  const [searchText, setSearchText] = useState("");

  const debouncedSearchValue = useDebounce(searchText, 300);

  const { data: timeLogs, isLoading: timeLogLoading } = useQuery<ITimeLogs>({
    queryFn: async () => {
      if (code) {
        const response = await getTimeLogs(code, searchText, 1, 10);
        return response;
      }
    },
    queryKey: ["timeLogs", code, debouncedSearchValue],
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
          <p>{row?.original?.log_by?.fullname}</p>
          <p>role</p>
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
            className="text-base text-primary hover:text-blue-700"
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

          <p className="text-sm text-zinc-700">Author: Remain</p>
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
      header: "RP",
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    // Action
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"ghost"}
              className="h-auto p-0 hover:bg-transparent"
            >
              <Edit
                size={20}
                className="stroke-zinc-700 hover:stroke-primary"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      ),
      enableHiding: false,
    },
  ];

  return {
    timeLogLoading,
    timeLogs,
    searchText,
    setSearchText,
    columns,
  };
};

export default useTaskTimeSpent;
