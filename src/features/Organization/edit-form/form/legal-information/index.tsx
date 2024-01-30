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

import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { isAnyFieldEmpty } from "@/shared/utils/form-utils";

const LegalInformation = ({ form, goForward, goBack }: IStepForms) => {
  const items = [
    {
      id: "ein",
      label: "EIN",
    },
    {
      id: "ssn",
      label: "SSN",
    },
    {
      id: "itin",
      label: "ITIN",
    },
  ] as const;

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
                name="legal_business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Legal Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Legal Business Name"
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
                name="tax_id_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Tax ID Number</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Tax ID Number"
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
                name="legal_business_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Legal Business Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Legal Business Address"
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
                name="tax_id_type"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-8 ">
                      <RadioGroup
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        className="flex items-center gap-8"
                      >
                        {items.map((item) => (
                          <div
                            className="flex items-center gap-2"
                            key={item.id}
                          >
                            <RadioGroupItem id={item.id} value={item.id} />
                            <Label
                              htmlFor={item.id}
                              className="font-normal text-color"
                            >
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
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
          onClick={goBack}
          className="w-[146px] p-0 h-[48px]"
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

export default LegalInformation;
