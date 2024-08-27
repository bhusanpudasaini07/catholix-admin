import React, { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/router";
import { IPermissions, IRolesForm } from "@/interface/roles-interface";
import { getPermissions, getRolesDetail } from "@/services/roles/roles-service";
import { useQuery } from "react-query";
import _ from "lodash";
import ButtonLoader from "@/shared/components/loader/button-loader";

interface IProps {
  form: UseFormReturn<IRolesForm>;
  loading: boolean;
  isViewModule: boolean;
}

const RoleForm = ({ form, loading, isViewModule }: IProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { data: permissions, isLoading: permissionsLoading } =
    useQuery<IPermissions>("permissions", getPermissions);

  const filterDependency = (module: any) => {
    const filteredValue = permissions?.data?.results
      ?.filter(
        (item) => item.method === "get" && item.resource === module.resource
      )
      ?.map((item) => item.id);
    return filteredValue;
  };

  const groupedPermissionsByResource = useMemo(() => {
    const dependentPermissions = permissions?.data?.results?.map((item) => {
      return {
        ...item,
        dependsOn:
          item?.method === "put" || item?.method === "delete"
            ? // item?.method === "get"
              filterDependency(item)
            : [],
      };
    });

    return _.groupBy(dependentPermissions, "resource");
  }, [permissions]);

  // FUNCTIONS

  /**
   * Add dependencies to the new values
   * @param permissionData individual permission object
   * @param newValues used below in handle checked change as a variable to store current form data.
   */
  const addDependencies = (permissionData: any, newValues: any) => {
    if (permissionData && permissionData?.dependsOn) {
      permissionData?.dependsOn?.forEach((dep: any) => {
        if (!newValues?.includes(dep.toString())) {
          newValues?.push(dep.toString());
        }
      });
    }
  };

  const handleCheckedChange = (
    permissionValue: string,
    checked: boolean,
    permissionData: any
  ) => {
    const currentValue = form.getValues("permissions") || [];
    let newValues = [...currentValue];

    if (checked) {
      newValues = [...newValues, permissionValue];
      addDependencies(permissionData, newValues);
    } else {
      newValues = newValues?.filter((value) => value !== permissionValue);
    }

    form.setValue("permissions", newValues);
  };

  console.log(groupedPermissionsByResource);

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role Name
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isViewModule}
                    className="placeholder:text-gray-270"
                    placeholder="Role Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dashboard, SSP */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {/* Dashboard */}
          <Card className="col-span-3 xl:col-span-2">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">Dashboard</h5>
              </div>
              <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-4">
                {groupedPermissionsByResource?.dashboard?.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            id={permission.id.toString()}
                            variant="primary"
                            className="border-zinc-700"
                            checked={field.value?.includes(
                              permission.id.toString()
                            )}
                            disabled={isViewModule}
                            onCheckedChange={(checked) => {
                              handleCheckedChange(
                                permission.id.toString(),
                                checked as boolean,
                                permission
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className="!mt-0"
                          htmlFor={permission.id.toString()}
                        >
                          {permission.description}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SSP */}
          <Card className="col-span-3 xl:col-span-1">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">SSP Data</h5>
              </div>
              <div className="grid grid-cols-1 items-center">
                {groupedPermissionsByResource?.ssp?.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            id={permission.id.toString()}
                            variant="primary"
                            className="border-zinc-700"
                            disabled={isViewModule}
                            checked={field.value?.includes(
                              permission.id.toString()
                            )}
                            onCheckedChange={(checked) => {
                              handleCheckedChange(
                                permission.id.toString(),
                                checked as boolean,
                                permission
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className="!mt-0"
                          htmlFor={permission.id.toString()}
                        >
                          {permission.description}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices, Device Analytics */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
          {/* Devices */}
          <Card className="col-span-2 xl:col-span-1">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">
                  Devices Data
                </h5>
              </div>
              <div className="grid grid-cols-1 items-center">
                {groupedPermissionsByResource?.devices?.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            id={permission.id.toString()}
                            variant="primary"
                            className="border-zinc-700"
                            checked={field.value?.includes(
                              permission.id.toString()
                            )}
                            disabled={isViewModule}
                            onCheckedChange={(checked) => {
                              handleCheckedChange(
                                permission.id.toString(),
                                checked as boolean,
                                permission
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className="!mt-0"
                          htmlFor={permission.id.toString()}
                        >
                          {permission.description}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Analytics */}
          <Card className="col-span-3 xl:col-span-1">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">
                  Device Analytics
                </h5>
              </div>
              <div className="grid grid-cols-3 gap-10 items-center">
                {groupedPermissionsByResource?.deviceAnalytics?.map(
                  (permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex gap-2 items-center">
                          <FormControl>
                            <Checkbox
                              id={permission.id.toString()}
                              variant="primary"
                              className="border-zinc-700"
                              checked={field.value?.includes(
                                permission.id.toString()
                              )}
                              disabled={isViewModule}
                              onCheckedChange={(checked) => {
                                handleCheckedChange(
                                  permission.id.toString(),
                                  checked as boolean,
                                  permission
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className="!mt-0"
                            htmlFor={permission.id.toString()}
                          >
                            {permission.description}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DLCM, Security */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* DLCM */}
          <Card className="col-span-2 xl:col-span-1">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">DLCM Data</h5>
              </div>
              <div className="grid grid-cols-1 items-center">
                {groupedPermissionsByResource?.dlcm?.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            id={permission.id.toString()}
                            variant="primary"
                            className="border-zinc-700"
                            checked={field.value?.includes(
                              permission.id.toString()
                            )}
                            disabled={isViewModule}
                            onCheckedChange={(checked) => {
                              handleCheckedChange(
                                permission.id.toString(),
                                checked as boolean,
                                permission
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className="!mt-0"
                          htmlFor={permission.id.toString()}
                        >
                          {permission.description}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Secutiry */}
          <Card className="col-span-3 xl:col-span-2">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">Security</h5>
              </div>
              <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-4">
                {groupedPermissionsByResource?.deviceSecurity?.map(
                  (permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex gap-2 items-center">
                          <FormControl>
                            <Checkbox
                              id={permission.id.toString()}
                              variant="primary"
                              className="border-zinc-700"
                              disabled={isViewModule}
                              checked={field.value?.includes(
                                permission.id.toString()
                              )}
                              onCheckedChange={(checked) => {
                                handleCheckedChange(
                                  permission.id.toString(),
                                  checked as boolean,
                                  permission
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className="!mt-0"
                            htmlFor={permission.id.toString()}
                          >
                            {permission.description}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SSP, device, productivity */}
        {/* <div className="grid grid-cols-2 gap-4 xl:grid-cols-3"></div> */}

        {/* Security */}
        {/* <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Security</h5>
            </div>
            <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              {groupedPermissionsByResource?.security?.map((permission) => (
                <FormField
                  key={permission.id}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          id={permission.id.toString()}
                          variant="primary"
                          className="border-zinc-700"
                          checked={field.value?.includes(
                            permission.id.toString()
                          )}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(
                              permission.id.toString(),
                              checked as boolean,
                              permission
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className="!mt-0"
                        htmlFor={permission.id.toString()}
                      >
                        {permission.description}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Admins */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Admins</h5>
            </div>
            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              {groupedPermissionsByResource?.user?.map((permission) => (
                <FormField
                  key={permission.id}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          id={permission.id.toString()}
                          variant="primary"
                          className="border-zinc-700"
                          checked={field.value?.includes(
                            permission.id.toString()
                          )}
                          disabled={isViewModule}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(
                              permission.id.toString(),
                              checked as boolean,
                              permission
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className="!mt-0"
                        htmlFor={permission.id.toString()}
                      >
                        {permission.description}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Roles</h5>
            </div>
            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-5 2xl:grid-cols-6">
              {groupedPermissionsByResource?.role?.map((permission) => (
                <FormField
                  key={permission.id}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          id={permission.id.toString()}
                          variant="primary"
                          className="border-zinc-700"
                          checked={field.value?.includes(
                            permission.id.toString()
                          )}
                          disabled={isViewModule}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(
                              permission.id.toString(),
                              checked as boolean,
                              permission
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className="!mt-0"
                        htmlFor={permission.id.toString()}
                      >
                        {permission.description}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Permissions */}
        {/* <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Permissions</h5>
            </div>
            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-5 2xl:grid-cols-6">
              {groupedPermissionsByResource?.permission?.map((permission) => (
                <FormField
                  key={permission.id}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          id={permission.id.toString()}
                          variant="primary"
                          className="border-zinc-700"
                          checked={field.value?.includes(
                            permission.id.toString()
                          )}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(
                              permission.id.toString(),
                              checked as boolean,
                              permission
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className="!mt-0"
                        htmlFor={permission.id.toString()}
                      >
                        {permission.description}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
      {!isViewModule && (
        <div className="flex gap-2 justify-start items-center mt-6">
          <Button
            variant={"primary"}
            disabled={loading || router.query.id === "1"}
            className="gap-2"
          >
            {loading && <ButtonLoader />}
            {id ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/roles")}
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default RoleForm;
