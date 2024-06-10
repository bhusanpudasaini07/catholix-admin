import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  subTitle?: string;
  back?: boolean;
  backUrl?: string;
  createUrl?: string;
  createBtnName?: string;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  subTitle,
  back,
  backUrl,
  createUrl,
  createBtnName,
  children,
}: IProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-8">
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

      {children && children}
      {createUrl && (
        <Button
          variant={"primary"}
          size={"lg"}
          className="gap-2"
          onClick={() => router.push(createUrl)}
        >
          <Plus size={20} />
          {createBtnName}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
