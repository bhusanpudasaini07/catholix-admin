import {
  Activity,
  AlignCenterVertical,
  BarChart,
  BookOpen,
  Car,
  Copy,
  CopyCheck,
  Edit,
  MoreVertical,
  Plus,
  Table,
  Tag,
  Tags,
  Timer,
  Trash2,
  Users,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { IProjectDetail, IProjectProps } from "@/interface/project-interface";
import { getProjectList } from "@/services/project/project-service";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { changeDateToMonthYear } from "@/shared/utils/date-utils";
import {
  calculateDeadlinePercentValue,
  calculateRpLeft,
  calculateRpSumAndColor,
  changeDateDisplay,
  changeNumberFormat,
  getRiskStatusBgColor,
  showDeadline,
} from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useDebounce } from "../debounce.hooks";
import useProjectFilter from "./overall-filters/useProjectFilter.hook";
import { useRouter } from "next/router";
import BurndownSvg from "@/shared/svg/burndown";

const useProjectListing = () => {
  const router = useRouter();
  const { filterSaved, setFilterSaved } = useCommonStore();

  const { setFilterStates, setDateRange, setSelectedOption, setSelectedLeads } =
    useProjectFilter();

  // STATES
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    sn: true,
    project_title: true,
    project_detail: true,
    planned_rp: true,
    rp: true,
    deadline: true,
    project_lead: true,
    offshore_members: true,
    last_time_log: true,
    status: true,
    task_status: true,
    actions: true,
  });

  const [copyTooltipText, setCopyTooltipText] = useState<{
    [key: string]: string;
  }>({});
  /**
   * For git modal, id, and url store
   */
  const [gitState, setGitState] = useState<{
    modalOpen: boolean;
    modalId: number;
    url: string[];
  }>({
    modalOpen: false,
    modalId: 0,
    url: [],
  });

  /**
   * For filtering data in project api
   */
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // for add form sheet
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(searchText, 300);

  const applyFilter = (values: any, date: any, date_type: string) => {
    const filteredData =
      (date?.from && date?.to) !== undefined
        ? `${moment(date?.from).format("YYYY-MM-DD")} - ${moment(
            date?.to
          ).format("YYYY-MM-DD")}`
        : "";
    setFilterSaved({
      ...values,
      date: filteredData,
      date_type: date_type === "all_date" ? "" : date_type,
    });
    setPageNumber(1);
    localStorage.setItem(
      "savedFilter",
      JSON.stringify({
        ...values,
        date: filteredData,
        date_type: date_type === "all_date" ? "" : date_type,
      })
    );
  };

  const searchProjectHandler = (search: string) => {
    setPageNumber(1);
    setSearchText(search);
  };

  // ------------------------------------//

  // API CALL FOR PROJECT LIST
  const { data: projectList, isLoading } = useQuery({
    queryFn: () =>
      getProjectList(
        pageNumber,
        perPage,
        searchText,
        filterSaved?.risk_status, //status
        filterSaved?.sources, // source
        filterSaved?.market, // market
        filterSaved?.type, // type
        filterSaved?.leads, // lead
        filterSaved?.date_type, //date_type
        filterSaved?.date, // date
        filterSaved?.clients, //clients
        filterSaved?.status // status
      ),
    queryKey: [
      "projectList",
      perPage,
      pageNumber,
      filterSaved,
      debouncedSearchValue,
    ],
  });

  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    const bgColor = getRiskStatusBgColor(row?.original?.risk_status);
    return (
      <div className="text-color">
        <div
          className={`absolute left-0 top-2 bottom-2 h-auto rounded-e w-[4px] ${bgColor}`}
        ></div>
        {serialNumber}
      </div>
    );
  };

  const showGitUrl = (data: IProjectDetail) => {
    setGitState({
      modalOpen: true,
      modalId: data?.project_id,
      url: data?.git_urls,
    });
  };

  /**
   * @param code project code copy
   */
  const copyProjectCode = (code: string, projectId: string) => {
    navigator.clipboard.writeText(code);
    // Update the tooltip text for the specific row
    setCopyTooltipText((prev) => ({ ...prev, [projectId]: "Copied!" }));
    // Set a timeout to revert the tooltip text back to "Copy" after 2 seconds for the specific row
    setTimeout(() => {
      setCopyTooltipText((prev) => ({ ...prev, [projectId]: "Copy" }));
    }, 2000);
  };

  const resetFilters = () => {
    const resetData = {
      leads: "",
      clients: "",
      sources: "",
      status: "",
      type: "",
      risk_status: "",
      market: "",
      date: "",
      date_type: "",
    };
    setSearchText("");
    setDateRange({
      from: undefined,
      to: undefined,
    });
    setSelectedOption("all_date");
    setFilterStates(resetData);
    setFilterSaved(resetData);
    localStorage.setItem("savedFilter", JSON.stringify(resetData));
    setSelectedLeads([]);
    setPageNumber(1);
  };

  // redirect route from actions button in listing
  const redirectPage = (route: string, code: string) => {
    router.push(`/projects/${code}/${route}`);
  };

  const columns: ColumnDef<IProjectDetail>[] = [
    {
      id: "sn",
      accessorKey: "S.N",
      header: "S.N",
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
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
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => showGitUrl(row?.original)}
            disabled={row?.original?.git_urls?.length === 0}
            className="text-green-500 border-green-500 hover:text-green-700 hover:border-green-700 hover:bg-transparent disabled:text-zinc-300 disabled:bg-light-white disabled:border-zinc-300"
          >
            git
          </Button>
        </div>
      ),
      enableHiding: false,
    },
    // Project Detail
    {
      id: "project_detail",
      accessorKey: "project_detail",
      header: "Project Detail",
      cell: ({ row }) => (
        <div className="w-[200px] min-w-0">
          <div className="flex gap-2 items-center mb-1 min-w-0 text-xs text-zinc-600">
            <span>Code:</span>{" "}
            <div className="flex items-center gap-1 max-w-[70%]">
              <p className="font-medium truncate">{row.original?.code}</p>

              {copyTooltipText[row.original.project_id] === "Copied!" ? (
                <div className="flex gap-1 items-center text-zinc-500">
                  <CopyCheck size={12} />
                  <span className="text-[10px]">Copied</span>
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger
                    onClick={() =>
                      copyProjectCode(
                        row.original?.code,
                        String(row.original.project_id)
                      )
                    }
                  >
                    <Copy
                      size={12}
                      className="stroke-zinc-500 hover:stroke-primary"
                    />
                  </TooltipTrigger>
                  <TooltipContent>Copy</TooltipContent>
                </Tooltip>
              )}
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
            <span className="font-medium break-words">
              {row.original?.tech_stack}
            </span>
          </p>
        </div>
      ),
      enableHiding: true,
    },
    // Planned RP
    {
      id: "planned_rp",
      accessorKey: "planned_rp",
      header: "Planned Budget",
      cell: ({ row }) => {
        const { sum, color, icon } = calculateRpSumAndColor(
          row?.original?.rp?.approved_rp,
          row?.original?.rp?.unapproved_rp
        );
        return (
          <div className="w-[100px] max-w-[154px]">
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={cn(
                    color,
                    "flex items-center gap-1.5 text-base font-medium"
                  )}
                >
                  {icon}
                  <span className={color}>
                    {sum === 0 ? "N/A" : changeNumberFormat(sum)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {sum === 0 ? (
                  "Not estimated"
                ) : (
                  <>
                    <p>
                      Total Estimation: #
                      {row?.original?.rp?.approved_estimation +
                        row?.original?.rp?.unapproved_estimation}
                    </p>
                    <p>
                      Approved: #{row?.original?.rp?.approved_estimation} (
                      {changeNumberFormat(row?.original?.rp?.approved_rp)}{" "}
                      Units)
                    </p>
                    <p>
                      Unapproved: #{row?.original?.rp?.unapproved_estimation} (
                      {changeNumberFormat(row?.original?.rp?.unapproved_rp)}{" "}
                      Units)
                    </p>
                  </>
                )}
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
      enableHiding: true,
    },
    // RP
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => {
        const { percentageLeft, color } = calculateRpLeft(
          row?.original?.rp?.used_rp ?? 0,
          row?.original?.rp?.sales_rp ?? 0
        );
        return (
          <div className="w-[160px]">
            {row?.original?.rp?.sales_rp &&
              (row?.original?.rp?.rp_utilization_percentage &&
              row?.original?.rp?.rp_utilization_percentage > 100 ? (
                <div className="text-base font-medium text-destructive">
                  {(row?.original?.rp?.rp_utilization_percentage - 100).toFixed(
                    2
                  )}
                  % Exceeded
                </div>
              ) : (
                <p className={cn(color, "text-base font-medium")}>
                  {percentageLeft}
                </p>
              ))}
            <p className="flex gap-2 items-center my-1 text-sm text-zinc-600">
              <span>Sales Budget:</span>
              <span className="font-medium">
                {row?.original?.rp?.sales_rp! > 0
                  ? changeNumberFormat(Number(row?.original?.rp?.sales_rp))
                  : "N/A"}
              </span>
            </p>
            <p className="flex gap-2 items-center text-sm text-zinc-600">
              <span>Used Budget:</span>
              <span className="font-medium">
                {row?.original?.rp?.used_rp
                  ? changeNumberFormat(Number(row?.original?.rp?.used_rp))
                  : "N/A"}
              </span>
            </p>
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
    // Offshore member
    {
      id: "offshore_members",
      accessorKey: "offshore_members",
      header: "Offshore Members",
      cell: ({ row }) => (
        <div className="w-[150px]">
          <div className="mb-2">
            {row?.original?.offshore_members?.length <= 3 ? (
              row.original.offshore_members.map((member: any, index) => (
                <p key={index} className="text-xs font-medium text-zinc-700">
                  {member?.fullname}
                </p>
              ))
            ) : (
              <>
                {row.original?.offshore_members
                  .slice(0, 2)
                  .map((member: any, index) => (
                    <p key={index} className="text-xs text-zinc-700">
                      {member?.fullname}
                    </p>
                  ))}
                <p className="text-xs">
                  +{row.original.offshore_members.length - 2} more
                </p>
              </>
            )}
          </div>

          <Button size={"sm"} variant={"table"} className="gap-1">
            <Plus size={16} />
            Members
          </Button>
        </div>
      ),
      enableHiding: true,
    },
    // Last time log
    {
      id: "last_time_log",
      accessorKey: "last_time_log",
      header: "Last Time Log",
      cell: ({ row }: any) => (
        <div className="min-w-[120px] max-w-[120px] text-zinc-600">
          {row.original.dates.last_log_date ? (
            <>
              <p className="text-xs">Last Logged</p>
              <p className="mt-1 text-sm font-medium">
                {row.original.dates.last_log_date
                  ? moment(row.original.dates.last_log_date).format(
                      "MMM Do, YYYY"
                    )
                  : "-"}
              </p>
              <p className="mb-1 text-sm font-medium">
                {row.original.dates.last_log_date
                  ? moment(row.original.dates.last_log_date).format("HH:mm")
                  : "-"}
              </p>
              <p className="text-xs">
                {row?.original?.dates?.last_log_date &&
                  changeDateDisplay(row?.original?.dates?.last_log_date)}
              </p>
            </>
          ) : (
            "N/A"
          )}
        </div>
      ),
      enableHiding: true,
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
                  : "bg-[#5470C6]",
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
                <span className="w-3 h-3 bg-[#5470C6] rounded-sm"></span>
                <span className="text-[#5470C6]">
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
    // Action
    {
      id: "actions",
      accessorKey: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <div className="flex gap-4 items-center">
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/projects/${rowData?.code}/edit`}>
                  <Edit
                    size={20}
                    className="stroke-zinc-700 hover:stroke-primary"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={`/projects/${rowData?.code}/rp-estimation`}
                  className="relative"
                >
                  <Badge
                    size={"sm"}
                    variant={"dark"}
                    className="absolute -top-3 -right-3"
                  >
                    {rowData?.member_count ?? 0}
                  </Badge>
                  <Users
                    size={20}
                    className="stroke-zinc-700 hover:stroke-primary"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Estimation and Members</TooltipContent>
            </Tooltip>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <MoreVertical size={20} className="stroke-zinc-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[240px]" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("burndown-chart", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <BurndownSvg size={16} className="stroke-zinc-700" />
                    Burndown Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("estimated-actual", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <AlignCenterVertical
                      size={16}
                      className="stroke-zinc-700"
                    />
                    Estimated Vs Actual Budget
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("project-stories", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <BookOpen size={16} className="stroke-zinc-700" /> User
                    Stories
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("latest-activities", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <Activity size={16} className="stroke-zinc-700" />{" "}
                    Activities
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("more-details", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <Tag size={16} className="stroke-zinc-700" /> Time-log and
                    Status Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      redirectPage("task-time-spent", row?.original?.code)
                    }
                    className="gap-2"
                  >
                    <Timer size={16} className="stroke-zinc-700" /> Task & Time
                    Spent
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2">
                    <Tags size={16} className="stroke-zinc-700" /> Manage Time
                    Log Rule
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Car size={16} className="stroke-zinc-700" /> Add Delivered
                    Date
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}

                {/* <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2 text-destructive hover:!text-destructive">
                    <Trash2 size={16} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return {
    gitState,
    setGitState,
    searchText,
    setSearchText,
    debouncedSearchValue,
    pageNumber,
    perPage,
    setPageNumber,
    setPerPage,
    sheetOpen,
    setSheetOpen,
    projectList,
    isLoading,
    handlePageChange,
    showGitUrl,
    columns,
    columnVisibility,
    setColumnVisibility,
    resetFilters,

    applyFilter,
    searchProjectHandler,
  };
};

export default useProjectListing;
