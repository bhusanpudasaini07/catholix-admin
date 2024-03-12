import MainLayout from '@/shared/main-layout';
import { getI18nProps } from '@/shared/utils/i18n-utils/i18n.util';

import { NextPageWithLayout } from './_app';

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
export const getStaticProps = getI18nProps;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
