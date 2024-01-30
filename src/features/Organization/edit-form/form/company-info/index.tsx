import React from "react";
import { useRouter } from "next/router";

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

const CompanyInfo = ({ form, goForward }: IStepForms) => {
  const router = useRouter();
  const fieldNames = ["name", "email"];

  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">
            Company Information
          </h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Company Name"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Company Name"
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
                name="business_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Address</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Address"
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
                name="suite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Suite</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Suite"
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
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Mobile Number"
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="First Name"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Email"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Email"
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
          onClick={() => router.push("/organization")}
        >
          Back
        </Button>
        <Button
          onClick={goForward}
          disabled={isAnyFieldEmpty(form.control._formValues, fieldNames)}
          type="button"
          className="w-[146px] p-0 h-[48px]"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default CompanyInfo;
