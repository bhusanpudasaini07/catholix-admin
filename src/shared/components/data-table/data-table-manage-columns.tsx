import { Columns } from "lucide-react";

import { Table } from "@tanstack/react-table";

import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";

interface DataTableManageColumnsProps<TData> {
  table: Table<TData>;
}

export function DataTableManageColumns<TData>({
  table,
}: DataTableManageColumnsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center px-3 py-2 h-8 text-sm text-center rounded-md border focus:outline-none border-b-zinc-200 text-zinc-600 hover:border-primary hover:text-primary">
        <Columns size={15} />
        Manage Column
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table.getAllColumns().map((column) => (
          <div
            key={column.id}
            className="flex items-center px-4 py-2 space-x-2"
          >
            <Checkbox
              variant="primary"
              id={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
              disabled={!column.columnDef.enableHiding}
            />
            <Label
              htmlFor={column.id}
              className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {column?.id
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Label>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    // <DropdownMenuCheckboxItem
    //   key={column.id}
    //   className="capitalize"
    //   checked={column.getIsVisible()}
    //   onCheckedChange={(value) => column.toggleVisibility(!!value)}
    // >
    //   {column.id}
    // </DropdownMenuCheckboxItem>
  );
}
