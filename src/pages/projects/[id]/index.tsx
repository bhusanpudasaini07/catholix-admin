import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import React from "react";

import { ChevronLeft } from "lucide-react";
import ProjectDetailCard from "@/features/Projects/detail/project-detail";
import ProjectMembers from "@/features/Projects/detail/project-members";
import { useRouter } from "next/router";
import { getProjectDetail } from "@/services/project/projects-service";
import { useQuery } from "react-query";
import { IProjectDetails } from "@/interface/project-interface";
interface IProjectDetailProps {
  data: IProjectDetails;
}

const ProjectDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: projectDetail, isLoading } = useQuery<IProjectDetailProps>({
    queryKey: ["projectDetail", id],
    queryFn: async () => {
      if (id) {
        const response = await getProjectDetail(id);
        return response;
      }
    },
  });

  return (
    <div className="flex flex-col max-w-4xl gap-6 m-auto">
      <div className="flex items-center gap-6">
        <Link
          href={"/projects"}
          className="flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <ChevronLeft />
          Back
        </Link>
        <h3 className="text-4xl font-bold text-color break-all">
          {projectDetail?.data?.name}
        </h3>
      </div>

      <ProjectDetailCard projectDetails={projectDetail?.data!} />
      <ProjectMembers projectDetails={projectDetail?.data!} />
      {/* <VendorApprovers vendorDetail={vendorDetail?.data} /> */}
    </div>
  );
};

export default ProjectDetail;

ProjectDetail.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
