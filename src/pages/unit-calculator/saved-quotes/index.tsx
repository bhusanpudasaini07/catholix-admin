import SavedQuotesHeader from "@/features/Unit-Calculator/saved-quotes/saved-quotes-header";
import SavedQuotesList from "@/features/Unit-Calculator/saved-quotes/saved-quotes-list";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";

const SavedQuotes: NextPageWithLayout = () => {
  return (
    <>
      <SavedQuotesHeader />

      <div className="p-6 max-h-[calc(100vh-115px)]">
        <SavedQuotesList />
      </div>
    </>
  );
};

export default SavedQuotes;

export const getStaticProps = getI18nProps;

SavedQuotes.getLayout = (page) => {
  return <MainLayout title="Leave Requests">{page}</MainLayout>;
};
