import {
  Building,
  Calculator,
  Clock,
  File,
  FileDown,
  Folder,
  FolderClosed,
  Gitlab,
  LayoutGrid,
  LayoutPanelTopIcon,
  LucideListChecks,
  Mail,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import { useRouter } from "next/router";
import Image from "next/image";
import { Logo } from "@/shared/lib/image-config";

interface ISidebarProps {
  sidebarWidth: string;
  isExpanded: boolean;
}

export const menuItems = [
  {
    menuName: "Dashboard",
    menuSlug: "/",
    icon: <LayoutGrid width={20} height={20} />,
    hasChildren: false,
  },

  {
    menuName: "Projects",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "Projects",
        menuSlug: "/projects",
        icon: <Folder width={20} height={20} />,
      },
      {
        menuName: "Reports",
        menuSlug: "/reports",
        icon: <File width={20} height={20} />,
      },
      {
        menuName: "Time Spent Reports",
        menuSlug: "/time-spent-reports",
        icon: <Clock width={20} height={20} />,
      },
    ],
  },
  {
    menuName: "Team",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "Team Leads",
        menuSlug: "/team-leads",
        icon: <Users width={20} height={20} />,
      },
      {
        menuName: "Staff Groups",
        menuSlug: "/reports",
        icon: <Users width={20} height={20} />,
      },
    ],
  },
  {
    menuName: "Calculator",
    menuSlug: "/calculator",
    icon: <Calculator width={20} height={20} />,
    hasChildren: false,
  },
  {
    menuName: "Feedback",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "PL Feedback",
        menuSlug: "/team-leads",
        icon: <Users width={20} height={20} />,
      },
      {
        menuName: "Feedback Report",
        menuSlug: "/feedback-report",
        icon: <Users width={20} height={20} />,
      },
    ],
  },
  {
    menuName: "Other",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "GitLab Hooks",
        menuSlug: "/gitlab-hooks",
        icon: <Gitlab width={20} height={20} />,
      },
    ],
  },
];

const SidebarNew = ({ sidebarWidth, isExpanded }: ISidebarProps) => {
  const router = useRouter();
  return (
    <div
      style={{
        minWidth: sidebarWidth,
        width: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
      className={`bg-light-white sidebar py-10 border-r border-r-slate-100 max-h-[calc(100vh-56px)] overflow-y-auto hidden lg:block`}
    >
      <div className="flex flex-col gap-6">
        {menuItems?.map((item: any, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 pb-4 border-b border-b-slate-100"
          >
            {isExpanded && (
              <h2 className="px-8 text-xs font-semibold uppercase text-zinc-600">
                {item?.menuName}
              </h2>
            )}
            {item?.hasChildren ? (
              <div className={`flex flex-col gap-2`}>
                {item?.subMenu.map((subItem: any, subIndex: number) => (
                  <Link
                    key={subIndex}
                    href={subItem.menuSlug}
                    className={`
                    btn-primary  ${
                      isExpanded ? "justify-start pl-8" : "justify-center pl-4"
                    } ${router.pathname.includes(subItem?.menuSlug) && "active"}
                    `}
                  >
                    {isExpanded ? (
                      <span
                        className={`min-w-[20px] [&>svg]:max-w-[20px] h-[20px] flex justify-center `}
                      >
                        {subItem?.icon}
                      </span>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`min-w-[20px] h-[20px] flex justify-center `}
                            >
                              {subItem?.icon}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            sideOffset={25}
                            className=""
                          >
                            <p>{subItem.menuName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <span className={isExpanded ? "" : "hidden"}>
                      {subItem.menuName}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={index}
                href={item.menuSlug}
                className={`
                    btn-primary  ${
                      isExpanded ? "justify-start pl-8" : "justify-center pl-4"
                    } ${
                  (router.pathname === item?.menuSlug ||
                    (router.pathname.startsWith(item?.menuSlug) &&
                      item?.menuSlug !== "/")) &&
                  "active [&>span>svg]"
                }
                    `}
              >
                {isExpanded ? (
                  <span
                    className={`min-w-[20px] [&>svg]:max-w-[20px] h-auto flex justify-center`}
                  >
                    {item.icon}
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

export default SidebarNew;
