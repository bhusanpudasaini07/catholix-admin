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

  const [date, setDate] = useState<DateRange>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });
  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);

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
      header: "Budget",
      cell: ({ row }) => (
        <p className="font-semibold text-zinc-700">{row?.getValue("rp")}</p>
      ),
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
    setDateRangeOpen(false);
  };

  // For each market color indication
  const colors = [
    "#2dd4bf",
    "#84cc16",
    "#7c3aed",
    "#818cf8",
    "#facc15",
    "#f87171",
    "#fb923c",
    "#0ea5e9",
  ];

  //--------------------------------------
  const { data: marketSummary, isLoading: marketLoading } =
    useQuery<IMarketSummary>({
      queryFn: () =>
        getProjectSummary(
          moment(date?.from).format("YYYY-MM-DD"),
          moment(date?.to).format("YYYY-MM-DD")
        ),
      queryKey: ["marketSummary", date?.to],
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
      rp: project.info.total_rp,
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
        rp: project.info.total_rp,
        source: project.info.source,
        market: project.info?.market,
        rp_consumed: ((project.info.total_rp / totalRP) * 100).toFixed(2),
      };
    });

    return {
      projects,
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
          value: project.info?.total_rp, // Use the project's total RP for the placeholder role
        });
      } else {
        // Process each role for the project
        projectRoles.forEach((role) => {
          const roleName = role?.title; // Unique name for role within project

          // Add role node
          addNodeIfNotExist(roleName);

          const valuePerRole =
            projectRoles.length > 0
              ? project.info.total_rp / projectRoles.length
              : 0;

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
            value: item?.rp.toFixed(2),
            name: item?.title,
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
