import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";

const TaskTimeLogs = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {/* Total Task */}
          <div
            className={`rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total Task</p>
          </div>
          {/* Bugs reported */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
          >
            <p className="text-4xl font-semibold">{0}</p>
            <p className="text-base font-medium">Bugs reported</p>
          </div>
          {/* Total Time */}
          <div
            className={`rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total Time</p>
          </div>
          {/* Total RP */}
          <div
            className="rounded-md py-6 h-[148px] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100"
          >
            <p className="text-4xl font-semibold"> {0}</p>
            <p className="text-base font-semibold">Total RP</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeLogs;
