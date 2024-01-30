import React, { useEffect, useState } from "react";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import { NextPageWithLayout } from "@/pages/_app";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import { Button } from "@/shared/components/ui/button";
import { useDebounce } from "@/hooks/debounce.hooks";

import { DataTable } from "@/shared/components/data-table/data-table";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { ColumnDef } from "@tanstack/react-table";
import { ISubDepartment } from "@/interface/department-interface";
import {
  deleteDepartment,
  getSubDepartmentList,
} from "@/services/department/department-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { EyeIcon, PencilLine, Trash2 } from "lucide-react";

const SubDepartments: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router?.query;
  // STATES
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [subDepartmentId, setSubDepartmentId] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  // Debounce the search value to avoid multiple api hits while typing
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const SerialNumberCell = ({ row, pageNumber, perPage }: any) => {
    const rowIndex = row.index;
    const serialNumber = (pageNumber - 1) * perPage + rowIndex + 1;

    return <div className="text-color w-[40px]">{serialNumber}.</div>;
  };

  // FUNCTIONS
  const { data: subDepartmentList, isLoading } = useQuery<ISubDepartment>(
    ["subDepartmentList", debouncedSearchValue, perPage, pageNumber, id],
    async () => {
      if (id) {
        const response = await getSubDepartmentList(id);
        return response;
      }
    },
    {
      onError: (error: any) => {
        if (error[0]?.code === 404) {
          router.push("/departments");
        }
      },
    }
  );

  // filter data sending name to api.
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPageNumber(1);
  };
  const handlePageChange = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  // Delete department
  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setOpen(false);
      queryClient.invalidateQueries(["subDepartmentList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const deleteHandler = () => {
    deleteDepartmentMutation.mutate(subDepartmentId);
  };

  const columns: ColumnDef<ISubDepartment>[] = [
    {
      accessorKey: "S.N",
      cell: (props) => (
        <SerialNumberCell
          {...props}
          pageNumber={pageNumber}
          perPage={perPage}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "DEPARTMENTS",
      cell: ({ row }) => (
        <div className="capitalize w-[200px]">
          {row.getValue("name") ? row.getValue("name") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "team_members",
      header: ({ column }) => {
        return <div>TEAM MEMBERS</div>;
      },
      cell: ({ row }: any) => (
        <div className="flex items-center min-w-[200px] gap-1.5">
          {row
            .getValue("team_members")
            ?.slice(0, 3)
            .map((member: any, index: number) => (
              <p
                key={index}
                className="border px-2 py-1 rounded-md text-xs font-medium text-color"
              >{`${member?.first_name} ${member?.last_name}`}</p>
            ))}
          {row.getValue("team_members")?.length > 3 && (
            <Button type="button" size={"xs"}>
              +{row.getValue("team_members")?.length - 3} More
            </Button>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="uppercase">ACTIONS</div>,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex items-center gap-4">
            <Link
              href={`/departments/${rowData?.parent_id}/sub-departments/${rowData?.id}`}
            >
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link
              href={`/departments/${rowData?.parent_id}/sub-departments/${rowData?.id}/edit`}
              className={
                rowData?.status === "approved"
                  ? "pointer-events-none [&>svg]:stroke-gray-250"
                  : ""
              }
            >
              <PencilLine className="stroke-gray-400 hover:stroke-blue-300" />
            </Link>
            <Button
              onClick={() => {
                setSubDepartmentId(rowData?.id);
                setOpen(true);
              }}
              variant={"ghost"}
              className="p-0 hover:bg-transparent hover:[&>svg]:stroke-destructive"
            >
              <Trash2 className="stroke-gray-400" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold">Sub-Departments</h2>
        </div>
        <div className="flex items-center justify-end flex-1 gap-7">
          <div className="flex items-center justify-between gap-6">
            <Button
              variant={"secondary"}
              size={"lg"}
              onClick={() => router?.push("/departments")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <DataTable data={subDepartmentList?.data ?? []} columns={columns} />
      {/* <DataTablePagination
        currentPage={subDepartmentList?.data?.pagination?.page_no!}
        totalPages={subDepartmentList?.data?.pagination?.total_pages!}
        pageChange={handlePageChange}
        perPage={perPage}
        setPerPage={setPerPage}
      /> */}

      {/* Confirmation Modal */}
      <ConfirmationModal
        key={subDepartmentId}
        open={open}
        setOpen={setOpen}
        title="Delete this department"
        description="Are you sure you want to delete this department?"
        btnName="Delete"
        btnFuntion={deleteHandler}
        variant={"destructive"}
      />
    </div>
  );
};

export default SubDepartments;

SubDepartments.getLayout = (page) => {
  return <MainLayout title="Departments">{page}</MainLayout>;
};
