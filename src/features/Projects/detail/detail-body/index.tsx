import ConsumptionType from "./consumption-type";
import DetailOverview from "./detail-overview";
import TeamConsumption from "./group-wise-consumption";
import LatestActivity from "./latest-activity";
import ProjectRelease from "./project-release";
import ProjectStories from "./project-stories";
import RpConsumption from "./rp-consumption-chart";
import ProjectSummaryReport from "./summary-report";
import TaskTimeSpent from "./task-time-spent";

const DetailBody = () => {
  return (
    <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
      <ProjectSummaryReport />
      <DetailOverview />
      <RpConsumption />
      <ProjectStories />
      <ConsumptionType />
      <TeamConsumption />
      <TaskTimeSpent />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 xl:col-span-5">
          <ProjectRelease />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <LatestActivity />
        </div>
      </div>
    </div>
  );
};

export default DetailBody;
