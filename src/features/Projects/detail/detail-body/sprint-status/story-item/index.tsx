import React from "react";

import { IProjectUserStories } from "@/interface/project-interface";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/ui/badge";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Progress } from "@radix-ui/react-progress";

interface IProps {
  story: IProjectUserStories | undefined;
}

const StoryItem = ({ story }: IProps) => {
  const barData = story
    ? (Number(story?.closed_task_count) / story?.task_count) * 100
    : 0;

  return (
    <div className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0">
      <div className="">
        <Tooltip>
          <TooltipTrigger className="text-left">
            <Link
              href={story?.repo_issue_url ?? ""}
              target="_blank"
              className={cn(
                "text-sm font-semibold text-zinc-700 line-clamp-2 max-w-[150px]"
              )}
            >
              {story?.title}
            </Link>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px]">
            {story?.title}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-3 items-center 2xl:flex-row">
        <div>
          <p className="mb-1 text-sm text-zinc-800">
            Total Task {story?.task_count}
          </p>
          <Progress
            className={cn(
              "h-1.5 [&>div]:bg-[#5470C6] rounded-lg",
              story?.task_count === 0 ? "bg-gray-300" : "bg-green-500"
            )}
            value={isNaN(barData) ? 0 : barData}
          />
        </div>
        <div className="mt-2">
          <p className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
            <span className="text-green-500">{story?.closed_task_count}</span>
            <span className="text-xs font-medium text-zinc-600">
              Closed Task
            </span>
          </p>
          <p className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-[#5470C6] rounded-sm"></span>
            <span className="text-[#5470C6]">{story?.open_task_count}</span>
            <span className="text-xs font-medium text-zinc-600">Open Task</span>
          </p>
        </div>
      </div>
      <div className="w-[100px] text-end">
        <Badge
          variant={"outline"}
          className={cn(
            story?.status === "In Progress" &&
              "border-blue-500 text-blue-500 bg-blue-50 ",
            story?.status === "Closed" &&
              "border-green-500 text-green-500 bg-green-50 ",
            story?.status === "Open" &&
              "border-zinc-700 text-zinc-700 bg-zinc-100 ",
            "capitalize border rounded-md"
          )}
        >
          {story?.status}
        </Badge>
      </div>
    </div>
  );
};

export default StoryItem;
