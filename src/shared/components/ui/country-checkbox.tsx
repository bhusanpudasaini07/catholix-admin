import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/shared/utils/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  label: string;
  flagImageUrl: string;
};
const CountryButtonCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, flagImageUrl, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer shrink-0 py-2 px-2  flex items-center gap-2 text-xs font-medium rounded-md text-zinc-700 ring-offset-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props?.checked ? "opacity-1" : "opacity-55",
        className
      )}
      {...props}
    >
      {flagImageUrl && (
        <Image
          src={flagImageUrl}
          height={16}
          width={16}
          style={{ objectFit: "contain" }}
          alt="Flag"
        />
      )}{" "}
      <span>{label}</span>
      {/* Render flag image if provided */}
    </CheckboxPrimitive.Root>
  );
});

CountryButtonCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { CountryButtonCheckbox };
