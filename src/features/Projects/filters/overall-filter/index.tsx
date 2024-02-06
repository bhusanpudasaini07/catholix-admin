import React from "react";
import { Button } from "@/shared/components/ui/button";

import { Filter } from "lucide-react";
import FilterSheet from "./filter-sheet";
import useProjectFilter from "@/hooks/project/overall-filters/useProjectFilter.hook";

const OverallFilter = () => {
  const { filterSheetOpen, setFilterSheetOpen } = useProjectFilter();
  return (
    <>
      <Button
        onClick={() => setFilterSheetOpen(true)}
        variant={"table"}
        size={"sm"}
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
