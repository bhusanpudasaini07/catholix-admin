import RpConsumption from "./rp-consumption-chart";
import DetailOverview from "./detail-overview";

const DetailBody = () => {
  return (
    <div className="p-6">
      <DetailOverview />
      <RpConsumption />
    </div>
  );
};

export default DetailBody;
