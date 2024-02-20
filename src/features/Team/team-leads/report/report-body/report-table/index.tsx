import useReport from "@/hooks/team/team-leads/useReport.hook";
import { ILeadDetail } from "@/interface/team-leads-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Cloud, DownloadCloud } from "lucide-react";
import React from "react";

interface IProps {
  columns: ColumnDef<ILeadDetail>[];
  data: any;
  loading: boolean;
}

const ReportSummaryTable = ({ columns, data, loading }: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <p className="text-lg font-medium text-zinc-700">Team Lead</p>
          <Button variant={"success"} size={"sm"}>
            <DownloadCloud size={16} />
          </Button>
        </div>

        <DataTable
          border={true}
          loading={loading}
          columns={columns}
          data={data ?? []}
        />
      </CardContent>
    </Card>
  );
};

export default ReportSummaryTable;
