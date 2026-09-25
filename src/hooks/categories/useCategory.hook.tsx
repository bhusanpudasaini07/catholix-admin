import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ICategory,
  ICategoryList,
  ICategoryPost,
} from "../../interface/category-interface";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getCategoryDetail,
} from "../../services/category/category-service";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../shared/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import {
  showToast,
  TOAST_TYPES,
} from "../../shared/utils/toast-utils/toast.utils";
import { constants } from "../../constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryFormSchema } from "@/schema/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const { SOMETHING_WENT_WRONG } = constants.messages;

export const useCategory = () => {
  const router = useRouter();
 console.log("sadasd",  router.query)
  
  const queryClient = useQueryClient();
  const form = useForm<ICategoryPost>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //Categories State
  const [categoryId,  setCategoryId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // Get all  Category Function
  const { data: categoryList, isLoading: categoryLoading } =
    useQuery<ICategory>({
      queryFn: () => getAllCategory(),
      queryKey: ["categories"],
    });

  // Get Category By id Function
  const { data: categoryDetail, isLoading: categoryDetailLoading } =
  useQuery<ICategory>({
    queryFn: () => getCategoryDetail(router?.query?.id),
    queryKey: ["categoriesbyId"],
    enabled: !!router.query.id
  });

  // Add Category Function
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category added successfully");
      router.push('/categories')
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

  // Edit Category Function
  const editCategoryMutation = useMutation({
    mutationFn: (data: ICategoryPost) =>
      editCategory(router.query?.id as string, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category edited successfully");
      router.push("/categories");
    },
    onError: (error: any) => {
      if (error) {
        error?.message.map((err: any) => {
          form.setError(err?.name, {
            message: err?.errors[0],
          });
        });
      } else {
        showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      }
    },
  });

    // Delete Category Function
  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Category deleted successfully");
      setDeleteModalOpen(false);
      queryClient.invalidateQueries("adminList");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  // Buttons Handler 
  const deleteHandler = (id: string) => {
    setCategoryId(id);
    setDeleteModalOpen(true);
  };

  const categoryColumns: ColumnDef<ICategoryList>[] = [
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
            onClick={() => router.push(`/categories/${row.original.id}`)}
            size={"base"}
            variant={"white"}
            className="gap-2"
          >
            <PencilLine size={16} />
            Edit
          </Button>

          <Button
              onClick={() =>
                deleteHandler(
                  row.original.id.toString(),
                )
              }
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
     // STATES
     categoryId,
     deleteModalOpen,
     setDeleteModalOpen,

    //columns
    categoryColumns,

    //api
    categoryList,
    categoryLoading,
    categoryDetail,
    categoryDetailLoading,
    addCategoryMutation,
    deleteCategoryMutation,
    editCategoryMutation

  };
};
