import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import useProjectListing from "@/hooks/project/useProjectListing.hook";
import { Columns } from "lucide-react";

const ManageColumn = () => {
  const { columns, columnVisibility, setColumnVisibility } =
    useProjectListing();

  const toggleColumn = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center h-8 gap-2 px-3 py-2 text-sm text-center border rounded-md focus:outline-none border-b-zinc-200 text-zinc-600 hover:border-primary hover:text-primary">
        <Columns size={15} />
        Manage Column
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[230px] overflow-y-scroll py-3"
      >
        {columns
          .filter((column) => column?.enableHiding)
          .map((column: any, index) => (
            <div key={index} className="flex items-center px-4 py-2 space-x-2">
              <Checkbox
                variant="primary"
                id={column?.id}
                checked={columnVisibility[column?.id] !== false}
                onCheckedChange={() => toggleColumn(column?.id)}
                disabled={!column.enableHiding}
              />
              <Label
                htmlFor={column?.id}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {column?.header}
              </Label>
            </div>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManageColumn;
