"use client";

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface IProps {
  text?: string;
  className?: string;
  contentClassName?: string;
  mode: any;
  date: any;
  setDate: any;
}

const DatePicker: React.FC<IProps> = ({
  text,
  className,
  contentClassName,
  mode,
  date,
  setDate,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"date_picker"}
          size={"md"}
          className={`
          bg-white justify-between text-left font-normal 
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
