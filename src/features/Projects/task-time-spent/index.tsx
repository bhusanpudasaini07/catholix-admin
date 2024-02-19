import React from "react";
import TaskTimeSpentHeader from "./task-time-header";
import TaskTimeLogs from "./task-time-logs";
import TopTimeConsumed from "./top-time-consumed";
import TaskTimeTable from "./task-time-table";
import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";

const TaskTimeSpentContent = () => {
  const { projectDetail } = useProjectDetail();
  return (
    <>
      <TaskTimeSpentHeader name={projectDetail?.data?.project_title!} />
      <div className="p-8 max-h-[calc(100vh-170px)] overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          <TaskTimeLogs
            time={projectDetail?.data?.time?.used_time ?? "0"}
            task={projectDetail?.data?.task?.all_task_count ?? "0"}
            bugs={projectDetail?.data?.task?.bug_count ?? "0"}
            rp={projectDetail?.data?.rp?.used_rp ?? 0}
          />
          <TopTimeConsumed />
          <TaskTimeTable />
        </div>
      </div>
    </>
  );
};

export default TaskTimeSpentContent;
