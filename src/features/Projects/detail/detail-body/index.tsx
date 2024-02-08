import RpConsumption from "./rp-consumption-chart";
import DetailOverview from "./detail-overview";
import ProjectStories from "./project-stories";
import ConsumptionType from "./consumption-type";
import TeamConsumption from "./team-consumption";
import TaskTimeSpent from "./task-time-spent";
import ProjectRelease from "./project-release";
import LatestActivity from "./latest-activity";

const DetailBody = () => {
  return (
    <div className="p-6">
      <DetailOverview />
      <RpConsumption />
      <ProjectStories />
      <ConsumptionType />
      <TeamConsumption />
      <TaskTimeSpent />
      <div className="flex gap-4 mt-4">
        <ProjectRelease />
        <LatestActivity />
      </div>
    </div>
  );
};

export default DetailBody;
