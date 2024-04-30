import { useRouter } from "next/router";

import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

const ProjectStories = () => {
  const router = useRouter();
  const { columns, projectStories, isLoading } = useProjectStories();
  const { projectDetail } = useProjectDetail();
  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-3 justify-start items-center">
            <p className="text-lg font-medium text-zinc-700">Stories</p>
            <Button
              variant={"white"}
              size={"sm"}
              onClick={() =>
                router.push(`/projects/${router?.query?.code}/project-stories`)
              }
            >
              More Details
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="overflow-hidden col-span-12 rounded-md xl:col-span-7">
            <DataTable
              border={true}
              loading={isLoading}
              columns={columns}
              data={projectStories?.data?.slice(0, 5) ?? []}
            />
          </div>
          <div className="col-span-12 xl:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <div
                className=" rounded-md py-8 flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100"
              >
                <p className="text-4xl font-semibold">
                  {projectDetail?.data?.task?.bug_count ?? 0}
                </p>
                <p className="text-base font-semibold">Bugs</p>
              </div>
              <div
                className={`flex flex-col gap-3 justify-center items-center py-8 text-red-500 bg-red-50 rounded-md border-red-100 border-[1px]`}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.bug_ratio_percentage ?? 0}%
                </p>
                <p className="text-base font-semibold">Bug Ratio</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div
                className={`flex flex-col gap-3 justify-center items-center py-8 text-blue-500 bg-blue-50 rounded-md border-blue-100 border-[1px]`}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.open_task_count ?? 0}
                </p>
                <p className="text-base font-semibold">Open US</p>
              </div>
              <div
                className={`flex flex-col gap-3 justify-center items-center py-8 text-green-500 bg-green-50 rounded-md border-green-100 border-[1px]`}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.closed_task_count ?? 0}
                </p>
                <p className="text-base font-semibold">Closed US</p>
              </div>
              <div
                className={`flex flex-col gap-3 justify-center items-center py-8 rounded-md bg-zinc-50 text-zinc-700 border-[1px] border-zinc-100`}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.all_task_count ?? 0}
                </p>
                <p className="text-base font-semibold">Total</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStories;
