import ProjectForm from "@/features/Projects/project-form";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const ProjectsAdd: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">Add New Project</h2>
      <ProjectForm />
    </div>
  );
};

export default ProjectsAdd;

ProjectsAdd.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
