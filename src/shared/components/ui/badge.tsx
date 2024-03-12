import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border bg-primary40 text-primary hover:bg-primary/80",
        secondary:
          "border bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "bg-transparent border text-foreground",
        select: "rounded-md h-full gap-2",
        dark: "border border-zinc-800 bg-zinc-800 text-white",
      },
      size: {
        default: "px-2.5 py-0.5 ",
        sm: "h-5 w-5 p-0 flex items-center justify-center",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
