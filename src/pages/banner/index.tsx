import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { Input } from "@/shared/components/ui/input";
import BannerList from "@/features/Banner/Banner-list";
import { useBanners } from "@/hooks/banners/useBanners.hooks";

const CategoryTable: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    bannerList,
    bannerLoading,
    bannerColumns,
    bannerId,
    bannerTitle,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteBannerMutation,
    page,
    setPage,
    perPage,
    setPerPage,
    pageChangeHandler,
    perPageHandler,
    handleSearch,
    search,
    handleReset,
  } = useBanners();

  return (
    <div className="page">
        <PageHeader
          title="Banner List"
          subTitle="Mange And view banners"
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
              <Button onClick={handleReset}>Reset</Button>
            </div>
            <Button 
            onClick={() => router.push("/banner/add")}
            >
              <Plus />
              Add Banners
            </Button>
          </div>
          <BannerList
          bannerList={bannerList}
          loading={bannerLoading}
          columns={bannerColumns}
          bannerId={bannerId}
          bannerTitle={bannerTitle}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteBannerMutation={deleteBannerMutation}
          pageChangeHandler={pageChangeHandler}
          perPageHandler={perPageHandler}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          search={search}
          handleSearch={handleSearch}
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
