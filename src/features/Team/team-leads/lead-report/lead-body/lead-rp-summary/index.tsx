import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Activity, Flag, TrendingDown } from "lucide-react";
import React, { FC } from "react";

interface IProps {
  available?: string;
  sales?: string;
  loss?: string;
}

const RpSummary: FC<IProps> = ({ available, sales, loss }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-4">
          <h5 className="font-medium text-zinc-700">RP Summary</h5>
          <Button variant={"white"} size={"sm"}>
            View Timeline
          </Button>
        </div>
        <div className="flex justify-between gap-5 pr-20 mt-9">
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-blue-500">
              <Flag size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-blue-500">
                {available ? available : "N/A"}
              </p>
              <p className="text-sm text-blue-600">Available RP</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-green-500">
              <Activity size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-green-500">
                {sales ? sales : "N/A"}
              </p>
              <p className="text-sm font-normal text-green-600">Sales RP</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-red-500">
              <TrendingDown size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-red-500">
                {loss ? loss : "N/A"}
              </p>
              <p className="text-sm text-red-600">Loss RP</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RpSummary;
