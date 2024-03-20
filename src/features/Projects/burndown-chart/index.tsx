import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import useRPBurndown from "@/hooks/project/detail/useRPBurndown.hook";
import { Button } from "@/shared/components/ui/button";

import ChartCard from "./chart-card";
import ConsumptionListTable from "./consumption-list-table";

const BurndownContent = () => {
  const router = useRouter();
  const {
    columns,
    isLoading,
    burndownTableData,
    burndownOption,
    date,
    dailyRPColumns,
    dailyRPLoading,
    dailyRPTableData,
  } = useRPBurndown();

  return (
    <div>
      <div className="flex justify-between px-8 py-6 bg-white border-b border-b-slate-100">
        <div className="flex items-start gap-4">
          <Button
            onClick={() => router.push(`/projects/${router?.query?.code}`)}
            variant={"table"}
            className="h-auto gap-2 p-2.5"
            size={"sm"}
          >
            <ChevronLeft size={16} />
          </Button>
          <div className="">
            <h4 className="mb-1 text-2xl font-medium text-zinc-700">
              Burndown Chart
            </h4>
            <p className="text-base font-normal text-zinc-500">
              Detailed view of Budget consumed.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          <ChartCard option={burndownOption} />
          <ConsumptionListTable
            columns={columns}
            data={burndownTableData ?? []}
            loading={isLoading}
            date={date}
            dailyTableData={dailyRPTableData}
            dailyRPColumns={dailyRPColumns}
            dailyLoading={dailyRPLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BurndownContent;
