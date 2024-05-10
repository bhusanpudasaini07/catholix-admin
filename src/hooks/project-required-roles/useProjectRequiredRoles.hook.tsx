import { Filter } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { changeDateToMonthYear } from "@/shared/utils/date-utils";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "react-query";
import { getRequiredRoles } from "@/services/project-required-roles/project-required-roles-service";
import { useDebounce } from "../debounce.hooks";
import {
  IProjectRequiredRoleDetail,
  IProjectRequiredRoles,
} from "@/interface/project-required-role-interface";

const useProjectRequiredRoles = () => {
  // STATES
  const [searchText, setSearchText] = useState("");

  //   for debounced search
  const debouncedSearch = useDebounce(searchText, 300);

  //   For serial Number
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  //   API CALL
  const { data: requiredRolesList, isLoading } =
    useQuery<IProjectRequiredRoles>({
      queryFn: () => getRequiredRoles(searchText),
      queryKey: ["requiredRolesList", debouncedSearch],
    });

  const columns: ColumnDef<IProjectRequiredRoleDetail>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={1} perPage={100} />
      ),
      enableHiding: false,
    },
    // Project Info
    {
      id: "project_title",
      accessorKey: "project_title",
      header: "Project Info",
      cell: ({ row }) => (
        <div className="capitalize w-[240px]">
          <Link
            href={`/projects/${row.original?.code}`}
            className="block mb-1 text-base font-medium transition-all text-zinc-700 hover:text-primary"
          >
            {row.getValue("project_title")}
          </Link>

          <p className="my-1 text-xs text-zinc-600">
            Fiscal year:{" "}
            <span className="font-medium">{row?.original?.fiscal_year}</span>
          </p>
          <p className="mb-2 text-xs text-zinc-600">
            Source:{" "}
            <span className="font-medium"> {row?.original?.source}</span>
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // Status
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div className="w-[120px]">
            <Badge
              variant={"outline"}
              className={`
                  ${
                    row.getValue("status") === "In Progress" &&
                    " border-blue-500 text-blue-500 bg-blue-50 "
                  }
                  ${
                    row.getValue("status") === "Client Support" &&
                    " border-orange-500 text-orange-500 bg-orange-50"
                  }
                  ${
                    row.getValue("status") === "On Hold" &&
                    " border-red-500 text-red-500 bg-red-50"
                  }
                ${
                  ["Closed", "Delivered"].includes(row.getValue("status")) &&
                  " border-green-500 text-green-500 bg-green-50"
                }
                ${
                  row.getValue("status") === "Not Started" &&
                  " border-zinc-500 text-zinc-500 bg-zinc-50"
                }
                 capitalize border rounded-md`}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
      enableHiding: true,
    },
    // Project Lead
    {
      id: "project_lead",
      accessorKey: "project_lead",
      header: "Project Lead",
      cell: ({ row }: any) => {
        const totalProjects =
          parseInt(
            row?.original?.project_lead?.in_progress_project_count ?? 0
          ) +
          parseInt(row?.original?.project_lead?.in_support_project_count ?? 0);
        return (
          <div className="w-[155px]">
            <Tooltip>
              <TooltipTrigger className="text-start">
                <Link
                  href={`/staffs/${row?.original?.project_lead?.username}`}
                  className="text-sm font-medium text-zinc-700 hover:text-primary"
                >
                  {row?.original?.project_lead?.fullname}
                </Link>
                <div className="flex flex-wrap gap-y-1 gap-x-2 mt-1">
                  {Array.from({
                    length:
                      row?.original?.project_lead?.in_progress_project_count ||
                      0,
                  }).map((_, index) => (
                    <div
                      key={`progress-${index}`}
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                    ></div>
                  ))}
                  {Array.from({
                    length:
                      row?.original?.project_lead?.in_support_project_count ||
                      0,
                  }).map((_, index) => (
                    <div
                      key={`support-${index}`}
                      className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                    ></div>
                  ))}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects Involved: {totalProjects} </p>
                <p>
                  Active Projects:{" "}
                  {row?.original?.project_lead?.in_progress_project_count}
                </p>
                <p>
                  Supporting Projects:{" "}
                  {row?.original?.project_lead?.in_support_project_count ?? 0}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
      enableHiding: true,
    },

    // Deadline
    {
      id: "deadline",
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }: any) => {
        const { statusText, daysValue } = showDeadline(
          row?.original?.dates?.deadline
        );
        const { value } = calculateDeadlinePercentValue(
          row?.original?.dates?.start_date,
          row?.original?.dates?.deadline
        );
        const barValue = 100 - value;
        return (
          <div className="w-[200px]">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {["Closed", "Delivered"].includes(row?.original?.status) ? (
                    <p className="mb-1 text-sm font-medium text-green-500">
                      Completed
                    </p>
                  ) : row?.original?.status === "On Hold" ? (
                    <p className="mb-1 text-sm font-medium text-red-500">
                      On Hold
                    </p>
                  ) : (
                    <p className="mb-2 text-sm font-medium text-zinc-700">
                      {statusText}
                    </p>
                  )}
                  <Progress
                    className={cn("h-1.5", {
                      "[&>div]:bg-red-500": barValue >= 90,
                      "[&>div]:bg-orange-500": barValue > 50 && barValue <= 90,
                      "[&>div]:bg-green-500": barValue < 50,
                      "[&>div]:bg-gray-500": barValue === 0,
                    })}
                    value={barValue}
                  />
                  <p className="mt-2 text-xs text-zinc-600">
                    Deadline:{" "}
                    <span className="font-medium">
                      {changeDateToMonthYear(row?.original?.dates?.deadline)}
                    </span>
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent align="center" side="right">
                {}
                <p className="mb-1">
                  Start Date:{" "}
                  {changeDateToMonthYear(row?.original?.dates?.start_date)}
                </p>
                <p>
                  End Date:{" "}
                  {changeDateToMonthYear(row?.original?.dates?.deadline)}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
      enableHiding: true,
    },

    // Task Status
    {
      id: "task_status",
      accessorKey: "task_status",
      header: "Task Status",
      cell: ({ row }) => {
        const barData =
          (Number(row?.original?.task?.closed_task_count) /
            Number(row?.original?.task?.all_task_count)) *
          100;
        return (
          <div className="w-[180px]">
            <p className="text-[15px] text-zinc-800 mb-1">
              Total Task {row?.original?.task?.all_task_count}
            </p>

            <Progress
              className={cn(
                row?.original?.task?.all_task_count === "0"
                  ? "bg-gray-300"
                  : "bg-orange-500",
                "h-1.5 [&>div]:bg-green-500"
              )}
              value={isNaN(barData) ? 0 : barData}
            />

            <div className="mt-2">
              <p className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                <span className="text-green-500">
                  {row?.original?.task?.closed_task_count}
                </span>
                <span className="text-xs font-medium text-zinc-600">
                  Closed Task
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                <span className="text-orange-500">
                  {row?.original?.task?.open_task_count}
                </span>
                <span className="text-xs font-medium text-zinc-600">
                  Open Task
                </span>
              </p>
            </div>
          </div>
        );
      },
      enableHiding: true,
    },

    // Project Health
    {
      id: "project_health",
      accessorKey: "project_health",
      header: "Project Health",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <h3 className="mb-4 text-5xl font-bold text-orange-500">
              {row?.getValue("project_health") ?? "A"}
            </h3>
            <p>Project Health</p>
          </div>
        );
      },
      enableHiding: true,
    },
    // Needed Roles
    {
      id: "required_roles",
      accessorKey: "required_roles",
      header: "Needed Roles",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col w-[220px]">
            {row?.original?.required_roles?.map((role) => (
              <p
                key={role?.id}
                className="py-3 font-medium border-b first:pt-0 last:pb-0 last:border-b-0"
              >
                {role?.name}
              </p>
            ))}
          </div>
        );
      },
      enableHiding: true,
    },
    // Potential Members
    {
      id: "potential_mem",
      accessorKey: "potential_mem",
      header: "Potential Member",
      cell: ({ row }) => {
        return (
          <div className="">
            <p className="pb-2 font-medium">{row?.getValue("potential_mem")}</p>
            <Button
              variant={"outline_tertiary"}
              className="p-2 whitespace-nowrap"
            >
              Recommend Sugesstions
            </Button>
          </div>
        );
      },
      enableHiding: true,
    },
  ];

  return {
    // STATES
    searchText,
    setSearchText,
    //TABLE
    columns,

    // API
    isLoading,
    requiredRolesList,
  };
};

export default useProjectRequiredRoles;
