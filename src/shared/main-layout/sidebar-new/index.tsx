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
  LayoutGrid,
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
import { ITeamMemberList } from "@/interface/team-member-interface";
import { getConfig, getProfile } from "@/services/dashboard/dashboard-service";
import { getProjectList } from "@/services/project/project-service";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Logo } from "@/shared/lib/image-config";
import { useLoggedInStore } from "@/store/auth-store";
import { useCommonStore } from "@/store/common-store";

import ProfileDropdown from "../header/profile-dropdown";
import { IStaffList } from "@/interface/staff-interface";
import { getAllStaffs } from "@/services/staff/staff-service";
import { cn } from "@/shared/utils/utils";

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
  const { isLoggedIn } = useLoggedInStore();
  const { setProfile, setFilterConfig } = useCommonStore();
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const debouncedSearchValue = useDebounce(searchText, 300);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "years").toDate(),
    to: moment().toDate(),
  });
  useQuery(["profile"], getProfile, {
    enabled: !!isLoggedIn,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setProfile(data?.data);
    },
  });
  let perPage = 10;
  let pageNumber = 1;
  let pageNum = 1;
  useQuery(["config"], getConfig, {
    enabled: !!isLoggedIn,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setFilterConfig(data?.data);
    },
  });

  const { t } = useTranslation("common");

  const { data: projectList, isLoading: projectListLoading } = useQuery({
    queryFn: () =>
      searchText
        ? getProjectList(
            pageNumber,
            perPage,
            searchText,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          )
        : Promise.resolve({ data: [] }), // Return empty data when search text is empty
    queryKey: ["projectList", perPage, pageNumber, debouncedSearchValue],
  });

  const { data: staffList, isLoading: staffLoading } = useQuery<IStaffList>({
    queryFn: () =>
      searchText
        ? getAllStaffs(
            searchText //keyword
          )
        : Promise.resolve({ data: [] }), // Return empty data when search text is empty
    queryKey: ["teamMemberList", debouncedSearchValue, perPage, pageNum],
  });

  const navigateTo = (route: string, linkUrl: string) => {
    router.push(`/${route}/${linkUrl}`);
    setOpen(false);
  };
  // Sidebar Items
  const menuItems = [
    {
      menuName: t("common.side_nav.dashboard"),
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: t("common.side_nav.dashboard"),
          menuSlug: "/",
          icon: <LayoutGrid width={20} height={20} />,
        },
      ],
    },
    {
      menuName: t("common.side_nav.projects"),
      icon: <User2 />,
      subMenu: [
        {
          menuName: t("common.side_nav.projects"),
          menuSlug: "/projects",
          icon: <Folder width={20} height={20} />,
        },
        {
          menuName: t("common.side_nav.project_required_roles"),
          menuSlug: "/project-required-roles",
          icon: <FileLineChart width={20} height={20} />,
        },
        {
          menuName: t("common.side_nav.reports"),
          menuSlug: "/reports/member-resource",
          icon: <File width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: t("common.side_nav.member_resource_report"),
              itemSlug: "/reports/member-resource",
            },
            // {
            //   itemName: "Lead Targets",
            //   itemSlug: "/test",
            // },
            // {
            //   itemName: "Lead Report",
            //   itemSlug: "/test",
            // },
          ],
        },
        {
          menuName: t("common.side_nav.time_spent_reports"),
          menuSlug: "/time-spent-reports",
          icon: <Clock width={20} height={20} />,
          hasAccordion: true,
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
          menuName: t("common.side_nav.department_performance"),
          menuSlug: "/team-leads",
          icon: <User width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "Summary Report",
              itemSlug: "/team-leads/report",
            },
            // {
            //   itemName: "Lead Targets",
            //   itemSlug: "/test",
            // },
            {
              itemName: "Department Report",
              itemSlug: `${`/team-leads/lead-report`}`,
            },
          ],
        },
        {
          menuName: t("common.side_nav.staff_groups"),
          menuSlug: "/staff_group",
          icon: <Users width={20} height={20} />,
        },
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
    {
      menuName: t("common.side_nav.hr_management"),
      menuSlug: "",
      icon: <User2 />,
      hasChildren: true,
      subMenu: [
        {
          menuName: t("common.side_nav.leave_requests"),
          menuSlug: "/leave-request",
          icon: <FolderTree width={20} height={20} />,
        },
      ],
    },
    {
      menuName: t("common.side_nav.market"),
      menuSlug: "/market",
      icon: <Activity width={20} height={20} />,
      hasChildren: false,
      subMenu: [
        {
          menuName: t("common.side_nav.market_page"),
          menuSlug: "/market",
          icon: <Activity width={20} height={20} />,
        },
      ],
    },
    {
      menuName: t("common.side_nav.quotes"),
      menuSlug: "/calculator",
      icon: <Calculator width={20} height={20} />,
      hasChildren: false,
      subMenu: [
        {
          menuName: t("common.side_nav.quote_builder"),
          menuSlug: "/quote-builder",
          icon: <Calculator width={20} height={20} />,
        },
        {
          menuName: t("common.side_nav.saved_quote"),
          menuSlug: "/saved-quotes",
          icon: <FileSpreadsheet width={20} height={20} />,
        },
      ],
    },
    // {
    //   menuName: t("common.side_nav.feedback"),
    //   menuSlug: "",
    //   icon: <User2 />,
    //   hasChildren: true,
    //   subMenu: [
    //     {
    //       menuName: t("common.side_nav.pl_feedback"),
    //       menuSlug: "/pl-feedback",
    //       icon: <Users width={20} height={20} />,
    //     },
    //     {
    //       menuName: t("common.side_nav.feedback_report"),
    //       menuSlug: "/feedback-report",
    //       icon: <Users width={20} height={20} />,
    //     },
    //   ],
    // },
    // {
    //   menuName: t("common.side_nav.other"),
    //   menuSlug: "",
    //   icon: <User2 />,
    //   hasChildren: true,
    //   subMenu: [
    //     {
    //       menuName: t("common.side_nav.gitlab_hooks"),
    //       menuSlug: "/gitlab-hooks",
    //       icon: <Gitlab width={20} height={20} />,
    //     },
    //   ],
    // },
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
            isExpanded ? "flex justify-between items-center ps-7 pe-2" : ""}`}
        >
          <Link
            href={"/"}
            className={`flex items-center justify-start shrink-0 rounded-md ${
              isExpanded ? "":"px-2 mb-4"}`}
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
              {isExpanded ? (
                <div className="flex justify-start items-center p-2 mx-6 my-4 rounded-md border border-zinc-200 text-zinc-700">
                  <Search size={20} />
                  <p className="text-sm text-zinc-300 ms-3">Search</p>
                  <p className="flex justify-start items-center text-sm text-zinc-300 ms-auto">
                    Ctrl+K
                  </p>
                </div>
              ) : (
                <div
                  className={`hidden xl:block focus:outline-none hover:bg-zinc-100 
                    px-[1.25rem] py-[0.75rem]`}
                >
                  <Search size={20} />
                </div>
              )}
            </DialogTrigger>
            <DialogContent className="min-w-[625px] gap-0 p-0">
              <DialogHeader className="p-6">
                <DialogTitle>Global Search</DialogTitle>
                <DialogDescription>
                  Type to find. ENTER to select, ESC to dismiss.
                </DialogDescription>
                <FilterSearch
                  searchText={searchText}
                  className="!max-w-full !mt-4"
                  setSearchText={(value) => setSearchText(value)}
                />
              </DialogHeader>
              <div className="p-6 text-sm font-medium border-t border-zinc-200 text-zinc-500">
                {searchText?.length > 0 && (
                  <>
                    {projectListLoading ? (
                      <div className="mb-6">
                        <Skeleton className="mb-2 w-56 h-4" />
                        <Skeleton className="mb-2 w-full h-4" />
                        <Skeleton className="mb-2 w-full h-4" />
                      </div>
                    ) : (
                      <>
                        {projectList?.data?.length > 0 && (
                          <>
                            <p className="">PROJECTS</p>
                            <ul className="overflow-auto mb-4 max-h-48">
                              {projectList?.data?.map(
                                (value: any, index: number) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      navigateTo("projects", value?.code)
                                    }
                                    className="flex gap-3 justify-start items-center py-3 cursor-pointer hover:text-primary"
                                  >
                                    <FolderOpen />
                                    <p>{value?.project_title}</p>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                    {staffLoading ? (
                      <div>
                        <Skeleton className="mb-2 w-56 h-4" />
                        <Skeleton className="mb-2 w-full h-4" />
                        <Skeleton className="mb-2 w-full h-4" />
                      </div>
                    ) : (
                      <>
                        {(staffList?.data?.length ?? 0) > 0 && (
                          <>
                            <p className="">TEAM MEMBERS</p>
                            <ul className="overflow-auto mb-4 max-h-48">
                              {staffList?.data?.map(
                                (staff: any, index: number) => (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      navigateTo("staffs", staff?.username)
                                    }
                                    className="flex gap-3 justify-start items-center py-3 cursor-pointer hover:text-primary"
                                  >
                                    <User />
                                    <p>{staff?.fullname}</p>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </>
                    )}

                    {projectList?.data?.length === 0 &&
                      staffList?.data?.length === 0 && (
                        <p className="flex gap-2 justify-center items-center px-6 py-3 text-center text-zinc-500">
                          <SearchX size={20} />
                          <span>No Match Found</span>
                        </p>
                      )}
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
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
                                isExpanded ? "":"hidden",
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
                      <span className={isExpanded ? "":"hidden"}>
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
          isExpanded ? "flex justify-between items-center px-7" : ""}`}
      >
        <ProfileDropdown IsExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default SidebarNew;
