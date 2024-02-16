import React from "react";
import TaskTimeSpentHeader from "./task-time-header";
import TaskTimeLogs from "./task-time-logs";
import TopTimeConsumed from "./top-time-consumed";
import TaskTimeTable from "./task-time-table";

const TaskTimeSpentContent = () => {
  return (
    <>
      <TaskTimeSpentHeader />
      <div className="p-8 max-h-[calc(100vh-170px)] overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          <TaskTimeLogs />
          <TopTimeConsumed />
          <TaskTimeTable />
        </div>
      </div>
    </>
  );
};

export default TaskTimeSpentContent;
