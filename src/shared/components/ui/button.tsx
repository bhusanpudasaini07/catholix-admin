import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm break-normal font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary border-primary text-white shadow-custom-primary",
        destructive:
          "bg-gradient-to-r from-red-150 to-red-250 text-white hover:bg-red-600/90 shadow-custom-primary",
        outline:
          "border border-primary text-primary bg-white hover:bg-gray-250 hover:bg-gray-250",
        outline_secondary:
          "border border-zinc-500 text-zinc-500 bg-white hover:bg-gray-250 ",
        white:
          "text-zinc-700 border-zinc-100 border-[1px] border-solid shadow-sm bg-white hover:bg-gray-100 hover:text-zinc-500",
        secondary:
          "bg-white border border-purple-60 text-purple-60 hover:bg-purple-60 hover:text-white ",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        submit:
          "bg-gradient-to-r from-green-250 to-green-350 border-primary text-white shadow-custom-submit",
        pagination:
          "min-w-[32px] !p-0 max-w-[32px] max-h-[32px] text-color leading-auto h-auto border hover:border-primary text-sm",
        table:
          "border border-b-zinc-200 text-zinc-600 hover:border-primary hover:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2 gap-2",
        xs: "text-xs font-normal h-8 px-3",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-5 min-w-[148px]",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
