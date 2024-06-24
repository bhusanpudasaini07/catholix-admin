import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";

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
    <div className="flex justify-between items-start mb-8">
      <div className="flex gap-6 items-center">
        {back && (
          <Button
            variant="outline_secondary"
            size="sm"
            className="gap-2 p-0 rounded-full size-8 shrink-0"
            onClick={() => {
              backUrl ? router.push(backUrl) : router?.back();
            }}
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
        <Link
          href={createUrl}
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "gap-2"
          )}
        >
          <Plus size={20} />
          {createBtnName}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
