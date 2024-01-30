import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

import DragDrop from "@/shared/components/drag-drop";

interface IProps {
  goBack: () => void;
  form?: any;
  file: any;
  setFile: (arg: any) => void;
  loading: boolean;
}

const CompanyLogo = ({ form, goBack, file, setFile, loading }: IProps) => {
  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">Company Logo</h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-12">
              <div className="col-span-6">
                <DragDrop module="" file={file} setFile={setFile} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end mt-4 gap-7">
        <Button
          type="button"
          variant={"secondary"}
          onClick={goBack}
          className="w-[146px] p-0 h-[48px]"
        >
          Back
        </Button>
        <Button className="w-[146px] p-0 h-[48px]" disabled={loading}>
          Update
        </Button>
      </div>
    </>
  );
};

export default CompanyLogo;
