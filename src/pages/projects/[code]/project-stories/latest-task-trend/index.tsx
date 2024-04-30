import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import TrendOverviewGraph from "@/features/Projects/project-stories/latest-task-trend/task-trend-graph";
import TaskTrendHeader from "@/features/Projects/project-stories/latest-task-trend/task-trend-header";
import TaskTrendTable from "@/features/Projects/project-stories/latest-task-trend/task-trend-table";
import useLatestTrend from "@/hooks/project/detail/useLatestTrend.hook";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

const LatestTaskTrend: NextPageWithLayout = () => {
  const {
    trendOption,
    trendData,
    trendDataLoading,
    taskHistoryColumn,
    enhancedTasks,
  } = useLatestTrend();
  return (
    <>
      <TaskTrendHeader
        projectCode={trendData?.data?.project_info?.code}
        projectName={trendData?.data?.project_info?.title}
        loading={trendDataLoading}
      />
      <div className="p-6  max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <TrendOverviewGraph option={trendOption} loading={trendDataLoading} />
          <TaskTrendTable
            data={enhancedTasks ?? []}
            column={taskHistoryColumn}
            loading={trendDataLoading}
          />
        </div>
      </div>
    </>
  );
};

export default LatestTaskTrend;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.code,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

LatestTaskTrend.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
