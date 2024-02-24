import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import {
  IRpStaffSummaryProps,
  IStaff,
} from "@/interface/team-lead-report-interface";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadCloud } from "lucide-react";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";

const MemberWiseLogTable: FC<IRpStaffSummaryProps> = ({
  staffRpSummaryData,
  staffDataLoading,
}) => {
  // const { staffRpSummaryData, staffDataLoading } = useLeadReport();

  const [searchText, setSearchText] = useState("");
  const convertSecondsToHoursAndMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}H ${minutes}M`;
  };

  const StaffLogData = useMemo(
    () =>
      staffRpSummaryData?.data?.staff?.map((staff: IStaff, index: any) => ({
        sn: index + 1,
        name: staff?.fullname,
        role: staff?.role_name,
        spent_rp: staff.used_rp,
        spent_client_rp: parseFloat(staff.commercial_rp).toFixed(2),
        loss_rp: parseFloat(staff.loss_rp).toFixed(2),
        rp_percentage: (
          (parseFloat(staff.loss_rp) / parseFloat(staff.used_rp)) *
          100
        ).toFixed(2),
        client_rp_percentage: (
          (parseFloat(staff.commercial_rp) / parseFloat(staff.used_rp)) *
          100
        ).toFixed(2),
        total_time: convertSecondsToHoursAndMinutes(
          parseFloat(staff.available_time)
        ),
        spent_time: convertSecondsToHoursAndMinutes(
          parseFloat(staff.used_time)
        ),
        time_percentage: (
          (parseFloat(staff.used_time) / parseFloat(staff.available_time)) *
          100
        ).toFixed(2),
        client_time_percentage: (
          (parseFloat(staff.commercial_time) /
            parseFloat(staff.available_time)) *
          100
        ).toFixed(2),
      })),
    [staffRpSummaryData]
  );

  const filteredStaffLogData = useMemo(() => {
    if (!searchText) return StaffLogData;
    return StaffLogData.filter((staff: any) =>
      staff.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [StaffLogData, searchText]);
  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-medium w-[40px] ps-3">
          {row.getValue("sn")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="text-blue-500 text-base font-semibold">
          {row.getValue("name")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="text-zinc-500 text-base font-semibold">
          {row.getValue("role")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "spent_rp",
      accessorKey: "spent_rp",
      header: "Spent RP",
      cell: ({ row }) => (
        <div className="text-blue-500 text-base font-semibold">
          {row.getValue("spent_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "spent_client_rp",
      accessorKey: "spent_client_rp",
      header: "Spent RP (Client)",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("spent_client_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "loss_rp",
      accessorKey: "loss_rp",
      header: "Loss RP",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("loss_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp_percentage",
      accessorKey: "rp_percentage",
      header: "% RP",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("rp_percentage")}%
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "client_rp_percentage",
      accessorKey: "client_rp_percentage",
      header: "% RP Client",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("client_rp_percentage")}%
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "total_time",
      accessorKey: "total_time",
      header: "Total Time",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("total_time")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "spent_time",
      accessorKey: "spent_time",
      header: "Spent Time",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("spent_time")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "time_percentage",
      accessorKey: "time_percentage",
      header: "% Time",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {row.getValue("time_percentage")}%
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "client_time_percentage",
      accessorKey: "client_time_percentage",
      header: "% Time (Client)",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-base font-semibold">
          {parseInt(row.getValue("client_time_percentage")).toFixed(2)}%
        </div>
      ),
      enableHiding: false,
    },
  ];

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6 ">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">Member-Wise Log</h5>
            {/* <Button variant={"white"} size={"sm"}>
              View All
            </Button> */}
          </div>
          <div className="flex items-center justify-end gap-2">
            <FilterSearch setSearchText={setSearchText} />
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pm">PM</SelectItem>
              </SelectContent>
            </Select>
            <Button size={"sm"} variant={"success"}>
              <DownloadCloud size={16} />
            </Button>
          </div>
        </div>

        <DataTable
          loading={staffDataLoading}
          height={"max-h-[700px]"}
          headerSticky
          border={true}
          columns={columns}
          data={filteredStaffLogData || []}
        />
      </CardContent>
    </Card>
  );
};

export default MemberWiseLogTable;
