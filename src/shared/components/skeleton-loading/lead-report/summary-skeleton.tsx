import React from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const SummaryCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-40 h-6" />
        <div className="flex flex-wrap items-center justify-between mt-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="flex items-start gap-2" key={index}>
              <Skeleton className="w-12 h-12 mb-2" />
              <div>
                <Skeleton className="w-32 h-8 mb-2" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCardSkeleton;
