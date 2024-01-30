import React from "react";
import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "@/pages/_app";

import ProjectEditForm from "@/features/Projects/project-edit-form";

const ProjectEdit: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">Edit Project</h2>
      <ProjectEditForm />
    </div>
  );
};

export default ProjectEdit;

ProjectEdit.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
