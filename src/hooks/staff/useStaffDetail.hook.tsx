import { IStaff, IStaffDetails, IStaffLogs } from "@/interface/staff-interface";
import {
  getStaffDetails,
  getStaffTimeLogs,
} from "@/services/staff/staff-service";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useStaffDetail = () => {
  const {
    query: { username },
  } = useRouter();

  const { data: staffDetails, isLoading: staffDetailsLoading } =
    useQuery<IStaff>({
      queryFn: async () => {
        if (username) {
          const response = await getStaffDetails(username);
          return response;
        }
      },
      queryKey: ["staffDetails", username],
    });

  const { data: staffLog, isLoading: staffLogLoading } = useQuery<IStaffLogs>({
    queryFn: async () => {
      if (username) {
        const response = await getStaffTimeLogs(username);
        return response;
      }
    },
    queryKey: ["staffLog", username],
  });

  // Projects List Column
  const projectsOverviewColumns: ColumnDef<any>[] = [
    {
      id: "sn",
      header: "S.No.",
      accessorKey: "sn",
      //   cell: () =>
    },
    // Project name
    {
      id: "project_title",
      accessorKey: "project_title",
      header: "Project Name",
      cell: ({ row }: any) => (
        <Link href={"/"} className="text-primary hover:text-blue-700">
          Link
        </Link>
      ),
    },
    // Budget Role
    {
      id: "role",
      accessorKey: "role",
      header: "Budget Role",
      cell: ({ row }: any) => <div>Role</div>,
    },
    // Project Type
    {
      id: "type",
      accessorKey: "type",
      header: "Project Type",
      cell: ({ row }: any) => <div className="w-[120px]">Type</div>,
    },
    // Project Lead
    {
      id: "lead",
      accessorKey: "lead",
      header: "Project Lead",
      cell: ({ row }: any) => <div>Lead</div>,
    },
    // STatus
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => <Badge className={cn("")}>Lead</Badge>,
    },
    // Sales RP
    {
      id: "sales_rp",
      accessorKey: "sales_rp",
      header: "Sales Budget",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Used RP
    {
      id: "used_rp",
      accessorKey: "used_rp",
      header: "Used Budget",
      cell: ({ row }: any) => <div className="font-medium">asd</div>,
    },
    // RP Contribution
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Contribution",
      cell: ({ row }: any) => <div className="font-medium">asd</div>,
    },
    // Time Contribution
    {
      id: "time",
      accessorKey: "time",
      header: "Time Contribution",
      cell: ({ row }: any) => <div className="font-medium">asd</div>,
    },
    // Review
    {
      id: "review",
      accessorKey: "review",
      header: "Review",
      cell: ({ row }: any) => (
        <Button
          variant={"ghost"}
          className="h-auto p-0 text-zinc-700 hover:text-primary"
        >
          <Eye size={20} />
        </Button>
      ),
    },
  ];

  const dailyRpColumn: ColumnDef<any>[] = [
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // RP Provided
    {
      id: "provided_rp",
      accessorKey: "provided_rp",
      header: "Budget Provided",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Remarks
    {
      id: "remarks",
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }: any) => <div>asd</div>,
    },
  ];

  const monthlyRpColumn: ColumnDef<any>[] = [
    // Month
    {
      id: "month",
      accessorKey: "month",
      header: "Month",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // Available RP
    {
      id: "available_rp",
      accessorKey: "available_rp",
      header: "Available Budget",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // RP Provided
    {
      id: "provided_rp",
      accessorKey: "provided_rp",
      header: "Budget Provided",
      cell: ({ row }: any) => <div>asd</div>,
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => <div>asd</div>,
    },
  ];

  return {
    projectsOverviewColumns,
    dailyRpColumn,
    monthlyRpColumn,
    staffDetails,
    staffDetailsLoading,
    staffLog,
    staffLogLoading,
  };
};

export default useStaffDetail;
