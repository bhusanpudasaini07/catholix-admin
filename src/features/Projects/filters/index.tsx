import useProjectListing from "@/hooks/project/useProjectListing.hook";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Label } from "@/shared/components/ui/label";
import { Filter } from "lucide-react";
import React from "react";

const ProjectFilters = () => {
  const { columns, columnVisibility, setColumnVisibility } =
    useProjectListing();

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant={"table"} size={"sm"}>
        Reset
      </Button>
      <Button variant={"table"} size={"sm"}>
        <Filter size={15} />
        Filter
      </Button>
      {/* WIP */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Columns</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="max-h-[230px] overflow-y-scroll py-3"
        >
          {columns
            .filter((column) => column?.id !== "sn")
            .map((column, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 space-x-2"
              >
                <Checkbox
                  variant="primary"
                  checked={columnVisibility[column?.id] !== false}
                  onCheckedChange={() => toggleColumn(column?.id)}
                  disabled={!column.enableHiding}
                />
                <Label
                  htmlFor={column?.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {column?.header}
                </Label>
              </div>
            ))}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

export default ProjectFilters;
