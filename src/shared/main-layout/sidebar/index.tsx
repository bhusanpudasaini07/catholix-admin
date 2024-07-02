import {
  LayoutDashboard,
  LayoutGrid,
  ScrollText,
  Server,
  SquareKanban,
  UserCircle2,
  UserCog,
} from "lucide-react";
import moment from "moment";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

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
import ChevronRight from "@/shared/svg/chevron-right";
import { useCommonStore } from "@/store/common-store";
import { checkPermissions } from "@/shared/utils/permission-utils/check-permission-utils";
import { permissionConfig } from "@/config/permissionConfig";
interface ISidebarProps {
  sidebarWidth: string;
  isExpanded: boolean;
  setIsExpanded: any;
}

const Sidebar = ({
  sidebarWidth,
  isExpanded,
  setIsExpanded,
}: ISidebarProps) => {
  const router = useRouter();
  const { profileData } = useCommonStore();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: moment().subtract(1, "years").toDate(),
    to: moment().toDate(),
  });

  const { t } = useTranslation("common");

  // Sidebar Items
  const menuItems = permissionConfig.sidebarItems.map((item) => ({
    menuName: t(item.menuName),
    icon: item.icon,
    subMenu: item.subMenu.map((subItem) => ({
      menuName: t(subItem.menuName),
      menuSlug: subItem.menuSlug,
      icon: subItem.icon,
    })),
    permissions: item.permissions,
  }));

  const isActive = (tabRoute: string) => {
    const result = router.pathname.startsWith(tabRoute);
    return result;
  };

  return (
    <div
      style={{
        width: sidebarWidth,
      }}
      className={`overflow-y-auto border-r border-black border-opacity-10 bg-light-white shrink-0 sidebar max-h-[calc(100vh)]`}
    >
      <div
        style={{
          width: sidebarWidth,
        }}
        className="fixed top-0 z-10 bg-white border-r border-black border-opacity-10"
      >
        <div
          className={` py-4  w-full flex justify-between items-center  ${
            isExpanded
              ? "flex-row justify-between items-center ps-7 pe-4"
              : "flex-col"
          }`}
        >
          <Link
            href={"/"}
            className={`flex items-center gap-1.5 shrink-0 rounded-md ${
              isExpanded ? "justify-start" : "justify-center px-2 mb-4"
            }`}
          >
            <Image
              src={Logo}
              alt="Logo"
              priority={true}
              width={58}
              height={30}
              quality={100}
              style={{ width: "auto", height: "auto" }}
              className="max-w-[60px]"
            />
            {isExpanded && (
              <span className="font-medium text-zinc-700">Data Sights</span>
            )}
          </Link>
          <button
            title="menu"
            className={`hidden xl:block focus:outline-none  ${
              isExpanded ? "" : "rotate-180"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronRight className="text-zinc-700" size={24} />
          </button>
        </div>
        {/* <div>
          <GlobalSearch isExpanded={isExpanded} />
        </div> */}
      </div>
      <div className="flex flex-col gap-2 px-4 pt-24 pb-9">
        {menuItems
          ?.filter((item) =>
            item?.permissions
              ? item?.permissions.every((perm) =>
                  checkPermissions(profileData, perm.path, perm.method)
                )
              : true
          )
          ?.map((item: any, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* {isExpanded && (
              <h2 className="px-8 py-[2px] text-xs font-semibold uppercase text-zinc-600">
                {item?.menuName}
              </h2>
            )} */}
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
                              isExpanded ? "justify-start" : "justify-center"
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
                                        ? "text-yellow-600"
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
                        isExpanded ? "justify-start" : "justify-center"
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
        className={`fixed bottom-0 z-10 w-full bg-white border-r border-black border-opacity-10`}
      >
        <p className="py-2.5 text-center text-xs font-normal text-muted">
          powered by Unitelos
        </p>
        {/* <LanguageToggler /> */}
        <div
          className={`py-2  bg-white border-t border-black border-opacity-10 ${
            isExpanded ? "flex justify-between items-center px-7" : ""
          }`}
        >
          <ProfileDropdown IsExpanded={isExpanded} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
