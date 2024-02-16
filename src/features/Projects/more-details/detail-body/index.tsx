import DetailOverviewMoreDetail from "./detail-overview";
import TimeLogPattern from "./time-log-pattern";
import Status from "./status";
import CategoryPlatform from "./category-platform-components";
import BugTaskRatio from "./bug-task-ratio";

const MoreDetailBody = () => {
  return (
    <div className="p-8">
      <DetailOverviewMoreDetail />
      <TimeLogPattern />
      <Status />
      <CategoryPlatform />
      <BugTaskRatio />
    </div>
  );
};

export default MoreDetailBody;
