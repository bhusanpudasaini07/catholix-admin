import { Button } from "@/shared/components/ui/button";
import { Download, Files } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const UnitCalculatorHeader = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-b-slate-100">
      <div>
        <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
          Unit Calculator
        </h4>
        <p className="text-base font-normal text-zinc-500">
          Calculate the unit consumption of the respective role.
        </p>
      </div>
      <div className="flex gap-4 justify-end grow">
        <Button variant={"outline_secondary"}>
          <Download size={20} />
          Roles & Budget
        </Button>
        <Button variant={"outline_secondary"}>
          <Download size={20} />
          All Staffs List
        </Button>
        <Button
          onClick={() => router?.push("/unit-calculator/saved-quotes")}
          variant={"outline"}
        >
          <Files size={20} />
          Saved Quotes
        </Button>
      </div>
    </div>
  );
};

export default UnitCalculatorHeader;
