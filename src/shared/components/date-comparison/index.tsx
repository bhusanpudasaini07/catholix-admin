import React, { useState, useEffect } from "react";
import moment from "moment";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../ui/select";

interface DateComparisonProps {
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
}

const DateComparisonFilter = ({ setFrom, setTo }: DateComparisonProps) => {
  const [dates, setDates] = useState<{ year: string; months: string[] }[]>([]);
  const startDateEnv = process.env.NEXT_PUBLIC_START_YEAR || "2023";

  const generateDateArray = (startDateEnv: string) => {
    const startDate = moment(startDateEnv);
    const endDate = moment();
    const dateMap = new Map<string, string[]>();

    while (startDate.isBefore(endDate) || startDate.isSame(endDate, "month")) {
      const year = startDate.format("YYYY");
      const month = startDate.format("MMM YYYY");

      if (!dateMap.has(year)) {
        dateMap.set(year, [month]);
      } else {
        dateMap.get(year)?.push(month);
      }

      startDate.add(1, "month");
    }

    return Array.from(dateMap, ([year, months]) => ({
      year,
      months,
    }));
  };

  useEffect(() => {
    const dateArray = generateDateArray(startDateEnv);
    setDates(dateArray);
  }, [startDateEnv]);

  return (
    <div className="flex flex-col gap-2">
      <Label>Select Comparison Date</Label>
      <div className="flex gap-2 items-center">
        <Select onValueChange={setFrom}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Select Date" />
          </SelectTrigger>
          <SelectContent className="z-[400] max-h-[300px]">
            {dates
              ?.slice()
              .reverse()
              .map((date, index) => (
                <SelectGroup key={index}>
                  <SelectLabel>{date.year}</SelectLabel>
                  {date.months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </Select>
        <span className="text-sm">&</span>
        <Select onValueChange={setTo}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Select Date" />
          </SelectTrigger>
          <SelectContent className="z-[400] max-h-[300px]">
            {dates
              ?.slice()
              .reverse()
              .map((date, index) => (
                <SelectGroup key={index}>
                  <SelectLabel>{date.year}</SelectLabel>
                  {date.months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateComparisonFilter;
