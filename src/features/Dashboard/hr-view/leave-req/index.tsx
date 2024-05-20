import { useRouter } from "next/router";
import React from "react";

import useHrDashboard from "@/hooks/dashboard/hr/useHrDashboard.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const DashboardHRLeaveReq = () => {
  const router = useRouter();
  const { staffLeaves, staffLeavesLoading, leaveReqColumns } = useHrDashboard();
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">Leave Requests</p>
          <Button
            onClick={() => router.push(`/leave-request`)}
            size={"sm"}
            variant={"white"}
          >
            View All
          </Button>
        </div>

        <DataTable
          columns={leaveReqColumns}
          data={staffLeaves?.data ?? []}
          border
          headerSticky
          loading={staffLeavesLoading}
          loadingDataNum={5}
          height="max-h-[calc(100vh-290px)]"
        />
      </CardContent>
    </Card>
  );
};

export default DashboardHRLeaveReq;
