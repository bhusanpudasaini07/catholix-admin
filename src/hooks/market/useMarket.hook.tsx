import { EChartsOption } from "echarts-for-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import {
  IMarketProjects,
  IMarkets,
  IMarketSummary,
} from "@/interface/market-interface";
import { getProjectSummary } from "@/services/market/market-service";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  SortAsc,
} from "lucide-react";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

export interface IMarketProject {
  id: string | number;
  title: string | undefined;
  rpPercentage: string;
  project_count: number | undefined;
  color: string;
  flag: string;
}

const useMarket = () => {
  const { filterConfig } = useCommonStore();

  const pieChartRef = useRef<EChartsOption>(null);
  // For each market color indication
  const colors = [
    "#5470C6",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3BA272",
    "#FC8452",
    "#9A60B4",
  ];

  // STATES
  const [date, setDate] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const [sourceOption, setSourceOption] = useState("all");
  const [statusOption, setStatusOption] = useState("all");
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);

  // COLUMN
  const marketColumn: ColumnDef<IMarketProjects>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: ({ row }) => (
        <div className="font-medium text-zinc-700">{row?.index + 1}.</div>
      ),
    },
    // Project name
    {
      id: "title",
      accessorKey: "title",
      header: "Project Name",
      cell: ({ row }) => (
        <Link
          className="font-semibold text-primary hover:text-blue-700"
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
      id: "rp_consumed",
      accessorKey: "rp_consumed",
      header: "Occupied %",
      cell: ({ row }) => {
        return (
          <p className="font-semibold text-zinc-700">
            {row?.getValue("rp_consumed")}%
          </p>
        );
      },
    },
    // RP Used
    {
      id: "rp",
      accessorKey: "rp",
      header: ({ column }) => (
        <div className="flex gap-3 items-center">
          <p>Budget</p>
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant={"ghost"}
            className="flex flex-col gap-0 p-0 h-auto hover:bg-transparent"
          >
            <ChevronUp
              size={13}
              strokeWidth={
                column.getIsSorted() === "desc"
                  ? 3
                  : column.getIsSorted() === "asc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "desc"
                  ? "#71717A"
                  : column.getIsSorted() === "asc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
            />
            <ChevronDown
              strokeWidth={
                column.getIsSorted() === "asc"
                  ? 3
                  : column.getIsSorted() === "desc"
                  ? 1
                  : 1
              }
              stroke={
                column.getIsSorted() === "asc"
                  ? "#71717A"
                  : column.getIsSorted() === "desc"
                  ? "#C9C9D4"
                  : "#71717A"
              }
              size={13}
              className="-mt-[4px]"
            />
            {/* <ChevronsUpDown size={16} /> */}
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <p className="font-semibold text-zinc-700">
          {changeNumberFormat(Number(row?.original?.rp))}
        </p>
      ),
      enableSorting: true,
    },
  ];

  const getMarketFlag = (value: number) => {
    const flag = filterConfig?.markets?.find(
      (market: { id: string; title: string; flag: string }) =>
        Number(market?.id) === value
    )?.flag;
    return flag;
  };

  const changeDate = (date: DateRange) => {
    setDate(date);
    // setDateRangeOpen(false);
  };

  //--------------------------------------
  const { data: marketSummary, isLoading: marketLoading } =
    useQuery<IMarketSummary>({
      queryFn: () =>
        getProjectSummary(
          moment(date?.from).format("YYYY-MM-DD"),
          moment(date?.to).format("YYYY-MM-DD"),
          sourceOption,
          statusOption
        ),
      queryKey: ["marketSummary", date?.to, sourceOption, statusOption],
    });

  // Total MARKET RP
  const totalMarketRp: number =
    marketSummary?.data?.market_summary?.reduce(
      (total: number, market: IMarkets) =>
        total + (market?.client_rp + market?.inhouse_rp),
      0
    ) ?? 0;

  // Grouped the data to show their percentage used, flag and color.
  const marketOverallData = marketSummary?.data?.market_summary?.reduce(
    (acc: IMarkets[], currentMarket, index) => {
      const totalRpUsed = currentMarket.client_rp + currentMarket.inhouse_rp;
      const rpPercentage = Number((totalRpUsed / totalMarketRp) * 100);
      const color = colors[index % colors.length]; // Ensure the index wraps around the colors array
      const flag = getMarketFlag(currentMarket.id);

      acc.push({
        id: currentMarket.id,
        title: currentMarket?.title,
        rp: currentMarket?.rp,
        rpPercentage: rpPercentage.toFixed(2),
        project_count: currentMarket?.project_count,
        color,
        flag,
        client_rp: currentMarket?.client_rp,
        inhouse_rp: currentMarket?.inhouse_rp,
      });

      return acc;
    },
    []
  );

  const allMarketProjects = marketSummary?.data?.projects.map((project) => {
    const totalRP = marketSummary.data.projects.reduce(
      (acc, curr) => acc + curr.info.total_rp,
      0
    );
    return {
      title: project.info.title,
      code: project.info.code,
      rp: Number(project.info.total_rp.toFixed(2)),
      source: project.info.source,
      market: project.info?.market,
      rp_consumed: ((project.info.total_rp / totalRP) * 100).toFixed(2),
    };
  });

  // Function to transform project data into Sankey chart format
  const transformToSankeyData = (projects: any) => {
    let nodes: any = [];
    let links: any = [];

    // Helper function to add a node if it doesn't exist
    const addNodeIfNotExist = (name: string, source?: string) => {
      if (!nodes.some((node: any) => node.name === name)) {
        nodes.push({ name, source });
      }
    };

    projects.forEach((project: any) => {
      const projectTitle = project.info.title;
      const projectSource = project.info.source;
      const projectMarket = filterConfig?.markets?.find(
        (item: any) => item?.id === project.info.market
      )?.title;
      const projectValue = project.info.total_rp;

      // Add source, market, and project title as nodes if they don't already exist
      addNodeIfNotExist(projectSource, projectSource); // Source node has source attribute
      addNodeIfNotExist(projectMarket); // Market node has no source attribute
      addNodeIfNotExist(projectTitle, projectSource); // Project node has source attribute

      // Add links for source to market and market to project
      links.push(
        { source: projectSource, target: projectMarket, value: projectValue },
        { source: projectMarket, target: projectTitle, value: projectValue }
      );
    });

    return { nodes, links };
  };

  // Prepare the Sankey data directly if marketSummary?.data?.projects is available
  const sankeyData = marketSummary?.data?.projects
    ? transformToSankeyData(marketSummary.data.projects)
    : { nodes: [], links: [] };

  // Function to filter projects by market
  const getProjectsByMarket = (marketId: number) => {
    const marketTitle = filterConfig?.markets?.find(
      (item: any) => Number(item?.id) === marketId
    )?.title;
    const marketFlag = filterConfig?.markets?.find(
      (item: any) => Number(item?.id) === marketId
    )?.flag;

    const filteredProjects =
      marketSummary?.data?.projects?.filter(
        (project) => Number(project?.info?.market) === marketId
      ) ?? [];
    const totalRP = filteredProjects.reduce(
      (acc, curr) => acc + curr.info.total_rp,
      0
    );

    const projects = filteredProjects?.map((project) => {
      return {
        title: project.info.title,
        code: project.info.code,
        rp: Number(project.info.total_rp.toFixed(2)),
        source: project.info.source,
        market: project.info?.market,
        rp_consumed: ((project.info.total_rp / totalRP) * 100).toFixed(2),
      };
    });
    const sortedProjects = projects?.slice().sort((a, b) => b.rp - a.rp);

    return {
      projects,
      sortedProjects,
      market_info: {
        name: marketTitle,
        flag: marketFlag,
      },
    };
  };

  //functions to show sankey chart and bar chart of individual market
  const getIndividualSankeyOption = (marketId: number) => {
    // Filter projects by market ID
    const filteredProjects =
      marketSummary?.data?.projects?.filter(
        (project) => Number(project?.info?.market) === marketId
      ) ?? [];

    let nodes: { name: string }[] = [];
    let links: { source: string; target: string; value: number }[] = [];

    // Helper function to add a node if it doesn't exist
    const addNodeIfNotExist = (name: string) => {
      if (!nodes.some((node) => node.name === name)) {
        nodes.push({ name });
      }
    };

    filteredProjects.forEach((project) => {
      const projectTitle = project?.info?.title;
      const projectSource = project?.info?.source; // "In-House" or "Client"
      const projectRoles = project?.roles; // Assuming this is an array of roles

      // Add project source if it doesn't already exist
      addNodeIfNotExist(projectSource);

      // Add project title node
      addNodeIfNotExist(projectTitle);

      // Add links from source to project
      links.push({
        source: projectSource,
        target: projectTitle,
        value: project?.info?.total_rp,
      });

      if (projectRoles.length === 0) {
        // Add a placeholder role for projects without roles
        const placeholderRoleName = ``;
        addNodeIfNotExist(placeholderRoleName);
        links.push({
          source: projectTitle,
          target: placeholderRoleName,
          value: project?.info?.total_rp, // Use the project's total RP for the placeholder role
        });
      } else {
        // Process each role for the project
        projectRoles.forEach((role) => {
          const roleName = role?.title; // Unique name for role within project

          // Add role node
          addNodeIfNotExist(roleName);

          const valuePerRole = role?.rp ?? 0;

          // Add link from project to role
          links.push({
            source: projectTitle,
            target: roleName,
            value: valuePerRole,
          });
        });
      }
    });

    // Return the Sankey chart option for the individual market
    return {
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
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
        },
        data: nodes,
        links: links,
      },
    };
  };
  const getIndividualMarketBarOption = (marketId: number) => {
    // Assuming marketSummary?.data?.projects is of type IProject[]
    const filteredProjects =
      marketSummary?.data?.projects?.filter(
        (project) => Number(project?.info?.market) === marketId
      ) ?? [];

    const projectData = filteredProjects.map((project) => ({
      value: project?.info?.total_rp.toFixed(2),
      name: project?.info?.title,
      itemStyle: {
        color: project?.info?.source === "Client" ? "#5470C6" : "#22C55E",
      },
    }));

    const categories = filteredProjects.map((project) => project?.info?.title);

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
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
        data: categories,
        axisLabel: {
          interval: 0,
          showMaxLabel: true,
          width: 80,
          overflow: "truncate",
          ellipsis: "...",
        },
      },
      series: [
        {
          name: "Budget",
          type: "bar",
          data: projectData,
        },
      ],
    };
  };

  //------------------------------------

  // Overall Stats Pie Chart
  const marketsPieChartOption = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      show: false,
    },
    color: colors,
    series: [
      {
        name: "Market",
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
          show: true,
          formatter: (params: any) => {
            return (
              "{a|" +
              (params?.value ? parseFloat(params.value).toFixed(2) : "") +
              "%" +
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
        data: marketOverallData?.map((item: IMarkets) => {
          return {
            value: item?.rpPercentage,
            name: item?.title,
          };
        }),
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
      data: marketSummary?.data?.market_summary?.map((item) => item?.title),
    },
    series: [
      {
        name: "Client",
        type: "bar",
        data: marketSummary?.data?.market_summary?.map(
          (item) => item?.client_rp
        ),
      },
      {
        name: "In-House",
        type: "bar",
        data: marketSummary?.data?.market_summary?.map(
          (item) => item?.inhouse_rp
        ),
      },
    ],
  };

  // Individual Market Bar Option
  const allMarketBarOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //   left: "right",
    //   itemWidth: 16,
    //   itemHeight: 16,
    // },
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
      data: allMarketProjects?.map((item) => item?.title),
      axisLabel: {
        interval: 0,
        showMaxLabel: true,
        width: 80,
        overflow: "truncate",
        ellipsis: "...",
      },
    },
    series: [
      {
        name: "Budget",
        type: "bar",
        data: allMarketProjects?.map((item) => {
          return {
            value: item?.rp,
            name: item?.title,
            itemStyle: {
              color: item?.source === "Client" ? "#5470C6" : "#22C55E",
            },
          };
        }),
      },
    ],
  };

  // All market Sankey Chart Option
  const allSankeyOption = {
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
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      data: sankeyData.nodes,
      links: sankeyData.links,
    },
  };

  // Individual Market Sankey Chart Option
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
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      data: sankeyData.nodes,
      links: sankeyData.links,
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
                  "%" +
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
    dateRangeOpen,
    setDateRangeOpen,
    date,
    sourceOption,
    setSourceOption,
    statusOption,
    setStatusOption,

    //Table
    marketColumn,

    // Charts
    pieChartRef,
    marketsPieChartOption,
    marketBarChartOption,
    allMarketBarOption,
    allSankeyOption,
    individualSankeyOption,

    // functions
    changeDate,
    getProjectsByMarket,
    getIndividualSankeyOption,
    getIndividualMarketBarOption,

    //API
    marketSummary,
    marketLoading,
    marketOverallData,
    allMarketProjects,
  };
};

export default useMarket;
