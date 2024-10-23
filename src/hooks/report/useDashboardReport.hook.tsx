import { IDashboardReport } from "@/interface/report-interface";
import {
  exportDashboardReport,
  getDashboardReport,
} from "@/services/report/report-service";
import { Badge } from "@/shared/components/ui/badge";
import { dashboard } from "@/shared/lib/image-config";
import { exportToCsv } from "@/shared/utils/export-utils/export-util";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { ColumnDef } from "@tanstack/react-table";
import { id } from "date-fns/locale";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "react-query";

interface TransformedData {
  columns: Array<{ Header: string; accessor: string }>;
  data: Array<{ title: string; [key: string]: string }>;
}

interface IProps {
  data: IDashboardReport;
}

const useDashboardReport = () => {
  const router = useRouter();
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, "week").toDate(),
    to: moment().toDate(),
  });

  const { data: dashboardReport, isLoading: dashboardReportLoading } =
    useQuery<IProps>({
      queryKey: ["dashboard-report", searchTrigger],
      queryFn: () =>
        getDashboardReport(
          moment(dateRange.from).format("YYYY-MM-DD"),
          moment(dateRange.to).format("YYYY-MM-DD")
        ),
    });

  //   Functions
  const searchHandler = () => {
    setSearchTrigger(!searchTrigger);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const resetHandler = () => {
    setDateRange({
      from: moment().subtract(1, "week").toDate(),
      to: moment().toDate(),
    });
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const titleRenderer = (title: string) => {
    switch (title) {
      case "gcCount":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.connectedDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>GC Count/Devices</span>
          </div>
        );
      case "gaCount":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.registeredDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>Registered Devices</span>
          </div>
        );
      case "totalDevice":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.totalDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>Total Device</span>
          </div>
        );
      case "inactiveDevice":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.inactiveDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>Inactive Device</span>
          </div>
        );
      case "noHeartbeatDevice":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.noHeartbeatDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>No Heartbeat Device</span>
          </div>
        );
      case "heartbeatDevice":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.heartbeatDevices}
              alt={title}
              width={44}
              height={44}
            />
            <span>Heartbeat Device</span>
          </div>
        );
      case "activeDevice":
        return (
          <div className="flex gap-2 items-center">
            <Image
              src={dashboard?.activeUsers}
              alt={title}
              width={44}
              height={44}
            />
            <span>Active Users</span>
          </div>
        );
      default:
        return title;
    }
  };

  const transformData = (data: IDashboardReport | undefined) => {
    if (!data) return { columns: [], data: [] };

    const dates = data?.gaCount?.map((item) => item.date);
    const columns: ColumnDef<any>[] = [
      {
        header: "Title",
        accessorKey: "title",
        id: "title",
        cell: ({ row }: any) => titleRenderer(row?.original?.title),
      },
      ...dates.map((date) => ({
        header: date,
        accessorKey: date,
        id: date,
        cell: ({ row }: any) => {
          const original = row?.original;
          if (original.title === "gcCount") {
            return (
              <div>
                <Badge
                  variant={"info"}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(
                      `${router.asPath}/${original.title}?date=${date}`
                    );
                  }}
                >
                  {original[date]}
                </Badge>{" "}
                /{" "}
                <Badge
                  variant={"info"}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`${router.asPath}/gcDeviceCount?date=${date}`);
                  }}
                >
                  {original[`gcDeviceCount_${date}`]}
                </Badge>
              </div>
            );
          }
          return (
            <Badge
              variant={"info"}
              className="cursor-pointer"
              onClick={() => {
                router.push(`${router.asPath}/${original.title}?date=${date}`);
              }}
            >
              {original[date]}
            </Badge>
          );
        },
      })),
    ];

    const categories = (Object.keys(data) as (keyof IDashboardReport)[])
      .filter((key) => key !== "gcDeviceCount")
      .map((key) => {
        const row: { title: string; [key: string]: any } = { title: key };
        data[key]?.forEach((item) => {
          row[item?.date] = item?.count;
          if (key === "gcCount") {
            row[`gcDeviceCount_${item?.date}`] =
              data?.gcDeviceCount?.find((gcItem) => gcItem?.date === item?.date)
                ?.count || 0;
          }
        });
        return row;
      });

    return { columns, data: categories };
  };

  const transformedData = transformData(dashboardReport?.data);

  const exportMutation = useMutation({
    mutationFn: () =>
      exportDashboardReport(
        moment(dateRange?.from).format("YYYY-MM-DD"),
        moment(dateRange?.to).format("YYYY-MM-DD")
      ),

    onSuccess: (data) => {
      const fileName = `dashboard_report_${moment(new Date()).format(
        "YYYY-MM-DD"
      )}.csv`;
      exportToCsv(fileName, data?.data);
    },
  });

  const exportHandler = () => {
    exportMutation.mutate();
    showToast(TOAST_TYPES.success, "Download will start shortly!");
  };

  return {
    // States
    perPage,
    page,
    setPerPage,
    setPage,
    dateRange,
    setDateRange,

    // Functions
    searchHandler,
    perPageHandler,
    pageChangeHandler,
    resetHandler,
    exportHandler,

    // API
    dashboardReport,
    dashboardReportLoading,
    transformedData,
    exportMutation,
  };
};

export default useDashboardReport;
