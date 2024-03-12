import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import useStaffDetail from '@/hooks/staff/useStaffDetail.hook';
import ProjectProfitViewSkeleton from '@/shared/components/skeleton-loading/project/project-profit-view-skeleton';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { changeNumberFormat } from '@/shared/utils/rp-utils';
import { cn } from '@/shared/utils/utils';

const AllTimeProjects = () => {
  const { staffProjects, staffProjectsLoading } = useStaffDetail();
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-start gap-3 mb-9">
          <p className="text-lg font-medium text-zinc-700">All Time Projects</p>
          <Button variant={"white"} size={"sm"}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {staffProjectsLoading ? (
            <ProjectProfitViewSkeleton num={12} />
          ) : (
            staffProjects?.data?.projects?.map((project) => (
              <Card key={project?.code}>
                <CardContent
                  className={cn(
                    project?.risk_status === "Low"
                      ? "border-green-300 bg-green-50"
                      : project?.risk_status === "High"
                      ? "border-red-300 bg-red-50"
                      : "bg-orange-50 border-orange-300",
                    "flex border relative rounded h-full min-h-[245px] flex-col items-center justify-between px-4 py-5"
                  )}
                >
                  <Link
                    href={`/projects/${project?.code}`}
                    className="absolute top-0 bottom-0 left-0 right-0"
                  />
                  <div className="text-center text-zinc-700">
                    <Link
                      href={`/projects/${project?.code}`}
                      className="text-base font-medium hover:text-primary "
                    >
                      {project?.name}
                    </Link>

                    <p className="my-3 text-2xl font-semibold">
                      {changeNumberFormat(project?.overall_used_rp) ?? 0} /{" "}
                      {changeNumberFormat(project?.sales_rp) ?? 0}
                    </p>
                    <p className="text-sm">Total RP Used</p>
                  </div>

                  <div className="flex items-end justify-between w-full pt-4 border-t border-t-zinc-200">
                    <div className="text-zinc-700">
                      <p className="text-xs">Budget Left:</p>
                      <p className="text-base font-semibold">
                        {(
                          (project?.sales_rp ?? 0) -
                          (project?.overall_used_rp ?? 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllTimeProjects;
