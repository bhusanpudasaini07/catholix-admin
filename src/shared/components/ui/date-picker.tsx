"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface IProps {
  text?: string;
  className?: string;
  contentClassName?: string;
  mode: any;
}

const DatePicker: React.FC<IProps> = ({
  text,
  className,
  contentClassName,
  mode,
}) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`
          bg-white border-gray-300 justify-between text-left font-normal text-gray-400 
          ${className && className} `}
        >
          {date ? format(date, "PPP") : <span>{text}</span>}
          <CalendarIcon className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-auto p-0 ${contentClassName && contentClassName}`}
        align="start"
      >
        <Calendar mode={mode} selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};
export default DatePicker;
