import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  loading: boolean;
  projectName: string | undefined;
}

const TaskTrendHeader = ({ loading, projectName }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div className="flex gap-4 items-start">
        <Button
          onClick={() =>
            router?.push(`/projects/${router?.query?.code}/project-stories`)
          }
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="">
          <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
            Latest Task Trend
          </h4>
          <div className="flex gap-2 items-center text-base font-normal text-zinc-500">
            Project Stories -{" "}
            {loading ? <Skeleton className="w-20 h-3" /> : projectName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTrendHeader;
