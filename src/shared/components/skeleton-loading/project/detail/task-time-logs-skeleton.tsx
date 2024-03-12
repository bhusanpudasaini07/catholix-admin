import React from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const TaskTimeLogsSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-40 h-3" />
        <div className="flex items-center justify-between gap-4 mt-8">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="w-full gap-2" key={index}>
              <Skeleton className="w-full h-20 mb-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeLogsSkeleton;
