import Link from "next/link";
import React from "react";
import PurchaseDetailCard from "@/features/Purchase-order/details";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { IPurchaseOrderDetail } from "@/interface/purchase-order-interface";
import { getPurchaseOrderDetail } from "@/services/purchase-order/purchase-order-service";

interface IProps {
  data: IPurchaseOrderDetail;
}

const PurchaseOrderDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router?.query;

  // FUNCTIONS
  const { data: purchaseDetail, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (id) {
        const response = await getPurchaseOrderDetail(id);
        return response;
      }
    },
    queryKey: ["purchaseDetail", id],
  });
  return (
    <div className="flex flex-col max-w-4xl gap-6 m-auto">
      <div className="flex items-center gap-6">
        <Link
          href={"/purchase-orders"}
          className="flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <ChevronLeft />
          Back
        </Link>
        <h3 className="text-4xl font-bold text-color break-all">
          {purchaseDetail?.data?.vendor_name}
        </h3>
      </div>

      <PurchaseDetailCard purchaseDetails={purchaseDetail?.data!} />
    </div>
  );
};

export default PurchaseOrderDetails;

PurchaseOrderDetails.getLayout = (page) => {
  return <MainLayout title="Purchase Orders">{page}</MainLayout>;
};
