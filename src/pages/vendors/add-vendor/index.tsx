import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";
import VendorForm from "@/features/Vendors/vendor-form";

const AddVendor: NextPageWithLayout = () => {
  return (
    <div className="max-w-6xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">Add New Vendor</h2>
      <VendorForm />
    </div>
  );
};

export default AddVendor;

AddVendor.getLayout = (page) => {
  return <MainLayout title="Vendor">{page}</MainLayout>;
};
