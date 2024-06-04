import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import React from "react";

const RegionalForm = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Country */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">
                Select Country
              </h5>
            </div>

            <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="view-dashboard"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="view-dashboard">Nigeria</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select Region */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">
                Select Region
              </h5>
            </div>

            <div className="grid grid-cols-1 items-center">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="all-region"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="all-region">All</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select States */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">
                Select States
              </h5>
            </div>

            <div className="grid grid-cols-2 gap-10 items-center 2xl:gap-0 2xl:grid-cols-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="all-states"
                  variant="primary"
                  className="border-zinc-700"
                />
                <Label htmlFor="all-states">All</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select local government */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-base font-bold text-zinc-900">
                Select Local Government
              </h5>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-sm font-medium">Adamawa</p>
              <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-7">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="all-adamawa"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="all-adamawa">All</Label>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-medium">Bayelsa</p>
              <div className="grid grid-cols-3 gap-10 items-center 2xl:gap-0 2xl:grid-cols-7">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="all-bayelsa"
                    variant="primary"
                    className="border-zinc-700"
                  />
                  <Label htmlFor="all-bayelsa">All</Label>
                </div>
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

export default RegionalForm;
