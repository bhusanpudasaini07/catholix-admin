import useEstimatedActual from "@/hooks/project/estimated-actual/useEstimatedActual.hook";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const EstimatedActualHeader = () => {
  const router = useRouter();
  const { projectDetail, projectLoading } = useEstimatedActual();
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
        <div className="">
          <h4 className="mb-1 text-2xl font-medium text-zinc-700">
            Estimated VS Actual Budget
          </h4>
          {projectLoading ? (
            <Skeleton className="w-20 h-5 mt-2" />
          ) : (
            <p className="text-base font-normal text-zinc-500">
              {projectDetail?.data?.project_title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimatedActualHeader;
