import WorkLoadChart from "@/features/User-Management/team-members/work-load-chart";
import { useDebounce } from "@/hooks/debounce.hooks";
import {
  ITeamMemberDetails,
  ITeamMemberList,
} from "@/interface/team-member-interface";
import { getTeamMembersList } from "@/services/user-management/team-member/team-member-service";
import { calculateTime, calculateTimeLog } from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

const useTeamMemberList = () => {
  // STATES FOR FILTER
  const [searchText, setSearchText] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);

  // STATES FOR PAGINATION
  const [perPage, setPerPage] = useState(12);
  const [pageNum, setPageNum] = useState(1);

  // debounced search for api request
  const debouncedSearch = useDebounce(searchText, 300);

  // API CALL
  const { data: teamMemberList, isLoading } = useQuery<ITeamMemberList>({
    queryFn: () =>
      getTeamMembersList(
        perPage,
        pageNum,
        searchText, //keyword
        dateRange?.to ? moment(dateRange?.from).format("YYYY-MM-DD") : "", //date_from
        dateRange?.to ? moment(dateRange?.to).format("YYYY-MM-DD") : "" //date_to
      ),
    queryKey: [
      "teamMemberList",
      debouncedSearch,
      dateRange?.to,
      perPage,
      pageNum,
    ],
  });

  // change date range
  const dateChangeHandler = (date: DateRange) => {
    setDateRange(date);
  };

  // For changing page number
  const changePageNum = (pgNum: number) => {
    setPageNum(pgNum);
  };

  // Serial number in table
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  // Work-load chart

  const memberColumn: ColumnDef<ITeamMemberDetails>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => (
        <SerialNumberCell {...props} pageNumber={pageNum} perPage={perPage} />
      ),
    },
    // Member Info
    {
      id: "member_info",
      accessorKey: "member_info",
      header: "Member Info",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1 w-[150px]">
          <Link
            href={`/staffs/${row?.original?.username}`}
            className="font-semibold bock text-primary hover:text-blue-700"
          >
            {row?.original?.fullname}
          </Link>
          <div>
            <p className="text-xs font-medium text-zinc-700">
              {row?.original?.role?.name}
            </p>
            <p className="text-xs text-zinc-700">
              {row?.original?.department?.name}
            </p>
          </div>
        </div>
      ),
    },
    // No. of projects
    {
      id: "project_count",
      accessorKey: "project_count",
      header: () => (
        <div>
          No.of
          <br />
          Projects
        </div>
      ),
      cell: ({ row }) => <div>#{row?.getValue("project_count") ?? 0}</div>,
    },
    // Projects
    {
      id: "projects",
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1.5 w-[300px]">
          {row?.original?.projects
            ? row?.original?.projects?.map((project) => (
                <div
                  className={cn(
                    project?.status === "In Progress" &&
                      "bg-blue-50 border-blue-500 text-blue-700",
                    project?.status === "Client Support" &&
                      "bg-orange-50 border-orange-500 text-orange-700",
                    project?.status === "Closed" &&
                      "bg-green-50 border-green-500 text-green-700",
                    project?.status === "On Hold" &&
                      "bg-red-50 border-red-500 text-red-700",
                    "py-0.5 px-3 border rounded-full relative"
                  )}
                  key={project?.id}
                >
                  <Link
                    href={`/projects/${project?.code}`}
                    className="absolute top-0 bottom-0 left-0 right-0"
                  />
                  <p className="font-bold">{project?.name}</p>
                  <p>{project?.project_lead}</p>
                </div>
              ))
            : "N/A"}
        </div>
      ),
    },
    // Pending Task
    {
      id: "pending",
      accessorKey: "pending",
      header: () => (
        <div>
          Pending
          <br />
          Task
        </div>
      ),
    },
    // Added Task
    {
      id: "added",
      accessorKey: "added",
      header: () => (
        <div>
          Added
          <br />
          Task
        </div>
      ),
    },
    // Closed Task
    {
      id: "closed",
      accessorKey: "closed",
      header: () => (
        <div>
          Closed
          <br />
          Task
        </div>
      ),
    },
    // Remaining Task
    {
      id: "remaining",
      accessorKey: "remaining",
      header: () => (
        <div>
          Remaining
          <br />
          Task
        </div>
      ),
    },
    // Available Hours
    {
      id: "available_time",
      accessorKey: "available_time",
      header: () => (
        <div>
          Available
          <br />
          Hours
        </div>
      ),
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(
          row?.getValue("available_time")
        );
        return (
          <div className="whitespace-nowrap">
            {hours > 1 && hours + "H"} {minutes}M
          </div>
        );
      },
    },
    // Logged Hours
    {
      id: "used_time",
      accessorKey: "used_time",
      header: () => (
        <div>
          Logged
          <br />
          Hours
        </div>
      ),
      cell: ({ row }) => {
        const { hours, minutes } = calculateTimeLog(row?.getValue("used_time"));
        return (
          <div className="whitespace-nowrap">
            {hours > 1 && hours + "H"} {minutes}M
          </div>
        );
      },
    },
    // Work-load Remarks
    {
      id: "work_load",
      accessorKey: "work_load",
      header: () => (
        <div>
          Work-Load
          <br />
          Remarks
        </div>
      ),
      cell: ({ row }) => <WorkLoadChart data={row?.original} />,
    },
  ];

  return {
    setSearchText,
    dateRangeOpen,
    setDateRangeOpen,
    dateRange,
    dateChangeHandler,
    memberColumn,
    perPage,
    setPerPage,
    pageNum,
    changePageNum,

    // Data
    teamMemberList,
    isLoading,
  };
};

export default useTeamMemberList;
