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
  placeholder?: string;
  disabled?: boolean;
}

const DateRangeFilter = ({
  dateRange,
  setDateRange,
  setPageNumber,
  dateRangeOpen,
  setDateRangeOpen,
  placeholder,
  disabled,
}: IProps) => {
  return (
    <Popover open={dateRangeOpen} onOpenChange={setDateRangeOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"date_picker"}
          size={"md"}
          className={cn(
            "w-full justify-between pl-3 text-left font-normal",
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
            <span> {placeholder ? placeholder : "Select Range"} </span>
          )}
          {dateRange?.from ? (
            <div
              className={cn(
                disabled &&
                  "text-gray-400 cursor-not-allowed pointer-events-none",
                "h-auto p-0 hover:bg-transparent"
              )}
              onClick={() => {
                setDateRange({
                  from: undefined,
                  to: undefined,
                });
                if (setPageNumber) {
                  setPageNumber(1);
                }
              }}
            >
              <X className="w-4 h-4 ml-auto cursor-pointer" />
            </div>
          ) : (
            <CalendarIcon className="w-4 h-4 ml-auto opacity-50 ms-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          captionLayout="dropdown-buttons"
          initialFocus
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
