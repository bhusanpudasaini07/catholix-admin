// ROOT
import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import { useQuery } from "react-query";

import { Copy, Plus } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  calculateRpLeft,
  calculateRpSumAndColor,
  changeDateDisplay,
  getRiskStatusBgColor,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { changeDateToMonthYear } from "@/shared/utils/date-utils";

// UI

import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import { IProjectDetail } from "@/interface/project-interface";
import { getProjectList } from "@/services/project/project-service";

// CUSTOM
import FilterSearch from "@/shared/components/filter-search";
import ProjectFilters from "@/features/Projects/filters";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import NewProject from "@/features/Projects/new-project";

const Projects: NextPageWithLayout = () => {
  // STATES

  /**
   * For git modal to open and to set its key
   */
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [gitModalId, setGitModalId] = useState(0);
  const [gitUrl, setGitUrl] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  /**
   * For filtering data in project api
   */
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data: projectList, isLoading } = useQuery({
    queryFn: () => getProjectList(pageNumber, perPage),
    queryKey: ["projectList", perPage, pageNumber],
  });

  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    const bgColor = getRiskStatusBgColor(row?.original?.risk_status);
    return (
      <div className="text-color w-[40px]">
        <div
          className={`absolute top-2 bottom-2 rounded-e left-0 w-[4px] h-auto ${bgColor} `}
        ></div>
        {serialNumber}
      </div>
    );
  };

  const showGitUrl = (data: IProjectDetail) => {
    setGitModalId(data?.project_id);
    setGitModalOpen(true);
    setGitUrl(data?.git_urls);
  };

  const columns: ColumnDef<IProjectDetail>[] = [
    {
      accessorKey: "S.N",
      header: ({ column }) => {
        return <div>S.N</div>;
      },
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
      ),
    },
    {
      accessorKey: "project_title",
      header: ({ column }) => {
        return <div className="w-[240px]">Project Info</div>;
      },
      cell: ({ row }) => (
        <div className="capitalize">
          <Link
            href={`/projects/${row.original?.code}`}
            className="mb-1 text-base font-medium transition-all text-zinc-700 hover:text-primary"
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
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => showGitUrl(row?.original)}
            disabled={row?.original?.git_urls?.length === 0}
            className="text-green-500 border-green-500 disabled:text-zinc-300 disabled:bg-light-white disabled:border-zinc-300"
          >
            git
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "project_detail",
      header: ({ column }) => {
        return <div className="w-[240px]">Project Detail</div>;
      },
      cell: ({ row }) => (
        <div className="w-[240px] min-w-0">
          <div className="flex items-center min-w-0 gap-2 mb-1 text-xs text-zinc-600">
            <span>Code:</span>{" "}
            <div className="flex items-center gap-1 max-w-[80%]">
              <p className="font-medium truncate">{row.original?.code}</p>
              <Button variant={"ghost"} className="h-auto p-0">
                <Copy
                  size={12}
                  className="stroke-zinc-500 hover:stroke-primary"
                />
              </Button>
            </div>
          </div>
          <p className="mb-1 text-xs text-zinc-600">
            Type:{" "}
            <span className="font-medium text-zinc-700">
              {row.original?.type}
            </span>
          </p>
          <p className="mb-1 text-xs text-zinc-600">
            Source: <span className="font-medium">{row.original?.source}</span>
          </p>
          <p className="mb-1 text-xs text-zinc-600">
            Market:{" "}
            <span className="font-medium">{row.original?.market_title}</span>
          </p>
          <p className="text-xs text-zinc-600">
            Techstack:{" "}
            <span className="font-medium">{row.original?.tech_stack}</span>
          </p>
        </div>
      ),
    },
    {
      accessorKey: "planned_rp",
      header: ({ column }) => {
        return <div className="w-[154px]">Planned RP</div>;
      },
      cell: ({ row }: any) => {
        const { sum, color, icon } = calculateRpSumAndColor(
          row?.original?.rp?.approved_rp,
          row?.original?.rp?.unapproved_rp
        );
        return (
          <div className="w-[154px]">
            <div
              className={cn(
                color,
                "flex items-center gap-1.5 text-base font-medium"
              )}
            >
              {icon}
              <span className={color}>{sum}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "rp",
      header: ({ column }) => {
        return <div className="uppercase">RP</div>;
      },
      cell: ({ row }) => {
        const { percentageLeft, color } = calculateRpLeft(
          row?.original?.rp?.used_rp ?? 0,
          row?.original?.rp?.approved_rp
        );
        return (
          <div className="w-[180px]">
            <p className={cn(color, "text-base font-medium")}>
              {percentageLeft}
            </p>
            <p className="my-1 text-sm text-zinc-600">
              <span>Sales RP:</span>
              <span className="font-medium">
                {row?.original?.rp?.sales_rp ?? "-"}
              </span>
            </p>
            <p className="text-sm text-zinc-600">
              <span>Used RP:</span>
              <span className="font-medium">
                {row?.original?.rp?.used_rp ?? "-"}
              </span>
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => {
        return <div className="w-[150px]">Deadline</div>;
      },
      cell: ({ row }: any) => {
        const { statusText, daysValue } = showDeadline(
          row?.original?.dates?.deadline
        );
        return (
          <div className="w-[200px]">
            <p className="mb-2 text-base font-medium text-zinc-700">
              {statusText}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress className={cn("h-[8px]")} value={daysValue} />
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

            <p className="mt-2 text-sm text-zinc-600">
              Deadline:{" "}
              <span className="font-medium">
                {changeDateToMonthYear(row?.original?.dates?.deadline)}
              </span>
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "project_lead",
      header: ({ column }) => {
        return <div>Project Lead</div>;
      },
      cell: ({ row }) => (
        <div className="w-[155px]">
          <p className="text-sm font-medium text-zinc-700">
            {row?.original?.project_lead?.fullname}
          </p>
          <div className="flex flex-wrap mt-1 gap-x-2 gap-y-1">
            {Array.from({
              length:
                row?.original?.project_lead?.in_progress_project_count || 0,
            }).map((_, index) => (
              <div
                key={`progress-${index}`}
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
              ></div>
            ))}
            {Array.from({
              length:
                row?.original?.project_lead?.in_support_project_count || 0,
            }).map((_, index) => (
              <div
                key={`support-${index}`}
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "offshore_members",
      header: ({ column }) => {
        return <div className="uppercase">Offshore Members</div>;
      },
      cell: ({ row }) => (
        <div className="w-[150px]">
          <div className="mb-2">
            {row?.original?.offshore_members?.length <= 3 ? (
              row.original.offshore_members.map((member: any, index) => (
                <p key={index} className="font-medium text-zinc-700">
                  {member?.fullname}
                </p>
              ))
            ) : (
              <>
                {row.original?.offshore_members
                  .slice(0, 3)
                  .map((member: any, index) => (
                    <p key={index} className="text-zinc-700">
                      {member?.fullname}
                    </p>
                  ))}
                <p>+{row.original.offshore_members.length - 3} more</p>
              </>
            )}
          </div>

          <Button size={"sm"} variant={"outline"} className="gap-1">
            <Plus size={16} />
            Add members
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "lastTimeLog",
      header: ({ column }) => {
        return <div className="uppercase">Last Time Log</div>;
      },
      cell: ({ row }: any) => (
        <div className="w-[150px] text-zinc-600">
          <p className="text-sm ">Last Logged</p>
          <p className="my-1 text-base font-medium">
            {row?.original?.dates?.last_log_date ?? "-"}
          </p>
          <p className="text-sm">
            {row?.original?.dates?.last_log_date &&
              changeDateDisplay(row?.original?.dates?.last_log_date)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        return (
          <div className="w-[100px]">
            <Badge
              variant={"outline"}
              className={`${
                row.getValue("status") === "In Progress" &&
                "border border-[#FD850A] text-[#FD850A]"
              }
            ${
              row.getValue("status") === "completed" ||
              (row.getValue("status") === "delivered" &&
                "border border-[#0A82FD] text-[#0A82FD]")
            }
             capitalize rounded-md`}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "taskStatus",
      header: ({ column }) => {
        return <div>Task Status</div>;
      },
      cell: ({ row }: any) => (
        <div className="w-[100px]">Total Task 58</div>
        // <Button type="button">{row.getValue("billedDate")}</Button>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="uppercase">ACTIONS</div>,
      cell: ({ row }) => {
        const rowData: any = row.original;

        return (
          <div className="flex items-center gap-4">
            {/* <Link href={`/projects/${rowData?.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link href={`/projects/${rowData?.id}/edit`}>
              <PencilLine className="stroke-gray-400 hover:stroke-blue-300" />
            </Link>
            <Button
              onClick={() => {
                setProjectId(rowData?.id);
                setOpen(true);
              }}
              variant={"ghost"}
              className="p-0 hover:bg-transparent hover:[&>svg]:stroke-destructive"
            >
              <Trash2 className="stroke-gray-400" />
            </Button> */}
            Actions
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {/* Page heading */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            All projects
          </h1>
          <p className="text-base text-zinc-500">
            The complete dashboard to get insights and overview of the projects.
          </p>
        </div>
        <Button onClick={() => setSheetOpen(true)}>
          <Plus width={20} height={20} />
          <span>Add New Project</span>
        </Button>

        <NewProject sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
        {/* <ProjectForm /> */}
      </div>

      {/* Filters */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <FilterSearch setSearchText={setSearchText} />
        <ProjectFilters />
      </div>

      <div className="p-8">
        <DataTable columns={columns} data={projectList?.data ?? []} />
        <DataTablePagination
          currentPage={projectList?.pagination?.page}
          totalPages={projectList?.pagination?.total_page}
          perPage={perPage}
          setPerPage={setPerPage}
          pageChange={handlePageChange}
        />
      </div>

      {/* Git modal */}
      <Dialog
        key={gitModalId}
        open={gitModalOpen}
        onOpenChange={setGitModalOpen}
      >
        <DialogContent className="p-6">
          <DialogHeader className="text-lg font-bold text-color">
            Git URLs
          </DialogHeader>
          <div className="min-w-0">
            {gitUrl?.map((url: string, index) => (
              <div
                key={index}
                className="flex items-start gap-4 mb-3 [&:last-child]:mb-0"
              >
                <p className="text-sm font-medium text-color min-w-[80px] text-end">
                  URL {index + 1} -
                </p>
                <Link
                  href={url}
                  target="_blank"
                  className="text-sm truncate transition hover:text-primary"
                >
                  {url}
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;

Projects.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
