import React, { useState } from "react";

import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

interface IProps {
  columns: ColumnDef<any>[];
  data: any;
  loading: boolean;
}

const LeaveRequestTable = ({ columns, data, loading }: IProps) => {
  const [perPage, setPerPage] = useState(10);
  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={data.slice(0, perPage)}
            loading={loading}
            loadingDataNum={10}
            border
            headerSticky
            height="max-h-[calc(100vh-250px)]"
          />
          {perPage < data?.length && (
            <p
              onClick={() => setPerPage(perPage + 10)}
              className="flex gap-2 justify-center items-center py-4 text-sm font-medium text-center cursor-pointer text-zinc-700"
            >
              <Plus size={16} />
              Load More
            </p>
          )}
        </CardContent>
      </Card>
      {/* <DataTablePagination
        currentPage={pageNum}
        totalPages={10}
        perPage={perPage}
        setPerPage={changePerPage}
        pageChange={changePageNumber}
      /> */}
    </>
  );
};

export default LeaveRequestTable;
