import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "./_app";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { getDashboardData } from "@/services/dashboard/dashboard-service";
import DateRangeFilter from "@/shared/components/date-range-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const Home: NextPageWithLayout = () => {
  const monthFilters = [
    { value: "custom", key: "Custom" },
    { value: "this_week", key: "This Week" },
    {
      value: "this_month",
      key: "This month",
    },
    {
      value: "this_six_month",
      key: "This 6 month",
    },
  ];

  // STATES

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("this_month");

  const changeDateRange = (value: string) => {
    setCurrentFilter(value);
    const today = new Date();
    let from, to;

    switch (value) {
      case "this_week":
        const day = today.getDay();
        from = new Date();
        from.setDate(today.getDate() - day);
        to = today;
        break;
      case "this_month":
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = today;
        break;
      case "this_six_month":
        from = new Date();
        from.setMonth(today.getMonth() - 6);
        to = today;
        break;
      case "custom":
        break;
      default:
        from = undefined;
        to = undefined;
    }
    setDateRange({ from, to });
  };

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
    setCurrentFilter("custom"); // Set the filter to 'custom'
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-purple-90 ">
        Welcome to Dashboard
      </h1>
      {/* <DashboardInfoCards dashboardData={dashboardData?.data} />

      <div className="mt-12">
        <div className="flex justify-between mb-6">
          <p className="text-purple-90 text-xl font-medium">Insight Data</p>
          <div className="flex-grow flex items-center justify-end gap-3">
            <DateRangeFilter
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={handleDateRangeChange}
              dateRange={dateRange}
              setCurrentFilter={setCurrentFilter}
            />
            <Select
              value={currentFilter}
              onValueChange={(e) => changeDateRange(e)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {monthFilters?.map((filter, index) => (
                  <SelectItem
                    disabled={filter?.value === "custom"}
                    key={index}
                    value={filter?.value}
                  >
                    {filter?.key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-12 mb-6 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <InvoiceStatusGraph dashboardData={dashboardData?.data} />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <DashboardVendorBar dashboardData={dashboardData?.data} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <TopVendorsGraph dashboardData={dashboardData?.data} />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
