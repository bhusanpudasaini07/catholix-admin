import ProjectDashboardView from "@/features/Dashboard/project-lead-view";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import { useCommonStore } from "@/store/common-store";

import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { profileData } = useCommonStore();

  return (
    <>
      <div className="flex justify-between items-end px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            {profileData?.role === "Project Lead"
              ? "Project Lead Dashboard"
              : "Dashboard"}
          </h1>
          <p className="text-base text-zinc-500">
            Welcome back, get insights and overview of all the activities.
          </p>
        </div>
      </div>

      {/* Project Lead View */}
      <ProjectDashboardView />
      {/* <div className="py-6 px-4 max-h-[calc(100vh-115px)] overflow-auto">
        <div className="grid grid-cols-1 gap-4">
              <DashboardOverview />
              <TimeLogInformation />
            </div>
      </div> */}
    </>
  );
};

export default Home;
export const getStaticProps = getI18nProps;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
