export enum MethodList {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
  ANY = "any",
  OPTIONS = "options",
}

export interface RoutePayloadInterface {
  path: string;
  method: MethodList;
  resource?: string;
  name?: string;
  description?: string;
  isDefault?: boolean;
  dependsOn?: Array<RoutePayloadInterface>;
}

export interface PermissionPayload {
  name: string;
  resource?: string;
  route: Array<RoutePayloadInterface>;
}

export interface ModulesPayloadInterface {
  name: string;
  resource: string;
  hasSubmodules: boolean;
  route?: string;
  path?: string;
  icon?: string;
  subModules?: Array<SubModulePayloadInterface>;
  permissions?: Array<PermissionPayload>;
}

export interface SubModulePayloadInterface {
  name: string;
  resource?: string;
  route?: string;
  path?: string;
  icon?: string;
  permissions?: Array<PermissionPayload>;
}

export interface PermissionConfigInterface {
  modules: Array<ModulesPayloadInterface>;
}

const PermissionConfiguration: PermissionConfigInterface = {
  modules: [
    {
      name: "Dashboard",
      resource: "dashboard",
      hasSubmodules: false,
      route: "/",
      path: "/",
      icon: "fas fa-home",
      permissions: [
        {
          name: "View Dashboard",
          route: [
            {
              path: "/dashboard/graph",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export Agent Information",
          route: [
            {
              path: "/dashboard/export-agent",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export Dealer Information",
          route: [
            {
              path: "/dashboard/export-dealer",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export Device Information",
          route: [
            {
              path: "/dashboard/export-device",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "Agent Data",
      resource: "agent",
      hasSubmodules: false,
      route: "/agent",
      path: "/agent",
      icon: "fas fa-user",
      permissions: [
        {
          name: "View Agent Data",
          route: [
            {
              path: "/agent/view",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "SSP Data",
      resource: "ssp",
      hasSubmodules: false,
      route: "/ssp",
      path: "/ssp",
      icon: "fas fa-database",
      permissions: [
        {
          name: "View SSP Data",
          route: [
            {
              path: "/ssp/view",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export SSP Data",
          route: [
            {
              path: "/ssp/export",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "Device Data",
      resource: "device",
      hasSubmodules: false,
      route: "/device",
      path: "/device",
      icon: "fas fa-mobile-alt",
      permissions: [
        {
          name: "View Device Data",
          route: [
            {
              path: "/device/view",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export Device Data",
          route: [
            {
              path: "/device/export",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "Productivity",
      resource: "productivity",
      hasSubmodules: false,
      route: "/productivity",
      path: "/productivity",
      icon: "fas fa-chart-line",
      permissions: [
        {
          name: "View Analysis",
          route: [
            {
              path: "/productivity/analysis",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "View Comparison",
          route: [
            {
              path: "/productivity/comparison",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "Security",
      resource: "security",
      hasSubmodules: false,
      route: "/security",
      path: "/security",
      icon: "fas fa-shield-alt",
      permissions: [
        {
          name: "View IMEI mis-match",
          route: [
            {
              path: "/security/imei-mismatch",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "View Password mis-match",
          route: [
            {
              path: "/security/password-mismatch",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export IMEI mis-match",
          route: [
            {
              path: "/security/export-imei-mismatch",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Export Password mis-match",
          route: [
            {
              path: "/security/export-password-mismatch",
              method: MethodList.GET,
            },
          ],
        },
      ],
    },
    {
      name: "Admins",
      resource: "admins",
      hasSubmodules: false,
      route: "/admins",
      path: "/admins",
      icon: "fas fa-user-shield",
      permissions: [
        {
          name: "View Admins",
          route: [
            {
              path: "/admins/view",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "Add Admin",
          route: [
            {
              path: "/admins/add",
              method: MethodList.POST,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/admins/view",
                  method: MethodList.GET,
                  name: "View All Admins",
                  resource: "Admins",
                },
              ],
            },
          ],
        },
        {
          name: "Edit Admin Details",
          route: [
            {
              path: "/admins/edit/:id",
              method: MethodList.PUT,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/admins/view",
                  method: MethodList.GET,
                  name: "View All Admins",
                  resource: "Admins",
                },
                {
                  path: "/admins/view/:id",
                  method: MethodList.GET,
                  name: "View Admin",
                  resource: "Admins",
                },
              ],
            },
          ],
        },
        {
          name: "Delete Admin",
          route: [
            {
              path: "/admins/delete/:id",
              method: MethodList.DELETE,
            },
          ],
        },
        {
          name: "Reset Admin Password",
          route: [
            {
              path: "/admins/reset-password/:id",
              method: MethodList.PUT,
            },
          ],
        },
        {
          name: "Edit Regional Permission",
          route: [
            {
              path: "/admins/edit-regional-permission/:id",
              method: MethodList.PUT,
            },
          ],
        },
      ],
    },

    {
      name: "Roles",
      resource: "roles",
      hasSubmodules: false,
      route: "/roles",
      path: "/roles",
      icon: "fas fa-user-tag",
      permissions: [
        {
          name: "View All Roles",
          route: [
            {
              path: "/roles",
              method: MethodList.GET,
            },
          ],
        },
        {
          name: "View Role",
          route: [
            {
              path: "/roles/:id",
              method: MethodList.GET,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
              ],
            },
          ],
        },
        {
          name: "View Role's Users list",
          route: [
            {
              path: "/roles/:id/users",
              method: MethodList.GET,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id",
                  method: MethodList.GET,
                  name: "View Role",
                  resource: "System Settings Roles and Permissions",
                },
              ],
            },
          ],
        },
        {
          name: "Create Role",
          route: [
            {
              path: "/roles",
              method: MethodList.POST,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
              ],
            },
          ],
        },
        {
          name: "Update Role",
          route: [
            {
              path: "/roles/:id",
              method: MethodList.PUT,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id",
                  method: MethodList.GET,
                  name: "View Role",
                  resource: "System Settings Roles and Permissions",
                },
              ],
            },
          ],
        },
        {
          name: "Update Role in Bulk",
          route: [
            {
              path: "/roles/bulk-update",
              method: MethodList.POST,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id",
                  method: MethodList.GET,
                  name: "View Role",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id/users",
                  method: MethodList.GET,
                  name: "View Role's Users list",
                  resource: "System Settings Roles and Permissions",
                },
              ],
            },
          ],
        },
        {
          name: "Delete Role",
          route: [
            {
              path: "/roles/:id",
              method: MethodList.DELETE,
              dependsOn: [
                {
                  path: "/roles",
                  method: MethodList.GET,
                  name: "View All Roles",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id/users",
                  method: MethodList.GET,
                  name: "View Role's Users list",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/:id",
                  method: MethodList.GET,
                  name: "View Role",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/roles/bulk-update",
                  method: MethodList.POST,
                  name: "Update Role in Bulk",
                  resource: "System Settings Roles and Permissions",
                },
                {
                  path: "/users",
                  method: MethodList.GET,
                  name: "View All Admins",
                  resource: "Admins",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default PermissionConfiguration;
