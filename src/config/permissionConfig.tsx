import {
  FileBadge,
  FileBadge2,
  FileBarChart,
  FileLineChart,
  FileStack,
  Layers3,
  LayoutDashboard,
  LayoutGrid,
  ListOrdered,
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
    // Conversion Report
    {
      menuName: "common.side_nav.conversion_report",
      menuSlug: "",
      icon: <Layers3 width={20} height={20} />,
      hasChildren: true,
      permissions: [
        {
          path: "/conversion-rate/agent",
          method: "get",
          resource: "consversion_report",
        },
        {
          path: "/conversion-rate/dealer",
          method: "get",
          resource: "consversion_report",
        },
        {
          path: "/conversion-rate/agent-performance",
          method: "get",
          resource: "consversion_report",
        },
      ],
      subMenu: [
        {
          menuName: "common.side_nav.conversion_report",
          menuSlug: "/conversion-report",
          icon: <Layers3 width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "common.side_nav.conversion_rate_agents",
              itemSlug: "/conversion-rate-agents",
              permissions: [
                {
                  path: "/conversion-rate/agent",
                  method: "get",
                  resource: "consversion_report",
                },
              ],
            },
            {
              itemName: "common.side_nav.conversion_rate_dealers",
              itemSlug: "/conversion-rate-dealers",
              permissions: [
                {
                  path: "/conversion-rate/dealer",
                  method: "get",
                  resource: "consversion_report",
                },
              ],
            },
            {
              itemName: "common.side_nav.conversion_performance",
              itemSlug: "/conversion-performance",
              permissions: [
                {
                  path: "/conversion-rate/agent-performance",
                  method: "get",
                  resource: "consversion_report",
                },
              ],
            },
          ],
        },
      ],
    },
    // Report
    {
      menuName: "common.side_nav.report",
      menuSlug: "",
      icon: <FileStack width={20} height={20} />,
      hasChildren: true,
      permissions: [
        {
          path: "/conversion-rate/dashboard-report",
          method: "get",
          resource: "report",
        },
        {
          path: "/conversion-rate/summary-report",
          method: "get",
          resource: "report",
        },
        {
          path: "/conversion-rate/agent-performance-by-gc-cr",
          method: "get",
          resource: "report",
        },
        {
          path: "/conversion-rate/agent-performance-by-gc",
          method: "get",
          resource: "report",
        },
        {
          path: "/conversion-rate/carporate-eb-report",
          method: "get",
          resource: "report",
        },
      ],
      subMenu: [
        {
          menuName: "common.side_nav.report",
          menuSlug: "/report",
          icon: <FileStack width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            // {
            //   itemName: "common.side_nav.agent_report",
            //   itemSlug: "/agent-report",
            //   permissions: [
            //     // {
            //     //   path: "/devices/device_analytics/comparison",
            //     //   method: "get",
            //     //   resource: "deviceAnalytics",
            //     // },
            //   ],
            // },
            {
              itemName: "common.side_nav.performance_report",
              itemSlug: "/performance-report",
              permissions: [
                {
                  path: "/conversion-rate/agent-performance-by-gc",
                  method: "get",
                  resource: "report",
                },
              ],
            },
            {
              itemName: "common.side_nav.dashboard_report",
              itemSlug: "/dashboard-report",
              permissions: [
                {
                  path: "/conversion-rate/dashboard-report",
                  method: "get",
                  resource: "report",
                },
              ],
            },
            {
              itemName: "common.side_nav.corporate_eb_report",
              itemSlug: "/corporate-eb-report",
              permissions: [
                {
                  path: "/conversion-rate/carporate-eb-report",
                  method: "get",
                  resource: "report",
                },
              ],
            },
            {
              itemName: "common.side_nav.summary_report",
              itemSlug: "/summary-report",
              permissions: [
                {
                  path: "/conversion-rate/summary-report",
                  method: "get",
                  resource: "report",
                },
              ],
            },
            {
              itemName: "common.side_nav.overall_performance",
              itemSlug: "/overall-performance",
              permissions: [
                {
                  path: "/conversion-rate/agent-performance-by-gc-cr",
                  method: "get",
                  resource: "report",
                },
              ],
            },
          ],
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
      permissions: [
        {
          path: "/devices/device_analytics/performance",
          method: "get",
          resource: "deviceAnalytics",
        },
        {
          path: "/devices/device_analytics/comparison",
          method: "get",
          resource: "deviceAnalytics",
        },
        {
          path: "/devices/device_analytics/performance-by-lg",
          method: "get",
          resource: "deviceAnalytics",
        },
      ],
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
              permissions: [
                {
                  path: "/devices/device_analytics/performance",
                  method: "get",
                  resource: "deviceAnalytics",
                },
              ],
            },
            {
              itemName: "common.side_nav.comparison",
              itemSlug: "/device-comparison",
              permissions: [
                {
                  path: "/devices/device_analytics/comparison",
                  method: "get",
                  resource: "deviceAnalytics",
                },
              ],
            },
            {
              itemName: "common.side_nav.lga_performance",
              itemSlug: "/lga-performance",
              permissions: [
                {
                  path: "/devices/device_analytics/performance-by-lg",
                  method: "get",
                  resource: "deviceAnalytics",
                },
              ],
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
      permissions: [
        {
          path: "/security/imei-mismatch",
          method: "get",
          resource: "deviceSecurity",
        },
        {
          path: "/security/password-mismatch/",
          method: "get",
          resource: "deviceSecurity",
        },
      ],
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
              permissions: [
                {
                  path: "/security/imei-mismatch",
                  method: "get",
                  resource: "deviceSecurity",
                },
              ],
            },
            {
              itemName: "common.side_nav.password_mismatch",
              itemSlug: "/password-mismatch",
              permissions: [
                {
                  path: "/security/password-mismatch/",
                  method: "get",
                  resource: "deviceSecurity",
                },
              ],
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

    // Logs
    {
      menuName: "common.side_nav.log",
      menuSlug: "",
      icon: <ListOrdered width={20} height={20} />,
      hasChildren: true,
      // permissions: [
      //   {
      //     path: "/security/imei-mismatch",
      //     method: "get",
      //     resource: "deviceSecurity",
      //   },
      //   {
      //     path: "/security/password-mismatch/",
      //     method: "get",
      //     resource: "deviceSecurity",
      //   },
      // ],
      subMenu: [
        {
          menuName: "common.side_nav.log",
          menuSlug: "/device-analytics",
          icon: <ListOrdered width={20} height={20} />,
          hasAccordion: true,
          accordionItem: [
            {
              itemName: "common.side_nav.activity_log",
              itemSlug: "/user-activity-log",
              // permissions: [
              //   {
              //     path: "/security/imei-mismatch",
              //     method: "get",
              //     resource: "deviceSecurity",
              //   },
              // ],
            },
            {
              itemName: "common.side_nav.usage_time_log",
              itemSlug: "/usage-time-log",
              // permissions: [
              //   {
              //     path: "/security/password-mismatch/",
              //     method: "get",
              //     resource: "deviceSecurity",
              //   },
              // ],
            },
          ],
        },
      ],
    },
  ],
};
