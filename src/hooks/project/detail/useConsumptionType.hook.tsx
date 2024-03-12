import { EChartsInstance } from 'echarts-for-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import {
    IDepartmentGroupWise, IRoleGroupWise, IRoleWise, IStaffWise
} from '@/interface/project-interface';
import { calculateTimeLog, changeNumberFormat } from '@/shared/utils/rp-utils';
import { ColumnDef } from '@tanstack/react-table';

import useProjectRpSummary from './useProjectRpSummary.hook';

const useConsumptionType = () => {
  const { rpSummary } = useProjectRpSummary();
  const teamChartRef = useRef<EChartsInstance>(null);
  const roleChartRef = useRef<EChartsInstance>(null);
  const roleGroupChartRef = useRef<EChartsInstance>(null);
  const departmentGroupChartRef = useRef<EChartsInstance>(null);

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
            href={`/staffs/${row?.original?.username}`}
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
      header: "Budget Consumed",
      cell: ({ row }: any) => (
        <div>{changeNumberFormat(row.getValue("rp"))}</div>
      ),
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
    // Budget Consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }: any) => (
        <div>{changeNumberFormat(row.getValue("rp"))}</div>
      ),
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
    // Budget Consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }: any) => (
        <div>{changeNumberFormat(row.getValue("rp"))}</div>
      ),
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
    // Budget Consumed
    {
      id: "rp",
      accessorKey: "rp",
      header: "Budget Consumed",
      cell: ({ row }: any) => (
        <div>{changeNumberFormat(row.getValue("rp"))}</div>
      ),
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

  // team wise chart option
  const staffWiseOption = {
    series: [
      {
        type: "pie",
        radius: ["35%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 12,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data: rpSummary?.data?.staffwise?.map((staff) => ({
          value: staff?.rp,
          name: staff?.name,
        })),
      },
      {
        type: "pie",
        radius: ["65%", "68%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outer",
        },
        emphasis: {
          label: {
            show: false,
          },
          scale: false,
        },
        labelLine: {
          show: true,
        },
        data: [
          {
            name: "QA",
            value: 40,
          },
          {
            name: "Dev",
            value: 40,
          },
        ],
      },
    ],
  };

  // rolewise chart option
  const roleWiseOption = {
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 12,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: rpSummary?.data?.rolewise?.map((role) => ({
          value: role?.rp,
          name: role?.role_name,
        })),
      },
    ],
  };

  // roleGroupWise chart option
  const roleGroupWiseOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 12,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: rpSummary?.data?.rolegroupwise?.map((role) => ({
          value: role?.rp.toFixed(2),
          name: role?.title,
        })),
      },
    ],
  };

  const departmentGroupWiseOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: (item: any) => {
            return "{a|" + item.value + "}\n{b|" + item.name + "}";
          },
          rich: {
            a: {
              fontSize: 22,
              color: "#3F3F46",
              lineHeight: 20,
              fontWeight: 600,
            },
            b: {
              fontSize: 12,
              color: "#3F3F46",
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: rpSummary?.data?.departmentgroupwise?.map((department) => ({
          value: department?.rp,
          name: department?.title,
        })),
      },
    ],
  };

  // EFFECTS

  /**
   * For team chart change
   */
  useEffect(() => {
    const myChart = teamChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params?.name + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 12,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    staffWiseOption && myChart.setOption(staffWiseOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [staffWiseOption]);

  /*
   * For role chart change
   */
  useEffect(() => {
    const myChart = roleChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params?.name + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 12,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    roleWiseOption && myChart.setOption(roleWiseOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [roleWiseOption]);

  /*
   * For role group chart change
   */
  useEffect(() => {
    const myChart = roleGroupChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params?.name + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 12,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    roleGroupWiseOption && myChart.setOption(roleGroupWiseOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [roleGroupWiseOption]);

  /*
   * For department group chart change
   */
  useEffect(() => {
    const myChart = departmentGroupChartRef.current?.getEchartsInstance();
    if (!myChart) return;

    myChart.on("mouseover", function (params: any) {
      myChart.setOption({
        series: [
          {
            label: {
              formatter: () => {
                return "{a|" + params.value + "}\n{b|" + params?.name + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  color: "#3F3F46",
                  lineHeight: 20,
                  fontWeight: 600,
                },
                b: {
                  fontSize: 12,
                  color: "#3F3F46",
                  lineHeight: 30,
                },
              },
            },
          },
        ],
      });
    });

    departmentGroupWiseOption && myChart.setOption(departmentGroupWiseOption);

    return () => {
      myChart.off("mouseover");
    };
  }, [departmentGroupWiseOption]);

  return {
    staffColumns,
    roleColumns,
    staffWiseOption,
    roleWiseOption,
    roleGroupColumn,
    departmentGroupColumn,
    roleGroupWiseOption,
    departmentGroupWiseOption,

    //refs
    roleChartRef,
    teamChartRef,
    roleGroupChartRef,
    departmentGroupChartRef,
  };
};

export default useConsumptionType;
