import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Image from "next/image";

import {
  SearchIcon,
  TotalInvoice,
  TotalInvoiceAmount,
  UnanalyzedInvoice,
} from "@/shared/lib/image-config";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/hooks/debounce.hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import { ColumnDef } from "@tanstack/react-table";
import {
  IDepartment,
  IDepartmentDetail,
} from "@/interface/department-interface";
import {
  deleteDepartment,
  getDepartmentList,
} from "@/services/department/department-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { EyeIcon, PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/router";

const Departments: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // STATES
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [departmentId, setDepartmentId] = useState("");
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
  const { data: departmentList, isLoading } = useQuery<IDepartment>({
    queryFn: () => getDepartmentList(searchValue, pageNumber, perPage),
    queryKey: ["departmentList", debouncedSearchValue, perPage, pageNumber],
  });
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
      queryClient.invalidateQueries(["departmentList"]);
    },
    onError: (error: any) => {
      setOpen(false);
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const deleteHandler = () => {
    deleteDepartmentMutation.mutate(departmentId);
  };

  const columns: ColumnDef<IDepartment>[] = [
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
      accessorKey: "department_members",
      header: ({ column }) => {
        return <div>TEAM MEMBERS</div>;
      },
      cell: ({ row }: any) => (
        <div className="flex items-center w-[400px] gap-1.5">
          {row
            .getValue("department_members")
            ?.slice(0, 3)
            .map((member: any, index: number) => (
              <p
                key={index}
                className="border px-2 py-1 rounded-md text-xs font-medium text-color"
              >{`${member?.first_name} ${member?.last_name}`}</p>
            ))}
          {row.getValue("department_members")?.length > 3 && (
            <Button type="button" size={"xs"}>
              +{row.getValue("department_members")?.length - 3} More
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return <div>SUB DEPARTMENT</div>;
      },
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="w-[160px]">
            <Button
              onClick={() =>
                router.push(`/departments/${rowData?.id}/sub-departments`)
              }
              disabled={rowData?.sub_departments_count === 0}
              size={"xs"}
            >
              View Sub-departments
            </Button>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="uppercase">ACTIONS</div>,
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex items-center gap-4">
            <Link href={`/departments/${rowData.id}`}>
              <EyeIcon className="stroke-gray-400 hover:stroke-green-150" />
            </Link>
            <Link
              href={`/departments/${rowData.id}/edit`}
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
                setDepartmentId(rowData?.id);
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

  // EFFECTS
  useEffect(() => {
    if (
      departmentList?.data?.departments?.length === 0 &&
      pageNumber > departmentList?.pagination?.total_pages!
    ) {
      setPageNumber(pageNumber - 1);
    }
  }, [departmentList, pageNumber]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold">Departments</h2>
          {/* <Badge className="font-normal ">240 Vendors</Badge> */}
        </div>
        <div className="flex items-center justify-between lg:justify-end flex-1 gap-7">
          <div className="relative px-3.5 py-2.5 border rounded-lg flex gap-2 flex-grow lg:max-w-sm">
            <Button variant={"ghost"} className="h-auto p-0">
              <Image
                src={SearchIcon}
                width={24}
                height={24}
                quality={100}
                alt="Search Icon"
                className=""
              />
            </Button>
            <Input
              placeholder="Search"
              className="h-auto p-0 border-0 rounded-none "
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-6">
            <Link
              href={"/departments/add-department"}
              className="inline-flex h-11 px-5 min-w-[148px] items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-50 to-primary border-primary text-white shadow-custom"
            >
              Add new Department
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Total Departments</CardDescription>
            <CardTitle>{departmentList?.data?.total_departments}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={TotalInvoice}
              alt="Invoice"
              style={{ width: "auto", height: "auto" }}
              width={45}
              height={45}
              quality={100}
            />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Sub-Departments</CardDescription>
            <CardTitle>
              {departmentList?.data?.total_sub_departments}
              {/* <span className="text-sm text-green-150">+55%</span> */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={TotalInvoiceAmount}
              alt="Invoice"
              width={45}
              height={45}
              style={{ width: "auto", height: "auto" }}
              quality={100}
            />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between p-4">
          <CardHeader className="p-0">
            <CardDescription>Members</CardDescription>
            <CardTitle>{departmentList?.data?.departments_members}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src={UnanalyzedInvoice}
              alt="Invoice"
              width={45}
              height={45}
              style={{ width: "auto", height: "auto" }}
              quality={100}
            />
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={departmentList?.data?.departments ?? []}
        columns={columns}
      />
      <DataTablePagination
        currentPage={departmentList?.pagination?.page_no!}
        totalPages={departmentList?.pagination?.total_pages!}
        pageChange={handlePageChange}
        perPage={perPage}
        setPerPage={setPerPage}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        key={departmentId}
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

export default Departments;

Departments.getLayout = (page) => {
  return <MainLayout title="Departments">{page}</MainLayout>;
};
