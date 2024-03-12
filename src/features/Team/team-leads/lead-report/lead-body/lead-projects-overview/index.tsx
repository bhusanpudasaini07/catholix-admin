import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface IProps {
  total?: string;
  client?: string;
  in_house?: string;
  risk?: string;
}

const ProjectOverview: FC<IProps> = ({ total, client, in_house, risk }) => {
  const router = useRouter();
  const current_id = router.query?.lead_id || undefined;
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-6 ">
          <h5 className="font-medium text-zinc-700">Projects Overview</h5>
          <Button
            onClick={() => router.push("/projects")}
            variant={"white"}
            size={"sm"}
          >
            More Details
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => router.push(`/projects?lead_id=${current_id}`)}
            className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-zinc cursor-pointer hover:scale-[1.05] transition-all"
          >
            <p className="text-3xl font-semibold mb-1">
              {total ? total : "N/A"}
            </p>
            <p className="text-sm font-normal">Total Projects</p>
          </div>
          <div
            onClick={() =>
              router.push(`/projects?lead_id=${current_id}?project_type=client`)
            }
            className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-blue cursor-pointer hover:scale-[1.05] transition-all"
          >
            <p className="text-3xl font-semibold mb-1">
              {client ? client : "N/A"}
            </p>
            <p className="text-sm font-normal">Client Project</p>
          </div>
          <div
            onClick={() =>
              router.push(
                `/projects?lead_id=${current_id}?project_type=in_house`
              )
            }
            className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-orange cursor-pointer hover:scale-[1.05] transition-all"
          >
            <p className="text-3xl font-semibold mb-1">
              {in_house ? in_house : "N/A"}
            </p>
            <p className="text-sm font-normal">In-House Projects</p>
          </div>
          <div
            onClick={() =>
              router.push(`/projects?lead_id=${current_id}?risk_status=high`)
            }
            className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-red cursor-pointer hover:scale-[1.05] transition-all"
          >
            <p className="text-3xl font-semibold mb-1">{risk ? risk : "N/A"}</p>
            <p className="text-sm font-normal">Project at Risk</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
