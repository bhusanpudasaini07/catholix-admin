import React from 'react';

import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const StaffDetailSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-10">
          {/* Name Image */}
          <div className="flex items-center gap-6 ">
            <Skeleton className="size-[120px] rounded-full" />
            <div>
              <Skeleton className="w-40 h-4 mb-3" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 ">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="flex items-start gap-2 text-zinc-500" key={index}>
                <Skeleton className="size-5" />
                <div>
                  <Skeleton className="w-10 h-2 mb-2" />
                  <Skeleton className="w-20 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffDetailSkeleton;
