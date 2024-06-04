import React from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

const PermissionsForm = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Dashboard */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">Dashboard</h5>
            </div>

            <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
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
                <Label htmlFor="export-dealer">Export Dealer Information</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="export-device"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="export-device">Export Device Information</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent, device, productivity */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {/* Agent */}
          <Card>
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

            <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-7">
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
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="edit-cms-permission"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="edit-cms-permission">Edit CMS Permission</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2 justify-start items-center mt-6">
        <Button variant="primary">Save</Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </div>
    </>
  );
};

export default PermissionsForm;
