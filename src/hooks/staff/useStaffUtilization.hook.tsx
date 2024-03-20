import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import {
  IStaffUtilization,
  IStaffUtilizationTable,
} from "@/interface/staff-interface";
import { getStaffUtilization } from "@/services/staff/staff-service";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

const useStaffUtilization = () => {
  const {
    query: { username },
  } = useRouter();

  const rpStartYear = process.env.NEXT_PUBLIC_RP_START_YEAR;

  // States
  //   For daily utilization
  const [date, setDate] = useState<DateRange | undefined>({
    from: moment().subtract(12, "days").toDate(),
    to: new Date(),
  });
  const [dailyRpData, setDailyRpData] = useState([]);
  const [dailyDateOpen, setDailyDateOpen] = useState(false);

  //   For monthly utilization
  const [month, setMonth] = useState({
    from: moment().format("YYYY-01"),
    to: moment().format("YYYY-12"),
  });
  const [monthlyRpData, setMonthlyRpData] = useState([]);

  const dateChangeHandler = (date: any) => {
    setDate(date);
  };

  const monthChangeHandler = (month: any) => {
    setMonth({
      from: moment().format(`${month}-01`),
      to: moment().format(`${month}-12`),
    });
  };

  //   For daily
  const { data: staffDailyRp, isLoading: dailyLoading } =
    useQuery<IStaffUtilization>({
      queryFn: async () => {
        if (username) {
          const response = await getStaffUtilization(
            username,
            "daily", //date_by
            moment(date?.from).format("YYYY-MM-DD"), //date_from
            moment(date?.to).format("YYYY-MM-DD") //date_to
          );
          return response;
        }
      },
      queryKey: ["staffDailyRp", username, date?.to],
      onSuccess: (res) => {
        const tableArray: any =
          res && res?.data !== null
            ? Object?.entries(res?.data)?.map(([key, value]) => {
                return {
                  date: key,
                  ...value,
                };
              })
            : [];
        setDailyRpData(tableArray);
      },
    });

  //   For Monthly
  const { data: staffMonthlyRp, isLoading: monthlyLoading } =
    useQuery<IStaffUtilization>({
      queryFn: async () => {
        if (username) {
          const response = await getStaffUtilization(
            username,
            "monthly", //date_by
            month?.from, //month_from
            month?.to //month_to
          );
          return response;
        }
      },
      queryKey: ["staffMonthlyRp", username, month],
      onSuccess: (res) => {
        const tableArray: any = Object?.entries(res?.data)?.map(
          ([key, value]) => {
            return {
              date: key,
              ...value,
            };
          }
        );
        setMonthlyRpData(tableArray);
      },
    });

  const dailyRpColumn: ColumnDef<IStaffUtilizationTable>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="font-medium">
          {moment(row?.getValue("date")).format("Do MMM, YYYY")}
        </div>
      ),
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }) => (
        <div
          className={cn(
            Number(row?.original?.available_rp) > 0
              ? "tetx-zinc-700 font-medium"
              : "text-zinc-500"
          )}
        >
          {changeNumberFormat(row?.getValue("available_rp"))}
        </div>
      ),
    },
    // RP Provided
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Utilized",
      cell: ({ row }) => (
        <div
          className={cn(
            Number(row?.original?.rp) > 0
              ? "tetx-zinc-700 font-medium"
              : "text-zinc-500"
          )}
        >
          {changeNumberFormat(row?.getValue("rp"))}
        </div>
      ),
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => {
        const percentage =
          (Number(row?.original?.rp) / Number(row?.original?.available_rp)) *
          100;
        return (
          <div
            className={cn(
              percentage > 80 ? "text-green-500" : "text-red-500",
              "font-medium"
            )}
          >
            {isNaN(percentage) ? 0 : percentage.toFixed(2)}%
          </div>
        );
      },
    },
    // Remarks
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <div
          className={cn(
            row?.original?.holiday === "Yes" && "text-red-500",
            row?.original?.on_leave !== "No" && "text-orange-500",
            "font-medium"
          )}
        >
          {row?.original?.holiday === "Yes"
            ? "Holiday"
            : row?.original?.on_leave !== "No"
            ? row?.original?.on_leave
            : ""}
        </div>
      ),
    },
  ];

  const monthlyRpColumn: ColumnDef<IStaffUtilizationTable>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="font-medium">
          {moment(row?.getValue("date")).format("MMM YYYY")}
        </div>
      ),
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }) => (
        <div
          className={cn(
            Number(row?.original?.available_rp) > 0
              ? "tetx-zinc-700 font-medium"
              : "text-zinc-500"
          )}
        >
          {changeNumberFormat(row?.getValue("available_rp"))}
        </div>
      ),
    },
    // RP Provided
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Utilized",
      cell: ({ row }) => (
        <div
          className={cn(
            Number(row?.original?.rp) > 0
              ? "tetx-zinc-700 font-medium"
              : "text-zinc-500"
          )}
        >
          {changeNumberFormat(row?.getValue("rp"))}
        </div>
      ),
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => {
        const percentage =
          (Number(row?.original?.rp) / Number(row?.original?.available_rp)) *
          100;
        return (
          <div
            className={cn(
              percentage > 80 ? "text-green-500" : "text-red-500",
              "font-medium"
            )}
          >
            {isNaN(percentage) ? 0 : percentage.toFixed(2)}%
          </div>
        );
      },
    },
  ];
  return {
    staffDailyRp,
    dailyLoading,
    date,
    dateChangeHandler,
    dailyRpColumn,
    dailyDateOpen,
    setDailyDateOpen,
    dailyRpData,
    staffMonthlyRp,
    monthlyLoading,
    monthlyRpColumn,
    monthlyRpData,
    setMonth,
    rpStartYear,
    monthChangeHandler,
  };
};

export default useStaffUtilization;
