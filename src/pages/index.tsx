import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl font-medium text-purple-90 ">
        Welcome to Dashboard
      </h1>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
