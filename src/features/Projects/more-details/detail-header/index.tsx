import { ChevronLeft, Pencil } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  title: string;
  code: any;
}

const MoreDetailHeader = ({ title, code }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-8 py-6 bg-white border-b border-b-slate-100">
      <div className="flex gap-4 items-start">
        <Button
          onClick={() => router.push(`/projects/${router?.query?.code}`)}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="">
          {title ? (
            <h4 className="mb-1 text-2xl font-medium text-zinc-700">{`Time-log and Status Details - [${title}]`}</h4>
          ) : (
            <Skeleton className="w-[80px] mb-2 h-5" />
          )}
          <p className="text-base font-normal text-zinc-500">
            Project Overview
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => router.push(`/projects/${code}/edit`)}
          variant={"outline"}
          className="gap-2"
        >
          <Pencil size={16} />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default MoreDetailHeader;
