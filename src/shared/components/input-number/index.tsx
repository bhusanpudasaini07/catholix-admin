import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const InputNumber = () => {
  return (
    <div className="relative">
      <Input type="number" placeholder="Enter number of days" />

      <div className="flex absolute top-2.5 right-2 gap-2 items-center">
        <Button
          size={"xs"}
          variant={"outline_secondary"}
          className="p-0 text-center rounded-full !size-5"
        >
          <Minus size={16} />
        </Button>
        <Button
          size={"xs"}
          variant={"outline_secondary"}
          className="p-0 text-center rounded-full !size-5"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default InputNumber;
