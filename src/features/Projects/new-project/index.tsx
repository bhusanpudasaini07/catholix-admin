//React
import React from "react";

// Icon
import { Plus } from "lucide-react";

// UI
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

//components
import NewProjectFormSteps from "./new-project-form";

const NewProject = ({ sheetOpen, setSheetOpen }: any) => {
  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[720px] min-w-[720px] !p-0 flex flex-col justify-start items-start">
          <SheetHeader>
            <SheetTitle className="py-8 px-9">
              <div className="">
                <h4 className="font-medium text-2xl text-zinc-700 mb-2">
                  Add New Project
                </h4>
                <p className="font-normal text-base text-zinc-500">
                  Create a new project
                </p>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="p-8 pt-0 w-full grow">
            <NewProjectFormSteps />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NewProject;
