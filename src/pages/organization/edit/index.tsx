import OrganizationEditForm from "@/features/Organization/edit-form";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const OrganizationEdit: NextPageWithLayout = () => {
  return (
    <div className="max-w-2xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-purple-60">
        Edit Organization
      </h2>
      <OrganizationEditForm />
    </div>
  );
};

export default OrganizationEdit;

OrganizationEdit.getLayout = (page) => {
  return <MainLayout title="Organization">{page}</MainLayout>;
};
