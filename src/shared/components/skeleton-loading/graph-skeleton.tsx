import React from 'react';

import { Skeleton } from '../ui/skeleton';

const GraphSkeleton = ({ className }: any) => {
  return (
    <div className={`rounded-md p-4 w-full  ${className}`}>
      <div className="flex items-baseline m-6 space-x-4">
        <Skeleton className="flex-1 w-6 h-24 rounded" />
        <Skeleton className="flex-1 w-6 rounded h-36 " />
        <Skeleton className="flex-1 w-6 h-48 rounded " />
        <Skeleton className="flex-1 w-6 h-64 rounded" />
        <Skeleton className="flex-1 w-6 rounded h-72 " />
        <Skeleton className="flex-1 w-6 h-64 rounded" />
        <Skeleton className="flex-1 w-6 h-48 rounded " />
        <Skeleton className="flex-1 w-6 rounded h-36 " />
        <Skeleton className="flex-1 w-6 rounded h-72" />
        <Skeleton className="flex-1 w-6 rounded h-36 " />
        <Skeleton className="flex-1 w-6 h-48 rounded " />
        <Skeleton className="flex-1 w-6 h-64 rounded" />
        <Skeleton className="flex-1 w-6 rounded h-72 " />
        <Skeleton className="flex-1 w-6 h-64 rounded" />
        <Skeleton className="flex-1 w-6 h-48 rounded " />
        <Skeleton className="flex-1 w-6 rounded h-36 " />
        <Skeleton className="flex-1 w-6 h-24 rounded " />
      </div>
    </div>
  );
};

export default GraphSkeleton;
