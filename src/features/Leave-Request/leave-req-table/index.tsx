import React from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<any>[];
  data: any;
  perPage: number;
  pageNum: number;

  //   FUNCTIONS
  changePerPage: (arg: number) => void;
  changePageNumber: (arg: number) => void;
}

const LeaveRequestTable = ({
  columns,
  data,
  perPage,
  pageNum,
  changePerPage,
  changePageNumber,
}: IProps) => {
  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            border
            headerSticky
            height="max-h-[calc(100vh-250px)]"
          />
        </CardContent>
      </Card>
      <DataTablePagination
        currentPage={pageNum}
        totalPages={10}
        perPage={perPage}
        setPerPage={changePerPage}
        pageChange={changePageNumber}
      />
    </>
  );
};

export default LeaveRequestTable;
