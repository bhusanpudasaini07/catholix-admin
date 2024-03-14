import { DownloadCloud } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";

import {
  IRpStaffSummaryProps,
  IStaff,
} from "@/interface/team-lead-report-interface";
import { getConfig } from "@/services/dashboard/dashboard-service";
import { getStaffDailyTimelog } from "@/services/lead-report/lead-report-service";
import { DataTable } from "@/shared/components/data-table/data-table";
import FilterSearch from "@/shared/components/filter-search";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DownloadExcel } from "@/shared/utils/download/download.utils";
import { ColumnDef } from "@tanstack/react-table";

import MemberTimeLogModal from "./member-timelog-modal";

const MemberWiseLogTable: FC<IRpStaffSummaryProps> = ({
  dateRange,
  staffRpSummaryData,
  staffDataLoading,
}) => {
  const [role, setRole] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [staffId, setStaffId] = useState<string>("2");
  const convertSecondsToHoursAndMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}H ${minutes}M`;
  };

  const { data: filterDate, isLoading: filterLoading } = useQuery<any>(
    "getConfig",
    async () => {
      const response = getConfig();
      return response;
    }
  );

  const StaffLogData = useMemo(
    () =>
      staffRpSummaryData?.data?.staff?.map((staff: IStaff, index: any) => {
        const usedRp = parseFloat(staff?.used_rp || "0");
        const commercialRp = parseFloat(staff?.commercial_rp || "0");
        const lossRp = parseFloat(staff?.loss_rp || "0");
        const availableTime = parseFloat(staff?.available_time || "0");
        const usedTime = parseFloat(staff?.used_time || "0");
        const rpPercentage =
          usedRp !== 0 ? ((lossRp / usedRp) * 100).toFixed(2) : "0.00";
        const clientRpPercentage =
          usedRp !== 0 ? ((commercialRp / usedRp) * 100).toFixed(2) : "0.00";
        const timePercentage =
          availableTime !== 0
            ? ((usedTime / availableTime) * 100).toFixed(2)
            : "0.00";
        const clientTimePercentage =
          availableTime !== 0
            ? (
                (parseFloat(staff?.commercial_time) / availableTime) *
                100
              ).toFixed(2)
            : "0.00";

        return {
          sn: index + 1,
          id: staff?.id,
          name: staff?.fullname,
          username: staff?.username,
          role: staff?.role_name,
          spent_rp: staff?.used_rp,
          spent_client_rp: commercialRp?.toFixed(2),
          loss_rp: lossRp?.toFixed(2),
          rp_percentage: rpPercentage,
          client_rp_percentage: clientRpPercentage,
          total_time: convertSecondsToHoursAndMinutes(availableTime),
          spent_time: convertSecondsToHoursAndMinutes(usedTime),
          time_percentage: timePercentage,
          client_time_percentage: clientTimePercentage,
        };
      }),
    [staffRpSummaryData]
  );

  const { data: staffDailyLog, isLoading: staffDailyLogLoading } =
    useQuery<any>(
      ["getStaffDailyLog", dateRange?.to, dateRange?.from, staffId, modalOpen],
      async () => {
        if (staffId) {
          const response = await getStaffDailyTimelog(
            moment(dateRange?.from).format("YYYY-MM-DD"),
            moment(dateRange?.to).format("YYYY-MM-DD"),
            staffId
          );
          return response;
        }
      }
    );

  const ModelHandler = (id: string) => {
    setStaffId(id);
    setModalOpen(true);
  };

  const filteredStaffLogData = useMemo(() => {
    // If no search text and role selected, return all data
    if (!searchText && !role) return StaffLogData;
    // if () return StaffLogData;

    let filteredData = StaffLogData;

    // Filter by name if searchText is provided
    if (searchText) {
      filteredData = filteredData?.filter((staff: any) =>
        staff?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    }

    // Filter by role if role is selected
    if (role === "all") {
      // filteredData = filteredData;
    } else if (role) {
      filteredData = filteredData?.filter((staff: any) =>
        staff?.role?.toLowerCase()?.includes(role?.toLowerCase())
      );
    }

    return filteredData;
  }, [StaffLogData, searchText, role]);

  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-sm font-medium w-[40px] ps-3">
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
        <Link
          href={`/staffs/${row?.original?.username}`}
          className="text-sm font-semibold text-blue-500"
        >
          {row.getValue("name")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("role")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "spent_rp",
      accessorKey: "spent_rp",
      header: "Spent Budget",
      cell: ({ row }) => (
        <div
          onClick={() => ModelHandler(row?.original?.id)}
          className="text-sm font-semibold text-blue-500 cursor-pointer"
        >
          {row.getValue("spent_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "spent_client_rp",
      accessorKey: "spent_client_rp",
      header: "Spent Budget (Client)",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("spent_client_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "loss_rp",
      accessorKey: "loss_rp",
      header: "Loss Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("loss_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp_percentage",
      accessorKey: "rp_percentage",
      header: "% Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("rp_percentage")}%
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "client_rp_percentage",
      accessorKey: "client_rp_percentage",
      header: "% Budget Client",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
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
        <div className="text-sm font-semibold text-zinc-700">
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
        <div className="text-sm font-semibold text-zinc-700">
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
        <div className="text-sm font-semibold text-zinc-700">
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
        <div className="text-sm font-semibold text-zinc-700">
          {parseInt(row.getValue("client_time_percentage")).toFixed(2)}%
        </div>
      ),
      enableHiding: false,
    },
  ];

  const handleDownloadSubFeature = () => {
    // const columnKeys =
    //   filteredStaffLogData?.length > 0
    //     ? Object?.keys(filteredStaffLogData[0])
    //     : [];
    const mappedData = filteredStaffLogData?.map((item: any, index: number) => {
      const rowData: any = {};
      rowData["S.N"] = index + 1;
      // rowData["ID"] = item?.id;
      rowData["Name"] = item?.name;
      rowData["Role"] = item?.role;
      rowData["Spent Budget"] = item?.spent_rp;
      rowData["Spent Budget (Client)"] = item?.spent_client_rp;
      rowData["Loss Budget"] = item?.loss_rp;
      rowData["% Budget"] = item?.rp_percentage;
      rowData["% Budget Client"] = item?.client_rp_percentage;
      rowData["Total Time"] = item?.total_time;
      rowData["Spent Time"] = item?.spent_time;
      rowData["% Time"] = item?.time_percentage;
      rowData["% Time(Client)"] = item?.client_time_percentage;
      return rowData;
    });
    DownloadExcel(
      mappedData,
      `MEMBER_LOG_${moment(dateRange?.from).format("YYYY-MM-DD")}_TO_${moment(
        dateRange?.to
      ).format("YYYY-MM-DD")}`
    );
  };

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
            <FilterSearch className="!py-2" setSearchText={setSearchText} />
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="min-w-[260px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-auto">
                <SelectItem key={"all"} value={"all"}>
                  All
                </SelectItem>
                {filterDate?.data?.roles?.map((roles: any, index: number) => (
                  <SelectItem key={index} value={roles?.title}>
                    {roles?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size={"sm"}
              onClick={handleDownloadSubFeature}
              variant={"success"}
            >
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
        <Dialog onOpenChange={setModalOpen} open={modalOpen}>
          <DialogContent className="min-w-[800px]">
            <MemberTimeLogModal
              staffDailyLog={staffDailyLog}
              staffDailyLogLoading={staffDailyLogLoading}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MemberWiseLogTable;
