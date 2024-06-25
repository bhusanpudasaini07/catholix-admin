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
      <div className="px-4 py-6">
        <DashboardHeaderCards />

        <div className="mt-4">
          <div className="h-[calc(100vh-185px)] w-full relative">
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
