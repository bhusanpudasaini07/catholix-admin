import React from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const UtilizationSkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-36 h-6" />
        <div className="flex items-center justify-between gap-7 flex-wrap">
          <div className="mx-auto">
            <div className="flex items-center justify-between">
              <div className="m-4">
                <Skeleton className="w-45 h-9 mb-4" />
                <Skeleton className="w-36 h-4" />
              </div>
              <div className="relative m-4">
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-[75px] h-[75px] m-auto bg-white rounded-full" />
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="flex items-center justify-between">
              <div className="m-4">
                <Skeleton className="w-45 h-9 mb-4" />
                <Skeleton className="w-36 h-4" />
              </div>
              <div className="relative m-4">
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="absolute top-0 bottom-0 left-0 right-0 w-[75px] h-[75px] m-auto bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationSkeletonCard;
