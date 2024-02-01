 import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState, useCallback, memo } from "react";

interface IPagination {
  currentPage: number;
  pageChange: (arg0: number) => void;
  totalPages: number;
  perPage: number;
  setPerPage: (arg0: number) => void;
}

const DataTablePagination: React.FC<IPagination> = memo(
  ({ pageChange, currentPage, totalPages, setPerPage, perPage }) => {
    const [pageNumber, setPageNumber] = useState<any>(null);

    const handlePaginationEllipsis = useCallback(() => {
      let isPageNumberOutOfRange: boolean = false;
      let pageNumbers: any;
      pageNumbers = Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === totalPages;
        const isCurrentPageWithinTwoPageNumbers =
          Math.abs(pageNumber - currentPage) <= 2;
        const handleEllipsisClick = () => {
          if (pageNumber > 0) pageChange(pageNumber);
        };

        if (
          isPageNumberFirst ||
          isPageNumberLast ||
          isCurrentPageWithinTwoPageNumbers
        ) {
          isPageNumberOutOfRange = false;
          return (
            <Button
              variant={"pagination"}
              key={pageNumber}
              className={`${pageNumber === currentPage && "border-primary"}`}
              onClick={() => pageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        }
        if (!isPageNumberOutOfRange) {
          isPageNumberOutOfRange = true;
          return (
            <Button
              variant={"pagination"}
              key={pageNumber}
              onClick={handleEllipsisClick}
            >
              ...
            </Button>
          );
        }

        return null;
      });
      setPageNumber(pageNumbers);
    }, [totalPages, currentPage, pageChange]);

    const perPageHandler = (perPage: any) => {
      setPerPage(JSON.parse(perPage));
      pageChange(1);
    };
    useEffect(() => {
      handlePaginationEllipsis();
    }, [handlePaginationEllipsis]);

    return (
      <div className="flex items-center justify-between px-2 mt-6">
        {/* Entries */}
        <div className="flex items-center gap-2">
          <p className="text-sm">Show</p>
          <Select
            value={JSON.stringify(perPage)}
            onValueChange={(value) => perPageHandler(value)}
          >
            <SelectTrigger className="px-3 py-2 w-[68px]">
              <SelectValue placeholder={JSON.stringify(perPage)} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm">entries</p>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant={"pagination"}
            className={currentPage === 1 ? "disabled:bg-gray-290" : ""}
            disabled={currentPage === 1}
            onClick={() => pageChange(currentPage - 1)}
          >
            <ChevronLeft className="max-w-[18px]" stroke="#C4CDD5" />
          </Button>
          <div className="flex items-center gap-2">{pageNumber}</div>
          <Button
            variant={"pagination"}
            className={currentPage === totalPages ? "disabled:bg-gray-290" : ""}
            disabled={currentPage === totalPages}
            onClick={() => pageChange(currentPage + 1)}
          >
            <ChevronRight className="max-w-[18px]" stroke="#C4CDD5" />
          </Button>
        </div>
      </div>
    );
  }
);
DataTablePagination.displayName = "DataTablePagination";

export { DataTablePagination };
