import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { useQuery } from "react-query";
import {
  getSummaryReport,
  getSummaryTopData,
} from "@/services/report/report-service";
import {
  IReportData,
  ITopData,
  ITopDataDetail,
} from "@/interface/report-interface";
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import moment from "moment";

interface IProps {
  data: IReportData;
}
interface ITopDataProps {
  data: ITopData;
}

const useSummaryReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [searchTrigger, setSearchTrigger] = useState(false);

  const { data: summaryData, isLoading: summaryLoading } = useQuery<IProps>({
    queryKey: ["summary-report", searchTrigger],
    queryFn: () =>
      getSummaryReport(
        moment(dateRange.from).format("YYYY-MM-DD"),
        moment(dateRange.to).format("YYYY-MM-DD")
      ),
  });

  const { data: topData, isLoading: topLoading } = useQuery<ITopDataProps>({
    queryKey: ["summary-report-top", searchTrigger],
    queryFn: () =>
      getSummaryTopData(
        moment(dateRange.from).format("YYYY-MM-DD"),
        moment(dateRange.to).format("YYYY-MM-DD")
      ),
  });

  const changeDateRange = (date: DateRange) => {
    setDateRange(date);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  };
  //   Dealer Column
  const dealerColumns: ColumnDef<ITopDataDetail>[] = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      id: "name",
      header: "Dealer Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 justify-between items-center">
            <p>{row.original.current_count}</p>
            <Badge
              variant={
                row.original.change_percent < 0 ? "destructiveLight" : "success"
              }
            >
              {row.original.change_percent < 0 ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
            </Badge>
          </div>
        );
      },
    },
  ];

  // Agent Columns
  const agentColumns: ColumnDef<ITopDataDetail>[] = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      id: "name",
      header: "Agent Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 justify-between items-center">
            <p>{row.original.current_count}</p>
            <Badge
              variant={
                row.original.change_percent < 0 ? "destructiveLight" : "success"
              }
            >
              {row.original.change_percent < 0 ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
            </Badge>
          </div>
        );
      },
    },
  ];

  // Region Columns
  const regionColumns: ColumnDef<ITopDataDetail>[] = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      id: "name",
      header: "Region Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 justify-between items-center">
            <p>{row.original.current_count}</p>
            <Badge
              variant={
                row.original.change_percent < 0 ? "destructiveLight" : "success"
              }
            >
              {row.original.change_percent < 0 ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
            </Badge>
          </div>
        );
      },
    },
  ];

  // State Columns
  const stateColumns: ColumnDef<ITopDataDetail>[] = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      id: "name",
      header: "State Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 justify-between items-center">
            <p>{row.original.current_count}</p>
            <Badge
              variant={
                row.original.change_percent < 0 ? "destructiveLight" : "success"
              }
            >
              {row.original.change_percent < 0 ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
            </Badge>
          </div>
        );
      },
    },
  ];

  // LGA Columns
  const lgaColumns: ColumnDef<ITopDataDetail>[] = [
    {
      id: "sn",
      header: "SN",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      id: "name",
      header: "LGA Name",
      accessorKey: "name",
    },
    {
      id: "gc",
      header: "GC",
      accessorKey: "gc",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2 justify-between items-center">
            <p>{row.original.current_count}</p>
            <Badge
              variant={
                row.original.change_percent < 0 ? "destructiveLight" : "success"
              }
            >
              {row.original.change_percent < 0 ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
            </Badge>
          </div>
        );
      },
    },
  ];

  // Agent COlumns

  const dummyData = [
    { sn: 1, name: "CHRIS GLASSER", gc: 8904 },
    { sn: 2, name: "FRANCES SWANN", gc: 4574 },
    { sn: 3, name: "DENNIS CALLIS", gc: 3435 },
  ];
  return {
    // STATES
    dateRange,
    changeDateRange,
    searchTriggerHandler,
    // COLUMNS
    dealerColumns,
    agentColumns,
    regionColumns,
    stateColumns,
    lgaColumns,
    // DUMMY DATA
    dummyData,

    // API
    summaryData,
    summaryLoading,
    topData,
    topLoading,
  };
};

export default useSummaryReport;
