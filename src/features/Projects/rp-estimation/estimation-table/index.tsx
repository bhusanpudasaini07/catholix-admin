import {
  IMember,
  IProjectEstimationDetail,
} from "@/interface/project-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Check, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import React from "react";

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
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-medium text-zinc-700">
                {estimation?.title}
              </p>
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
            </div>
            <div className="flex items-start gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500 min-w-[95px]">
                <CalendarDays size={20} />
                <span>Added On</span>
              </div>
              <div className="text-sm text-zinc-700">
                <p className="mb-0.5 font-medium">
                  {moment(estimation?.added_on).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ">
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
            },
            {
              columnId: "rp",
            },
            {
              columnId: "sum_rp",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default EstimationTable;
