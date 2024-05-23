import { Card, CardContent } from "@/shared/components/ui/card";
import { TrendingUp } from "lucide-react";
import React from "react";

const SummaryReportComponent = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-6 ">
          <h5 className="font-medium text-zinc-700">Projects Overview</h5>
        </div>
        <div className="flex items-center justify-center flex-col">
          <p className="text-green-700 text-[72px] font-semibold">A+</p>
          <p className="text-zinc-500 text-base font-normal flex items-center justify-center gap-1">
            Participation{" "}
            <span className="text-green-700 flex gap-1">
              <TrendingUp /> Increased
            </span>
          </p>
          <p className="text-zinc-500 text-base font-normal">Report History</p>
          <div className="flex items-center justify-center gap-2 py-3">
            <p
              className={`border-amber-700 bg-amber-50 text-amber-700 
            text-sm font-medium border-[1px] rounded-full w-[28px] h-[28px] flex justify-center items-center`}
            >
              B-
            </p>
            <p
              className={`border-orange-500 bg-orange-50 text-orange-500 
            text-sm font-medium border-[1px] rounded-full w-[28px] h-[28px] flex justify-center items-center`}
            >
              B
            </p>
            <p
              className={`border-green-500 bg-green-50 text-green-500 
            text-sm font-medium border-[1px] rounded-full w-[28px] h-[28px] flex justify-center items-center`}
            >
              A
            </p>
            <p
              className={`border-amber-700 bg-amber-50 text-amber-700 
            text-sm font-medium border-[1px] rounded-full w-[28px] h-[28px] flex justify-center items-center`}
            >
              B-
            </p>
          </div>
        </div>
        <Card className="">
          <CardContent>zxc</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SummaryReportComponent;
