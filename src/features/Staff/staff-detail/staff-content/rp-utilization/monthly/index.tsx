import useStaffDetail from "@/hooks/staff/useStaffDetail.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";

const MonthlyRPUtilization = () => {
  const { monthlyRpColumn } = useStaffDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-medium text-zinc-700">
              Monthly RP Utilization
            </p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="max-w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable data={[]} border columns={monthlyRpColumn} />
      </CardContent>
    </Card>
  );
};

export default MonthlyRPUtilization;
