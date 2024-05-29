import {
  Activity,
  ArrowLeftFromLine,
  Calculator,
  Clock,
  Command,
  File,
  FileLineChart,
  FileSpreadsheet,
  Folder,
  FolderOpen,
  FolderTree,
  Gitlab,
  LayoutDashboard,
  LayoutGrid,
  LayoutPanelLeft,
  LayoutPanelTop,
  Search,
  SearchX,
  User,
  User2,
  UserCog,
  Users,
} from "lucide-react";
import moment from "moment";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";

import { useDebounce } from "@/hooks/debounce.hooks";
import { IStaffList } from "@/interface/staff-interface";
import { ITeamMemberList } from "@/interface/team-member-interface";
import { getConfig, getProfile } from "@/services/dashboard/dashboard-service";
import { getProjectList } from "@/services/project/project-service";
import { getAllStaffs } from "@/services/staff/staff-service";
import { getTeamMembersList } from "@/services/user-management/team-member/team-member-service";
import FilterSearch from "@/shared/components/filter-search";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Logo } from "@/shared/lib/image-config";
import { cn } from "@/shared/utils/utils";
import ProfileDropdown from "../header/profile-dropdown";
import GlobalSearch from "./global-search";

interface ISidebarProps {
  sidebarWidth: string;
  isExpanded: boolean;
  setIsExpanded: any;
}

const SidebarNew = ({
  sidebarWidth,
  isExpanded,
  setIsExpanded,
}: ISidebarProps) => {
  const router = useRouter();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "years").toDate(),
    to: moment().toDate(),
  });

  const { t } = useTranslation("common");

  // Sidebar Items
  const menuItems = [
    {
      menuName: t("common.side_nav.dashboard"),
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: t("common.side_nav.dashboard"),
          menuSlug: "/",
          icon: <LayoutDashboard width={20} height={20} />,
        },
      ],
    },
    {
      menuName: t("common.side_nav.projects"),
      icon: <User2 />,
      subMenu: [
        {
          menuName: t("common.side_nav.member_resource_report"),
          menuSlug: "/reports/member-resource",
          icon: <Folder width={20} height={20} />,
        },
      ],
    },
    {
      menuName: t("common.side_nav.department"),
      menuSlug: "",
      icon: <User2 />,
      hasChildren: true,
      subMenu: [
        {
          menuName: t("common.side_nav.user_management"),
          menuSlug: "/user-management",
          icon: <UserCog width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "Team Member List",
              itemSlug: "/user-management/team-members",
            },
          ],
        },
      ],
    },
  ];

  const isActive = (tabRoute: string) => {
    const result = router.pathname.startsWith(tabRoute);
    return result;
  };

  return (
    <div
      style={{
        width: sidebarWidth,
      }}
      className={`bg-light-white shrink-0 sidebar ${
        isExpanded ? "pb-12 pt-[120px]" : "pt-[140px] pb-[88px]"
      } border-r border-r-slate-100 max-h-[calc(100vh)] overflow-y-auto hidden xl:block`}
    >
      <div
        style={{
          width: sidebarWidth,
        }}
        className="fixed top-0 z-10 bg-white border-r border-b border-r-slate-100 border-b-slate-100"
      >
        <div
          className={` pt-4  w-full  ${
            isExpanded ? "flex justify-between items-center ps-7 pe-2" : ""
          }`}
        >
          <Link
            href={"/"}
            className={`flex items-center  shrink-0 rounded-md ${
              isExpanded ? "justify-start" : "justify-center px-2 mb-4"
            }`}
          >
            <Image
              src={Logo}
              alt="Logo"
              priority={true}
              width={63}
              height={30}
              quality={100}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <button
            title="menu"
            className={`hidden xl:block focus:outline-none hover:bg-zinc-100 ${
              isExpanded
                ? "px-3 py-[0.25rem] rounded-md"
                : "px-[1.35rem] py-[0.75rem] rotate-180"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ArrowLeftFromLine className="text-zinc-700" size={20} />
          </button>
        </div>
        <div>
          <GlobalSearch isExpanded={isExpanded} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {menuItems?.map((item: any, index) => (
          <div
            key={index}
            className="flex flex-col gap-[8px] pb-4 border-b border-b-slate-100 first:pt-4"
          >
            {isExpanded && (
              <h2 className="px-8 py-[2px] text-xs font-semibold uppercase text-zinc-600">
                {item?.menuName}
              </h2>
            )}
            {item?.subMenu?.map((subItem: any, subIndex: number) =>
              subItem?.hasAccordion ? (
                <React.Fragment key={subIndex}>
                  {isExpanded ? (
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={
                        router?.pathname.startsWith(subItem?.menuSlug)
                          ? "item-1"
                          : ""
                      }
                    >
                      <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger
                          className={`btn-primary min-w-0 !shadow-none rounded-none w-full ${
                            isExpanded
                              ? "justify-start pl-8"
                              : "justify-center pl-4"
                          } ${isActive(subItem?.menuSlug) && "active"}`}
                        >
                          <div className={`flex w-full font-medium`}>
                            <span
                              className={`flex justify-center min-w-[20px] h-[20px] me-3`}
                            >
                              {subItem?.icon}
                            </span>

                            <span
                              className={cn(
                                isExpanded ? "" : "hidden",
                                "truncate max-w-[150px]"
                              )}
                            >
                              {subItem.menuName}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="[&>div]:pb-0">
                          <ul className={`sidebarList`}>
                            {subItem?.accordionItem?.map(
                              (
                                accordionItem: any,
                                accordionItemIndex: number
                              ) => (
                                <li
                                  key={`accordion-item-${accordionItemIndex}`}
                                  onClick={() =>
                                    router?.push(accordionItem?.itemSlug)
                                  }
                                  className={`mb-1 font-medium ${
                                    isActive(accordionItem?.itemSlug)
                                      ? "text-blue-500"
                                      : "text-zinc-600 "
                                  }`}
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
                        } ${
                          (router.pathname === subItem?.menuSlug ||
                            (router.pathname.startsWith(subItem?.menuSlug) &&
                              subItem?.menuSlug !== "/")) &&
                          "active"
                        }`}
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
                                onClick={() =>
                                  router?.push(accordionItem?.itemSlug)
                                }
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
                </React.Fragment>
              ) : (
                <React.Fragment key={subIndex}>
                  {isExpanded ? (
                    <Button
                      key={subIndex}
                      className={`
                      btn-primary h-[44px] !shadow-none rounded-none  ${
                        isExpanded
                          ? "justify-start pl-8"
                          : "justify-center pl-4"
                      } ${
                        (router.pathname === subItem?.menuSlug ||
                          (router.pathname.startsWith(subItem?.menuSlug) &&
                            subItem?.menuSlug !== "/")) &&
                        "active"
                      }
                      `}
                      onClick={() => router?.push(subItem?.menuSlug)}
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
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => router?.push(subItem?.menuSlug)}
                          asChild
                        >
                          <span
                            className={`min-w-[20px]  flex justify-center ps-3  btn-primary !shadow-none rounded-none ${
                              (router.pathname === subItem?.menuSlug ||
                                (router.pathname.startsWith(
                                  subItem?.menuSlug
                                ) &&
                                  subItem?.menuSlug !== "/")) &&
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
                </React.Fragment>
              )
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          minWidth: sidebarWidth,
          width: sidebarWidth,
          maxWidth: sidebarWidth,
        }}
        className={`py-2 fixed w-full bg-white z-10 bottom-0 border-r border-r-slate-100 border-t border-t-slate-100 ${
          isExpanded ? "flex justify-between items-center px-7" : ""
        }`}
      >
        <ProfileDropdown IsExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default SidebarNew;
