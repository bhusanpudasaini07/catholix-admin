import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { getDashboardReportDetail } from "@/services/report/report-service";
import { ColumnDef } from "@tanstack/react-table";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import {
  IDashboardReportDetail,
  IDashboardReportDetailHeader,
  IDashboardReportDetailResult,
} from "@/interface/report-interface";

interface IProps {
  data: IDashboardReportDetail;
}

const useDashboardReportDetail = () => {
  const router = useRouter();
  const { type, date } = router.query;

  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const typeChange = (type: string) => {
    switch (type) {
      case "activeDevice":
        return "active_devices";
      case "inactiveDevice":
        return "inactive_devices";
      case "heartbeatDevice":
        return "heartbeat_devices";
      case "noHeartbeatDevice":
        return "noheartbeat_devices";
      case "totalDevice":
        return "total_devices";
      case "gaCount":
        return "ga";
      case "gcCount":
        return "gc";
      case "gcDeviceCount":
        return "gc_devices";
    }
  };

  const {
    data: dashboardReportDetailData,
    isLoading: dashboardReportDetailLoading,
  } = useQuery<IProps>({
    queryKey: ["dashboardReportDetail", page, perPage, date, type],
    queryFn: async () => {
      if (type && date) {
        const response = await getDashboardReportDetail(
          page,
          perPage,
          date as string,
          typeChange(type as string) || ""
        );
        return response;
      }
    },
  });

  const generateColumns = (): ColumnDef<IDashboardReportDetailResult>[] => {
    const columns: ColumnDef<IDashboardReportDetailResult>[] = [
      {
        id: "sn",
        header: "S.N",
        cell: ({ row }) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
    ];

    if (dashboardReportDetailData?.data?.headers) {
      dashboardReportDetailData.data.headers.forEach(
        (header: IDashboardReportDetailHeader) => {
          columns.push({
            id: header.access_key,
            accessorKey: header.access_key,
            header: header.display_name,
            cell: ({ row }: any) => {
              const value = row.original[header.access_key];
              return <p>{value || "-"}</p>;
            },
          });
        }
      );
    }

    return columns;
  };

  const columns = generateColumns();

  return {
    type,
    date,
    perPage,
    page,
    perPageHandler,
    pageChangeHandler,
    dashboardReportDetailData,
    dashboardReportDetailLoading,
    columns,
  };
};

export default useDashboardReportDetail;
