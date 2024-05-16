import moment from "moment";
import React, { useState } from "react";

import DateRangeFilter from "../date-range-filter";
import DatePicker from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";

interface IProps {
  defaultSelected: string;
  tabContent: string[];
  date: DateRange | undefined;
  setDate: (arg: DateRange | undefined) => void;
}

const CustomDateFilter = ({
  defaultSelected,
  tabContent,
  date,
  setDate,
}: IProps) => {
  // State
  const [selectedFilter, setSelectedFilter] = useState(defaultSelected);

  const [dateRangeOpen, setDateRangeOpen] = useState<boolean>(false);

  const tabValues = [
    {
      title: "Date Range",
      value: "date_range",
    },
    {
      title: "Daily",
      value: "daily",
    },
    {
      title: "Weekly",
      value: "weekly",
    },
    {
      title: "Monthly",
      value: "monthly",
    },
    {
      title: "Yearly",
      value: "yearly",
    },
  ];

  const changeDateHandler = (date: any) => {
    if (selectedFilter === "date_range") {
      setDate(date);
    } else if (selectedFilter === "daily") {
      setDate({ from: date, to: date });
    } else if (selectedFilter === "weekly") {
      const weekPrior = moment(date).subtract(1, "weeks").toDate();
      setDate({ from: weekPrior, to: date });
    } else if (selectedFilter === "monthly") {
      const monthStart = moment(date).startOf("month").toDate();
      const monthEnd = moment(date).endOf("month").toDate();
      setDate({ from: monthStart, to: monthEnd });
    } else if (selectedFilter === "yearly") {
      const yearStart = moment(date).startOf("year").toDate();
      const yearEnd = moment(date).endOf("year").toDate();
      setDate({ from: yearStart, to: yearEnd });
    }
  };

  const filterContent = (value: string) => {
    switch (value) {
      case "date_range":
        return (
          <DateRangeFilter
            buttonClassName="w-[250px]"
            setDateRange={changeDateHandler}
            dateRange={date}
            setDateRangeOpen={setDateRangeOpen}
            dateRangeOpen={dateRangeOpen}
            disabled
          />
        );

      case "daily":
        return (
          <DatePicker
            className="w-[200px]"
            mode={"single"}
            date={date?.to}
            text="Select Date"
            setDate={changeDateHandler}
            // setDate={changeDate}
          />
        );

      case "weekly":
        return (
          <div className="flex gap-2 items-center">
            <Button
              variant={"white"}
              size={"sm"}
              onClick={() =>
                changeDateHandler(
                  moment(date?.to).subtract(1, "weeks").toDate()
                )
              }
            >
              <ChevronLeft size={16} />
            </Button>
            <p className="px-2 py-[5px] text-zinc-700 text-center font-medium text-sm rounded-sm border border-zinc-300">
              {moment(date?.to).subtract(1, "weeks").format("MMM DD")} -{" "}
              {moment(date?.to).format("MMM DD")}
            </p>
            <Button
              variant={"white"}
              size={"sm"}
              onClick={() =>
                changeDateHandler(moment(date?.to).add(1, "weeks").toDate())
              }
              disabled={moment(date?.to).isSameOrAfter(moment(), "day")}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        );

      case "monthly":
        return (
          <Select key={"monthly"} onValueChange={changeDateHandler}>
            <SelectTrigger className="max-w-[150px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: moment().month() + 1 },
                (_, i) => i + 1
              ).map((month) => (
                <SelectItem
                  key={month}
                  value={moment()
                    .month(month - 1)
                    .format("YYYY-MM-DD")}
                >
                  {moment()
                    .month(month - 1)
                    .format("MMM, YYYY")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "yearly":
        return (
          <Select key={"yearly"} onValueChange={changeDateHandler}>
            <SelectTrigger className="max-w-[150px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length:
                    moment().year() -
                    Number(process.env.NEXT_PUBLIC_RP_START_YEAR) +
                    1,
                },
                (_, i) => i + Number(process.env.NEXT_PUBLIC_RP_START_YEAR)
              ).map((year) => (
                <SelectItem
                  key={year}
                  value={moment().year(year).format("YYYY")}
                >
                  {moment().year(year).format("YYYY")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
    }
  };

  return (
    <div className="flex gap-4 justify-end items-center">
      {filterContent(selectedFilter)}
      <Tabs
        defaultValue={selectedFilter}
        onValueChange={(e) => setSelectedFilter(e)}
      >
        <TabsList>
          {tabValues
            ?.filter((tab) => tabContent.includes(tab.value))
            .map((tab) => (
              <TabsTrigger key={tab?.title} value={tab?.value}>
                {tab?.title}
              </TabsTrigger>
            ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CustomDateFilter;
