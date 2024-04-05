import { CalendarDays, Check, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import React from "react";

import {
  IMember,
  IProjectEstimationDetail,
} from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { changeNumberFormat } from "@/shared/utils/rp-utils";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  columns: ColumnDef<IMember>[];
  estimation: IProjectEstimationDetail;
  estimationDataLoading: boolean;
}

const EstimationTable = ({
  columns,
  estimation,
  estimationDataLoading,
}: IProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex gap-4 items-center">
              <p className="text-lg font-medium text-zinc-700">
                {estimation?.title}
              </p>
              {estimationDataLoading ? (
                <Skeleton className="w-16 h-4" />
              ) : (
                <Badge
                  variant={"outline"}
                  className={`
                      ${
                        estimation?.status === "Pending" &&
                        " border-orange-500 bg-orange-50  text-orange-500"
                      }
                      ${
                        estimation?.status === "Approved" &&
                        " border-green-500 bg-green-50 text-green-500 "
                      }
            capitalize border rounded-md`}
                >
                  {estimation?.status}
                </Badge>
              )}
            </div>
            <div className="flex gap-2 items-start mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>Added On</span>
              </div>
              <div className="text-sm text-zinc-700">
                {estimationDataLoading ? (
                  <Skeleton className="w-16 h-4" />
                ) : (
                  <p className="mb-0.5 font-medium">
                    {moment(estimation?.added_on).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Button variant={"outline"} className="gap-2" size={"md"}>
              <Plus size={16} /> <span>Add New Role</span>
            </Button>

            {estimation?.status !== "Approved" && (
              <>
                <Button variant={"destructive"} className="gap-2" size={"md"}>
                  <Trash2 size={16} /> <span>Remove</span>
                </Button>
                <Button variant={"success"} className="gap-2" size={"md"}>
                  <Check size={16} /> <span>Approve</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={estimation?.members ?? []}
          border={true}
          loading={estimationDataLoading}
          total={[
            {
              columnId: "man_month",
              format: (value) => changeNumberFormat(value),
            },
            {
              columnId: "rp",
              format: (value) => changeNumberFormat(value),
            },
            {
              columnId: "sum_rp",
              format: (value) => changeNumberFormat(value),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default EstimationTable;
