import { Calculator, ChevronLeft, Download } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";

const SavedQuotesHeader = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-8 py-6 bg-white border-b border-b-slate-100">
      <div className="flex gap-4 items-start">
        <Button
          onClick={() => router.push(`/unit-calculator`)}
          variant={"table"}
          className="h-auto gap-2 p-2.5"
          size={"sm"}
        >
          <ChevronLeft size={16} />
        </Button>
        <div>
          <h4 className="flex gap-2 items-center mb-1 text-2xl font-medium text-zinc-700">
            Saved Quotes
          </h4>
          <p className="text-base font-normal text-zinc-500">
            Unit consumption of the projects.
          </p>
        </div>
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
          onClick={() => router?.push("/unit-calculator")}
          variant={"outline"}
        >
          <Calculator size={20} />
          Unit Calculator
        </Button>
      </div>
    </div>
  );
};

export default SavedQuotesHeader;
