import React from "react";
import { Button } from "@/shared/components/ui/button";

import { Filter } from "lucide-react";
import FilterSheet from "./filter-sheet";
import useProjectListing from "@/hooks/project/useProjectListing.hook";

const OverallFilter = () => {
  const { filterSheetOpen, setFilterSheetOpen } = useProjectListing();
  return (
    <>
      <Button
        onClick={() => setFilterSheetOpen(true)}
        variant={"table"}
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
