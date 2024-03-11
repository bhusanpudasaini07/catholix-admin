import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StaffsHeader from "@/features/Staff/staffs-header";
import StaffsBody from "@/features/Staff/staffs-body";

const StaffDetail: NextPageWithLayout = () => {
  return (
    <>
      <StaffsHeader />
      <div className="p-6 max-h-[calc(100vh-170px)] overflow-auto">
        <StaffsBody />
      </div>
    </>
  );
};

export default StaffDetail;

export const getServerSideProps = async ({ query, locale }: any) => {
  const paths = [
    {
      params: {
        id: query?.username,
      },
      locale,
    },
  ];

  const translations = await serverSideTranslations(locale, ["common"]); // Pass the locale argument to serverSideTranslations

  return {
    props: {
      ...translations,
      paths,
      fallback: false,
    },
  };
};

StaffDetail.getLayout = (page) => {
  return <MainLayout title="Staff">{page}</MainLayout>;
};
