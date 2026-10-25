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
import Image from "next/image";

const { SOMETHING_WENT_WRONG } = constants.messages;

export const useProducts = () => {
  const router = useRouter();
  const routeProductId = router.query.productId;
  const queryClient = useQueryClient();
  const form = useForm<IProductsPost>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //Product State
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [productId,  setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("false");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

 // Generate Listing Mutation





  // Get all  Products Function
  const { data: productList, isLoading: productLoading } =
    useQuery<IProductsList>({
      queryFn: () => getAllProducts(search, page, perPage),
      queryKey: ["products", search, page, perPage],
    });

  // Get Product By id Function
  const { data: productDetail, isLoading: productDetailLoading } =
  useQuery<any>({
    queryFn: () => getProductsDetail(routeProductId),
    queryKey: ["productsbyId", routeProductId],
    enabled: !!routeProductId,
  });

  // Add Product Function
  const addProductMutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product added successfully");
      router.push('/products')
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
      editProducts(routeProductId, data),
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
      queryClient.invalidateQueries("products");
      setDeleteModalOpen(false);
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

  // FUNCTIONS
  const perPageHandler = (value: number) => {
    setPerPage(value);
  };
  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleReset = () => {
    setPage(1);
    setSearch("");
  };

  const productColumns: ColumnDef<IProducts>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      size: 20,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="text-xs font-medium leading-4 w-[180px]">
          {row?.original.productName}
        </div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "Category Name",
       minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div >
          {row?.original?.category.categoryName}
        </div>
      ),
    }, 
    {
      accessorKey: "hasOffer",
      header: "Offer",
      cell: ({ row }) => (
        <div >
          {row?.original?.hasOffer ? "Yes" : "No"}
        </div>
      ),
    },
    {
      accessorKey: "productDescription",
      header: "Product Description",
      minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div className="font-medium w-[400px]">
          {row?.original?.productDescription}
        </div>
      ),
    },
    {
      accessorKey: "productPrice",
      header: "Product Price",
      minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div className="font-medium">
          {row?.original?.productPrice}
        </div>
      ),
    },
    {
      accessorKey: "productImageUrl",
      header: "Product Image",
      minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div className="font-medium w-[200px]">{
          row?.original?.productImageUrl ? (
            <Image src={row?.original?.productImageUrl || "/images/placeholder.png"} alt={row?.original?.productName} width={100} height={100} placeholder="blur" blurDataURL="/images/placeholder.png" />
          ) : (
            <Image src="/images/placeholder.png" alt="placeholder" width={100} height={100} placeholder="blur" blurDataURL="/images/placeholder.png" />
          )
        }
        </div>
      ),
    },
   
    {
      accessorKey: "actions",
      header: "Actions",
      meta: {
        sticky: "right-0",
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center whitespace-nowrap">
          <Button
            onClick={() => router.push(`/products/${row.original.id}`)}
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
     addModalOpen,
     setAddModalOpen,
     deleteModalOpen,
     setDeleteModalOpen,
     page,
     setPage,
     perPage,
     setPerPage,
     pageChangeHandler,
     perPageHandler,
     handleSearch,
     search,
     handleReset,

    //columns
    productColumns,

    //api
    productList,
    productLoading,
    productDetail,
    productDetailLoading,
    addProductMutation,
    deleteProductMutation,
    editProductMutation,
  };
};
