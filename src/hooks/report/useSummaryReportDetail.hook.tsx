import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import { getSummaryReportDetail } from "@/services/report/report-service";
import { ColumnDef } from "@tanstack/react-table";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import {
  ISummaryReportDetail,
  ISummaryReportDetailHeader,
  ISummaryReportDetailResult,
} from "@/interface/report-interface";
import { Badge } from "@/shared/components/ui/badge";

interface IProps {
  data: ISummaryReportDetail;
}

const useSummaryReportDetail = () => {
  const router = useRouter();
  const { type, startDate, endDate } = router.query;

  // STATES
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const {
    data: summaryReportDetailData,
    isLoading: summaryReportDetailLoading,
  } = useQuery<IProps>({
    queryKey: ["summaryReportDetail", page, perPage],
    queryFn: async () => {
      if (type && startDate && endDate) {
        const response = await getSummaryReportDetail(
          page,
          perPage,
          startDate as string,
          endDate as string,
          type as string
        );
        return response;
      }
    },
  });

  //   Columns
  //   const columns: ColumnDef<ISummaryReportDetailResult>[] = [
  //     {
  //       id: "sn",
  //       accessorKey: "sn",
  //       header: "SN",
  //       cell: ({ row }) => {
  //         return (
  //           <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
  //         );
  //       },
  //     },
  //     {
  //       id: "action_code_v",
  //       accessorKey: "action_code_v",
  //       header: "Action Code",
  //     },
  //     {
  //       id: "agent_msisdn_v",
  //       accessorKey: "agent_msisdn_v",
  //       header: "Agent MSISDN",
  //     },
  //     {
  //       id: "device_user_id",
  //       accessorKey: "device_user_id",
  //       header: "Device User ID",
  //     },
  //     {
  //       id: "imei1",
  //       accessorKey: "imei1",
  //       header: "IMEI",
  //     },
  //     {
  //       id: "simreg_kit_num_v",
  //       accessorKey: "simreg_kit_num_v",
  //       header: "SIM Reg Kit Number",
  //     },
  //     {
  //       id: "status_v",
  //       accessorKey: "status_v",
  //       header: "Status",
  //       cell: ({ row }) => {
  //         return <Badge variant={"info"}>{row.original.status_v}</Badge>;
  //       },
  //     },
  //     {
  //       id: "updated_dt",
  //       accessorKey: "updated_dt",
  //       header: "Updated Date",
  //     },
  //     {
  //       id: "vendor_channel",
  //       accessorKey: "vendor_channel",
  //       header: "Vendor Channel",
  //     },
  //     // {
  //     //   id: "date",
  //     //   accessorKey: "date",
  //     //   header: "Date",
  //     // },
  //   ];

  //   Columns
  const generateColumns = (): ColumnDef<ISummaryReportDetailResult>[] => {
    const columns: ColumnDef<ISummaryReportDetailResult>[] = [
      {
        id: "sn",
        header: "S.N",
        cell: ({ row }) => (
          <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
        ),
      },
    ];

    if (summaryReportDetailData?.data?.headers) {
      summaryReportDetailData?.data?.headers?.forEach(
        (header: ISummaryReportDetailHeader) => {
          columns.push({
            id: header?.access_key,
            accessorKey: header?.access_key,
            header: header?.display_name,
            cell: ({ row }: any) => {
              const value = row?.original?.[header?.access_key];
              if (
                header?.type === "number" &&
                header?.access_key === "conversion_rate"
              ) {
                return <Badge variant="warning">{value}%</Badge>;
              }
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
    // Router
    type,

    // States
    perPage,
    page,

    // Functions
    perPageHandler,
    pageChangeHandler,

    // Data
    summaryReportDetailData,
    summaryReportDetailLoading,

    // Columns
    columns,
  };
};

export default useSummaryReportDetail;
