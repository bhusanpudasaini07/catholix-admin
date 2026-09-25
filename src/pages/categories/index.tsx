import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import { useCategory } from "../../hooks/categories/useCategory.hook";
import ViewCategories from "@/features/Catgegories/view-categories";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";

const CategoryTable: NextPageWithLayout = () => {
  const router = useRouter();
  //category list Api
  const { categoryList, categoryLoading, categoryColumns } = useCategory();

  return (
    <div className="page">
        <PageHeader
          title="Categories List"
          subTitle="Mange And view Categories"
          back
          backUrl="/"
        />
        <div className="page-body px-8">
          <div className="flex justify-between">
            <div className="flex">
              search
            </div>
            <Button 
            onClick={() => router.push("/categories/add")}
            >
              <Plus />
              Add Category
            </Button>
          </div>
          <ViewCategories 
          categoryList={categoryList}
          loading={categoryLoading}
          columns={categoryColumns}
          />
        </div>
   
    </div>
  );
};

export default CategoryTable;

export const getStaticProps = getI18nProps;

CategoryTable.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
