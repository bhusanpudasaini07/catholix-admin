import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";

import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/products/useProduct.hook";
import ViewProduct from "@/features/Products/view-products";
import CommonModal from "@/shared/components/common-modal";
import AddProductForm from "@/features/Products/add-products";

const ProductViewTable: NextPageWithLayout = () => {
  const router = useRouter();
  //products list Api
  const { productList, productLoading, productColumns, productId, productName, setProductName, deleteModalOpen, setDeleteModalOpen, deleteProductMutation, addModalOpen, setAddModalOpen } = useProducts();

  return (
    <div className="page">
      <PageHeader
        title="Products List"
        subTitle="Mange And view Products"
        back
        backUrl="/"
      />
      <div className="page-body px-8">
        <div className="flex justify-between">
          <div className="flex">
            search
          </div>
          <Button
            onClick={() => setAddModalOpen(true)}
          >
            <Plus />
            Add product
          </Button>
        </div>
        <ViewProduct
          list={productList}
          loading={productLoading}
          columns={productColumns}
          dataId={productId}
          dataName={productName}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteProductMutation={deleteProductMutation}
        />
      </div>
      <CommonModal
        open={addModalOpen}
        onClose={setAddModalOpen}
        className="max-w-2xl"
      >
        <AddProductForm
        />
      </CommonModal>

    </div>
  );
};

export default ProductViewTable;

export const getStaticProps = getI18nProps;

ProductViewTable.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
