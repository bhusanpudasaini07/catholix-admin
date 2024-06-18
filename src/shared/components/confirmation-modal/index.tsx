import React from "react";

import { cn } from "@/shared/utils/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";
import ButtonLoader from "../loader/button-loader";

interface IConfirmModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  title: string;
  description?: string;
  btnName: string;
  btnFuntion: () => void;
  variant: string | any;
  children?: any;
  disabled?: boolean;
  cancel?: () => void;
}

const ConfirmationModal = ({
  open,
  setOpen,
  title,
  description,
  btnName,
  btnFuntion,
  variant,
  children,
  disabled,
  cancel,
}: IConfirmModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children && children}
        <AlertDialogFooter>
          {cancel ? (
            <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
          ) : (
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          )}
          <AlertDialogAction
            className={cn(buttonVariants({ variant: variant }))}
            onClick={btnFuntion}
            disabled={disabled}
          >
            {btnName}
            {disabled && <ButtonLoader />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
