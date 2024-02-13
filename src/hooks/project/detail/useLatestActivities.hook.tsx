import {
  IActivitiesDetail,
  IProjectActivities,
} from "@/interface/project-interface";
import { getProjectLatestActivities } from "@/services/project/project-service";
import { ColumnDef } from "@tanstack/react-table";
import {
  Clock,
  Lock,
  Pen,
  Pencil,
  Pin,
  Tag,
  Timer,
  Unlock,
  Users,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useLatestActivities = () => {
  const {
    query: { code },
  } = useRouter();

  const { data: latestActivities, isLoading } = useQuery<IProjectActivities>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectLatestActivities(code);
        return response;
      }
    },
    queryKey: ["latestActivities", code],
  });

  // to show different text and icon in different activity types
  const activityTye = (change_type: string) => {
    let changeText: string = "";
    let icon: any;
    switch (change_type) {
      case "new_issue":
        changeText = "New Task";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
            <Pin size={16} />
          </div>
        );
        break;
      case "labels":
        changeText = "Label Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-400 rounded-full">
            <Tag size={16} />{" "}
          </div>
        );
        break;

      case "title":
        changeText = "Title Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
            <Pencil size={16} />
          </div>
        );
        break;

      case "estimate":
        changeText = "Estimate Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
            <Clock size={16} />
          </div>
        );
        break;

      case "assignees":
        changeText = "Asignee Update";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Users size={16} />
          </div>
        );
        break;

      case "close":
        changeText = "Task Close";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-orange-500 rounded-full">
            <Lock size={16} />
          </div>
        );
        break;

      case "reopen":
        changeText = "Task Reopened";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
            <Unlock size={16} />
          </div>
        );
        break;

      case "timelog":
        changeText = "Timelog Added";
        icon = (
          <div className="flex items-center justify-center w-6 h-6 text-white bg-purple-500 rounded-full">
            <Timer size={16} />
          </div>
        );
        break;
    }
    return { changeText, icon };
  };

  const columns: ColumnDef<IActivitiesDetail>[] = [
    // Activity
    {
      id: "activity",
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => {
        const { changeText, icon } = activityTye(row?.original?.change_type);
        return (
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-xs font-medium text-zinc-700">
              {changeText}
            </span>
          </div>
        );
      },
      enableHiding: false,
    },
    // Task
    {
      id: "task",
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => (
        <div className="max-w-[400px]">
          <Link
            href={row?.original?.issue?.url}
            target="_blank"
            className="text-primary hover:text-blue-700"
          >
            {row?.original?.issue?.title}
          </Link>
        </div>
      ),
      enableHiding: false,
    },
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-zinc-700">
            {moment(row?.original?.date).format("YYYY-MM-DD")}
          </p>
          <p className="text-xs text-zinc-600">
            {moment(row?.original?.date).format("hh:mm:ss")}
          </p>
        </div>
      ),
      enableHiding: false,
    },
  ];

  return { columns, latestActivities, isLoading };
};

export default useLatestActivities;
