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
import { BannerFormSchema } from "@/schema/banner-schema";
import {
  createBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "@/services/dashboard/dashboard-service";

const { SOMETHING_WENT_WRONG } = constants.messages;

export interface IBanner {
  id: string;
  title: string;
  description?: string;
  isPublished?: boolean;
  banner?: string;
  image?: string;
  bannerUrl?: string;
}

export const useBanners = () => {
  const router = useRouter();
  const routeBannerId = Array.isArray(router.query.bannerId)
    ? router.query.bannerId[0]
    : router.query.bannerId;
  const queryClient = useQueryClient();
  const form = useForm<any>({
    resolver: zodResolver(BannerFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [bannerId, setBannerId] = useState<string>("");
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const { data: bannerList, isLoading: bannerLoading } = useQuery({
    queryFn: () => getBanner(search, page, perPage),
    queryKey: ["banners", search, page, perPage],
  });

  const addBannerMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Banner added successfully");
      router.push("/banner");
      queryClient.invalidateQueries("banners");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  const editBannerMutation = useMutation({
    mutationFn: (data: any) => updateBanner(routeBannerId as string, data),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Banner edited successfully");
      router.push("/banner");
      queryClient.invalidateQueries("banners");
    },
    onError: (error: any) => {
      const message = Array.isArray(error?.message)
        ? error.message.join(", ")
        : error?.message;
      showToast(TOAST_TYPES.error, message || SOMETHING_WENT_WRONG);
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: () => deleteBanner(bannerId),
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Banner deleted successfully");
      setDeleteModalOpen(false);
      queryClient.invalidateQueries("banners");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.message || SOMETHING_WENT_WRONG);
    },
  });

  const deleteHandler = (id: string, title: string) => {
    setBannerId(id);
    setBannerTitle(title);
    setDeleteModalOpen(true);
  };

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

  const bannerColumns: ColumnDef<IBanner>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium w-[240px]">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="w-[320px]">{row.original.description || "-"}</div>
      ),
    },
    {
      accessorKey: "isPublished",
      header: "Published",
      cell: ({ row }) => (
        <div>{row.original.isPublished ? "Yes" : "No"}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => router.push(`/banner/${row.original.id}`)}
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
                row.original.title,
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
    bannerId,
    bannerTitle,
    setBannerTitle,
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
    bannerColumns,
    bannerList,
    bannerLoading,
    addBannerMutation,
    deleteBannerMutation,
    editBannerMutation,
    form,
  };
};
