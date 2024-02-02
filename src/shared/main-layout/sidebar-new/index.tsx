//Next
import { useRouter } from "next/router";

// Icons
import {
  Calculator,
  Clock,
  File,
  Folder,
  Gitlab,
  LayoutGrid,
  User2,
  Users,
} from "lucide-react";

// UI Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useTranslation } from "next-i18next";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

interface ISidebarProps {
  sidebarWidth: string;
  isExpanded: boolean;
}

const SidebarNew = ({ sidebarWidth, isExpanded }: ISidebarProps) => {
  const router = useRouter();

  const { t } = useTranslation("");

  // Sidebar Items
  const menuItems = [
    {
      menuName: t("side_nav.dashboard"),
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: t("side_nav.dashboard"),
          menuSlug: "/",
          icon: <LayoutGrid width={20} height={20} />,
        },
      ],
    },
    {
      menuName: "Projects",
      icon: <User2 />,
      subMenu: [
        {
          menuName: t("side_nav.projects"),
          menuSlug: "/projects",
          icon: <Folder width={20} height={20} />,
        },
        {
          menuName: "Reports",
          menuSlug: "/reports",
          icon: <File width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "Test",
              itemSlug: "/test",
            },
            {
              itemName: "Test",
              itemSlug: "/test",
            },
          ],
        },
        {
          menuName: "Time Spent Reports",
          menuSlug: "/time-spent-reports",
          icon: <Clock width={20} height={20} />,
          hasAccordion: true,
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
      subMenu: [
        {
          menuName: "Calculator",
          menuSlug: "/calculator",
          icon: <Calculator width={20} height={20} />,
        },
      ],
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

  const isActive = (tabRoute: string) => {
    // if (router.pathname === "/") {
    //   return true;
    // }
    // if (router.pathname == tabRoute) {
    //   if (router.pathname == "/") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    const result = router.pathname.startsWith(tabRoute);
    return result;
  };

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
            {item?.subMenu?.map((subItem: any, subIndex: number) => (
              <>
                {subItem?.hasAccordion ? (
                  <>
                    {isExpanded ? (
                      <Accordion type="single" collapsible key={subIndex}>
                        <AccordionItem value="item-1" className="border-0">
                          <AccordionTrigger
                            className={`btn-primary !shadow-none rounded-none w-full ${
                              isExpanded
                                ? "justify-start pl-8"
                                : "justify-center pl-4"
                            } ${isActive(subItem?.menuSlug) && "active"}`}
                          >
                            <div className={` w-full flex`}>
                              <span
                                className={`min-w-[20px] h-[20px] flex justify-center me-2`}
                              >
                                {subItem?.icon}
                              </span>

                              <span className={isExpanded ? "" : "hidden"}>
                                {subItem.menuName}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className={`sidebarList`}>
                              {subItem?.accordionItem?.map(
                                (
                                  accordionItem: any,
                                  accordionItemIndex: number
                                ) => (
                                  <li
                                    key={`accordion-item-${accordionItemIndex}`}
                                    className=""
                                  >
                                    {accordionItem?.itemName}
                                  </li>
                                )
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={`btn-primary !shadow-none rounded-none w-full ${
                            isExpanded
                              ? "justify-start pl-8"
                              : "justify-center pl-4"
                          } ${isActive(subItem?.menuSlug) && "active"}`}
                        >
                          {subItem?.icon}
                        </DropdownMenuTrigger>
                        {subItem?.accordionItem?.length > 0 && (
                          <DropdownMenuContent align="start" side="left">
                            {subItem?.accordionItem?.map(
                              (
                                accordionItem: any,
                                accordionItemIndex: number
                              ) => (
                                <DropdownMenuItem
                                  key={`accordion-item-${accordionItemIndex}`}
                                >
                                  {accordionItem?.itemName}
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
                    )}
                  </>
                ) : (
                  <>
                    {isExpanded ? (
                      <>
                        <Button
                          key={subIndex}
                          className={`
                      btn-primary h-[44px] !shadow-none rounded-none  ${
                        isExpanded
                          ? "justify-start pl-8"
                          : "justify-center pl-4"
                      } ${
                            router.pathname.includes(subItem?.menuSlug) &&
                            "active"
                          }
                      `}
                        >
                          <span
                            className={`min-w-[20px] [&>svg]:max-w-[20px]   h-[20px] flex justify-center `}
                          >
                            {subItem?.icon}
                          </span>
                          <span className={isExpanded ? "" : "hidden"}>
                            {subItem.menuName}
                          </span>
                        </Button>
                      </>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`min-w-[20px]  flex justify-center ps-3  btn-primary !shadow-none rounded-none ${
                                router.pathname.includes(subItem?.menuSlug) &&
                                "active"
                              }`}
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
                  </>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNew;
