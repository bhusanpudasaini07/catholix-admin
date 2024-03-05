import DateRangeFilter from "@/shared/components/date-range-filter";
import UnitAllocationSkeleton from "@/shared/components/skeleton-loading/project/detail/unit-allocation-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";
import { CircleDot, UserCircle2, Warehouse } from "lucide-react";
import React from "react";

interface IProps {
  report: {
    total: number;
    client: number;
    inhouse: number | string;
  };
  loading: boolean;
}

const RPAllocation = ({ report, loading }: IProps) => {
  const rpData = [
    // Total RP
    {
      title: "Total RP",
      data: report?.total,
      icon: <CircleDot size={24} />,
      color: "text-green-500",
      titleColor: "text-green-700",
    },
    // Client RP
    {
      title: "Client RP",
      data: report?.client,
      icon: <UserCircle2 size={24} />,
      color: "text-blue-500",
      titleColor: "text-blue-700",
    },
    // IN-House RP
    {
      title: "In-House RP",
      data: report?.inhouse,
      icon: <Warehouse size={24} />,
      color: "text-orange-500",
      titleColor: "text-orange-700",
    },
  ];
  return (
    <>
      {loading ? (
        <UnitAllocationSkeleton />
      ) : (
        <Card>
          <CardContent>
            <div className="flex justify-between mb-9">
              <div className="flex items-center justify-start gap-3 ">
                <p className="text-lg font-medium text-zinc-700">
                  Budget Allocation (Total)
                </p>
                <Button variant={"white"} size={"sm"}>
                  More Details
                </Button>
              </div>
              <div className="w-[200px]">
                <DateRangeFilter
                  dateRange={undefined}
                  setDateRange={() => ""}
                  dateRangeOpen={false}
                  setDateRangeOpen={() => ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {rpData?.map((rp) => (
                <div
                  className={cn("flex items-start gap-3", rp?.color)}
                  key={rp?.title}
                >
                  <div className="pt-1">{rp?.icon}</div>
                  <div>
                    <p className="mb-1 text-2xl font-semibold">{rp?.data}</p>
                    <p className={cn(rp?.titleColor, "text-sm")}>{rp.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default RPAllocation;
