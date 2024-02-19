import useProjectDetail from "@/hooks/project/detail/useProjectDetail.hook";
import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useRouter } from "next/router";

const ProjectStories = () => {
  const router = useRouter();
  const { columns, projectStories, isLoading } = useProjectStories();
  const { projectDetail } = useProjectDetail();
  return (
    <Card className="mt-6">
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center justify-start gap-3">
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
        <div className="grid items-end grid-cols-12 gap-4">
          <div className="col-span-12 overflow-hidden rounded-md xl:col-span-7">
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
                className={`rounded-md py-8 flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100
            `}
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
                className={`rounded-md py-8 flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.open_task_count ?? 0}
                </p>
                <p className="text-base font-semibold">Opened</p>
              </div>
              <div
                className={`rounded-md py-8 flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
              >
                <p className="text-4xl font-semibold">
                  {" "}
                  {projectDetail?.data?.task?.closed_task_count ?? 0}
                </p>
                <p className="text-base font-semibold">Closed</p>
              </div>
              <div
                className={`rounded-md py-8 flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
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
