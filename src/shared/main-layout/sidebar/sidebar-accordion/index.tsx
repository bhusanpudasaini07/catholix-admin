import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/components/ui/sidebar-accordion";

interface ISubMenu {
  menuName: string;
  menuSlug: string;
  icon: string;
}

interface ISidebarAccordionProps {
  item: {
    menuName: string;
    menuSlug: string;
    icon: string;
    hasChildren: boolean;
    subMenu: ISubMenu[];
  };
  index: number;
  isExpanded: boolean;
}

const SidebarAccordion = ({
  item,
  index,
  isExpanded,
}: ISidebarAccordionProps) => {
  return (
    <Accordion key={index} type="single" collapsible>
      <AccordionItem value={`item-${index}`} className="border-0">
        <AccordionTrigger
          className={`
        btn-primary
        `}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex justify-center min-w-[20px] transition-all [&>svg]:max-w-[20px]`}
            >
              {item?.icon}
            </span>
            <span className={``}>{item.menuName}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-white dark:bg-transparent rounded-sm p-0">
          {item?.subMenu &&
            item.subMenu.map((subItem: any, subIndex: number) => (
              <Link
                className={`
                btn-primary
             `}
                key={subIndex}
                href={subItem.menuSlug}
              >
                <span className="min-w-[20px]  [&>svg]:max-w-[20px]">
                  {subItem?.icon}
                </span>
                <span className={isExpanded ? "" : "hidden"}>
                  {subItem.menuName}
                </span>
              </Link>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarAccordion;
