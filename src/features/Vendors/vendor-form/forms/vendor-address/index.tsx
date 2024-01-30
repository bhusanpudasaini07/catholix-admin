import React from "react";

import { IStepForms } from "@/interface/form-interface";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

const VendorAddress = ({ form, goForward, goBack }: IStepForms) => {
  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">
            Vendor Address
          </h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Country</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">City</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="address_line_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Address Line 1
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Address Line 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="address_line_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Address Line 2
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Address Line 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      State/Province
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="State/Province"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      ZIP Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="ZIP Postal Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end mt-4 gap-7">
        <Button
          type="button"
          variant={"secondary"}
          className="w-[146px] p-0 h-[48px]"
          onClick={goBack}
        >
          Back
        </Button>
        <Button
          onClick={goForward}
          type="button"
          className="w-[146px] p-0 h-[48px]"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default VendorAddress;
