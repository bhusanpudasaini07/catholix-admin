import { EyeIcon, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IAdmin, IAdminDetail } from "@/interface/admin-interface";
import { deleteAdmin, getAdmins } from "@/services/admin/admin-service";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { cn } from "@/shared/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useCommonStore } from "@/store/common-store";
import { checkPermissions } from "@/shared/utils/permission-utils/check-permission-utils";
import { constants } from "@/constants";

const { SOMETHING_WENT_WRONG } = constants.messages;

const useAdmin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profileData } = useCommonStore();

  // STATES
  const [role, setRole] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [resetPasswordModalOpen, setResetPasswordModalOpen] =
    useState<boolean>(false);

  //   FUNCTIONS
  const searchTextHandler = (value: string) => {
    setSearchText(value);
  };
  const resetHandler = () => {
    setRole("");
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
  const openResetPasswordModal = (id: string, name: string) => {
    setAdminId(id);
    setAdminName(name);
    setResetPasswordModalOpen(true);
  };

  //   API CALL
  //   users
  const { data: adminList, isLoading: adminLoading } = useQuery<IAdmin>({
    queryFn: () => getAdmins(page, perPage, searchText, role),
    queryKey: ["adminList", page, perPage, searchTrigger],
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteAdmin(adminId),
    onSuccess: () => {
      setAdminId("");
      setAdminName("");
      showToast(TOAST_TYPES.success, "User deleted successfully");
      setDeleteModalOpen(false);
      queryClient.invalidateQueries("adminList");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  const deleteHandler = (id: string, firstName: string, lastName: string) => {
    setAdminId(id);
    setAdminName(`${firstName} ${lastName}`);
    setDeleteModalOpen(true);
  };

  //   Columns
  const adminColumns: ColumnDef<IAdminDetail>[] = [
    // SN
    {
      accessorKey: "sn",
      header: "S.N.",
      cell: ({ row }) => (
        <SerialNumberCell row={row} pageNumber={page} perPage={perPage} />
      ),
    },
    // Full Name
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="font-medium w-[400px]">
          {row?.original?.firstName} {row?.original?.lastName}
        </div>
      ),
    },
    // Email
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <p className="w-[400px]">{row.getValue("email")}</p>,
    },
    // Phone
    {
      accessorKey: "contact",
      header: "Phone",
      cell: ({ row }) => <p>{row.getValue("contact") ?? "-"}</p>,
    },
    // Status
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "active" ? "success" : "secondary"
          }
          className={cn("h-6 capitalize rounded border-0")}
        >
          {row.getValue("status") === "active" ? "Active" : "Disabled"}
        </Badge>
      ),
    },
    // Actions
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          {checkPermissions(profileData, "/users/:id", "get") && (
            <Button
              onClick={() => router.push(`/admins/${row.original.id}`)}
              size={"base"}
              className="gap-2"
            >
              <EyeIcon size={16} />
              View
            </Button>
          )}
          {checkPermissions(profileData, "/users/:id", "get") &&
            checkPermissions(profileData, "/users/:id", "put") && (
              <Button
                onClick={() => router.push(`/admins/${row.original.id}/edit`)}
                size={"base"}
                variant={"white"}
                className="gap-2"
              >
                <PencilLine size={16} />
                Edit
              </Button>
            )}
          {/* Reset Password */}

          {checkPermissions(
            profileData,
            "/users/reset-password/:id",
            "put"
          ) && (
            <Button
              size={"base"}
              variant={"info"}
              className="gap-2"
              onClick={() =>
                openResetPasswordModal(
                  row.original.id.toString(),
                  `${row.original.firstName} ${row.original.lastName}`
                )
              }
            >
              <PencilLine size={16} />
              Reset
            </Button>
          )}

          {checkPermissions(profileData, "/users/:id", "delete") && (
            <Button
              onClick={() =>
                deleteHandler(
                  row.original.id.toString(),
                  row.original.firstName,
                  row.original.lastName
                )
              }
              disabled={row.original.id === 1}
              size={"base"}
              variant={"destructive"}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return {
    // STATES
    role,
    setRole,
    searchText,
    setSearchText,
    perPage,
    setPerPage,
    page,
    setPage,
    deleteModalOpen,
    setDeleteModalOpen,
    adminId,
    setAdminId,
    adminName,
    setAdminName,
    resetPasswordModalOpen,
    setResetPasswordModalOpen,

    // FUNCTIONS
    searchTextHandler,
    resetHandler,
    perPageHandler,
    pageChangeHandler,
    searchTriggerHandler,
    deleteHandler,

    // Columns
    adminColumns,

    // API
    adminList,
    adminLoading,
    // rolesList,
    // rolesLoading,

    deleteUserMutation,
  };
};

export default useAdmin;
