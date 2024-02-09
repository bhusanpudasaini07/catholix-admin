import useProjectStories from "@/hooks/project/detail/useProjectStories.hook";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Button } from "@/shared/components/ui/button";

const ProjectStories = () => {
  const { columns, projectStories, isLoading } = useProjectStories();

  return (
    <div className="mt-6 card !p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-start gap-3">
          <p className="text-lg font-medium text-zinc-700">Stories</p>
          <Button variant={"white"}>More Details</Button>
        </div>
        <div className="">tabs</div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 overflow-hidden rounded-md grow">
          <DataTable
            border={true}
            loading={isLoading}
            columns={columns}
            data={projectStories?.data?.slice(0, 5) ?? []}
          />
        </div>
        <div className="col-span-5">
          <div className="flex flex-wrap justify-between gap-3 grow">
            <div
              className={`rounded-md py-8 w-[48%] flex gap-3 justify-center flex-col items-center bg-orange-50 text-orange-500 
            border-[1px] border-orange-100
            `}
            >
              <p className="text-4xl font-semibold">02</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
            <div
              className={`rounded-md py-8 w-[48%] flex gap-3 justify-center flex-col items-center bg-red-50 text-red-500 
            border-[1px] border-red-100
            `}
            >
              <p className="text-4xl font-semibold">02</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
            <div
              className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
            >
              <p className="text-4xl font-semibold">02</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
            <div
              className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-green-50 text-green-500 
            border-[1px] border-green-100
            `}
            >
              <p className="text-4xl font-semibold">02</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
            <div
              className={`rounded-md py-8 w-[32%] flex gap-3 justify-center flex-col items-center bg-blue-50 text-blue-500 
            border-[1px] border-blue-100
            `}
            >
              <p className="text-4xl font-semibold">02</p>
              <p className="text-base font-semibold">Bugs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStories;
