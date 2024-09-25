import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import React from "react";

import { cn } from "@/shared/utils/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import moment from "moment";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";

interface IProps {
  dateRange: string | any;
  setDateRange: (arg: string | any) => void;
  setPageNumber?: (arg: number) => void;
  placeholder?: string;
  buttonClassName?: string;
  disabled?: boolean;
  beforeDisabled?: number;
}

const DateRangeFilter = ({
  dateRange,
  setDateRange,
  setPageNumber,

  placeholder,
  buttonClassName,
  disabled,
  beforeDisabled = 365,
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
          defaultMonth={dateRange?.from}
          selected={dateRange}
          // onSelect={setDateRange}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              const diff = moment(range.to).diff(moment(range.from), "days");
              const maxDays = beforeDisabled ? beforeDisabled : 365; // Use beforeDisabled if provided, otherwise default to 365

              if (diff > maxDays) {
                showToast(
                  TOAST_TYPES.error,
                  `You cannot select a range longer than ${maxDays} days.`
                );
                return;
              }
            }
            setDateRange(range);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
