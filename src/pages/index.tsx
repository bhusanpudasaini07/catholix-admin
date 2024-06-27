import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "./_app";
import DashboardHeaderCards from "@/features/Dashboard/dashboad-header-cards";
import dynamic from "next/dynamic";
import { Marker, Popup } from "react-leaflet";
import DashboardContent from "@/features/Dashboard/dashboard-content";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col px-4 py-6 h-screen">
        <DashboardHeaderCards />

        <div className="mt-4 grow">
          <div className="relative w-full h-full">
            <DashboardContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
export const getStaticProps = getI18nProps;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
