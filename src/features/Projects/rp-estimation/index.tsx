import React from "react";

import useProjecetEstimation from "@/hooks/project/detail/useProjectEstimation.hook";
import RPEstimationSkeleton from "@/shared/components/skeleton-loading/project/rp-estimation-skeleton";

import EstimationHeader from "./estimation-header";
import EstimationTable from "./estimation-table";

const RpEstimationContent = () => {
  const { estimationData, estimationDataLoading, columns } =
    useProjecetEstimation();
  return (
    <div>
      <EstimationHeader
        start_date={estimationData?.data?.project_info?.start_date!}
        estimationDataLoading={estimationDataLoading}
        estimationData={estimationData}
        estimation_total_data={estimationData?.data?.estimation?.length ?? 0}
      />
      <div className="p-6 max-h-[calc(100vh-120px)] overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          {estimationDataLoading ? (
            <RPEstimationSkeleton />
          ) : (
            estimationData?.data?.estimation?.map((estimation, index) => (
              <EstimationTable
                key={index}
                estimation={estimation}
                columns={columns}
                estimationDataLoading={estimationDataLoading}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RpEstimationContent;
