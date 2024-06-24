import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils/utils";
import { Slot } from "@radix-ui/react-slot";

import ButtonLoader from "../loader/button-loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm break-normal font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-primary text-primary-foreground shadow-custom-primary hover:bg-primary-hover",
        primary:
          "bg-primary border-primary text-primary-foreground shadow-custom-primary hover:bg-primary-hover",
        secondary:
          "bg-secondary border border-secondary text-zinc-700 hover:bg-amber-200 ",
        destructive:
          "bg-destructive text-white hover:bg-red-600/90 shadow-custom-primary",
        info: "bg-info text-info-text hover:bg-info-foreground shadow-sm",
        outline:
          "border border-primary text-primary bg-white hover:bg-primary hover:text-white",
        outline_secondary:
          "border border-zinc-700 text-zinc-700 bg-white hover:border-primary hover:text-primary",
        outline_tertiary:
          "shadow-sm text-blue-500 text-sm rounded-lg border border-blue-100 hover:bg-blue-500 hover:text-white",
        white:
          "text-zinc-700 border-zinc-200 border-[1px] border-solid shadow-sm bg-white hover:border-primary hover:text-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        pagination:
          "min-w-[32px] !p-0 max-w-[32px] max-h-[32px] text-color leading-auto h-auto border hover:border-primary hover:text-primary text-sm",
        date_picker: "border border-zinc-200 shadow-sm py-2 px-3",
        inactive:
          "py-3 px-4 text-zinc-700 bg-white border-2  border-white h-auto shadow-sm",
        active:
          "py-3 px-4 text-primary bg-white border-2 border-primary h-auto shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2 gap-2",
        xs: "text-xs font-normal h-8 px-3",
        sm: "h-8 rounded-md px-3",
        base: "h-9 rounded-md px-4 py-2 text-sm",
        lg: "h-12 rounded-md px-4 py-2 text-lg",
        icon: "h-10 w-10",
        md: "h-10 py-2 px-4 text-base",
        xl: "h-auto rounded-xl ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props?.children}
        {loading && <ButtonLoader className="ms-3" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
