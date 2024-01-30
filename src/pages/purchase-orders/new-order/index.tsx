import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import React from "react";

import PurchaseOrderForm from "@/features/Purchase-order/form";

const AddPurchaseOrder: NextPageWithLayout = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="mb-12 text-4xl font-bold text-primary">
        Add New Purchase Order
      </h2>
      <PurchaseOrderForm />
    </div>
  );
};

export default AddPurchaseOrder;

AddPurchaseOrder.getLayout = (page) => {
  return <MainLayout title="Purchase Orders">{page}</MainLayout>;
};
