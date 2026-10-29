import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IBundle, IBundlePayload } from "@/interface/bundle-interface";
import {
  addBundle,
  editBundle,
  getAllBundles,
} from "@/services/bundles/bundle-service";
import { Button } from "@/shared/components/ui/button";
import {
  showToast,
  TOAST_TYPES,
} from "@/shared/utils/toast-utils/toast.utils";
import { constants } from "@/constants";

const { SOMETHING_WENT_WRONG } = constants.messages;

const getErrorMessage = (error: any) => {
  const message = error?.message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  return message || SOMETHING_WENT_WRONG;
};

const normalizeBundles = (payload: unknown): IBundle[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const record = payload as {
      items?: IBundle[];
      data?: IBundle[] | { items?: IBundle[] };
    };

    if (Array.isArray(record.items)) {
      return record.items;
    }

    if (Array.isArray(record.data)) {
      return record.data;
    }

    if (record.data && Array.isArray(record.data.items)) {
      return record.data.items;
    }
  }

  return [];
};

const formatPrice = (value?: number | string) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "-";
  }
  return `AUD ${amount.toFixed(2)}`;
};

const formatStatus = (status?: string) => {
  if (!status) {
    return "-";
  }
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getItemLabel = (item: NonNullable<IBundle["items"]>[number]) => {
  const name =
    item.product?.productName ||
    item.product?.title ||
    `Product ${item.productId}`;
  return `${name} x${item.quantity}`;
};

export const useBundles = () => {
  const router = useRouter();
  const routeBundleId = Array.isArray(router.query.bundleId)
    ? router.query.bundleId[0]
    : router.query.bundleId;
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading: bundleLoading } = useQuery({
    queryFn: getAllBundles,
    queryKey: ["bundles"],
  });

  const bundles = useMemo(() => normalizeBundles(data), [data]);

  const filteredBundles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return bundles;
    }

    return bundles.filter((bundle) => {
      const itemNames = (bundle.items ?? []).map(getItemLabel).join(" ");
      return [bundle.name, bundle.description, bundle.status, itemNames]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [bundles, search]);

  const totalPages = Math.max(1, Math.ceil(filteredBundles.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const items = filteredBundles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const bundleList = {
    items,
    page: currentPage,
    perPage,
    totalPages,
  };

  const addBundleMutation = useMutation({
    mutationFn: addBundle,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Bundle added successfully");
      router.push("/bundles");
      queryClient.invalidateQueries("bundles");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, getErrorMessage(error));
    },
  });

  const editBundleMutation = useMutation({
    mutationFn: (payload: IBundlePayload) =>
      editBundle(routeBundleId as string, payload),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Bundle updated successfully");
      router.push("/bundles");
      queryClient.invalidateQueries("bundles");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, getErrorMessage(error));
    },
  });

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleReset = () => {
    setPage(1);
    setSearch("");
  };

  const bundleColumns: ColumnDef<IBundle>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      cell: ({ row }) => (
        <div>{(currentPage - 1) * perPage + row.index + 1}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Bundle Name",
      cell: ({ row }) => (
        <div className="w-[220px] font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="w-[280px]">{row.original.description || "-"}</div>
      ),
    },
    {
      accessorKey: "fixedPrice",
      header: "Fixed Price",
      cell: ({ row }) => <div>{formatPrice(row.original.fixedPrice)}</div>,
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ row }) => <div>{row.original.stockQuantity ?? 0}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{formatStatus(row.original.status)}</div>,
    },
    {
      accessorKey: "items",
      header: "Products",
      cell: ({ row }) => {
        const labels = (row.original.items ?? []).map(getItemLabel);
        return (
          <div className="w-[260px]">
            {labels.length ? labels.join(", ") : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) =>
        row.original.imageUrl ? (
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="h-14 w-14 rounded-md object-cover"
          />
        ) : (
          <div className="text-gray-400">-</div>
        ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          onClick={() => router.push(`/bundles/${row.original.id}`)}
          size={"base"}
          variant={"white"}
          className="gap-2"
        >
          <PencilLine size={16} />
          Edit
        </Button>
      ),
    },
  ];

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    pageChangeHandler,
    perPageHandler,
    handleSearch,
    search,
    handleReset,
    bundleColumns,
    bundleList,
    bundleLoading,
    addBundleMutation,
    editBundleMutation,
  };
};
