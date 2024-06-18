import { constants } from "@/constants";
import { IRoleDetail, IRoles } from "@/interface/roles-interface";
import { deleteRole, getRoles } from "@/services/roles/roles-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { checkPermissions } from "@/shared/utils/permission-utils/check-permission-utils";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { cn } from "@/shared/utils/utils";
import { useCommonStore } from "@/store/common-store";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { SOMETHING_WENT_WRONG } = constants.messages;

const useRoles = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { profileData } = useCommonStore();

  // STATES
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");

  const { data: rolesList, isLoading: rolesLoading } = useQuery<IRoles>({
    queryKey: ["rolesList", page, perPage, searchTrigger],
    queryFn: () => getRoles(page, perPage, searchText),
  });

  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setSearchText("");
    setSearchTrigger(!searchTrigger);
  };
  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
    setPage(1);
  };

  const deleteRoleMutation = useMutation({
    mutationFn: () => deleteRole(roleId),
    onSuccess: () => {
      setRoleId("");
      setRoleName("");
      showToast(TOAST_TYPES.success, "Role deleted successfully");
      setDeleteModalOpen(false);
      queryClient.invalidateQueries("rolesList");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  const deleteHandler = (id: string, name: string) => {
    setRoleId(id);
    setRoleName(name);
    setDeleteModalOpen(true);
  };

  //   Columns
  const roleColumns: ColumnDef<IRoleDetail>[] = [
    {
      accessorKey: "sn",
      header: "S.No",
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    }, // Role Name
    {
      accessorKey: "name",
      header: "Role",
      cell: ({ row }) => (
        <div className="font-medium">{row?.original?.name}</div>
      ),
    },
    // User count
    {
      accessorKey: "userCount",
      header: "User Count",
      cell: ({ row }) => <p className="">{row.getValue("userCount")}</p>,
    },
    // Status
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <Badge
    //       variant={
    //         row.getValue("status") === "active" ? "success" : "secondary"
    //       }
    //       className={cn("h-6 capitalize rounded border-0")}
    //     >
    //       {row.getValue("status") === "active" ? "Active" : "Disabled"}
    //     </Badge>
    //   ),
    // },
    // Actions
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          {/* <Button size={"base"} className="gap-2">
            <EyeIcon size={16} />
            View
          </Button> */}
          {checkPermissions(profileData, "/roles/:id", "get") &&
            checkPermissions(profileData, "/roles/:id", "put") && (
              <Button
                size={"base"}
                onClick={() => router.push(`/roles/${row.original.id}/edit`)}
                variant={"primary"}
                className="gap-2"
              >
                <PencilLine size={16} />
                Edit
              </Button>
            )}

          {checkPermissions(profileData, "/roles/:id", "delete") && (
            <Button
              onClick={() =>
                deleteHandler(row.original.id.toString(), row.original.name)
              }
              size={"base"}
              className="gap-2"
              variant={"destructive"}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return {
    // STATES
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,
    searchTrigger,
    setSearchTrigger,
    deleteModalOpen,
    setDeleteModalOpen,
    roleId,
    setRoleId,
    roleName,
    setRoleName,

    // Functions
    searchTextHandler,
    resetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    deleteHandler,

    // API
    rolesList,
    rolesLoading,

    // Columns,
    roleColumns,
    deleteRoleMutation,
  };
};

export default useRoles;
