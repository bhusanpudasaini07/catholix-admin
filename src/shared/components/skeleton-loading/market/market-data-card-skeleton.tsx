import React from "react";
import { Skeleton } from "../../ui/skeleton";

const MarketDataCardSkeleton = () => {
  return (
    <div className="relative w-[160px] p-6 h-[120px] pb-3 border rounded border-zinc-200">
      <div className="flex gap-1 items-center mb-3">
        <Skeleton className="size-5" />
        <Skeleton className="w-10 h-3" />
      </div>
      <Skeleton className="w-20 h-4" />
      <div className="flex gap-2 items-center mt-2 text-sm text-zinc-600">
        <Skeleton className="w-8 h-3" /> <Skeleton className="w-8 h-4" />
      </div>
    </div>
  );
};

export default MarketDataCardSkeleton;
