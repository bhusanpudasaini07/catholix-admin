import { Button } from "@/shared/components/ui/button";

const ProjectStories = () => {
  return (
    <div className="mt-6 card !p-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <p>Stories</p>
          <Button variant={"white"}>More Details</Button>
        </div>
        <div className="">tabs</div>
      </div>
      <div className="flex justify-between gap-3">
        <div className="grow">Table</div>
        <div className="grow">cards</div>
      </div>
    </div>
  );
};

export default ProjectStories;
