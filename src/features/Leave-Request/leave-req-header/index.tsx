import moment from "moment";
import React from "react";

import FilterSearch from "@/shared/components/filter-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

interface IProps {
  // STATES
  status: string;
  date: string;
  // FUNCTIONS

  searchHandler: (arg: string) => void;
  changeDate: (arg: string) => void;
  changeStatus: (arg: string) => void;
}

const LeaveRequestHeader = ({
  status,
  date,
  changeDate,
  changeStatus,
  searchHandler,
}: IProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
          Leave Requests View
        </h4>
        <p className="text-base font-normal text-zinc-500">
          List of members applied for leaves
        </p>
      </div>
      <div className="flex gap-4 justify-end grow">
        <FilterSearch className="h-10" setSearchText={searchHandler} />

        {/* Status */}
        <Select defaultValue={status} onValueChange={(e) => changeStatus(e)}>
          <SelectTrigger className="max-w-[150px] h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leave</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Date */}
        <Tabs defaultValue={date} onValueChange={(e) => changeDate(e)}>
          <TabsList className="h-10">
            <TabsTrigger className="h-8" value="all">
              All
            </TabsTrigger>
            <TabsTrigger className="h-8" value={moment().format("YYYY-MM-DD")}>
              Today
            </TabsTrigger>
            <TabsTrigger
              className="h-8"
              value={moment().add(1, "days").format("YYYY-MM-DD")}
            >
              Tomorrow
            </TabsTrigger>
            <TabsTrigger
              className="h-8"
              value={moment().add(2, "days").format("YYYY-MM-DD")}
            >
              {moment().add(2, "days").format("MMMD")}
            </TabsTrigger>
            <TabsTrigger
              className="h-8"
              value={moment().add(3, "days").format("YYYY-MM-DD")}
            >
              {moment().add(3, "days").format("MMMD")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaveRequestHeader;
