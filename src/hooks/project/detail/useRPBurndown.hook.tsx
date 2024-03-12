import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { IBurndownDate, IBurndownDetail, IDailyRP } from '@/interface/project-interface';
import { getProjectBurndown, getTimeLogs } from '@/services/project/project-service';
import { cn } from '@/shared/utils/utils';
import { ColumnDef } from '@tanstack/react-table';

const useRPBurndown = () => {
  const router = useRouter();
  const { code } = router?.query;

  // STATES
  const [date, setDate] = useState("");

  // Burndown Data
  const { data: burndownData, isLoading } = useQuery<IBurndownDetail>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectBurndown(code);
        return response;
      }
    },
    queryKey: ["burndownData", code],
  });

  // Daily RP Detail
  const { data: dailyRPData, isLoading: dailyRPLoading } = useQuery({
    queryFn: async () => {
      if (code) {
        const response = await getTimeLogs(
          code,
          "",
          1,
          200,
          "log_by,time,date,rp",
          date,
          date,
          "DESC"
        );
        return response;
      }
    },
    queryKey: ["dailyRpData", code, date],
    enabled: !!date,
  });

  // Consumption List Column
  const columns: ColumnDef<IBurndownDate>[] = [
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-zinc-500">
          <p className="mb-1">{moment(row?.getValue("date")).format("ll")}</p>
          <p>{moment(row?.getValue("date")).format("ddd")}</p>
        </div>
      ),
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Used Budget",
      cell: ({ row }: any) => {
        return (
          <div
            className={cn(
              date === row?.original?.date && "text-primary",
              "font-medium cursor-pointer"
            )}
            onClick={() => setDate(row?.original?.date)}
          >
            {row?.getValue("rp")}
          </div>
        );
      },
    },
  ];

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  // Consumption List Data
  const burndownTableData: any =
    burndownData &&
    Object?.entries(burndownData?.data?.daily_data)
      .reverse()
      .map(([key, value]: any) => {
        return {
          date: key,
          rp: value?.used_rp ?? 0,
        };
      });

  const burndownOption = {
    color: ["#60a5fa", "#f87171"],

    dataset: [
      {
        // Original dataset
        id: "burndown_data",
        source: burndownData
          ? Object?.entries(burndownData?.data?.daily_data).map(
              ([key, value]: any) => {
                return [key, value?.ideal_sales_rp, value?.real_sales_rp];
              }
            )
          : [],
      },
      // ideal_data
      {
        id: "burndown_ideal_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Adjust the condition according to your needs
            and: [{ dimension: 1, ">": 0 }],
          },
        },
      },
      // real_data
      {
        id: "burndown_real_data",
        fromDatasetId: "burndown_data",
        transform: {
          type: "filter",
          config: {
            // Corrected to filter out entries where real_sales_rp (third column, hence dimension: 2) is greater than 0
            and: [{ dimension: 2, ">": 0 }],
          },
        },
      },
    ],
    series: [
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_ideal_data",
        showSymbol: false,
        encode: {
          // Assuming the first column is 'date', the second is 'ideal_sales_rp', and the third is 'real_sales_rp'
          x: 0, // date
          y: 1, // ideal_sales_rp
        },
      },
      {
        type: "line", // or 'bar', depending on your chart type
        dataSetId: "burndown_real_data", // Use the filtered dataset
        showSymbol: false,
        encode: {
          x: 0, // date
          y: 2, // real_sales_rp
        },
      },
    ],
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: "",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let result = params[0].axisValueLabel + "<br/>";
        params.forEach(function (item: any) {
          result +=
            item.marker +
            " " +
            (item.seriesIndex === 0 ? "Ideal" : "Utilized") +
            ": " +
            item.value[item.seriesIndex + 1] +
            "<br/>";
        });
        return result;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
  };

  const dailyRPColumns: ColumnDef<IDailyRP>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.N.",
      cell: (props) => <SerialNumberCell {...props} />,
    },
    // NAME
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row?.getValue("name")}</div>,
    },
    // TOTAL TIME
    {
      id: "time",
      accessorKey: "time",
      header: "Total Time",
      cell: ({ row }) => (
        <div>
          {moment.duration(row?.original?.time, "seconds").hours() > 0 &&
            moment.duration(row?.original?.time, "seconds").hours() + "H"}{" "}
          {moment.duration(row?.original?.time, "seconds").minutes() + "M"}
        </div>
      ),
    },
    // RP
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget",
      cell: ({ row }) => <div>{row?.original?.rp.toFixed(2)}</div>,
    },
  ];

  const dailyRPTableData: IDailyRP[] = useMemo(() => {
    const groupedData = dailyRPData?.data.reduce((acc: any[], curr: any) => {
      const existingUserIndex = acc.findIndex(
        (user) => user.username === curr?.log_by?.username
      );
      if (existingUserIndex === -1) {
        acc.push({
          name: curr?.log_by?.fullname,
          username: curr?.log_by?.username,
          time: curr.time,
          rp: curr.rp,
        });
      } else {
        acc[existingUserIndex].time += curr.time;
        acc[existingUserIndex].rp += curr.rp;
      }
      return acc;
    }, []);

    return groupedData;
  }, [dailyRPData, date]);

  // EFFECT
  /**
   * To make default selected date
   */
  useEffect(() => {
    burndownTableData && date === "" && setDate(burndownTableData[0]?.date);
  }, [burndownTableData]);

  return {
    burndownData,
    isLoading,
    columns,
    burndownTableData,
    burndownOption,
    date,
    dailyRPLoading,
    dailyRPTableData,
    dailyRPColumns,
  };
};

export default useRPBurndown;
