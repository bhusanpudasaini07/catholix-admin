import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import useLatestActivities from "@/hooks/project/detail/useLatestActivities.hook";

const LatestActivityHeader = () => {
  const router = useRouter();
  const { latestActivities } = useLatestActivities();
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
          <h4 className="mb-1 text-2xl font-medium text-zinc-700">
            Latest Activities
          </h4>
          <p className="text-base font-normal text-zinc-500">
            {latestActivities?.data?.project_info?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestActivityHeader;
