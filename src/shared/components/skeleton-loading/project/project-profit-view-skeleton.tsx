import React from 'react';

import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const ProjectProfitViewSkeleton = ({ num }: any) => {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: num }, (_, index) => (
        <Card key={index} className="p-0">
          <CardContent className="px-4 py-4 pt-6">
            <div className="flex flex-col text-center">
              <Skeleton className="w-[128px] h-4 m-auto mb-2 rounded-full" />
              <Skeleton className="w-[200px] h-5 m-auto mb-2 rounded-full" />
              <Skeleton className="w-[128px] h-4 m-auto rounded-full" />
            </div>
            <div className="flex items-end justify-between pt-6 mt-10 border-t">
              <div>
                <Skeleton className="w-[40px] h-3 mb-2 rounded-full" />
                <Skeleton className="w-[80px] h-3 mb-2 rounded-full" />
              </div>
              <Skeleton className="w-[140px] h-4 mb-2 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectProfitViewSkeleton;
