import { useMutation, useQuery, useQueryClient } from "react-query";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { addProducts, deleteProducts, editProducts, getAllProducts, getProductsDetail } from "@/services/products/product-service";
import {  IProducts, IProductsList, IProductsPost } from "@/interface/products-interface";
import { ProductFormSchema } from "@/schema/product-schema";

const { SOMETHING_WENT_WRONG } = constants.messages;

export const useProducts = () => {
  const router = useRouter();
  
  const queryClient = useQueryClient();
  const form = useForm<IProductsPost>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //Product State
  const [productId,  setProductId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("false");

  // Get all  Products Function
  const { data: productList, isLoading: productLoading } =
    useQuery<IProductsList>({
      queryFn: () => getAllProducts(),
      queryKey: ["products"],
    });

  // Get Product By id Function
  const { data: productDetail, isLoading: productDetailLoading } =
  useQuery<any>({
    queryFn: () => getProductsDetail(router?.query?.id),
    queryKey: ["productsbyId"],
    enabled: !!router.query.id
  });

  // Add Product Function
  const addProductMutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product added successfully");
      router.push('/categories')
      queryClient.invalidateQueries("products");
    },
    onError: (error: any) => {
      if (error) {
        showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
      } else {
        showToast(TOAST_TYPES.error, SOMETHING_WENT_WRONG);
      }
    },
  });

  // Edit Product Function
  const editProductMutation = useMutation({
    mutationFn: (data: IProductsPost) =>
      editProducts(router.query?.id as string, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product edited successfully");
      router.push("/products");
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

    // Delete Product Function
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProducts(productId),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product deleted successfully");
      setDeleteModalOpen(false);
      queryClient.invalidateQueries("products");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  // Buttons Handler 
  const deleteHandler = (id: string, name:string) => {
    setProductId(id);
    setProductName(name)
    setDeleteModalOpen(true);
  };

  const productColumns: ColumnDef<IProducts>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="font-medium w-[400px]">
    productName: string
    productName: string
          {row?.original.productName}
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
                  row.original.productName,
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
     productId,
     productName,
     setProductName,
     deleteModalOpen,
     setDeleteModalOpen,

    //columns
    productColumns,

    //api
    productList,
    productLoading,
    productDetail,
    productDetailLoading,
    addProductMutation,
    deleteProductMutation,
    editProductMutation

  };
};
