import WorkLoadChart from "@/features/User-Management/team-members/page-body/work-load-chart";
import { useDebounce } from "@/hooks/debounce.hooks";
import {
  ITeamMemberDetails,
  ITeamMemberList,
} from "@/interface/team-member-interface";
import { getStaffDailyTimelog } from "@/services/lead-report/lead-report-service";
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
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);
  const [department, setDepartment] = useState<string>("all");

  // STATES FOR PAGINATION
  const [perPage, setPerPage] = useState(12);
  const [pageNum, setPageNum] = useState(1);

  // STATES FOR LOG MODAL
  const [staffId, setStaffId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // STATE FOR PROJECT COUNT DISPLAY
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  // Function to change count for a specific row
  const changeCount = (project_count: number, id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: project_count,
    }));
  };

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
        dateRange?.to ? moment(dateRange?.to).format("YYYY-MM-DD") : "", //date_to
        department //department
      ),
    queryKey: [
      "teamMemberList",
      debouncedSearch,
      dateRange?.to,
      perPage,
      pageNum,
      department,
    ],
  });

  // Staff daily time log
  const { data: staffDailyLog, isLoading: staffDailyLogLoading } = useQuery({
    queryFn: async () => {
      if (staffId !== "") {
        const response = await getStaffDailyTimelog(
          moment(dateRange?.from).format("YYYY-MM-DD"), // date_from
          moment(dateRange?.to).format("YYYY-MM-DD"), //date_to
          staffId //staff Id
        );
        return response;
      }
    },
    queryKey: ["getStaffDailyLog", dateRange?.to, staffId, modalOpen],
  });

  // search api function
  const searchHandler = (value: string) => {
    setSearchText(value);
    setPageNum(1);
  };

  // change date range
  const dateChangeHandler = (date: DateRange | undefined) => {
    setDateRange(date);
  };

  // For changing page number
  const changePageNum = (pgNum: number) => {
    setPageNum(pgNum);
  };
  const openStaffLogModal = (staffId: string) => {
    setModalOpen(true);
    setStaffId(staffId);
  };
  const changeStaffLog = () => {
    setModalOpen(false);
    setStaffId("");
  };
  // Serial number in table
  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  const projectBg = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-50 border-blue-500 text-blue-700";

      case "Client Support":
        return "bg-orange-50 border-orange-500 text-orange-700";

      case "Closed":
        return "bg-green-50 border-green-500 text-green-700";

      case "Delivered":
        return "bg-green-50 border-green-500 text-green-700";

      case "On Hold":
        return "bg-red-50 border-red-500 text-red-700";

      case "Deleted":
        return "bg-zinc-100 border-zinc-500 text-zinc-700";
    }
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
      cell: ({ row }) => {
        const rowId = row?.original?.id;
        const maxProjectsToShow = counts[rowId] || 3; // Default to 3 if no specific count is set
        return (
          <div>
            <div className="flex flex-wrap gap-1.5 w-[350px]">
              {row?.original?.projects
                ? row?.original?.projects
                    ?.slice(0, maxProjectsToShow)
                    ?.map((project) => (
                      <div
                        className={cn(
                          projectBg(project?.status),
                          "py-0.5 px-5 border rounded-full relative text-xs"
                        )}
                        key={project?.id}
                      >
                        <Link
                          href={`/projects/${project?.code}`}
                          className="absolute top-0 right-0 bottom-0 left-0"
                        />
                        <p className="font-bold">{project?.name}</p>
                        <p>{project?.project_lead}</p>
                      </div>
                    ))
                : "N/A"}
            </div>
            {row?.original?.project_count > maxProjectsToShow && (
              <p
                className="mt-2 font-medium text-center cursor-pointer text-zinc-700"
                onClick={() => changeCount(row?.original?.project_count, rowId)}
              >
                +{row?.original?.project_count - 3} More
              </p>
            )}
          </div>
        );
      },
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
          <div className="font-medium whitespace-nowrap">
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
          <div
            className="font-medium whitespace-nowrap cursor-pointer text-primary"
            onClick={() => openStaffLogModal(row?.original?.username)}
          >
            {hours > 1 && hours + "H"} {minutes}M
          </div>
        );
      },
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
    searchText,
    pageNum,
    changePageNum,
    searchHandler,

    // Data
    teamMemberList,
    isLoading,
    staffDailyLog,
    staffDailyLogLoading,

    setStaffId,
    staffId,
    modalOpen,
    changeStaffLog,
    setDepartment,
    department,
  };
};

export default useTeamMemberList;
