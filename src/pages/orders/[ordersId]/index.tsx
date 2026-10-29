import ViewOrderDetails from "@/features/Orders/order-details/order-details";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const DetailsOrders: NextPageWithLayout = () => {
  // const { orderDetail } = useOrders();
  return (
    <div className="page">
        <ViewOrderDetails />
    </div>
  );
};

export default DetailsOrders;

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

DetailsOrders.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
