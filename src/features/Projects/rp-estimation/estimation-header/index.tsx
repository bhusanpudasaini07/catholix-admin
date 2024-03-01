import { IProjectEstimation } from "@/interface/project-interface";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { CalendarDays, ChevronLeft, Plus } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  estimation_total_data: number;
  start_date: string;
  estimationDataLoading: boolean;
  estimationData: IProjectEstimation | undefined;
}

const EstimationHeader = ({
  estimation_total_data,
  start_date,
  estimationDataLoading,
  estimationData,
}: IProps) => {
  const router = useRouter();
  console.log(
    estimationData?.data?.estimation?.every(
      (estimate) => estimate?.status !== "Pending"
    )
  );
  return (
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
        <div className="flex items-start gap-4">
          <div>
            <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
              RP Estimation
              {estimationDataLoading ? (
                <Skeleton className="w-10 h-4" />
              ) : (
                estimation_total_data > 0 && ` [${estimation_total_data}]`
              )}
            </h4>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>Started On:</span>
              </div>
              <div className="text-sm text-zinc-700">
                {estimationDataLoading ? (
                  <Skeleton className="w-10 h-3" />
                ) : (
                  <p className="mb-0.5 font-medium">
                    {moment(start_date).format("YYYY-MM-DD")}
                  </p>
                )}
              </div>
            </div>
          </div>
          {estimationDataLoading ? (
            <Skeleton className="w-20 h-6" />
          ) : (
            estimation_total_data > 0 && (
              <Button size={"sm"} variant={"white"}>
                Day View
              </Button>
            )
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {estimationData?.data?.estimation?.every(
          (estimate) => estimate?.status !== "Pending"
        ) && (
          <Button variant={"outline"} className="gap-2">
            <Plus size={16} />
            Create New CR Estimation
          </Button>
        )}
      </div>
    </div>
  );
};

export default EstimationHeader;
