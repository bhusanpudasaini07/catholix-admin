import React from "react";

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

interface IProps {
  form: UseFormReturn;
}

const RoleForm = ({ form }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Role Name</FormLabel>
                <FormControl>
                  <Input
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
        {/* Dashboard, Agent Data */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {/* Dashboard */}
          <Card className="col-span-3 xl:col-span-2">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">Dashboard</h5>
              </div>

              <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-4">
                <div className="flex gap-2 items-center">
                  {/* <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            variant="primary"
                            className="border-zinc-700"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <FormMessage /> */}
                  <Checkbox
                    id="view-dashboard"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-dashboard">View Dashboard</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="export-agent"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="export-agent">Export Agent Information</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="export-dealer"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="export-dealer">
                    Export Dealer Information
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="export-device"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="export-device">
                    Export Device Information
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Agent */}
          <Card className="col-span-3 xl:col-span-1">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">
                  Agent Data
                </h5>
              </div>

              <div className="grid grid-cols-1 items-center">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="view-agent"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-agent">View Agent Data</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SSP, device, productivity */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {/* SSP Data */}
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">SSP Data</h5>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="view-ssp"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-ssp">View SSP Data</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="export-ssp-data"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="export-ssp-data">Export SSP Data</Label>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Device Data */}
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">
                  Device Data
                </h5>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="view-device"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-device">View Device Data</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="export-device-data"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="export-device-data">Export Device Data</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Productivity  */}
          <Card className="col-span-2 xl:col-auto">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-base font-bold text-zinc-900">
                  Productivity
                </h5>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="view-analysis"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-analysis">View Analysis</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="view-comparison"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="view-comparison">View Comparison</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Security</h5>
            </div>

            <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="view-imei-mismatch"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="view-imei-mismatch">View IMEI mis-match</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="view-password-mismatch"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="view-password-mismatch">
                  View Password mis-match
                </Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="export-imei-mismatch"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="export-imei-mismatch">
                  Export IMEI mis-match
                </Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="export-password-mismatch"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="export-password-mismatch">
                  Export Password mis-match
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admins */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Admins</h5>
            </div>

            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="view-admins"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="view-admins">View Admins</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="add-admin"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="add-admin">Add Admin</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="edit-admin-details"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="edit-admin-details">Edit Admin Details</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="delete-admin"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="delete-admin">Delete Admin</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="reset-admin-password"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="reset-admin-password">
                  Reset Admin Password
                </Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="edit-regional-permission"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="edit-regional-permission">
                  Edit regional Permission
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Roles</h5>
            </div>

            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="view-admins"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="view-admins">View Roles</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="add-admin"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="add-admin">Add Roles</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="edit-admin-details"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="edit-admin-details">Edit Roles</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="delete-admin"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="delete-admin">Delete Roles</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2 justify-start items-center mt-6">
        <Button variant="primary">{id ? "Update" : "Create"}</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/roles")}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default RoleForm;
