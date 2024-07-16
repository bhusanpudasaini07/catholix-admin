import {
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
