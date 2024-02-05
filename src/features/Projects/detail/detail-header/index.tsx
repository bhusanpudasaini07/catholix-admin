import { Button } from "@/shared/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

const DetailHeader = () => {
  return (
    <div className="py-6 px-8 bg-white flex justify-between">
      <div className="">
        <h4 className="text-2xl text-zinc-700 font-medium">Wonder Trivia</h4>
        <p className="text-base text-zinc-500 font-normal">Project Overview</p>
      </div>
      <div className="">
        <Button variant={"outline_secondary"}>
          <Pencil />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default DetailHeader;
