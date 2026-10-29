import {
  Box,
  GiftIcon,
  LayoutDashboard,
  LayoutGrid,
  ListOrderedIcon,
  LucideLibrary,
  Presentation,
  Users,
} from "lucide-react";

export const permissionConfig = {
  sidebarItems: [
    // Dashboard
    {
      menuName: "Dashboard",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "Dashboard",
          menuSlug: "/",
          icon: <LayoutDashboard width={20} height={20} />,
        },
      ],
    },
    {
      menuName: "Banner",
      icon: <Presentation width={20} height={20} />,
      subMenu: [
        {
          menuName: "Banner",
          menuSlug: "/banner",
          icon: <Presentation  width={20} height={20}/>
        }
      ],
    },
    {
      menuName: "Category",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "Category",
          menuSlug: "/categories",
          icon: <LucideLibrary  width={20} height={20}/>
        }
      ],
    },
   
    {
      menuName: "Products",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "Products",
          menuSlug: "/products",
          icon: <Box  width={20} height={20} />
        },
      ],
    },
    {
      menuName: "Bundles",
      icon: <LayoutGrid width={20} height={20} />,
      subMenu: [
        {
          menuName: "Bundles",
          menuSlug: "/bundles",
          icon: <GiftIcon width={20} height={20} />
        },
      ],
    },

    {
      menuName: "Orders",
      icon: <ListOrderedIcon width={20} height={20} />,
      subMenu: [
        {
          menuName: "Orders",
          menuSlug: "/orders",
          icon: <ListOrderedIcon width={20} height={20} />
        },
      ],
    },
    {
      menuName: "Users",
      icon: <Users width={20} height={20} />,
      subMenu: [
        {
          menuName: "Users",
          menuSlug: "/users",
          icon: <Users width={20} height={20} />
        },
      ],
    },
  ],
};
