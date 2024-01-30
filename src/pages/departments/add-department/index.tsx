import React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

import DepartmentForm from "@/features/Department/department-form";

const AddDepartment: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">
        Add New Department
      </h2>
      <DepartmentForm />
    </div>
  );
};

export default AddDepartment;

AddDepartment.getLayout = (page) => {
  return <MainLayout title="Departments">{page}</MainLayout>;
};
