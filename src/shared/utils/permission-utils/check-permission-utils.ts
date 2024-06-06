export const checkPermissions = (profile: any, url: string, method: string) => {
  const permissions = profile?.role?.permission;
  if (permissions) {
    const hasPermission = permissions.some((permission: any) => {
      return permission.path === url && permission.method === method;
    });
    return hasPermission;
  }
  return false;
};
