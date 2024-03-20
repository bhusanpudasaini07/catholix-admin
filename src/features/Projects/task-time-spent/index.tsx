import React from "react";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useTaskTimeSpent from "@/hooks/project/detail/useTaskTimeSpent.hook";

import TaskTimeSpentHeader from "./task-time-header";
import TaskTimeLogs from "./task-time-logs";
import TaskTimeTable from "./task-time-table";
import TopTimeConsumed from "./top-time-consumed";

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
  } = useTaskTimeSpent();
  return (
    <>
      <TaskTimeSpentHeader name={projectDetail?.data?.project_title!} />
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          <TaskTimeLogs
            time={projectDetail?.data?.time?.estimated_time ?? "0"}
            timeSpent={projectDetail?.data?.time?.used_time ?? "0"}
            task={projectDetail?.data?.task?.all_task_count ?? "0"}
            bugs={projectDetail?.data?.task?.bug_count ?? "0"}
            rp={projectDetail?.data?.rp?.used_rp ?? 0}
            open={projectDetail?.data?.task?.open_task_count ?? 0}
            closed={projectDetail?.data?.task?.closed_task_count ?? 0}
            bugPercentage={projectDetail?.data?.task?.bug_ratio_percentage ?? 0}
          />
          <TopTimeConsumed timeConusmedOption={timeConusmedOption} />
          <TaskTimeTable
            timeLogLoading={timeLogLoading}
            timeLogs={timeLogs}
            columns={columns}
            setSearchText={setSearchText}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default TaskTimeSpentContent;
