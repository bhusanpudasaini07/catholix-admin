import React from "react";

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

import { IStepForms } from "@/interface/form-interface";
import { isAnyFieldEmpty } from "@/shared/utils/form-utils";
import { useRouter } from "next/router";

const VendorBasics = ({ form, goForward }: IStepForms) => {
  const router = useRouter();
  const fieldNames = ["name", "vendor_id", "primary_email"];
  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">
            Vendor Basics
          </h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Vendor Name"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Vendor Name"
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
                name="vendor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Vendor Id"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Vendor Id"
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
                name="primary_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Primary Contact Email"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Primary Contact Email"
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
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Account Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Account Number"
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
          onClick={() => router.push("/vendors")}
          className="w-[146px] p-0 h-[48px]"
        >
          Back
        </Button>
        <Button
          disabled={
            isAnyFieldEmpty(form.control._formValues, fieldNames) ||
            Object.entries(form?.formState?.errors)?.length > 0
          }
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

export default VendorBasics;
