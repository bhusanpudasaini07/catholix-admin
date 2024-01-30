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
import { Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

const VendorBankingDetails = ({ form, goBack, goForward }: IStepForms) => {
  const { fields, append, remove } = useFieldArray({
    name: "bank_details",
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        {fields?.map((field, index) => (
          <Card className="px-8 py-10 relative" key={field?.id}>
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <h5 className="mb-3 text-2xl font-medium text-color">
                  Banking Details{" "}
                  {fields?.length > 1 && index > 0 && <span>{index + 1}</span>}
                </h5>
                {fields?.length > 1 && (
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => remove(index)}
                    type="button"
                    className="text-gray-270 hover:text-destructive hover:bg-transparent"
                  >
                    <Trash2 width={20} />
                  </Button>
                )}
              </div>
              <div className="grid w-full grid-cols-12 gap-5">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name={`bank_details.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-gray-270 text-color"
                            placeholder="Bank Name"
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
                    name={`bank_details.${index}.account_number`}
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
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name={`bank_details.${index}.branch`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">Branch</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-gray-270 text-color"
                            placeholder="Branch"
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
                    name={`bank_details.${index}.bank_contact_number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal">
                          Bank Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-gray-270 text-color"
                            placeholder="Bank Contact Number"
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
        ))}
        <div className="border rounded-md p-4">
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                account_number: "",
                branch: "",
                bank_contact_number: "",
              })
            }
            size={"lg"}
          >
            Add New Bank
          </Button>
        </div>
      </div>
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

export default VendorBankingDetails;
