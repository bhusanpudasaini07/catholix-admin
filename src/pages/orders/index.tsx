import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";

import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/products/useProduct.hook";
import { Input } from "@/shared/components/ui/input";
import ViewOrders from "@/features/Orders/orders-table";
import { useOrders } from "@/hooks/orders/useOrders.hook";

const OrdersTable: NextPageWithLayout = () => {
  const router = useRouter();
  //products list Api
  const { orderList, orderLoading, orderColumns, orderId, deleteModalOpen, setDeleteModalOpen, deleteOrderMutation, pageChangeHandler, perPageHandler ,handleSearch, search, perPage, handleReset} = useOrders();

  return (
    <div className="page">
      <PageHeader
        title="Orders List"
        subTitle="Mange And view Orders"
        back
        backUrl="/"
      />
      <div className="page-body px-8">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button onClick={handleReset}>
              Reset
            </Button>
          </div>
         
        </div>
        <ViewOrders
          perPage={perPage}
          list={orderList?.data}
          loading={orderLoading}
          columns={orderColumns}
          dataId={orderId}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteOrderMutation={deleteOrderMutation}
          pageChangeHandler={pageChangeHandler}
          perPageHandler={perPageHandler}
        />
      </div>
    </div>
  );
};

export default OrdersTable;

export const getStaticProps = getI18nProps;

OrdersTable.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
