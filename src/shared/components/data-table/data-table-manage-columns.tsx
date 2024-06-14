import { Columns, Plus } from "lucide-react";

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
  module: string;
  columnVisibility: { [key: string]: boolean };
  setColumnVisibility: (visibility: { [key: string]: boolean }) => void;
}

export function DataTableManageColumns<TData>({
  table,
  module,
  columnVisibility,
  setColumnVisibility,
}: DataTableManageColumnsProps<TData>) {
  const handleCheckboxChange = (columnId: string, value: boolean) => {
    table.getColumn(columnId)?.toggleVisibility(value);
    const newVisibility = { ...columnVisibility, [columnId]: value };
    setColumnVisibility(newVisibility);
    localStorage.setItem(
      `columnVisibility_${module}`,
      JSON.stringify(newVisibility)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center px-4 py-2.5 text-sm text-center rounded-md text-zinc-700 border-zinc-200 border-[1px] border-solid shadow-sm bg-white hover:border-zinc-400 focus:border-zinc-200">
        <Plus size={18} />
        Manage Column
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="max-h-[350px] overflow-y-auto"
      >
        {table.getAllColumns().map((column) => (
          <div
            key={column.id}
            className="flex items-center px-4 py-2 space-x-2"
          >
            <Checkbox
              variant="primary"
              id={column.id}
              checked={columnVisibility[column.id] ?? column.getIsVisible()}
              onCheckedChange={(value) =>
                handleCheckboxChange(column.id, !!value)
              }
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
