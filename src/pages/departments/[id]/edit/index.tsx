import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

import DepartmentEditForm from "@/features/Department/department-edit-form";

const EditDepartment: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">Edit Department</h2>
      <DepartmentEditForm />
    </div>
  );
};

export default EditDepartment;

EditDepartment.getLayout = (page) => {
  return <MainLayout title="Departments">{page}</MainLayout>;
};
