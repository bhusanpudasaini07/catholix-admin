import { Filter } from 'lucide-react';
import React from 'react';

import useProjectFilter from '@/hooks/project/overall-filters/useProjectFilter.hook';
import { Button } from '@/shared/components/ui/button';

import FilterSheet from './filter-sheet';

const OverallFilter = () => {
  const { filterSheetOpen, setFilterSheetOpen } = useProjectFilter();
  return (
    <>
      <Button
        onClick={() => setFilterSheetOpen(true)}
        variant={"white"}
        size={"sm"}
        className="gap-2"
      >
        <Filter size={15} />
        Filter
      </Button>

      <FilterSheet
        filterSheetOpen={filterSheetOpen}
        setFilterSheetOpen={setFilterSheetOpen}
      />
    </>
  );
};

export default OverallFilter;
