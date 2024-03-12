import React, { FC } from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';

interface IProps {
  total?: string | number;
  client?: string | number;
  in_house?: string | number;
  risk?: string | number;
}

const ProjectOverview: FC<IProps> = ({ total, client, in_house, risk }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-6 ">
          <h5 className="font-medium text-zinc-700">Projects Overview</h5>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-zinc cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {total === 0 ? 0 : total ? total : "N/A"}
            </p>
            <p className="text-sm font-normal">Total Projects</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-blue cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {client === 0 ? 0 : client ? client : "N/A"}
            </p>
            <p className="text-sm font-normal">Client Project</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-orange cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {in_house === 0 ? 0 : in_house ? in_house : "N/A"}
            </p>
            <p className="text-sm font-normal">In-House Projects</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-red cursor-pointer hover:scale-[1.05] transition-all">
            <p className="text-3xl font-semibold mb-1">
              {risk === 0 ? 0 : risk ? risk : "N/A"}
            </p>
            <p className="text-sm font-normal">Project at Risk</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
