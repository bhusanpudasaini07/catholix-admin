import DashboardOverview from "@/features/Dashboard/dashboard-overview";
import TimeLogInformation from "@/features/Dashboard/time-log-information";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            Dashboard
          </h1>
          <p className="text-base text-zinc-500">
            Welcome back, get insights and overview of all the activities.
          </p>
        </div>
      </div>

      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          <DashboardOverview />
          <TimeLogInformation />
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
