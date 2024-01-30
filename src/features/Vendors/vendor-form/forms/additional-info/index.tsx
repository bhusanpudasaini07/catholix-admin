import React, { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

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
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Calendar } from "@/shared/components/ui/calendar";

import { cn } from "@/shared/utils/utils";
import { CalendarIcon } from "lucide-react";
import DragDrop from "@/shared/components/drag-drop";
import { FileUploader } from "react-drag-drop-files";

interface IProps {
  goBack: () => void;
  form?: any;
  loading: boolean;
  goForward: () => void;
  setTaxFile: (arg: any) => void;
}

const VendorAdditionalInfo = ({
  goBack,
  form,
  loading,
  setTaxFile,
}: IProps) => {
  const router = useRouter();
  const isEdit = router.pathname.includes("/edit");

  // State to hold the file error message
  const [fileError, setFileError] = useState("");

  // Function to handle file change
  const handleFileChange = (e: any) => {
    const file = e?.target?.files[0];
    setTaxFile(file);
    if (file) {
      if (file.type !== "application/pdf") {
        // Set error message if file is not PDF
        setFileError("Please upload a PDF file.");
      } else {
        // Clear error message if file is PDF
        setFileError("");
      }
    } else {
      setFileError("");
    }
  };
  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">
            Additional Information
          </h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Vendor Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="placeholder:text-gray-270 text-color "
                        rows={6}
                        placeholder="Write a note"
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
                name="tax_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Tax ID</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="Tax ID"
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
                name="tax_clearance_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Tax Clearance File
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          fileError
                            ? "border-destructive"
                            : "placeholder:text-gray-270 text-color"
                        }
                        placeholder="Tax Clearance file"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    {fileError && <FormMessage>{fileError}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Company Name</FormLabel>
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
                name="vendor_since"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Vendor Since</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-gray-300",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Vendor Since</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="join_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Joined Date</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-gray-300",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Joined Date</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Card className="p-4 mt-4">
        <CardContent className="p-0">
          <h2 className="mb-4 text-xs font-medium text-gray-260">Approvers</h2>

          <MultiSelect
            dataList={approvers.map((approver) => ({
              value: approver.name,
              label: approver.name,
            }))}
            placeholder={"Select Approvers"}
          />
        </CardContent>
      </Card> */}

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
          disabled={
            Object.entries(form?.formState.errors).length > 0 ||
            loading ||
            fileError !== ""
          }
          type="submit"
          className="w-[146px] p-0 h-[48px]"
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default VendorAdditionalInfo;
