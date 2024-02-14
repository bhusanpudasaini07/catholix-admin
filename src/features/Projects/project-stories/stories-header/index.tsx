import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  projectName: string;
  loading: boolean;
}

const ProjectStoriesHeader = ({ projectName, loading }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-8 py-6 bg-white">
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
          <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
            Project Stories -{" "}
            <span>
              {loading ? <Skeleton className="w-20 h-3" /> : projectName}
            </span>
          </h4>
          <p className="text-base font-normal text-zinc-500">Stories</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStoriesHeader;
