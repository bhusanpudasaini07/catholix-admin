import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, Pencil } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  title: string;
  code: any;
}

const DetailHeader = ({ title, code }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-8 py-6 bg-white">
      <div className="flex items-start gap-4">
        <Button
          onClick={() => router.push(`/projects`)}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="">
          <h4 className="mb-1 text-2xl font-medium text-zinc-700">{title}</h4>
          <p className="text-base font-normal text-zinc-500">
            Project Overview
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
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

export default DetailHeader;
