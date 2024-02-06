import React from "react";
import { Button } from "@/shared/components/ui/button";

import ManageColumn from "./manage-column";
import OverallFilter from "./overall-filter";
import useProjectListing from "@/hooks/project/useProjectListing.hook";

const ProjectFilters = () => {
  const { resetFilters } = useProjectListing();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={resetFilters} variant={"table"} size={"sm"}>
        Reset
      </Button>

      <OverallFilter />
      <ManageColumn />
    </div>
  );
};

export default ProjectFilters;
