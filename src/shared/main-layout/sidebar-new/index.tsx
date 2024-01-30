import {
  Building,
  File,
  FileDown,
  FolderClosed,
  LayoutGrid,
  LayoutPanelTopIcon,
  LucideListChecks,
  Mail,
  User2,
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
    icon: <LayoutGrid />,
    hasChildren: false,
  },
  {
    menuName: "Inbox",
    menuSlug: "/inbox",
    icon: <Mail />,
    hasChildren: false,
  },
  {
    menuName: "Bill Processing",
    menuSlug: "/bill-processing",
    icon: <FileDown />,
    hasChildren: false,
  },
  {
    menuName: "Bills",
    menuSlug: "",
    icon: <User2 />,
    hasChildren: true,
    subMenu: [
      {
        menuName: "Invoices",
        menuSlug: "/invoices",
        icon: <File />,
      },
      {
        menuName: "Vendors",
        menuSlug: "/vendors",
        icon: <Building />,
      },
      {
        menuName: "Purchase Orders",
        menuSlug: "/purchase-orders",
        icon: <LucideListChecks />,
      },
    ],
  },
  {
    menuName: "Departments",
    menuSlug: "/departments",
    icon: <LayoutPanelTopIcon />,
    hasChildren: false,
  },
  {
    menuName: "Projects",
    menuSlug: "/projects",
    icon: <FolderClosed />,
    hasChildren: false,
  },
  // {
  //   menuName: "Organization",
  //   menuSlug: "",
  //   icon: <User2 />,
  //   hasChildren: true,
  //   subMenu: [
  //     {
  //       menuName: "Team Members",
  //       menuSlug: "/list",
  //       icon: <Users2 />,
  //     },
  //   ],
  // },
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
      className={`bg-sidebar shadow sidebar border-r max-h-[100vh] overflow-y-auto hidden lg:block ${
        isExpanded ? "p-4" : "p-2"
      }`}
    >
      <div className="mb-4">
        <Link
          href={"/"}
          className="flex items-center justify-center h-12 rounded-md "
        >
          <Image
            src={Logo}
            alt="Logo"
            priority
            width={117}
            height={30}
            quality={100}
          />
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {menuItems?.map((item: any, index) => (
          <div key={index} className="flex flex-col gap-3">
            {isExpanded && (
              <h2 className="text-xs uppercase text-gray-150">
                {item?.menuName}
              </h2>
            )}
            {item?.hasChildren ? (
              <div className={`flex flex-col `}>
                {item?.subMenu.map((subItem: any, subIndex: number) => (
                  <Link
                    key={subIndex}
                    href={subItem.menuSlug}
                    className={`
                    btn-primary  ${
                      isExpanded ? "justify-start" : "justify-center"
                    } ${router.pathname.includes(subItem?.menuSlug) && "active"}
                    `}
                  >
                    {isExpanded ? (
                      <span
                        className={`min-w-[20px] [&>svg]:max-w-[20px] h-auto flex justify-center `}
                      >
                        {subItem?.icon}
                      </span>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`min-w-[20px] h-auto flex justify-center `}
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
                      isExpanded ? "justify-start" : "justify-center"
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
