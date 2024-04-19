import React from "react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

const QuoteSaveModal = ({ openModal, setOpenModal }: IProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <h4 className="font-bold text-zinc-700">Save Quotation</h4>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Label className="min-w-[100px] text-end text-sm text-zinc-700">
              Title
            </Label>
            <Input />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="min-w-[100px] text-end text-sm text-zinc-700">
              Discount %
            </Label>
            <Input />
          </div>
          <div className="flex gap-4 items-center">
            <Label className="min-w-[100px] text-end text-sm text-zinc-700">
              Ref URL
            </Label>
            <Input />
          </div>
          <div className="flex gap-4 items-start">
            <Label className="min-w-[100px] text-end text-sm text-zinc-700">
              Remarks
            </Label>
            <Textarea />
          </div>
        </div>
        <div className="text-end">
          <Button size={"md"}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteSaveModal;
