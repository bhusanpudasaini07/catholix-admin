import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import AddCategoriesForm from "@/features/Catgegories/add-categories";
import { useCategory } from "../../hooks/categories/useCategory.hook";
import { DataTable } from "../../shared/components/data-table/data-table";

const CMSPermissions: NextPageWithLayout = () => {
  const { categoryList, categoryLoading, categoryColumns } = useCategory();
  console.log(categoryList);
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="Categories"
          subTitle="Manage Categories"
          back
          backUrl="/"
        />
      </div>
      <AddCategoriesForm />
      <DataTable
        data={categoryList?.data ?? []}
        columns={categoryColumns}
        loading={categoryLoading}
        loadingDataNum={10}
        border
        height="max-h-[calc(100vh-270px)]"
        headerSticky
      ></DataTable>
    </div>
  );
};

export default CMSPermissions;

export const getStaticProps = getI18nProps;

CMSPermissions.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
