import {
  Box,
  LayoutDashboard,
  LayoutGrid,
  ListOrderedIcon,
  LucideLibrary,

} from "lucide-react";

export const permissionConfig = {
  sidebarItems: [
    // Dashboard
    {
      menuName: "common.side_nav.dashboard",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.dashboard",
          menuSlug: "/",
          icon: <LayoutDashboard width={20} height={20} />,
        },
      ],
    },
    {
      menuName: "common.side_nav.category",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.category",
          menuSlug: "/categories",
          icon: <LucideLibrary  width={20} height={20}/>
        }
      ],
    },
    {
      menuName: "common.side_nav.products",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.products",
          menuSlug: "/products",
          icon: <Box  width={20} height={20} />
        },
      ],
    },

    {
      menuName: "common.side_nav.orders",
      icon: <ListOrderedIcon width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.orders",
          menuSlug: "/orders",
          icon: <ListOrderedIcon width={20} height={20} />
        },
      ],
    },
  ],
};
