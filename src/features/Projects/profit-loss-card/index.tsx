import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { IProjectDetail } from '@/interface/project-interface';
import { Card, CardContent } from '@/shared/components/ui/card';
import { showDeadline } from '@/shared/utils/rp-utils';
import { cn } from '@/shared/utils/utils';

interface IProps {
  data: IProjectDetail;
}

const ProfitLossCard = ({ data }: IProps) => {
  const { statusText } = showDeadline(data?.dates?.deadline);
  return (
    <Card className="!p-0">
      <CardContent
        className={cn(
          data?.status === "Closed" && data?.rp?.used_rp! < data?.rp?.sales_rp!
            ? "border-green-300 bg-green-50"
            : data?.rp?.used_rp! > data?.rp?.sales_rp!
            ? "border-red-300 bg-red-50"
            : "bg-blue-50 border-blue-300",
          "flex border relative rounded h-full min-h-[245px] flex-col items-center justify-between px-4 py-5"
        )}
      >
        <Link
          href={`/projects/${data?.code}`}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <div className="text-center text-zinc-700">
          <Link
            href={`/projects/${data?.code}`}
            className="text-base font-medium hover:text-primary "
          >
            {data?.project_title}
          </Link>

          <p className="my-3 text-2xl font-semibold">
            {data?.rp?.used_rp ?? 0} / {data?.rp?.sales_rp ?? 0}
          </p>
          <p className="text-sm">Total Budget Used</p>
        </div>

        <div className="flex items-end justify-between w-full pt-4 border-t border-t-zinc-200">
          <div className="text-zinc-700">
            <p className="text-xs">Budget Left:</p>
            <p className="text-base font-semibold">
              {((data?.rp?.sales_rp ?? 0) - (data?.rp?.used_rp ?? 0)).toFixed(
                2
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 py-0.5 px-2 border text-zinc-700 rounded shadow-sm border-zinc-200 bg-light-white">
            <Clock size={14} />
            <p className="text-sm font-medium capitalize">{statusText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossCard;
