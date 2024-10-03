import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { getUserUsageTime } from "@/services/report/report-service";
import moment from "moment";
import {
  IUsageTimeLog,
  IUsageTimeLogResponse,
} from "@/interface/report-interface";

interface IProps {
  data: IUsageTimeLogResponse;
}

const useUsageTimeLog = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState<Date>(moment().toDate());
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  const { data: usageTimeLogList, isLoading: usageTimeLogListLoading } =
    useQuery<any>({
      queryKey: ["usageTimeLogList", page, perPage, searchTrigger, date],
      queryFn: async () => {
        const response = await getUserUsageTime(
          page,
          perPage,
          searchTerm,
          moment(date).format("YYYY-MM-DD")
        );
        return response;
      },
    });

  //   FUNCTIONS
  const searchTermHandler = (value: string) => {
    setSearchTerm(value);
  };
  const resetHandler = () => {
    setSearchTerm("");
    setDate(moment().toDate());
    setSearchTrigger(!searchTrigger);
  };
  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const dateChangeHandler = (value: Date) => {
    setDate(value);
    setPage(1);
  };

  //   COLUMNS
  const usageTimeLogColumns: ColumnDef<IUsageTimeLog>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    {
      id: "user_name",
      accessorKey: "user_name",
      header: "User",
      cell: ({ row }) => <div>{row.original.user_name}</div>,
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.original.date}</div>,
    },
    {
      id: "last_activity",
      accessorKey: "last_activity",
      header: "Last Activity",
      cell: ({ row }) => <div>{row.original.last_activity}</div>,
    },
    {
      id: "total_time",
      accessorKey: "total_time",
      header: "Total Time",
      cell: ({ row }) => {
        const { minutes = 0, seconds = 0 } = row?.original || {};
        const totalTimeInSeconds = minutes * 60 + seconds;

        const hours = Math.floor(totalTimeInSeconds / 3600);
        const remainingSeconds = totalTimeInSeconds % 3600;
        const displayMinutes = Math.floor(remainingSeconds / 60);
        const displaySeconds = remainingSeconds % 60;

        const timeString = `${hours > 0 ? `${hours}H ` : ""}${
          displayMinutes > 0 || hours > 0 ? `${displayMinutes}M ` : ""
        }${displaySeconds}S`;

        return <div>{timeString}</div>;
      },
    },
  ];

  return {
    // STATES
    searchTerm,
    setSearchTerm,
    perPage,
    setPerPage,
    page,
    setPage,
    date,
    setDate,

    // Functions
    searchTermHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,

    // API
    usageTimeLogList,
    usageTimeLogListLoading,

    // Column
    usageTimeLogColumns,
    dateChangeHandler,
  };
};

export default useUsageTimeLog;
