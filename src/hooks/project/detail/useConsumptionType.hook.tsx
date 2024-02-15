import {
  IDepartmentGroupWise,
  IRoleGroupWise,
  IRoleWise,
  IStaffWise,
} from "@/interface/project-interface";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import useProjectDetail from "./useProjectDetail.hook";
import { calculateTimeLog } from "@/shared/utils/rp-utils";

const useConsumptionType = () => {
  const { rpSummary } = useProjectDetail();

  const SerialNumberCell = ({ row }: any) => {
    const rowIndex = row.index;
    const serialNumber = rowIndex + 1;
    return <div className="text-color">{serialNumber}.</div>;
  };

  //   Team Wise Column
  const staffColumns: ColumnDef<IStaffWise>[] = [
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Team Members",
      cell: ({ row }) => (
        <div>
          <Link
            className="font-semibold text-primary hover:text-blue-700"
            href={`/staff-details/${row?.original?.username}`}
          >
            {row.getValue("name")}
          </Link>
          <p className="mt-1 text-xs text-zinc-500">{row?.original?.role}</p>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Time Logged",
      cell: ({ row }: any) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("time"));
        return <div>{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Consumed",
      cell: ({ row }: any) => <div>{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => {
        const totalRP =
          rpSummary?.data?.staffwise?.reduce((acc: any, member: any) => {
            return acc + parseFloat(member.rp);
          }, 0) || 0;
        const percentage = (row?.original?.rp / totalRP) * 100;
        return <div>{percentage.toFixed(2)}%</div>;
      },
      enableHiding: false,
    },
  ];

  //   Role Wise Column
  const roleColumns: ColumnDef<IRoleWise>[] = [
    // S.N.
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    // Role
    {
      id: "role_name",
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.getValue("role_name")}</p>
          {/* <p className="mt-1 text-xs text-zinc-500">{row?.original?.role}</p> */}
        </div>
      ),
      enableHiding: false,
    },
    // Time Logged
    {
      id: "time",
      accessorKey: "time",
      header: "Time Logged",
      cell: ({ row }: any) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("time"));
        return <div>{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    // RP consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Consumed",
      cell: ({ row }: any) => <div>{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    // %
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => {
        const totalRP =
          rpSummary?.data?.rolewise?.reduce((acc: any, member: any) => {
            return acc + parseFloat(member.rp);
          }, 0) || 0;
        const percentage = (row?.original?.rp / totalRP) * 100;
        return <div>{percentage.toFixed(2)}%</div>;
      },
      enableHiding: false,
    },
  ];

  // Role Group Wise Column
  const roleGroupColumn: ColumnDef<IRoleGroupWise>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    // Role Group
    {
      id: "title",
      accessorKey: "title",
      header: "Role Group",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-semibold text-zinc-700">
            {row.getValue("title")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // Time Logged
    {
      id: "time",
      accessorKey: "time",
      header: "Time Logged",
      cell: ({ row }: any) => {
        const { hours, minutes } = calculateTimeLog(row.getValue("time"));
        return <div>{`${hours}H ${minutes}M`}</div>;
      },
      enableHiding: false,
    },
    // RP Consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Consumed",
      cell: ({ row }: any) => <div>{row.getValue("rp").toFixed(2)}</div>,
      enableHiding: false,
    },
    // Percentage
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => {
        return <div>{row.getValue("percentage")}%</div>;
      },
      enableHiding: false,
    },
  ];

  // Department Group Wise Column
  const departmentGroupColumn: ColumnDef<IDepartmentGroupWise>[] = [
    // SN
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: (props) => <SerialNumberCell {...props} />,
      enableHiding: false,
    },
    // Role Group
    {
      id: "title",
      accessorKey: "title",
      header: "Role Group",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-semibold text-zinc-700">
            {row.getValue("title")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
    // RP Consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "RP Consumed",
      cell: ({ row }: any) => <div>{row.getValue("rp")}</div>,
      enableHiding: false,
    },
    // Percentage
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }) => {
        return <div>{row.getValue("percentage")}%</div>;
      },
      enableHiding: false,
    },
  ];

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["82%", "78%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 3, name: "Developers" },
          { value: 2, name: "QA" },
        ],
        animationType: "scale",
        animationDuration: 1000,
      },
      {
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1, name: "Developer A" },
          { value: 1, name: "Developer B" },
          { value: 1, name: "Developer C" },
          { value: 1, name: "QA 1" },
          { value: 1, name: "QA 2" },
        ],
      },
    ],
  };

  return {
    staffColumns,
    roleColumns,
    option,
    roleGroupColumn,
    departmentGroupColumn,
  };
};

export default useConsumptionType;
