"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/utils/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import NotFoundLottie from "../not-found";
import TableSkeleton from "../skeleton-loading/table-skeleton";
import { DataTableManageColumns } from "./data-table-manage-columns";

interface TotalColumn<TData> {
  columnId: keyof TData;
  format?: (value: number) => React.ReactNode;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  border?: boolean;
  hover?: boolean;
  loading?: boolean;
  height?: string;
  headerSticky?: boolean;
  lottieWidth?: number;
  lottieHeight?: number;
  total?: TotalColumn<TData>[];
  loadingDataNum?: number | 1;
  selectedId?: string | number;
  showManageColumn?: boolean;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  border,
  hover,
  loading,
  height,
  headerSticky,
  lottieWidth,
  lottieHeight,
  total,
  loadingDataNum,
  selectedId,
  showManageColumn,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Initialize column visibility based on enableHiding property
  const initialVisibility = columns.reduce((acc, column) => {
    if (column.id !== undefined) {
      acc[column.id] = !column.enableHiding;
    }
    return acc;
  }, {} as Record<string, boolean>);

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initialVisibility);
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

  const calculateTotals = (
    data: TData[],
    totalColumns: TotalColumn<TData>[]
  ) => {
    return totalColumns.map((totalColumn) => {
      const sum = data.reduce((acc, curr) => {
        const value = curr[totalColumn.columnId];
        return acc + Number(value);
      }, 0);
      return {
        columnId: totalColumn.columnId,
        value: totalColumn.format ? totalColumn.format(sum) : sum,
      };
    });
  };

  const totals = total ? calculateTotals(data, total) : [];
  return (
    <div>
      {(showManageColumn || children) && (
        <div className="flex justify-between items-center">
          {showManageColumn && <DataTableManageColumns table={table} />}
          {children}
        </div>
      )}
      <div
        className={cn(
          "overflow-x-auto rounded-md mt-4",
          border && "border-2 border-slate-100",
          height && height
        )}
      >
        <Table className="rounded-md bg-light-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        border
                          ? "border-b-2 border-r-2 border-slate-100 last:border-r-0 "
                          : "",
                        headerSticky &&
                          "sticky top-[0px] z-[10] bg-light-white",
                        "whitespace-nowrap"
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
              Array.from(
                { length: loadingDataNum ? loadingDataNum : 1 },
                (_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: columns.length }, (_, index) => (
                      <TableSkeleton key={index} />
                    ))}
                  </TableRow>
                )
              )
            ) : table?.getRowModel().rows?.length ? (
              <>
                {table?.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.id === selectedId && "selected"}
                    className={`[&>*]:last:border-b-0 ${
                      hover ? "group cursor-pointer" : ""
                    }`}
                  >
                    {row?.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`${
                          border
                            ? "border-r-2 border-b-2 border-slate-100 last:border-r-0"
                            : ""
                        } 
                      ${
                        hover
                          ? "group-hover:bg-blue-50 group-hover:border-r-blue-100 group-hover:border-l-blue-100"
                          : ""
                      }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {totals.length > 0 && (
                  <TableRow className={cn("font-semibold !bg-slate-100")}>
                    {columns.map((column, index) => {
                      const totalColumn = totals.find(
                        (t) => t.columnId === column?.id
                      );
                      return (
                        <>
                          <TableCell key={index}>
                            {totalColumn ? totalColumn.value : ""}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={border ? "h-24 text-center" : "h-24 text-center"}
                >
                  <NotFoundLottie width={lottieWidth} height={lottieHeight} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
