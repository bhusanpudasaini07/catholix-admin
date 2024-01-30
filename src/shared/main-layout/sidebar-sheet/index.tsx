import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { Logo } from "@/shared/lib/image-config";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { menuItems } from "../sidebar-new";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  openSheet: boolean;
  setOpenSheet: (arg: boolean) => void;
}

const SidebarSheet = ({ openSheet, setOpenSheet }: IProps) => {
  const router = useRouter();

  const changeRoute = (route: string) => {
    setOpenSheet(false);
    router.push(route);
  };

  return (
    <div className="block lg:hidden ">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="left" className="max-h-[100vh] overflow-y-auto">
          <div className="mb-4">
            <Button
              variant={"ghost"}
              onClick={() => changeRoute("/")}
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
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {menuItems?.map((item: any, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h2 className="text-xs uppercase text-gray-150">
                  {item?.menuName}
                </h2>
                {item?.hasChildren ? (
                  <div className={`flex flex-col `}>
                    {item?.subMenu.map((subItem: any, subIndex: number) => (
                      <Button
                        variant={
                          router.pathname.includes(subItem?.menuSlug)
                            ? "default"
                            : "ghost"
                        }
                        key={subIndex}
                        onClick={() => changeRoute(subItem.menuSlug)}
                        className={`flex items-center text-sm gap-3 py-3 h-auto px-4 rounded-lg font-normal justify-start`}
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
                    className={`flex items-center text-sm gap-3 py-3 h-auto px-4 rounded-lg font-normal justify-start`}
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
