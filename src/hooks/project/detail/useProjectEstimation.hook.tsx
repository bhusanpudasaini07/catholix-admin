import { IMember, IProjectEstimation } from "@/interface/project-interface";
import { getProjectEstimation } from "@/services/project/project-service";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useProjecetEstimation = () => {
  const {
    query: { code },
  } = useRouter();
  const { data: estimationData, isLoading: estimationDataLoading } =
    useQuery<IProjectEstimation>({
      queryKey: ["estimationData", code],
      queryFn: async () => {
        if (code) {
          const response = await getProjectEstimation(code);
          return response;
        }
      },
    });

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };
  const columns: ColumnDef<IMember>[] = [
    {
      id: "sn",
      accessorKey: "sn",
      header: "S.No.",
      cell: (props) => <SerialNumberCell {...props} />,
    },
    // Role
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => (
        <div className="w-[200px]">{row.getValue("role_name")}</div>
      ),
    },
    // Allocated Days
    {
      id: "days",
      accessorKey: "days",
      header: "Allocated Days",
      cell: ({ row }) => (
        <div className="w-[100px]">{row?.getValue("days")} Days</div>
      ),
    },
    // Man Month
    {
      id: "man_month",
      accessorKey: "man_month",
      header: "Man Month",
      cell: ({ row }) => (
        <div className="w-[80px]">{row?.getValue("man_month")}</div>
      ),
    },
    // Allocated Units
    {
      id: "rp",
      accessorKey: "rp",
      header: "Allocated Units",
      cell: ({ row }) => <div className="w-[100px]">{row?.getValue("rp")}</div>,
    },
    // % Allocated
    {
      id: "percentage_allocation",
      accessorKey: "percentage_allocation",
      header: "% Allocated",
      cell: ({ row }) => (
        <div className="w-[100px]">
          {row?.getValue("percentage_allocation")}%
        </div>
      ),
    },
    // Member
    {
      id: "staff_name",
      accessorKey: "staff_name",
      header: "Member",
      cell: ({ row }) => (
        <div className="w-[150px]">{row?.getValue("staff_name")}</div>
      ),
    },
    // Allocation Date
    {
      id: "allocation_date",
      accessorKey: "allocation_date",
      header: "Allocation Date",
      cell: ({ row }) => (
        <div className="w-[100px]">
          {row?.original?.dates?.length > 0
            ? row?.original?.dates?.map((date, index) => (
                <div className="font-medium text-zinc-700" key={index}>
                  <p>{date?.start_date}</p>
                  <p>
                    <span className="text-zinc-500">to</span> {date?.end_date}
                  </p>
                </div>
              ))
            : "N/A"}
        </div>
      ),
    },
    // % use
    {
      id: "percentage_use",
      accessorKey: "percentage_use",
      header: "% Use",
      cell: ({ row }) => (
        <div className="w-[120px]">
          {row?.original?.dates?.length > 0
            ? row?.original?.dates?.map((date, index) => (
                <div className="font-medium text-zinc-700" key={index}>
                  {date?.utilization}% / {date?.total_rp}
                </div>
              ))
            : "N/A"}
        </div>
      ),
    },
    // Allocated RP
    {
      id: "sum_rp",
      accessorKey: "sum_rp",
      header: "Allocated RP",
      cell: ({ row }) => (
        <div className="w-[80px]">{row?.getValue("sum_rp")}</div>
      ),
    },

    // Actions
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 w-[80px]">
          <Button
            variant={"ghost"}
            className="h-auto p-0 hover:bg-transparent text-zinc-700"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant={"ghost"}
            className="h-auto p-0 hover:bg-transparent text-zinc-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];
  return { estimationData, estimationDataLoading, columns };
};

export default useProjecetEstimation;
