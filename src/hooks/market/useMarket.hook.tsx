import { ColumnDef } from "@tanstack/react-table";
import { EChartsOption } from "echarts-for-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const useMarket = () => {
  const dymmyIndividualData = [
    {
      source: "Client",
      title: "Wonder Trivia",
      value: 120,
    },
    {
      source: "Client",
      title: "CityPay",
      value: 80,
    },
    {
      source: "In-House",
      title: "RPM",
      value: 40,
    },
    {
      source: "Client",
      title: "Salvi",
      value: 100,
    },
    {
      source: "In-House",
      title: "Wonder Trivia",
      value: 120,
    },
  ];
  const pieChartRef = useRef<EChartsOption>(null);

  //   STATES
  const [tabItem, setTabItem] = useState({
    title: "sankey",
    id: 0,
  });

  const marketColumn: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">{row?.index + 1}</div>
      ),
    },
    // Project name
    {
      id: "title",
      accessorKey: "title",
      header: "Project Name",
      cell: ({ row }) => (
        <Link
          className="font-semibold text-zinc-700"
          href={`/projects/${row?.original?.code}`}
        >
          {row?.getValue("title")}
        </Link>
      ),
    },
    // Project Type
    {
      id: "source",
      accessorKey: "source",
      header: "Project Type",
      cell: ({ row }) => (
        <p className="font-semibold text-zinc-700">{row?.getValue("source")}</p>
      ),
    },
    // Occupied %
    {
      id: "occupied_percentage",
      accessorKey: "occupied_percentage",
      header: "Occupied %",
      cell: ({ row }) => (
        <p className="font-semibold text-zinc-700">
          {row?.getValue("occupied_percentage")}
        </p>
      ),
    },
    // RP Used
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Used",
      cell: ({ row }) => (
        <p className="font-semibold text-zinc-700">{row?.getValue("rp")}</p>
      ),
    },
  ];

  //------------------------------------

  // Overall Stats Pie Chart
  const marketsPieChartOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["50%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          position: "center",
          formatter: (params: any) => {
            return (
              "{a|" +
              (params?.value ? parseFloat(params.value).toFixed(2) : "") +
              "}\n{b|" +
              params?.name +
              "}"
            );
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 14,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  // Overall Stats Bar Chart
  const marketBarChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      left: "right",
      itemWidth: 16,
      itemHeight: 16,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["Nepal", "Japan", "USA", "India", "Europe", "Singapore", "Korea"],
    },
    series: [
      {
        name: "Client",
        type: "bar",
        data: [8, 5, 4, 10, 4, 6],
      },
      {
        name: "In-House",
        type: "bar",
        data: [2, 5, 1, 6, 4, 6],
      },
    ],
  };

  // Individual Market Bar Option
  const individualMarketBarOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      left: "right",
      itemWidth: 16,
      itemHeight: 16,
    },
    grid: {
      top: "10%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    xAxis: {
      type: "category",
      data: dymmyIndividualData?.map((item) => item?.title),
    },
    series: [
      {
        name: "Client",
        type: "bar",
        data: dymmyIndividualData?.map((item) => {
          return {
            value: item?.value,
            itemStyle: {
              color: item?.source === "Client" ? "#5470C6" : "#22C55E",
            },
          };
        }),
      },
    ],
  };

  // Individual Sankey Chart Option
  const individualSankeyOption = {
    grid: {
      top: "3%",
      bottom: "3%",
      left: "3%",
      right: "3%",
    },
    series: {
      type: "sankey",
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      data: [
        {
          name: "a",
        },
        {
          name: "b",
        },
        {
          name: "a1",
        },
        {
          name: "a2",
        },
        {
          name: "b1",
        },
        {
          name: "c",
        },
      ],
      links: [
        {
          source: "a",
          target: "a1",
          value: 5,
        },
        {
          source: "a",
          target: "a2",
          value: 3,
        },
        {
          source: "b",
          target: "b1",
          value: 8,
        },
        {
          source: "a",
          target: "b1",
          value: 3,
        },
        {
          source: "b1",
          target: "a1",
          value: 1,
        },
        {
          source: "b1",
          target: "c",
          value: 2,
        },
      ],
    },
  };

  //   For pie chart hover effect
  useEffect(() => {
    const myChart = pieChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return (
                  "{a|" +
                  (params?.value ? parseFloat(params.value).toFixed(2) : "") +
                  "}\n{b|" +
                  params?.name +
                  "}"
                );
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 14,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    marketsPieChartOption && myChart.setOption(marketsPieChartOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [marketsPieChartOption]);

  return {
    // STATES
    tabItem,
    setTabItem,
    //Table
    marketColumn,

    // Charts
    pieChartRef,
    marketsPieChartOption,
    marketBarChartOption,
    individualMarketBarOption,
    individualSankeyOption,
  };
};

export default useMarket;
