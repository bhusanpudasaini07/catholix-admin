import { Activity, Flag, TrendingDown } from "lucide-react";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface IProps {
  available?: string;
  spent?: string;
  loss?: string;
}

const RpSummary: FC<IProps> = ({ available, spent, loss }) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || "all";

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-4">
          <h5 className="font-medium text-zinc-700">Budget Summary</h5>
          <Button
            onClick={() =>
              router.push(
                `/team-leads/lead-report/trending-graph?lead_id=${current_id}`
              )
            }
            variant={"white"}
            size={"sm"}
          >
            View Trendline
          </Button>
        </div>
        <div className="flex flex-wrap justify-between gap-5 pr-20 mt-9">
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-blue-500">
              <Flag size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-blue-500">
                {available ? changeNumberFormat(Number(available)) : "N/A"}
              </p>
              <p className="text-sm text-blue-600">Available Budget</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-green-500">
              <Activity size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-green-500">
                {spent ? changeNumberFormat(Number(spent)) : "N/A"}
              </p>
              <p className="text-sm font-normal text-green-600">Spent Budget</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="mt-2 text-red-500">
              <TrendingDown size={24} />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-semibold text-red-500">
                {loss ? changeNumberFormat(Number(loss)) : "N/A"}
              </p>
              <p className="text-sm text-red-600">Loss Budget</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RpSummary;
