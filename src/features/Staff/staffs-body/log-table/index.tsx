import { DownloadCloud } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";

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
import { useRouter } from "next/router";

const LogTable: FC<any> = ({ logTableData, logTableLoading }) => {
  const router = useRouter();
  const username = router?.query?.username;
  const [role, setRole] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const convertSecondsToHoursAndMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours === 0) {
      return `${minutes}M`;
    }
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
      logTableData?.data?.time_logs?.map((log: any, index: any) => ({
        sn: index + 1,
        date: moment(log?.date).format("YYYY-MM-DD HH:mm:ss"),
        project: log?.project?.title || "N/A",
        project_url: log?.repo_url || "",
        code: log?.project?.code || "",
        project_type: log?.project?.source || "N/A",
        role: log?.log_by?.role_name || "N/A",
        task: log?.title || "N/A",
        task_url: log?.task_url || "",
        spent_rp: log?.rp || "N/A",
        spent_time: convertSecondsToHoursAndMinutes(log?.time) || "N/A",
      })),
    [logTableData]
  );

  const filteredStaffLogData = useMemo(() => {
    let filteredData = StaffLogData;

    if (searchText) {
      filteredData = filteredData?.filter((staff: any) =>
        staff?.project?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
    }

    if (role === "all") {
    } else if (role) {
      filteredData = filteredData?.filter((staff: any) =>
        staff?.role?.toLowerCase()?.includes(role?.toLowerCase())
      );
    }

    if (projectType === "all") {
    } else if (projectType === "client") {
      filteredData = filteredData?.filter(
        (staff: any) => staff?.project_type?.toLowerCase() === "client"
      );
    } else if (projectType === "in_house") {
      filteredData = filteredData?.filter(
        (staff: any) => staff?.project_type?.toLowerCase() === "in-house"
      );
    }

    return filteredData;
  }, [StaffLogData, searchText, role, projectType]);

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
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-zinc-700 font-medium">
          <p className="whitespace-nowrap">
            {moment(row.getValue("date")).format("YYYY-MM-DD")}
          </p>
          <p className="text-xs">
            {moment(row.getValue("date")).format("hh:MM")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "project",
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => (
        <Link
          href={`/projects/${row?.original?.code}`}
          className="text-sm font-semibold text-primary"
        >
          {row.getValue("project")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "project_type",
      accessorKey: "project_type",
      header: "Project Type",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("project_type")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("role")}
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <Link
          href={`${row?.original?.task_url}`}
          className="text-sm font-semibold text-primary"
        >
          {row.getValue("task")}
        </Link>
      ),
      enableHiding: false,
    },
    {
      id: "spent_rp",
      accessorKey: "spent_rp",
      header: "Spent Budget",
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-zinc-700">
          {row.getValue("spent_rp")}
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
  ];

  const handleDownloadSubFeature = () => {
    const mappedData = filteredStaffLogData?.map((item: any, index: number) => {
      const rowData: any = {};
      rowData["S.N"] = index + 1;
      rowData["Date"] = item?.date;
      rowData["Project"] = item?.project;
      rowData["Project Type"] = item?.project_type;
      rowData["Role"] = item?.role;
      rowData["Task"] = item?.task;
      rowData["Spent Budget"] = item?.spent_rp;
      rowData["Spent Time"] = item?.spent_time;
      return rowData;
    });

    DownloadExcel(mappedData, `LOG_TABLE_OF_${username}`);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-3 mb-6 ">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-medium text-zinc-700">Log Table</h5>
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
            <Select onValueChange={(value) => setProjectType(value)}>
              <SelectTrigger className="min-w-[60px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-auto">
                <SelectItem key={"all"} value={"all"}>
                  All Project
                </SelectItem>
                <SelectItem key={"client"} value={"client"}>
                  Client Project
                </SelectItem>
                <SelectItem key={"in_house"} value={"in_house"}>
                  In-House Project
                </SelectItem>
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
          loading={logTableLoading}
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

export default LogTable;
