import {
  IProjectTaskBugRatio,
  IProjectTaskBugRatios,
  ITypeCount,
  ITypes,
} from "@/interface/project-interface";
import {
  getProjectTaskBugRatio,
  getProjectTaskLabelRp,
} from "@/services/project/project-service";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

const useMoreDetail = () => {
  const {
    query: { code },
  } = useRouter();

  //   STATES
  const [selectValues, setSelectValues] = useState({
    status: "utilization",
    category: "utilization",
    platform: "utilization",
  });

  const setSelectValue = (
    type: "status" | "category" | "platform",
    value: string
  ) => {
    setSelectValues((prev) => ({ ...prev, [type]: value }));
  };

  //   Project TASK LABEL DATA
  const { data: projectTaskLabelData, isLoading } = useQuery<ITypes>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectTaskLabelRp(code);
        return response;
      }
    },
    queryKey: ["projectTaskLabelData", code],
  });

  //   PROJECT BUG TASK RATIO
  const { data: bugTaskRatioData, isLoading: bugTaskLoading } =
    useQuery<IProjectTaskBugRatios>({
      queryFn: async () => {
        if (code) {
          const response = await getProjectTaskBugRatio(code);
          return response;
        }
      },
      queryKey: ["bugTaskRatioData", code],
    });

  //   Status Column
  const typeColumn: ColumnDef<ITypeCount>[] = [
    // status
    {
      id: "title",
      accessorKey: "title",
      header: "Status",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row.getValue("title")}
        </div>
      ),
      enableHiding: false,
    },
    // RP consumption
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row.getValue("rp"))}
        </div>
      ),
      enableHiding: false,
    },
    // Utilization
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "Utilization",
      cell: ({ row }) => {
        const totalRP = projectTaskLabelData
          ? projectTaskLabelData?.data[2]?.count?.reduce(
              (total: number, item: ITypeCount) => total + Number(item?.rp),
              0
            )
          : 0;

        const utilizedPercentage = (Number(row?.original?.rp) / totalRP) * 100;
        return (
          <div className="font-semibold text-zinc-700">
            {utilizedPercentage?.toFixed(2)}%
          </div>
        );
      },

      enableHiding: false,
    },
  ];

  //   STATUS PIE OPTION
  const statusOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0891B2",
      "#FACC15",
      "#84CC16",
      "#2DD4BF",
      "#818CF8",
      "#7C3AED",
      "#D8B4FE",
      "#F472B6",
      "#FB923C",
      "#F87171",
      "#A8A29E",
    ],
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outer",
          //   formatter: "{b}: {c} ({d}%)",
        },
        emphasis: {
          label: {
            show: false,
          },
          labelLine: {
            show: true,
          },
        },
        labelLine: {
          show: true,
          length: 20,
          minTurnAngle: 0,
          maxSurfaceAngle: 360,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data[2]?.count?.map((item) => {
              const totalRP = projectTaskLabelData
                ? projectTaskLabelData?.data[2]?.count?.reduce(
                    (total: number, item: ITypeCount) =>
                      total + Number(item?.rp),
                    0
                  )
                : 0;

              const utilizedPercentage = (Number(item?.rp) / totalRP) * 100;
              return {
                value:
                  selectValues?.status === "utilization"
                    ? utilizedPercentage?.toFixed(2)
                    : item?.rp,
                name: item?.title,
              };
            })
          : [],
      },
    ],
  };

  //   Category PIE OPTION

  const categoryOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#FACC15",
      "#84CC16",
      "#2DD4BF",
      "#0891B2",
      "#818CF8",
      "#7C3AED",
      "#D8B4FE",
      "#F472B6",
      "#FB923C",
      "#F87171",
      "#A8A29E",
    ],
    series: [
      {
        name: "Category",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outer",
        },
        emphasis: {
          label: {
            show: false,
          },
          labelLine: {
            show: true,
          },
        },
        labelLine: {
          show: true,
          length: 20,
          minTurnAngle: 0,
          maxSurfaceAngle: 360,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data[0]?.count?.map((item) => {
              const totalRP = projectTaskLabelData
                ? projectTaskLabelData?.data[2]?.count?.reduce(
                    (total: number, item: ITypeCount) =>
                      total + Number(item?.rp),
                    0
                  )
                : 0;

              const utilizedPercentage = (Number(item?.rp) / totalRP) * 100;
              return {
                value:
                  selectValues?.category === "utilization"
                    ? utilizedPercentage?.toFixed(2)
                    : item?.rp,
                name: item?.title,
              };
            })
          : [],
      },
    ],
  };

  //   Platform/Component PIE OPTION
  const platformComponentOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#FACC15",
      "#84CC16",
      "#2DD4BF",
      "#0891B2",
      "#818CF8",
      "#7C3AED",
      "#D8B4FE",
      "#F472B6",
      "#FB923C",
      "#F87171",
      "#A8A29E",
    ],
    series: [
      {
        name: "Platform/Component",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outer",
        },
        emphasis: {
          label: {
            show: false,
          },
          labelLine: {
            show: true,
          },
        },
        labelLine: {
          show: true,
          length: 20,
          minTurnAngle: 0,
          maxSurfaceAngle: 360,
        },
        data: projectTaskLabelData
          ? projectTaskLabelData?.data[1]?.count?.map((item) => {
              const totalRP = projectTaskLabelData
                ? projectTaskLabelData?.data[2]?.count?.reduce(
                    (total: number, item: ITypeCount) =>
                      total + Number(item?.rp),
                    0
                  )
                : 0;

              const utilizedPercentage = (Number(item?.rp) / totalRP) * 100;
              return {
                value:
                  selectValues?.platform === "utilization"
                    ? utilizedPercentage?.toFixed(2)
                    : item?.rp,
                name: item?.title,
              };
            })
          : [],
      },
    ],
  };

  //   Bug task ratio column

  const bugTaskRatioColumn: ColumnDef<IProjectTaskBugRatio>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Platform/Component",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {row?.getValue("title")}
        </div>
      ),
    },
    {
      id: "task_rp",
      accessorKey: "task_rp",
      header: "Regular",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("task_rp"))}
        </div>
      ),
    },
    {
      id: "bug_rp",
      accessorKey: "bug_rp",
      header: "Bug",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-700">
          {changeNumberFormat(row?.getValue("bug_rp"))}
        </div>
      ),
    },
    {
      id: "ratio",
      accessorKey: "ratio",
      header: "Bug to Task Ratio",
      cell: ({ row }) => {
        const ratio = row?.original?.bug_rp / row?.original?.task_rp;
        return (
          <div className="font-semibold text-zinc-700">
            {row?.original?.task_rp === 0 ? "0.00" : ratio.toFixed(2)}
          </div>
        );
      },
    },
  ];

  return {
    projectTaskLabelData,
    isLoading,
    typeColumn,
    statusOption,
    categoryOption,
    platformComponentOption,
    selectValues,
    setSelectValue,
    bugTaskRatioData,
    bugTaskLoading,
    bugTaskRatioColumn,
  };
};

export default useMoreDetail;
