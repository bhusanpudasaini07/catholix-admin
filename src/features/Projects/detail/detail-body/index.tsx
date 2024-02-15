import RpConsumption from "./rp-consumption-chart";
import DetailOverview from "./detail-overview";
import ProjectStories from "./project-stories";
import ConsumptionType from "./consumption-type";
import TeamConsumption from "./group-wise-consumption";
import TaskTimeSpent from "./task-time-spent";
import ProjectRelease from "./project-release";
import LatestActivity from "./latest-activity";

const DetailBody = () => {
  return (
    <div className="p-8">
      <DetailOverview />
      <RpConsumption />
      <ProjectStories />
      <ConsumptionType />
      <TeamConsumption />
      <TaskTimeSpent />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-5">
          <ProjectRelease />
        </div>
        <div className="col-span-7">
          <LatestActivity />
        </div>
      </div>
    </div>
  );
};

export default DetailBody;
