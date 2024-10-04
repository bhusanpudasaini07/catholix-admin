import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { ColumnDef } from "@tanstack/react-table";
import { getUserUsageTime } from "@/services/report/report-service";
import moment from "moment";
import {
  IUsageTimeLog,
  IUsageTimeLogResponse,
} from "@/interface/report-interface";
import { DateRange } from "react-day-picker";
import { useCommonStore } from "@/store/common-store";
import { getRegions } from "@/services/admin/admin-service";
import { IRegionProps } from "@/interface/common-interface";

interface IProps {
  data: IUsageTimeLogResponse;
}

const useUsageTimeLog = () => {
  const { profileData } = useCommonStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(15, "days").toDate(),
    to: moment().toDate(),
  });

  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [region, setRegion] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [lga, setLga] = useState<any>([]);

  const { data: usageTimeLogList, isLoading: usageTimeLogListLoading } =
    useQuery<any>({
      queryKey: ["usageTimeLogList", page, perPage, searchTrigger],
      queryFn: async () => {
        if (region && state) {
          const response = await getUserUsageTime(
            page,
            perPage,
            searchTerm,
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            region,
            state,
            lga.length > 0 ? lga.join(",") : "all"
          );
          return response;
        }
      },
    });

  const { data: regionsList, isLoading: regionsLoading } =
    useQuery<IRegionProps>({
      queryKey: ["regions"],
      queryFn: () => getRegions(),
    });

  //   FUNCTIONS
  const searchTermHandler = (value: string) => {
    setSearchTerm(value);
  };
  const resetHandler = () => {
    if (profileData && profileData?.regionId !== null) {
      const region = regionsList?.data?.regions?.find(
        (region) => region.id === profileData?.regionId
      );
      const state = regionsList?.data?.regions
        ?.find((region) => region?.id === profileData?.regionId)
        ?.states?.find((state) => state?.id === profileData?.stateId);

      const localGovs = state?.localGovernments
        ?.filter((lg) => profileData.localGovId?.includes(lg.id))
        ?.map((lg) => lg.code);

      if (profileData?.regionId !== 0) {
        setRegion(region?.code!);
        setState(profileData?.stateId !== 0 ? state?.code! : "all");
        setLga(localGovs || []);
        searchHandler();
      } else {
        setRegion("all");
        setState("all");
        setLga([]);
      }
    }
    setSearchTerm("");
    setSearchTrigger(!searchTrigger);
    setPage(1);
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

  // //   COLUMNS
  // const usageTimeLogColumns: ColumnDef<IUsageTimeLog>[] = [
  //   {
  //     id: "sn",
  //     accessorKey: "sn",
  //     header: "S.N.",
  //     cell: ({ row }) => (
  //       <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
  //     ),
  //   },
  //   {
  //     id: "user_name",
  //     accessorKey: "user_name",
  //     header: "User",
  //     cell: ({ row }) => <div>{row.original.user_name}</div>,
  //   },
  //   {
  //     id: "date",
  //     accessorKey: "date",
  //     header: "Date",
  //     cell: ({ row }) => <div>{row.original.date}</div>,
  //   },
  //   {
  //     id: "last_activity",
  //     accessorKey: "last_activity",
  //     header: "Last Activity",
  //     cell: ({ row }) => <div>{row.original.last_activity}</div>,
  //   },
  //   {
  //     id: "total_time",
  //     accessorKey: "total_time",
  //     header: "Total Time",
  //     cell: ({ row }) => {
  //       const { minutes = 0, seconds = 0 } = row?.original || {};
  //       const totalTimeInSeconds = minutes * 60 + seconds;

  //       const hours = Math.floor(totalTimeInSeconds / 3600);
  //       const remainingSeconds = totalTimeInSeconds % 3600;
  //       const displayMinutes = Math.floor(remainingSeconds / 60);
  //       const displaySeconds = remainingSeconds % 60;

  //       const timeString = `${hours > 0 ? `${hours}H ` : ""}${
  //         displayMinutes > 0 || hours > 0 ? `${displayMinutes}M ` : ""
  //       }${displaySeconds}S`;

  //       return <div>{timeString}</div>;
  //     },
  //   },
  // ];

  // Function to transform data by grouping it by user
  const transformDataByUser = (data: IUsageTimeLogResponse[]) => {
    const groupedData: Record<string, any> = {};

    data?.forEach((entry: any) => {
      if (!groupedData[entry?.user_name]) {
        groupedData[entry?.user_name] = { user_name: entry?.user_name };
      }
      entry.data.forEach((dateEntry: any) => {
        groupedData[entry?.user_name][dateEntry?.date] = {
          minutes: dateEntry?.minutes,
          seconds: dateEntry?.seconds,
        };
      });
    });

    return Object.values(groupedData);
  };

  // Memoize transformed data
  const transformedData = useMemo(() => {
    return transformDataByUser(
      Array.isArray(usageTimeLogList?.data?.results)
        ? usageTimeLogList?.data?.results
        : []
    );
  }, [usageTimeLogList]);

  // Function to generate columns based on date range
  const generateDateColumns = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) return [];

    const startDate = moment(dateRange.from);
    const endDate = moment(dateRange.to);
    const dateColumns = [];

    while (startDate.isSameOrBefore(endDate)) {
      const dateStr = startDate.format("YYYY-MM-DD");
      dateColumns.push({
        id: dateStr,
        accessorKey: dateStr,
        header: startDate.format("MMM D"),
        cell: ({ row }: any) => {
          const { minutes = 0, seconds = 0 } = row.original[dateStr] || {};
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
      });
      startDate.add(1, "day");
    }

    return dateColumns;
  };

  // Memoize columns to avoid unnecessary recalculations
  const usageTimeLogColumns = useMemo(() => {
    const staticColumns = [
      {
        id: "sn",
        accessorKey: "sn",
        header: "S.N.",
        cell: ({ row }: any) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
      {
        id: "user_name",
        accessorKey: "user_name",
        header: "User",
        cell: ({ row }: any) => <div>{row.original.user_name}</div>,
      },
    ];

    const dateColumns = generateDateColumns(dateRange);

    return [...staticColumns, ...dateColumns];
  }, [dateRange, page, perPage]);

  return {
    // STATES
    searchTerm,
    setSearchTerm,
    perPage,
    setPerPage,
    page,
    setPage,
    dateRange,
    setDateRange,
    region,
    setRegion,
    state,
    setState,
    lga,
    setLga,

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
    transformedData,
  };
};

export default useUsageTimeLog;
