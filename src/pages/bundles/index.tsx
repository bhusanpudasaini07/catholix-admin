import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import BundleList from "@/features/Bundles/bundle-list";
import { useBundles } from "@/hooks/bundles/useBundle.hook";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const BundlesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    bundleList,
    bundleLoading,
    bundleColumns,
    pageChangeHandler,
    perPageHandler,
    handleSearch,
    search,
    perPage,
    handleReset,
  } = useBundles();

  return (
    <div className="page">
      <PageHeader
        title="Bundles List"
        subTitle="Manage and view bundles"
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
              onChange={(event) => handleSearch(event.target.value)}
            />
            <Button onClick={handleReset}>Reset</Button>
          </div>
          <Button onClick={() => router.push("/bundles/add")}>
            <Plus />
            Add Bundle
          </Button>
        </div>
        <BundleList
          bundleList={bundleList}
          loading={bundleLoading}
          columns={bundleColumns}
          pageChangeHandler={pageChangeHandler}
          perPageHandler={perPageHandler}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default BundlesPage;

export const getStaticProps = getI18nProps;

BundlesPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
