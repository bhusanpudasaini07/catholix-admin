import { useMutation, useQuery, useQueryClient } from "react-query";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../shared/components/ui/button";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import {
  showToast,
  TOAST_TYPES,
} from "../../shared/utils/toast-utils/toast.utils";
import { constants } from "../../constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { deleteOrder, getAllOrders, getOrderDetail } from "@/services/orders/orders-service";
import moment from "moment";

const { SOMETHING_WENT_WRONG } = constants.messages;

export const useOrders = () => {
  const router = useRouter();
  const routeOrderId = router.query.ordersId;

  const queryClient = useQueryClient();


  //Order State
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [orderId,  setOrderId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

 // Generate Listing Mutation





  // Get all  Orders Function
  const { data: orderList, isLoading: orderLoading } =
    useQuery<any>({
      queryFn: () => getAllOrders(search, page, perPage),
      queryKey: ["orders", search, page, perPage],
    });

  // Get Order By id Function
  const { data: orderDetail, isLoading: orderDetailLoading } =
  useQuery<any>({
    queryFn: () => getOrderDetail(routeOrderId),
    queryKey: ["ordersbyId", routeOrderId],
    enabled: !!routeOrderId,
  });

  


    // Delete Order Function
  const deleteOrderMutation = useMutation({
    mutationFn: () => deleteOrder(orderId),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Order deleted successfully");
      queryClient.invalidateQueries("orders");
      setDeleteModalOpen(false);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  // Buttons Handler 
  const deleteHandler = (id: string) => {
    setOrderId(id);
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

  const orderColumns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      size: 20,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
   
    {
      accessorKey: "guestName",
      header: "Guest Name",
       minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div >
          {row?.original?.guestName}
        </div>
      ),
    }, 
    {
      accessorKey: "orderStatus",
      header: "Order Status",
       minSize: 20,
      size: 20,
      maxSize: 20,
      cell: ({ row }) => (
        <div >
          {row?.original?.orderStatus}
        </div>
      ),
    }, 
    {
      accessorKey: "createdAt",
      header: "Order Date",
      minSize: 50,
      size: 50,
      maxSize: 50,
      cell: ({ row }) => (
        <div >
          {moment(row?.original?.createdAt).format("DD/MM/YYYY hh:mm A")}
        </div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      minSize: 30,
      size: 30,
      maxSize: 30,
      cell: ({ row }) => (
        <div className="font-medium">
          AUD{row?.original?.totalAmount}
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
            onClick={() => router.push(`/orders/${row.original.id}`)}
            size={"base"}
            variant={"white"}
            className="gap-2"
          >
            <Eye size={16} />
            VIEW
          </Button>

          {/* <Button
              onClick={() =>
                deleteHandler(
                  row.original.id.toString(),
                )
              }
            size={"base"}
            variant={"destructive"}
          >
            <Trash2 size={16} />
          </Button> */}
        </div>
      ),
    },
  ];

  return {
     // STATES
     orderId,
     setOrderId,
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
orderColumns,
deleteOrderMutation,
    //api
    orderList,
    orderLoading,
    orderDetail,
    orderDetailLoading,
  };
};
