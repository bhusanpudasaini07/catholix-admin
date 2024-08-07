import {
  FileBadge,
  FileBadge2,
  FileBarChart,
  FileLineChart,
  LayoutDashboard,
  LayoutGrid,
  ScrollText,
  Server,
  SquareKanban,
  UserCircle2,
  UserCog,
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
    // DLCM
    {
      menuName: "common.side_nav.dlcm_data",
      icon: <UserCircle2 width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.dlcm_data",
          menuSlug: "/dlcm",
          icon: <UserCircle2 width={20} height={20} />,
        },
      ],
      permissions: [
        {
          path: "/dlcm",
          method: "get",
          resource: "dlcm",
        },
      ],
    },
    // SSP
    {
      menuName: "common.side_nav.ssp_data",
      icon: <Server width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.ssp_data",
          menuSlug: "/ssp",
          icon: <Server width={20} height={20} />,
        },
      ],
      permissions: [
        {
          path: "/ssp",
          method: "get",
          resource: "ssp",
        },
      ],
    },
    // Devices
    {
      menuName: "common.side_nav.devices_data",
      icon: <SquareKanban width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.devices_data",
          menuSlug: "/devices",
          icon: <SquareKanban width={20} height={20} />,
        },
      ],
      permissions: [
        {
          path: "/devices",
          method: "get",
          resource: "device",
        },
      ],
    },
    // Device Analytics
    {
      menuName: "common.side_nav.device_analytics",
      menuSlug: "",
      icon: <FileLineChart width={20} height={20} />,
      hasChildren: true,
      subMenu: [
        {
          menuName: "common.side_nav.device_analytics",
          menuSlug: "/device-analytics",
          icon: <FileLineChart width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "common.side_nav.performance",
              itemSlug: "/device-performance",
            },
            {
              itemName: "common.side_nav.comparison",
              itemSlug: "/device-comparison",
            },
            {
              itemName: "common.side_nav.lga_performance",
              itemSlug: "/lga-performance",
            },
          ],
        },
      ],
    },
    // Security
    {
      menuName: "common.side_nav.security",
      menuSlug: "",
      icon: <FileLineChart width={20} height={20} />,
      hasChildren: true,
      subMenu: [
        {
          menuName: "common.side_nav.security",
          menuSlug: "/device-analytics",
          icon: <FileBadge2 width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "common.side_nav.imei_mismatch",
              itemSlug: "/imei-mismatch",
            },
            {
              itemName: "common.side_nav.password_mismatch",
              itemSlug: "/password-mismatch",
            },
          ],
        },
      ],
    },
    // Admins
    {
      menuName: "common.side_nav.admins",
      icon: <UserCog width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.admins",
          menuSlug: "/admins",
          icon: <UserCog width={20} height={20} />,
        },
      ],
      permissions: [
        {
          path: "/users",
          method: "get",
          resource: "user",
        },
      ],
    },
    // Roles
    {
      menuName: "common.side_nav.roles",
      icon: <ScrollText width={20} height={20} />,
      subMenu: [
        {
          menuName: "common.side_nav.roles",
          menuSlug: "/roles",
          icon: <ScrollText width={20} height={20} />,
        },
      ],
      permissions: [
        {
          path: "/roles",
          method: "get",
          resource: "role",
        },
      ],
    },
  ],
};
