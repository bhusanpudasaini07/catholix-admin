import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import React from "react";

import { cn } from "@/shared/utils/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IProps {
  dateRange: string | any;
  setDateRange: (arg: string | any) => void;
  setPageNumber?: (arg: number) => void;
  placeholder?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

const DateRangeFilter = ({
  dateRange,
  setDateRange,
  setPageNumber,

  placeholder,
  buttonClassName,
  disabled,
}: IProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"date_picker"}
          size={"sm"}
          className={cn(
            "w-full h-auto justify-between pl-3 text-left font-normal",
            !dateRange && "text-muted-foreground",
            buttonClassName
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
          {dateRange?.from && !disabled ? (
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
              <X className="ml-auto w-4 h-4 cursor-pointer" />
            </div>
          ) : (
            <CalendarIcon className="ml-auto w-4 h-4 opacity-50 ms-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="end">
        <Calendar
          captionLayout="dropdown-buttons"
          initialFocus
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
