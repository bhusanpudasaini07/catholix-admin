import { Home, List, Settings, User2, UserPlus } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import SidebarDropdown from "./sidebar-dropdown";
import SidebarAccordion from "./sidebar-accordion";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Logo } from "@/shared/lib/image-config";

interface ISidebarProps {
  sidebarWidth: string;
  isExpanded: boolean;
}

const menuItems = [
  {
    menuName: "Dashboard",
    menuSlug: "/DataTableDemo",
    icon: <Home />,
    hasChildren: false,
  },
  {
    menuName: "Bills",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "Incoming Files",
        menuSlug: "/list",
        icon: <List />,
      },
      {
        menuName: "Add",
        menuSlug: "/form",
        icon: <UserPlus />,
      },
    ],
  },
  {
    menuName: "Departments",
    menuSlug: "/departments",
    icon: <Settings />,
    hasChildren: false,
  },
  {
    menuName: "Projects",
    menuSlug: "/Projects",
    icon: <Settings />,
    hasChildren: false,
  },
  {
    menuName: "Organization",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "Incoming Files",
        menuSlug: "/list",
        icon: <List />,
      },
      {
        menuName: "Add",
        menuSlug: "/form",
        icon: <UserPlus />,
      },
    ],
  },
  {
    menuName: "settings",
    menuSlug: "/settings",
    icon: <Settings />,
    hasChildren: false,
  },
  // More items...
];

const Sidebar = ({ sidebarWidth, isExpanded }: ISidebarProps) => {
  const router = useRouter();
  return (
    <div
      style={{
        minWidth: sidebarWidth,
        width: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
      className={`bg-sidebar shadow sidebar border-r ${
        isExpanded ? "p-4" : "p-2"
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-center h-12 rounded-md ">
          <Image src={Logo} alt="Logo" width={117} height={30} quality={100} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {menuItems?.map((item: any, index) => (
          <div key={index} className="flex flex-col gap-3">
            {item?.hasChildren ? (
              isExpanded ? (
                <SidebarAccordion
                  item={item}
                  index={index}
                  isExpanded={isExpanded}
                />
              ) : (
                <SidebarDropdown item={item} />
              )
            ) : (
              <Link
                key={index}
                href={item.menuSlug}
                className={`
                    btn-primary  ${
                      isExpanded ? "justify-start" : "justify-center"
                    } ${router.pathname === item?.menuSlug && "active"}
                    `}
              >
                {isExpanded ? (
                  <span
                    className={`min-w-[20px] [&>svg]:max-w-[20px] h-auto flex justify-center `}
                  >
                    {item?.icon}
                  </span>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`min-w-[20px] h-auto flex justify-center `}
                        >
                          {item?.icon}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={25} className="">
                        <p>{item.menuName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <span className={isExpanded ? "" : "hidden"}>
                  {item.menuName}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
