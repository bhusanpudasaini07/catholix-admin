import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/shared/utils/utils";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface IProps {
  dateRange: string | any;
  setDateRange: (arg: string | any) => void;
  setPageNumber?: (arg: number) => void;
  dateRangeOpen: boolean;
  setDateRangeOpen: (arg: boolean) => void;
  setCurrentFilter?: (arg: string) => void;
}

const DateRangeFilter = ({
  dateRange,
  setDateRange,
  setPageNumber,
  dateRangeOpen,
  setDateRangeOpen,
  setCurrentFilter,
}: IProps) => {
  return (
    <Popover open={dateRangeOpen} onOpenChange={setDateRangeOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !dateRange && "text-muted-foreground"
          )}
        >
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
          {dateRange?.from ? (
            <X
              className="ml-auto  h-4 w-4 cursor-pointer"
              onClick={() => {
                setDateRange({
                  from: undefined,
                  to: undefined,
                });
                if (setPageNumber) {
                  setPageNumber(1);
                }
                setCurrentFilter && setCurrentFilter("this_month");
              }}
            />
          ) : (
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          captionLayout="dropdown-buttons"
          initialFocus
          mode="range"
          // fromYear={1900}
          // toYear={2050}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
