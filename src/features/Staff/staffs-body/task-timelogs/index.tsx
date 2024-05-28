import React, { FC } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";

interface IProps {
  total?: string | number;
  open?: string | number;
  doing?: string | number;
  bugs?: string | number;
}

const TaskAndTimelogs: FC<IProps> = ({ total, open, doing, bugs }) => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-6 ">
          <h5 className="font-medium text-zinc-700">Task & Time Logs</h5>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-zinc cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {total === 0 ? 0 : total ? total : "N/A"}
            </p>
            <p className="text-sm font-normal">Total Tasks</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-blue cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {open === 0 ? 0 : open ? open : "N/A"}
            </p>
            <p className="text-sm font-normal">Open</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-green cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {doing === 0 ? 0 : doing ? doing : "N/A"}
            </p>
            <p className="text-sm font-normal">Doing</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-orange cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {bugs === 0 ? 0 : bugs ? bugs : "N/A"}
            </p>
            <p className="text-sm font-normal">Bugs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskAndTimelogs;
