import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import React, { FC } from "react";

interface IProps {
  total?: number;
  success?: number;
  ongoing?: number;
  risk?: number;
}

const ProjectOverview: FC<IProps> = ({ total, success, ongoing, risk }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-6">
          <h5 className="font-medium text-zinc-700">Projects Overview</h5>
          <Button variant={"white"} size={"sm"}>
            More Details
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-zinc">
            <p className="text-3xl font-semibold mb-1">
              {total ? total : "N/A"}
            </p>
            <p className="text-sm font-normal">Total Projects</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-blue">
            <p className="text-3xl font-semibold mb-1">
              {success ? success : "N/A"}
            </p>
            <p className="text-sm font-normal">Client Project</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-orange">
            <p className="text-3xl font-semibold mb-1">
              {ongoing ? ongoing : "N/A"}
            </p>
            <p className="text-sm font-normal">In-House Projects</p>
          </div>
          <div className="!border-0 !items-start !h-[94px] p-4 !gap-0  data-card-red">
            <p className="text-3xl font-semibold mb-1">{risk ? risk : "N/A"}</p>
            <p className="text-sm font-normal">Project at Risk</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
