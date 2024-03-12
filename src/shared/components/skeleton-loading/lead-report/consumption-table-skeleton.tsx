import React from 'react';

import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const ConsumptionTableSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div>
          <Skeleton className="w-10 h-4" />
          <Skeleton className="w-10 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionTableSkeleton;
