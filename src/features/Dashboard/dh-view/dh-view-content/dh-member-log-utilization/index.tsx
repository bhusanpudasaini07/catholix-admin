import { User2, Users2 } from "lucide-react";
import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";

const DHMemberLogUtilization = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3 justify-start items-center mb-7">
          <p className="text-lg font-medium text-zinc-700">
            Member Time-log Utilization
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Members */}
          <div className="p-4 rounded-md border w-[140px]">
            <div className="flex gap-2 items-center mb-0.5">
              <Users2 size={24} className="text-zinc-500" />
              <p className="text-3xl font-semibold text-zinc-700">04</p>
            </div>
            <p className="pl-8 text-sm text-zinc-700">Members</p>
          </div>
          <div className="w-[1px] bg-slate-200"></div>

          {/* < 20% */}
          <div className="p-4 rounded-md border w-[140px]">
            <div className="flex gap-2 items-center mb-0.5">
              <User2 size={24} className="text-red-500" />
              <p className="text-3xl font-semibold text-red-500">04</p>
            </div>
            <p className="pl-8 text-sm text-red-700">{"< 20%"}</p>
          </div>

          {/* 20% - 40% */}
          <div className="p-4 rounded-md border w-[140px]">
            <div className="flex gap-2 items-center mb-0.5">
              <User2 size={24} className="text-orange-500" />
              <p className="text-3xl font-semibold text-orange-500">04</p>
            </div>
            <p className="pl-8 text-sm text-orange-700">20%-40%</p>
          </div>

          {/* 40% - 80% */}
          <div className="p-4 rounded-md border w-[140px]">
            <div className="flex gap-2 items-center mb-0.5">
              <User2 size={24} className="text-blue-500" />
              <p className="text-3xl font-semibold text-blue-500">04</p>
            </div>
            <p className="pl-8 text-sm text-blue-700">40%-80%</p>
          </div>

          {/* > 80% */}
          <div className="p-4 rounded-md border w-[140px]">
            <div className="flex gap-2 items-center mb-0.5">
              <User2 size={24} className="text-green-500" />
              <p className="text-3xl font-semibold text-green-500">04</p>
            </div>
            <p className="pl-8 text-sm text-green-700">{"> 80%"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DHMemberLogUtilization;
