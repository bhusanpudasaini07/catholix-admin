import {
  IProjectSprint,
  IProjectSprintBurndown,
  IProjectUserStories,
} from "@/interface/project-interface";
import {
  getProjectSprintBurndown,
  getProjectSprints,
  getProjectStories,
} from "@/services/project/project-service";
import { hourTimeFormatter } from "@/shared/utils/rp-utils";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  data: IProjectUserStories[];
}

const useSprintStatus = () => {
  const router = useRouter();
  const { code } = router.query;
  const [sprintId, setSprintId] = useState("");
  const [storyId, setStoryId] = useState("");

  // project sprints
  const { data: projectSprints, isLoading: projectSprintLoading } =
    useQuery<IProjectSprint>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectSprints(code);
          return response;
        }
      },
      queryKey: ["projectSprints", code],
      onSuccess: (data) => {
        setSprintId(data?.data[data?.data.length - 1]?.id);
      },
    });

  // Sprint Burndown
  const { data: sprintBurndown, isLoading: sprintBurndownLoading } =
    useQuery<IProjectSprintBurndown>({
      queryFn: async () => {
        if (sprintId && code) {
          const response = await getProjectSprintBurndown(code, sprintId);
          return response;
        }
      },
      queryKey: ["sprintBurndown", sprintId, code],
    });

  // APIS and COLUMNS
  const { data: projectStories, isLoading: projectStoriesLoading } =
    useQuery<IProps>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectStories(
            code,
            "", // keyword
            "", // sort_key
            "", // order asc|desc
            "", //status
            sprintId //sprint_id
          );
          return response;
        }
      },
      queryKey: ["projectStories", code, sprintId],
      cacheTime: 0,
    });

  const changeSprintHandler = (value: string) => {
    switch (value) {
      case "prev":
        const prevSprintIndex =
          projectSprints?.data?.findIndex((sprint) => sprint.id === sprintId)! -
          1;
        if (prevSprintIndex >= 0) {
          setSprintId(projectSprints?.data[prevSprintIndex]?.id!);
        }
        break;
      case "next":
        const nextSprintIndex =
          projectSprints?.data?.findIndex((sprint) => sprint.id === sprintId)! +
          1;
        if (
          projectSprints?.data &&
          nextSprintIndex < projectSprints?.data?.length
        ) {
          setSprintId(projectSprints?.data[nextSprintIndex]?.id);
        }
        break;
      default:
        break;
    }
  };

  const projectStoryDetail: IProjectUserStories | undefined = useMemo(() => {
    const detail = projectStories?.data?.find(
      (story) => story?.title === storyId
    );
    return detail;
  }, [projectStories, storyId]);

  const taskChart = {
    legend: {
      top: "center",
      left: "0",
      orient: "vertical",
      itemWidth: 16,
      itemHeight: 16,
    },
    tooltip: {
      show: true,
    },

    series: [
      {
        name: "Task Chart",
        type: "pie",
        radius: [30, 70],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
        data: projectSprints?.data
          ?.find((sprint) => sprint?.id === sprintId)
          ?.task_count?.map((task) => ({
            value: task?.value,
            name: task?.title,
          })),
      },
    ],
  };

  const sprintBurndownOption = {
    color: ["#60a5fa", "#f87171"],

    dataset: [
      {
        // Original dataset
        id: "burndown_data",
        source: sprintBurndown
          ? sprintBurndown?.data?.map((item) => {
              return [
                item?.date,
                item?.total_ideal_time,
                Number(item?.total_time),
              ];
            })
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
            hourTimeFormatter(item.value[item.seriesIndex + 1]) +
            // changeNumberFormat(item.value[item.seriesIndex + 1]) +
            "<br/>";
        });
        return result;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
  };

  return {
    // STATES
    sprintId,
    setSprintId,
    storyId,
    setStoryId,

    // API
    projectSprints,
    projectSprintLoading,
    sprintBurndownLoading,
    projectStories,
    projectStoriesLoading,
    projectStoryDetail,

    // Charts
    taskChart,
    sprintBurndownOption,

    // Functions
    changeSprintHandler,
  };
};

export default useSprintStatus;
