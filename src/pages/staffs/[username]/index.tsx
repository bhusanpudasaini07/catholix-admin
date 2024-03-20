import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import StaffsBody from "@/features/Staff/staffs-body";
import StaffsHeader from "@/features/Staff/staffs-header";
import { NextPageWithLayout } from "@/pages/_app";
import MainLayout from "@/shared/main-layout";

const StaffDetail: NextPageWithLayout = () => {
  const getDefaultDateRange = () => {
    const today = moment();
    const sixMonthsAgo = moment().subtract(6, "months");
    return {
      from: sixMonthsAgo.toDate(),
      to: today.toDate(),
    };
  };

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange()
  );
  const [dateRangeOpen, setdateRangeOpen] = useState<boolean>(false);
  return (
    <>
      <StaffsHeader
        dateRange={dateRange}
        dateRangeOpen={dateRangeOpen}
        setDateRange={setDateRange}
        setDateRangeOpen={setdateRangeOpen}
      />
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <StaffsBody dateRange={dateRange} />
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
