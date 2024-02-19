import React from "react";
import { Button } from "@/shared/components/ui/button";

import ManageColumn from "./manage-column";
import OverallFilter from "./overall-filter";
import useProjectListing from "@/hooks/project/useProjectListing.hook";
import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const ProjectFilters = () => {
  const { resetFilters } = useProjectListing();

  return (
    <div className="flex items-center justify-end gap-4 grow">
      <Button onClick={resetFilters} variant={"table"} size={"sm"}>
        Reset
      </Button>

      <OverallFilter />
      <ManageColumn />

      <TabsList className="grid grid-cols-2 text-sm rounded-sm ">
        <TabsTrigger value="profit_loss_view">Profit/Loss View</TabsTrigger>
        <TabsTrigger value="list_view">List View</TabsTrigger>
      </TabsList>
    </div>
  );
};

export default ProjectFilters;
