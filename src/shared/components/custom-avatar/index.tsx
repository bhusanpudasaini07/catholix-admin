"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/shared/utils/utils";

const CustomImage = ({ alt, src, loading, fallbackText, ...props }: any) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <div className="h-full rounded-full">
      {error && fallbackText ? (
        <Avatar className={cn(`w-[${props.width}px] h-full `)}>
          <AvatarFallback
            className={cn(
              `w-[${props.width}px] h-[${props.height}px] uppercase w-full`
            )}
          >
            {fallbackText}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Image
          alt={alt}
          src={src}
          onError={setError}
          {...props}
          className="rounded-full"
        />
      )}
    </div>
  );
};
export default CustomImage;
