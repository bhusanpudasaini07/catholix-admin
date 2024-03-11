import { Card, CardContent } from "@/shared/components/ui/card";
import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import SummaryPieChart from "./pie-chart";
import { changeNumberFormat } from "@/shared/utils/rp-utils";

interface IProps {
  totalRP: number;
  totalCommercialRp: number;
  totalInhouseRP: number;
  loading: boolean;
}

const ReportOverall = ({
  totalRP,
  totalCommercialRp,
  totalInhouseRP,
  loading,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">
            Budget Executed (Overall)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-[120px] gap-y-10">
          {/* Total RP */}
          <div>
            {loading ? (
              <Skeleton className="w-20 h-4 mb-3" />
            ) : (
              <p className="mb-1 text-3xl font-semibold text-zinc-800">
                {changeNumberFormat(totalRP)}
              </p>
            )}

            <p className="text-sm text-zinc-500">Total Budget</p>
          </div>
          {/* RP Used (Commercial) */}
          {loading ? (
            <div className="flex items-center gap-6">
              <div>
                <Skeleton className="w-40 h-5 mb-2" />
                <p className="text-sm text-zinc-500">
                  Budget Used (Commercial)
                </p>
              </div>
              <div className="relative">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-[50px] h-[50px] m-auto bg-white rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div>
                <p className="mb-1 text-3xl font-semibold text-zinc-800">
                  {changeNumberFormat(totalCommercialRp)}
                </p>
                <p className="text-sm text-zinc-500">
                  Budget Used (Commercial)
                </p>
              </div>
              <div className="min-w-[120px]">
                <SummaryPieChart
                  totalRP={totalRP}
                  totalAdditionalRP={totalCommercialRp}
                />
              </div>
            </div>
          )}

          {/* RP Used (In-house) */}
          {loading ? (
            <div className="flex items-center gap-6">
              <div>
                <Skeleton className="w-40 h-5 mb-2" />
                <p className="text-sm text-zinc-500">Budget Used (In-House)</p>
              </div>
              <div className="relative">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-[50px] h-[50px] m-auto bg-white rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div>
                {loading ? (
                  <Skeleton className="w-20 h-4 mb-3" />
                ) : (
                  <p className="mb-1 text-3xl font-semibold text-zinc-800">
                    {changeNumberFormat(totalInhouseRP)}
                  </p>
                )}

                <p className="text-sm text-zinc-500">Budget Used (In-House)</p>
              </div>
              <div className="min-w-[120px]">
                <SummaryPieChart
                  totalRP={totalRP}
                  totalAdditionalRP={totalInhouseRP}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportOverall;
