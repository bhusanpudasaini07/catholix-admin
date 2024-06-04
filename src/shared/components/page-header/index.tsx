import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  subTitle?: string;
  back?: boolean;
  backUrl?: string;
}

const PageHeader = ({ title, subTitle, back, backUrl }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-6 items-center">
      {back && backUrl && (
        <Button
          variant="outline_secondary"
          className="gap-2 p-0 rounded-full size-8 shrink-0"
          size={"sm"}
          onClick={() => router.push(backUrl)}
        >
          <ChevronLeft size={18} />
        </Button>
      )}
      <div>
        <h4 className="text-4xl font-bold">{title}</h4>
        {subTitle && (
          <p className="text-sm font-medium text-zinc-700">{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
