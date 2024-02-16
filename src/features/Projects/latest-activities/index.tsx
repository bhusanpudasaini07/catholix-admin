import React from "react";
import LatestActivityHeader from "./latest-header";
import LatestActivityTable from "./latest-table";

const LatestActivitiesContent = () => {
  return (
    <div>
      <LatestActivityHeader />

      <div className="p-8 max-h-[calc(100vh-170px)] overflow-auto">
        <LatestActivityTable />
      </div>
    </div>
  );
};

export default LatestActivitiesContent;
