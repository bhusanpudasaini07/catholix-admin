import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";

const ProjectStories = () => {
  const columns = [
    {
      id: "sn",
      accessorKey: "S_N",
      header: "S. No.",
      cell: ({ row }: any) => <div>{row?.original?.S_N}</div>,
      enableHiding: false,
    },
    {
      id: "stories",
      accessorKey: "stories",
      header: "Stories",
      cell: ({ row }: any) => <div>{row?.original?.title}</div>,
      enableHiding: false,
    },
    {
      id: "estimated_time",
      accessorKey: "estimated_time",
      header: "Estimated Time",
      cell: ({ row }: any) => <div>{row?.original?.estimated_time}</div>,
      enableHiding: false,
    },
    {
      id: "time_spent",
      accessorKey: "time_spent",
      header: "Time Spent",
      cell: ({ row }: any) => <div>{row?.original?.time_spent}</div>,
      enableHiding: false,
    },
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }: any) => <div>{row?.original?.task}</div>,
      enableHiding: false,
    },
    {
      id: "bugs",
      accessorKey: "bugs",
      header: "Bugs",
      cell: ({ row }: any) => <div>{row?.original?.bugs}</div>,
      enableHiding: false,
    },
  ];

  const data = [
    {
      S_N: 1,
      title: "Sample Story 1",
      estimated_time: 5,
      time_spent: 3,
      task: "Task A",
      bugs: 0,
    },
    {
      S_N: 2,
      title: "Sample Story 2",
      estimated_time: 8,
      time_spent: 6,
      task: "Task B",
      bugs: 1,
    },
    {
      S_N: 3,
      title: "Sample Story 3",
      estimated_time: 10,
      time_spent: 9,
      task: "Task C",
      bugs: 2,
    },
  ];
  return (
    <div className="mt-6 card !p-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-start items-center gap-3">
          <p>Stories</p>
          <Button variant={"white"}>More Details</Button>
        </div>
        <div className="">tabs</div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="grow border-[1px] border-solid border-zinc-300 rounded-md overflow-hidden max-w-[60%]">
          <DataTable
            // columnVisibility={columnVisibility}
            // setColumnVisibility={setColumnVisibility}

            columns={columns}
            data={data}
          />
        </div>
        <div className="grow flex justify-between flex-wrap gap-3">
          <div
            className={`rounded-md py-8 w-[48%] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100
            `}
          >
            <p className="text-4xl font-semibold">02</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          <div
            className={`rounded-md py-8 w-[48%] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100
            `}
          >
            <p className="text-4xl font-semibold">02</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          <div
            className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold">02</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          <div
            className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
          >
            <p className="text-4xl font-semibold">02</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
          <div
            className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
          >
            <p className="text-4xl font-semibold">02</p>
            <p className="text-base font-semibold">Bugs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStories;
