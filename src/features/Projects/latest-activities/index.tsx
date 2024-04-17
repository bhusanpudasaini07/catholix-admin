import React from "react";

import LatestActivityHeader from "./latest-header";
import LatestActivityTable from "./latest-table";

const LatestActivitiesContent = () => {
  return (
    <>
      <LatestActivityHeader />

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <LatestActivityTable />
      </div>
    </>
  );
};

export default LatestActivitiesContent;
