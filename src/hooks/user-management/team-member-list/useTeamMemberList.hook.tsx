import { useDebounce } from "@/hooks/debounce.hooks";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";

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

  // change date range
  const dateChangeHandler = (date: DateRange) => {
    setDateRange(date);
  };

  // For changing page number
  const changePageNum = (pgNum: number) => {
    setPageNum(pgNum);
  };

  // Serial number in table
  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  const memberColumn: ColumnDef<any>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => <SerialNumberCell {...props} />,
    },
    // Member Info
    {
      id: "member_info",
      accessorKey: "member_info",
      header: "Member Info",
    },
    // No. of projects
    {
      id: "no_of_projects",
      accessorKey: "no_of_projects",
      header: () => (
        <div>
          No.of
          <br />
          Projects
        </div>
      ),
    },
    // Projects
    {
      id: "projects",
      accessorKey: "projects",
      header: "Projects",
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
      id: "available_hours",
      accessorKey: "available_hours",
      header: () => (
        <div>
          Available
          <br />
          Hours
        </div>
      ),
    },
    // Logged Hours
    {
      id: "logged_hours",
      accessorKey: "logged_hours",
      header: () => (
        <div>
          Logged
          <br />
          Hours
        </div>
      ),
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
  };
};

export default useTeamMemberList;
