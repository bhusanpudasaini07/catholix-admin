import RpConsumption from "./rp-consumption-chart";
import DetailOverview from "./detail-overview";
import ProjectStories from "./project-stories";

const DetailBody = () => {
  return (
    <div className="p-6">
      <DetailOverview />
      <RpConsumption />
      <ProjectStories />
    </div>
  );
};

export default DetailBody;
