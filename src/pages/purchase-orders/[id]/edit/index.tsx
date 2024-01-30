import React from "react";
import PurchaseEditForm from "@/features/Purchase-order/edit-form";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

const EditPurchaseOrder: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">
        Edit Purchase Order
      </h2>
      <PurchaseEditForm />
    </div>
  );
};

export default EditPurchaseOrder;

EditPurchaseOrder.getLayout = (page) => {
  return <MainLayout title="Purchase Orders">{page}</MainLayout>;
};
