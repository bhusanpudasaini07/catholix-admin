import FilterSearch from "@/shared/components/filter-search";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";

const DHProjectPerformance = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-7">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">
              Project Details and Performace
            </p>
          </div>

          <div className="flex gap-4 justify-end items-center grow">
            <FilterSearch setSearchText={() => ""} searchText="" />

            <Select defaultValue="all">
              <SelectTrigger className="max-w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        
      </CardContent>
    </Card>
  );
};

export default DHProjectPerformance;
