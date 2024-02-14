import React from "react";

import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Card, CardContent } from "@/shared/components/ui/card";

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
    <div className="grid grid-flow-row gap-6 mt-6 grid-col-2">
      <Card className="row-start-1 row-end-4">
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-start gap-3">
              <p>Team Wise Consumption</p>
              <Button variant={"white"}>More Details</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-md grow">
            <DataTable border={true} columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>

      <Card className="row-start-1 row-end-4">
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-start gap-3">
              <p>Department Wise Consumption</p>
              <Button variant={"white"}>More Details</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md grow">
            <DataTable border={true} columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamConsumption;
