"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useState } from "react";
import TableSkeleton from "../skeleton-loading/table-skeleton";
import { cn } from "@/shared/utils/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import NotFoundLottie from "../not-found";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  // columnVisibility?: VisibilityState;
  // setColumnVisibility?: any;
  border?: boolean;
  loading?: boolean;
  height?: string;
  headerSticky?: boolean;
  lottieWidth?: number;
  lottieHeight?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // columnVisibility,
  // setColumnVisibility,
  border,
  loading,
  height,
  headerSticky,
  lottieWidth,
  lottieHeight,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className={`overflow-auto ${
        border && "border-2 border-slate-100"
      } rounded-md ${height && height}`}
    >
      {/* <DropdownMenu>
        <DropdownMenuTrigger>Columns</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu> */}
      <Table className="rounded-md bg-light-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={cn(
                      border
                        ? "border-b-2 border-r-2 border-slate-100 last:border-r-0"
                        : "",
                      headerSticky && "sticky top-[0px] z-[10] bg-light-white"
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              {Array.from({ length: columns.length }, (_, index) => (
                <TableSkeleton key={index} />
              ))}
            </TableRow>
          ) : table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="[&>*]:last:border-b-0"
              >
                {row?.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      border
                        ? "border-b-2 border-r-2 border-slate-100 last:border-r-0"
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={
                  border
                    ? "border-2 border-slate-100 h-24 text-center"
                    : "h-24 text-center"
                }
              >
                <NotFoundLottie width={lottieWidth} height={lottieHeight} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
