import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import ProjectTableSkeleton from "@/shared/components/skeleton-loading/project/project-table-skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import MainLayout from "@/shared/main-layout";
import { changeDateToMonthYear } from "@/shared/utils/date-utils";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import {
  calculateDeadlinePercentValue,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ProjectRequiredRolePage = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fakeData = [
    {
      sn: "01",
      project_title: "Project A",
      status: "In Progress",
      project_lead: {
        fullname: "John Doe",
        in_progress_project_count: 3,
        in_support_project_count: 2,
      },
      deadline: "2024-05-15",
      task: {
        all_task_count: 10,
        closed_task_count: 7,
        open_task_count: 3,
      },
      project_health: "B+",
      needed_roles: "Senior UI/UX Designer",
      potential_mem: "Alice Carol",
    },
    // Add more fake data entries as needed
  ];
  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => <div>{row?.getValue("sn")}</div>,
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
            <h3 className="text-orange-500 text-[48px] font-bold mb-4">
              {row?.getValue("project_health")}
            </h3>
            <p>Project Health</p>
          </div>
        );
      },
      enableHiding: true,
    },
    // Needed Roles
    {
      id: "needed_roles",
      accessorKey: "needed_roles",
      header: "Needed Roles",
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap">
            {row?.getValue("needed_roles")}
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
            <Button variant={"outline"} className="p-2 whitespace-nowrap">
              Show More Suggestions
            </Button>
          </div>
        );
      },
      enableHiding: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Project Required Roles
          </h1>
          <p className="text-base text-zinc-500">
            List of Projects to increase the efficiency of the project.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 justify-end items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <FilterSearch searchText={searchText} setSearchText={setSearchText} />

        {/* <Button variant={"white"} size={"sm"} className="gap-2">
          <Filter size={15} />
          Filter
        </Button> */}
      </div>

      <div className="p-6 font-medium text-zinc-700">
        {isLoading ? (
          <ProjectTableSkeleton />
        ) : (
          <DataTable
            height="max-h-[calc(100vh-320px)]"
            columns={columns}
            headerSticky={true}
            data={fakeData}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectRequiredRolePage;

export const getStaticProps = getI18nProps;

ProjectRequiredRolePage.getLayout = (page: any) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
