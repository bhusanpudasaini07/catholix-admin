import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { getActivityLogData } from "@/services/report/report-service";
import {
  IActivityLog,
  IActivityLogResponse,
} from "@/interface/report-interface";

interface IProps {
  data: IActivityLogResponse;
}

const useActivityLog = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  const { data: activityLogList, isLoading: activityLogListLoading } =
    useQuery<IProps>({
      queryKey: ["activityLogList", page, perPage, searchTrigger],
      queryFn: async () => {
        const response = await getActivityLogData(page, perPage, searchText);
        return response;
      },
    });

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
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

  //   COLUMNS
  const activityLogColumns: ColumnDef<IActivityLog>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      enableHiding: false,
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    // User Name
    {
      id: "user_name",
      accessorKey: "user_name",
      header: "User Name",
      enableHiding: false,
      cell: ({ row }) => (
        <p className="font-medium max-w-[250px]">
          {row.original.user_name || "-"}
        </p>
      ),
    },
    // Description
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.description || "-"}</p>,
    },
    // Time Stamp
    {
      id: "time_stamp",
      accessorKey: "time_stamp",
      header: "Time Stamp",
      enableHiding: false,
      cell: ({ row }) => <p>{row.original.timestamp || "-"}</p>,
    },
  ];

  return {
    // STATES
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,

    // Functions
    searchTextHandler,
    resetHandler,
    searchHandler,
    perPageHandler,
    pageChangeHandler,

    // API
    activityLogList,
    activityLogListLoading,

    // Column
    activityLogColumns,
  };
};

export default useActivityLog;
