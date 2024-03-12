import React from 'react';

import { cn } from '@/shared/utils/utils';

import { Skeleton } from '../ui/skeleton';

interface IProps {
  height?: number;
  width?: number;
}

const PieChartSkeleton = ({ height, width }: IProps) => {
  return (
    <div className="relative m-auto w-fit">
      <Skeleton
        className={cn(
          height ? `h-[${height}px]` : "h-20",
          width ? `w-[${width}px]` : "w-20",
          "rounded-full"
        )}
      />
      <Skeleton
        style={{
          width: width ? `${width - width * 0.2}px` : "50px",
          height: height ? `${height - height * 0.2}px` : "50px",
        }}
        className={
          "absolute top-0 bottom-0 left-0 right-0 m-auto bg-white rounded-full"
        }
      />
    </div>
  );
};

export default PieChartSkeleton;
