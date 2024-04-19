import React from "react";
import FilterSearch from "@/shared/components/filter-search";
import InputNumber from "@/shared/components/input-number";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

const QuoteGenerationTable = () => {
  return (
    <>
      <div className="overflow-x-auto rounded-md border-2 border-slate-100">
        <Table className="rounded-md bg-light-white">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r-2 border-b-2 border-slate-100 last:border-r-0">
                S.No.
              </TableHead>
              <TableHead className="border-r-2 border-b-2 border-slate-100 last:border-r-0">
                Role
              </TableHead>
              <TableHead className="border-r-2 border-b-2 border-slate-100 last:border-r-0">
                No.of Days
              </TableHead>
              <TableHead className="border-r-2 border-b-2 border-slate-100 last:border-r-0">
                Units
              </TableHead>
              <TableHead className="border-r-2 border-b-2 border-slate-100 last:border-r-0">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className={"[&>*]:last:border-b-0"}>
              <TableCell className="border-r-2 border-b-2 text-zinc-500 w-[80px] border-slate-100 last:border-r-0">
                1.
              </TableCell>
              <TableCell className="border-r-2 border-b-2 text-zinc-500 border-slate-100 last:border-r-0 max-w-[200px]">
                <FilterSearch
                  className="!max-w-full"
                  setSearchText={() => ""}
                />
              </TableCell>
              <TableCell className="border-r-2 border-b-2 text-zinc-500 border-slate-100 last:border-r-0">
                <InputNumber />
              </TableCell>
              <TableCell className="border-r-2 border-b-2 text-zinc-500 border-slate-100 last:border-r-0">
                0 Units
              </TableCell>
              <TableCell className="text-center border-r-2 border-b-2 text-zinc-500 border-slate-100 last:border-r-0">
                <Button
                  variant={"ghost"}
                  className="p-0 h-auto text-destructive hover:text-destructive hover:bg-transparent"
                >
                  <Trash2 size={20} />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className={"[&>*]:last:border-b-0"}>
              <TableCell
                colSpan={2}
                className=" text-zinc-800 w-[80px] font-semibold bg-slate-100 text-end"
              >
                Total
              </TableCell>{" "}
              <TableCell className="font-semibold text-zinc-800 bg-slate-100 text-end"></TableCell>
              <TableCell className="font-semibold text-zinc-800 bg-slate-100">
                0 Units
              </TableCell>
              <TableCell className="font-semibold text-zinc-800 bg-slate-100 text-end"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium cursor-pointer text-zinc-700">
        <Plus size={16} /> <span>Add New Role</span>
      </p>
    </>
  );
};

export default QuoteGenerationTable;
