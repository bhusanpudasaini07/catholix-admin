import React from "react";
import EstimationHeader from "./estimation-header";
import RPStatus from "./rp-status";
import EstimationTable from "./estimation-table";

const RpEstimationContent = () => {
  return (
    <div>
      <EstimationHeader />
      <div className="p-8 max-h-[calc(100vh-170px)] overflow-auto">
        <RPStatus />
        <EstimationTable />
      </div>
    </div>
  );
};

export default RpEstimationContent;
