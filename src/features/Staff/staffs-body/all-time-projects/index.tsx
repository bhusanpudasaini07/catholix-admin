import { DownloadCloud } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { IStaff } from "@/interface/team-lead-report-interface";
import { getConfig } from "@/services/dashboard/dashboard-service";
import { getStaffDailyTimelog } from "@/services/lead-report/lead-report-service";
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
import { DownloadExcel } from "@/shared/utils/download/download.utils";
import { ColumnDef } from "@tanstack/react-table";

const AllTimeProjects = ({
  dateRange,
  allTimeProjectData,
  allTimeProjectLoading,
}: any) => {
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

  // const allTimeProjectData = useMemo(
  //   () =>
  //     allTimeProjectData?.data?.staff?.map((staff: IStaff, index: any) => {
  //       const usedRp = parseFloat(staff?.used_rp || "0");
  //       const commercialRp = parseFloat(staff?.commercial_rp || "0");
  //       const lossRp = parseFloat(staff?.loss_rp || "0");
  //       const availableTime = parseFloat(staff?.available_time || "0");
  //       const usedTime = parseFloat(staff?.used_time || "0");
  //       const rpPercentage =
  //         usedRp !== 0 ? ((lossRp / usedRp) * 100).toFixed(2) : "0.00";
  //       const clientRpPercentage =
  //         usedRp !== 0 ? ((commercialRp / usedRp) * 100).toFixed(2) : "0.00";
  //       const timePercentage =
  //         availableTime !== 0
  //           ? ((usedTime / availableTime) * 100).toFixed(2)
  //           : "0.00";
  //       const clientTimePercentage =
  //         availableTime !== 0
  //           ? (
  //               (parseFloat(staff?.commercial_time) / availableTime) *
  //               100
  //             ).toFixed(2)
  //           : "0.00";

  //       return {
  //         sn: index + 1,
  //         id: staff?.id,
  //         name: staff?.fullname,
  //         username: staff?.username,
  //         role: staff?.role_name,
  //         spent_rp: staff?.used_rp,
  //         spent_client_rp: commercialRp?.toFixed(2),
  //         loss_rp: lossRp?.toFixed(2),
  //         rp_percentage: rpPercentage,
  //         client_rp_percentage: clientRpPercentage,
  //         total_time: convertSecondsToHoursAndMinutes(availableTime),
  //         spent_time: convertSecondsToHoursAndMinutes(usedTime),
  //         time_percentage: timePercentage,
  //         client_time_percentage: clientTimePercentage,
  //       };
  //     }),
  //   [allTimeProjectData]
  // );

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

  const filteredAllTimeProjectData = useMemo(() => {
    // If no search text and role selected, return all data
    if (!searchText && !role) return allTimeProjectData;
    // if () return allTimeProjectData;

    let filteredData = allTimeProjectData;

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
  }, [allTimeProjectData, searchText, role]);

  const columns: ColumnDef<any>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-zinc-700 text-sm font-medium w-[40px] ps-3">
          {row?.index + 1}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Project",
      cell: ({ row }) => (
        <Link href={"#"} className="text-sm font-semibold">
          {row.getValue("name")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "source",
      accessorKey: "source",
      header: "Project Type",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("source")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("status")}
        </div>
      ),
      enableHiding: false,
    },

    {
      id: "market_id",
      accessorKey: "market_id",
      header: "Market",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("market_id")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("role_name")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "Available Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500">
          {row.getValue("rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "overall_used_rp",
      accessorKey: "overall_used_rp",
      header: "Spent Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("overall_used_rp")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "loss_budget",
      accessorKey: "loss_budget",
      header: "Loss Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("loss_budget")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Total Time",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("time")}
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
      id: "loss_time",
      accessorKey: "loss_time",
      header: "Loss Time",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-500 cursor-pointer">
          {row.getValue("loss_time")}
        </div>
      ),
      enableHiding: false,
    },
  ];

  const handleDownloadSubFeature = () => {
    const mappedData = filteredAllTimeProjectData?.map(
      (item: any, index: number) => {
        const rowData: any = {};
        rowData["S.N"] = index + 1;
        rowData["Project"] = item?.name;
        rowData["Project Type"] = item?.source;
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
      }
    );
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
            <h5 className="font-medium text-zinc-700">All Time Projects</h5>
            <Button variant={"white"} size={"sm"}>
              View All
            </Button>
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
                {filterDate?.data?.roles?.map((roles: any) => (
                  <SelectItem key={roles?.index} value={roles?.title}>
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
          loading={allTimeProjectLoading}
          height={"max-h-[700px]"}
          headerSticky
          border={true}
          columns={columns}
          data={filteredAllTimeProjectData || []}
        />
      </CardContent>
    </Card>
  );
};

export default AllTimeProjects;
