import { useMutation, useQuery, useQueryClient } from "react-query";
import { ICategory, ICategoryPost } from "../../interface/category-interface";
import {
  addCategory,
  getAllCategory,
} from "../../services/category/category-service";
import { ColumnDef } from "@tanstack/react-table";
import SerialNumberCell from "@/shared/components/data-table/column-serial-number";
import { Button } from "../../shared/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import {
  showToast,
  TOAST_TYPES,
} from "../../shared/utils/toast-utils/toast.utils";
import { constants } from "../../constants";

const { SOMETHING_WENT_WRONG } = constants.messages;

export const useCategory = () => {
  const queryClient = useQueryClient();

  const { data: categoryList, isLoading: categoryLoading } =
    useQuery<ICategory>({
      queryFn: () => getAllCategory(),
      queryKey: ["categories"],
    });

  const addAdminMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category added successfully");
      queryClient.invalidateQueries("categories");
    },
    onError: (error: any) => {
      if (error) {
        showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
      } else {
        showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      }
    },
  });
  const categoryColumns: ColumnDef<ICategoryPost>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "categoryName",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="font-medium w-[400px]">
          {row?.original.categoryName}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <Button
            // onClick={() => router.push(`/admins/${row.original.id}/edit`)}
            size={"base"}
            variant={"white"}
            className="gap-2"
          >
            <PencilLine size={16} />
            Edit
          </Button>

          <Button
            //   onClick={() =>
            //     deleteHandler(
            //       row.original.id.toString(),
            //       row.original.firstName,
            //       row.original.lastName,
            //     )
            //   }
            size={"base"}
            variant={"destructive"}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return {
    //columns
    categoryColumns,

    //api
    categoryList,
    categoryLoading,

    addAdminMutation,
  };
};
