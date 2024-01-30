import VendorEditForm from "@/features/Vendors/vendor-edit-form";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

const VendorEdit: NextPageWithLayout = () => {
  return (
    <div className="max-w-6xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">Edit Vendor</h2>
      <VendorEditForm />
    </div>
  );
};

export default VendorEdit;

VendorEdit.getLayout = (page) => {
  return <MainLayout title="Vendors">{page}</MainLayout>;
};
