import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/router";

interface ISubMenu {
  menuName: string;
  menuSlug: string;
  icon: string;
}

interface ISidebarDropdownProps {
  item: {
    menuName: string;
    menuSlug: string;
    icon: string;
    hasChildren: boolean;
    subMenu: ISubMenu[];
  };
}
const SidebarDropdown = ({ item }: ISidebarDropdownProps) => {
  const router = useRouter();
  const [hoverOpen, setHoverOpen] = useState(false);
  return (
    <DropdownMenu open={hoverOpen} onOpenChange={setHoverOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => setHoverOpen(false)}
        className="btn-primary justify-center min-w-[25px]  [&>svg]:max-w-[20px] cursor-pointer"
      >
        <p className={`flex min-w-[25px]  [&>svg]:max-w-[20px]`}>
          {item?.icon}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => setHoverOpen(false)}
        side="right"
        align="start"
        className="bg-white"
      >
        <DropdownMenuGroup>
          {item?.subMenu &&
            item?.subMenu.map((subItem, subIndex) => (
              <DropdownMenuItem
                key={subIndex}
                onClick={() => router.push(subItem.menuSlug)}
                className="cursor-pointer btn-primary text-normal"
              >
                <span className="min-w-[20px] [&>svg]:max-w-[20px]">
                  {subItem?.icon}
                </span>
                <span>{subItem.menuName}</span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarDropdown;
