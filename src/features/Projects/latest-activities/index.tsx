import React from "react";
import LatestActivityHeader from "./latest-header";
import LatestActivityTable from "./latest-table";

const LatestActivitiesContent = () => {
  return (
    <div>
      <LatestActivityHeader />

      <div className="p-8">
        <LatestActivityTable />
      </div>
    </div>
  );
};

export default LatestActivitiesContent;
