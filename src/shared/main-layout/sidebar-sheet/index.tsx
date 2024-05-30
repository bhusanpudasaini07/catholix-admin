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
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { Logo } from "@/shared/lib/image-config";

interface IProps {
  openSheet: boolean;
  setOpenSheet: (arg: boolean) => void;
}

// Sidebar Items
const SidebarSheet = ({ openSheet, setOpenSheet }: IProps) => {
  const router = useRouter();

  const { t } = useTranslation("");

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
  const changeRoute = (route: string) => {
    setOpenSheet(false);
    router.push(route);
  };

  return (
    <div className="block lg:hidden">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="left" className="max-h-[100vh] overflow-y-auto">
          <div className="mb-4">
            <Button
              variant={"ghost"}
              onClick={() => changeRoute("/")}
              className="flex justify-center items-center h-12 rounded-md"
            >
              <Image
                src={Logo}
                alt="Logo"
                priority={true}
                width={117}
                height={30}
                quality={100}
              />
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {menuItems?.map((item: any, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h2 className="text-xs uppercase text-gray-150">
                  {item?.menuName}
                </h2>
                {item?.hasChildren ? (
                  <div className={`flex flex-col`}>
                    {item?.subMenu.map((subItem: any, subIndex: number) => (
                      <Button
                        variant={
                          router.pathname.includes(subItem?.menuSlug)
                            ? "default"
                            : "ghost"
                        }
                        key={subIndex}
                        onClick={() => changeRoute(subItem.menuSlug)}
                        className={`flex gap-3 justify-start items-center px-4 py-3 h-auto text-sm font-normal rounded-lg`}
                      >
                        <span
                          className={`min-w-[20px] [&>svg]:max-w-[20px] h-auto flex justify-center `}
                        >
                          {subItem?.icon}
                        </span>
                        <span>{subItem.menuName}</span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button
                    key={index}
                    onClick={() => changeRoute(item.menuSlug)}
                    variant={
                      router.pathname === item?.menuSlug ||
                      (router.pathname.includes(item?.menuSlug) &&
                        item?.menuSlug !== "/")
                        ? "default"
                        : "ghost"
                    }
                    className={`flex gap-3 justify-start items-center px-4 py-3 h-auto text-sm font-normal rounded-lg`}
                  >
                    <span
                      className={`min-w-[20px] [&>svg]:max-w-[20px] h-auto flex justify-center`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.menuName}</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarSheet;
