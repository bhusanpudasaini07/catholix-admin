import TaskTimeSpentContent from "@/features/Projects/task-time-spent";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const TaskTimeSpent: NextPageWithLayout = () => {
  return <TaskTimeSpentContent />;
};

export default TaskTimeSpent;

TaskTimeSpent.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
