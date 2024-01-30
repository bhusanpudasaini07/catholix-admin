import React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";

import DepartmentMembers from "@/features/Department/details/department-member";
import DepartmentDetailCard from "@/features/Department/details/department-detail-card";

import { getDepartmentDetail } from "@/services/department/department-service";

import { IDepartmentDetail } from "@/interface/department-interface";
import SubDepartmentListCard from "@/features/Department/details/sub-department-card";

interface IDepartmentDetailProps {
  data: IDepartmentDetail;
}

const DepartmentDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: departmentDetail, isLoading } =
    useQuery<IDepartmentDetailProps>({
      queryFn: async () => {
        if (id) {
          const response = await getDepartmentDetail(id);
          return response;
        }
      },
      queryKey: ["departmentDetail", id],
    });

  return (
    <div className="flex flex-col max-w-4xl gap-6 m-auto">
      <div className="flex items-center gap-6">
        <Link
          href={"/departments"}
          className="flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <ChevronLeft />
          Back
        </Link>
        <h3 className="text-4xl font-bold text-color break-all">
          {departmentDetail?.data?.name}
        </h3>
      </div>

      <DepartmentDetailCard departmentDetails={departmentDetail?.data!} />
      <SubDepartmentListCard departmentDetails={departmentDetail?.data!} />
      <DepartmentMembers departmentDetails={departmentDetail?.data!} />
    </div>
  );
};

export default DepartmentDetail;

DepartmentDetail.getLayout = (page) => {
  return <MainLayout title="Departments">{page}</MainLayout>;
};
