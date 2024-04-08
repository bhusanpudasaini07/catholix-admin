import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";

interface IProps {
  name: string;
}

const TaskTimeSpentHeader = ({ name }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div className="flex gap-4 items-start">
        <Button
          onClick={() => router.back()}
          // onClick={() => router.push(`/projects/${router?.query?.code}`)}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="">
          <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
            Task & Time Spent
            {/* <span>
              {loading ? <Skeleton className="w-20 h-3" /> : projectName}
            </span> */}
          </h4>
          <p className="text-base font-normal text-zinc-500">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskTimeSpentHeader;
