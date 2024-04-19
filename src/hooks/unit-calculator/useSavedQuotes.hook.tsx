import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { PenSquare, Share2, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

const useSavedQuotes = () => {
  const columns: ColumnDef<any>[] = [
    // SN
    {
      id: "added_date",
      accessorKey: "added_date",
      header: "Date Added",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <p className="font-medium">
            {moment(row.getValue("added_date")).format("YYYY-MM-DD")}
          </p>
          <p>{moment(row.getValue("added_date")).format("HH:mm:ss")}</p>
        </div>
      ),
    },
    // Title
    {
      id: "title",
      accessorKey: "title",
      header: "Title Name",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("title")}</div>
      ),
    },
    // Discount
    {
      id: "discount",
      accessorKey: "discount",
      header: "Discount %",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("discount")}</div>
      ),
    },
    // Total Units
    {
      id: "total_units",
      accessorKey: "total_units",
      header: "Total Units",
      cell: ({ row }) => (
        <div className="font-medium">{row?.getValue("total_units")} Units</div>
      ),
    },
    // REF URL
    {
      id: "ref_url",
      accessorKey: "ref_url",
      header: "Ref URL",
      cell: ({ row }) => (
        <Link
          href={`${row?.getValue("ref_url")}`}
          target="_blank"
          className="font-medium underline text-zinc-700 hover:text-primary"
        >
          {row?.getValue("ref_url")}
        </Link>
      ),
    },
    // Remarks
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <div className="font-medium max-w-[200px]">
          {row?.getValue("remarks")}
        </div>
      ),
    },
    // Modified Date
    {
      id: "modified_date",
      accessorKey: "modified_date",
      header: "Date Modified",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <p className="font-medium">
            {moment(row.getValue("added_date")).format("YYYY-MM-DD")}
          </p>
          <p>{moment(row.getValue("added_date")).format("HH:mm:ss")}</p>
        </div>
      ),
    },
    // ACTIONS
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          {/* Edit */}
          <Tooltip>
            <TooltipTrigger>
              <p className="p-0 h-auto text-zinc-700 hover:bg-transparent">
                <PenSquare size={20} />
              </p>
            </TooltipTrigger>
            <TooltipContent>View/Edit</TooltipContent>
          </Tooltip>
          {/* Share */}
          <Tooltip>
            <TooltipTrigger>
              <p className="p-0 h-auto text-zinc-700 hover:bg-transparent">
                <Share2 size={20} />
              </p>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
          {/* Remove */}
          <Tooltip>
            <TooltipTrigger>
              <p className="p-0 h-auto text-destructive hover:text-destructive hover:bg-transparent">
                <Trash2 size={20} />
              </p>
            </TooltipTrigger>
            <TooltipContent>Remove</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  const dummyData = [
    {
      id: 1,
      remarks: "Remark 1",
      modified_date: "2024-01-11 17:43:22",
      added_date: "2024-01-11 17:43:22",
      title: "Wonder Trivia Test",
      discount: "10%",
      total_units: 5,
      ref_url: "http://example.com/quote1",
    },
    {
      id: 2,
      remarks: "Remark 2",
      modified_date: "2024-01-11 17:43:22",
      added_date: "2024-01-11 17:43:22",
      title: "Flea Market Quotation Final",
      discount: "15%",
      total_units: 10,
      ref_url: "http://example.com/quote2",
    },
  ];
  return { columns, dummyData };
};

export default useSavedQuotes;
