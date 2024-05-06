import React from "react";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useTaskTimeSpent from "@/hooks/project/detail/useTaskTimeSpent.hook";

import TaskTimeSpentHeader from "./task-time-header";
import TaskTimeLogs from "./task-time-logs";
import TaskTimeTable from "./task-time-table";
import TopTimeConsumed from "./top-time-consumed";
import { Card, CardContent } from "@/shared/components/ui/card";
import LatestTaskTrend from "../project-stories/latest-task-trend";

const TaskTimeSpentContent = () => {
  const { projectDetail } = useProjectDetail();
  const {
    timeLogLoading,
    timeLogs,
    columns,
    setSearchText,
    perPage,
    setPerPage,
    timeConusmedOption,
    searchText,
  } = useTaskTimeSpent();
  return (
    <>
      <TaskTimeSpentHeader name={projectDetail?.data?.project_title!} />
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <TaskTimeLogs
                time={projectDetail?.data?.time?.estimated_time ?? "0"}
                timeSpent={projectDetail?.data?.time?.used_time ?? "0"}
                task={projectDetail?.data?.task?.all_task_count ?? "0"}
                bugs={projectDetail?.data?.task?.bug_count ?? "0"}
                rp={projectDetail?.data?.rp?.used_rp ?? 0}
                open={projectDetail?.data?.task?.open_task_count ?? 0}
                closed={projectDetail?.data?.task?.closed_task_count ?? 0}
                bugPercentage={
                  projectDetail?.data?.task?.bug_ratio_percentage ?? 0
                }
              />
            </div>
            <div className="xl:col-span-1">
              <LatestTaskTrend />
            </div>
          </div>

          {/* <TopTimeConsumed timeConusmedOption={timeConusmedOption} /> */}
          <TaskTimeTable
            timeLogLoading={timeLogLoading}
            timeLogs={timeLogs}
            columns={columns}
            setSearchText={setSearchText}
            perPage={perPage}
            setPerPage={setPerPage}
            searchText={searchText}
          />
        </div>
      </div>
    </>
  );
};

export default TaskTimeSpentContent;
