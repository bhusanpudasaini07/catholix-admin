import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  onClose: (arg: boolean) => void;
  className?: string;
}

const CommonModal = ({ children, open, onClose, className }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;
