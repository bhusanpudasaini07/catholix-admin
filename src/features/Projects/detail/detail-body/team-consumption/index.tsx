import React from "react";

import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/data-table/data-table";

const TeamConsumption = () => {
  const columns = [
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: ({ row }: any) => <div>{row?.original?.S_N}</div>,
      enableHiding: false,
    },
    {
      id: "team_members",
      accessorKey: "team_members",
      header: "Team Members",
      cell: ({ row }: any) => <div>{row?.original?.team_members}</div>,
      enableHiding: false,
    },
    {
      id: "time_logged",
      accessorKey: "time_logged",
      header: "Time Logged",
      cell: ({ row }: any) => <div>{row?.original?.time_logged}</div>,
      enableHiding: false,
    },
    {
      id: "rp_consumed",
      accessorKey: "rp_consumed",
      header: "Rp Consumed",
      cell: ({ row }: any) => <div>{row?.original?.rp_consumed}</div>,
      enableHiding: false,
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "%",
      cell: ({ row }: any) => <div>{row?.original?.percentage}</div>,
      enableHiding: false,
    },
  ];

  const data = [
    {
      S_N: 1,
      team_members: "John Doe",
      time_logged: "5h 30m",
      rp_consumed: 100,
      percentage: 20,
    },
    {
      S_N: 2,
      team_members: "Jane Smith",
      time_logged: "3h 45m",
      rp_consumed: 75,
      percentage: 15,
    },
    // Add more data objects as needed
  ];

  return (
    <div className="grid grid-col-2 grid-flow-row mt-4 gap-6">
      <div className="row-start-1 row-end-4 card">
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center gap-3">
            <p>Team Wise Consumption</p>
            <Button variant={"white"}>More Details</Button>
          </div>
        </div>

        <div className="grow border-[1px] border-solid border-zinc-300 rounded-md overflow-hidden">
          <DataTable
            // columnVisibility={columnVisibility}
            // setColumnVisibility={setColumnVisibility}

            columns={columns}
            data={data}
          />
        </div>
      </div>
      <div className="row-start-1 row-end-4 card">
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center gap-3">
            <p>Department Wise Consumption</p>
            <Button variant={"white"}>More Details</Button>
          </div>
        </div>

        <div className="grow border-[1px] border-solid border-zinc-300 rounded-md overflow-hidden">
          <DataTable
            // columnVisibility={columnVisibility}
            // setColumnVisibility={setColumnVisibility}

            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamConsumption;
