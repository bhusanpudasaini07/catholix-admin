import { useRouter } from "next/router";
import React from "react";

import { IStepForms } from "@/interface/form-interface";

import { Card, CardContent } from "@/shared/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";

import { isAnyFieldEmpty } from "@/shared/utils/form-utils";
import { useQuery } from "react-query";
import { getParentDepartment } from "@/services/department/department-service";

interface IParentDepartment {
  data: [
    {
      code: string;
      id: string;
      name: string;
    }
  ];
}

const DepartmentDetailForm = ({ form, goForward, disabled }: IStepForms) => {
  const router = useRouter();
  const { id, sub_id } = router.query;
  const fieldNames = ["name", "code"];

  const { data: parentList, isLoading } = useQuery<IParentDepartment>({
    queryFn: () => getParentDepartment(!disabled && !sub_id && id),
    queryKey: ["parentList"],
  });

  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">
            Department Details
          </h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="parent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Main Department"}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                      value={field?.value}
                      disabled={disabled}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select Main Department"
                            className="placeholder:text-gray-270"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parentList?.data?.map((item) => (
                          <SelectItem key={item?.id} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Department Name"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Department Name"
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
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"Department Code"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Department Code"
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
                name="department_head"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Department Head
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Department Head"
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
          onClick={
            sub_id
              ? () => router.push(`/departments/${id}/sub-departments`)
              : () => router.push("/departments")
          }
          className="w-[146px] p-0 h-[48px]"
        >
          Back
        </Button>
        <Button
          disabled={isAnyFieldEmpty(form.control._formValues, fieldNames)}
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

export default DepartmentDetailForm;
