import useMoreDetail from "@/hooks/project/detail/more-detail/useMoreDetail.hook";

import BugTaskRatio from "./bug-task-ratio";
import CategoryPlatform from "./category-platform-components";
import DetailOverviewMoreDetail from "./detail-overview";
import Status from "./status";
import TimeLogPattern from "./time-log-pattern";

const MoreDetailBody = () => {
  const {
    projectTaskLabelData,
    isLoading,
    statusColumn,
    statusOption,
    categoryOption,
    platformComponentOption,
    selectValues,
    setSelectValue,
    bugTaskRatioData,
    bugTaskLoading,
    bugTaskRatioColumn,
    statusChartRef,
    categoryRef,
    platformRef,
    categoryColumn,
    platformColumn,
    individualBugTaskColumn,
    bugTaskRatioOption,
    bugOption,
    labelTimeLog,
    labelTimeLoading,
    bugsRef,
    bugTaskRef,
    platId,
    bugRatioData,
  } = useMoreDetail();

  return (
    <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
      {/* <DetailOverviewMoreDetail /> */}
      <TimeLogPattern />
      <Status
        setSelectValue={setSelectValue}
        selectValue={selectValues?.status}
        typeOption={statusOption}
        chartRef={statusChartRef}
        columns={statusColumn}
        statusData={projectTaskLabelData?.data?.find(
          (item) => item?.type === "Status"
        )}
        loading={isLoading}
      />
      <CategoryPlatform
        categoryValue={selectValues?.category}
        platformValue={selectValues?.platform}
        setSelectValue={setSelectValue}
        categoryColumn={categoryColumn}
        platformColumn={platformColumn}
        tableData={projectTaskLabelData}
        loading={isLoading}
        categoryOption={categoryOption}
        platformComponentOption={platformComponentOption}
        categoryRef={categoryRef}
        platformRef={platformRef}
      />
      <BugTaskRatio
        columns={bugTaskRatioColumn}
        data={bugRatioData ?? []}
        loading={bugTaskLoading}
        individualBugTaskColumn={individualBugTaskColumn}
        bugOption={bugOption}
        bugRatioOption={bugTaskRatioOption}
        individualBugLoading={labelTimeLoading}
        individualBugData={labelTimeLog?.data?.regular_task_members ?? []}
        bugsRef={bugsRef}
        platId={platId}
        bugTaskRef={bugTaskRef}
      />
    </div>
  );
};

export default MoreDetailBody;
