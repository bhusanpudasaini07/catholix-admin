import { useRouter } from "next/router";
import React, { useState } from "react";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "react-query";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/utils";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/shared/components/ui/command";

import { CalendarIcon, Check, ChevronDown, Search } from "lucide-react";

import {
  handleKeyDownNumber,
  isAnyFieldEmpty,
} from "@/shared/utils/form-utils";
import { useDebounce } from "@/hooks/debounce.hooks";
import { IAllVendors } from "@/interface/vendor-interface";
import { getAllVendors } from "@/services/vendor/vendor-service";

interface IProps {
  form: any;
  disabled: boolean;
}

const PurchaseFormItems = ({ form, disabled }: IProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const fieldNames = [
    "vendor_id",
    "po_number",
    "po_amount",
    "po_received_date",
  ];

  // STATES
  const [openPopover, setOpenPopover] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const debouncedSearchValue = useDebounce(vendorName, 300);

  const vendorId = form.control._formValues.vendor_id;
  // FUNCTIONS
  // for selecting project
  const { data: vendorList, isLoading } = useQuery<IAllVendors>(
    ["allVendors", debouncedSearchValue, vendorId],
    () => getAllVendors(vendorName, vendorId)
  );
  const handleInputChange = (e: any) => {
    setVendorName(e?.target.value);
  };

  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="text-2xl font-medium text-color mb-3">
            Purchase Order Details
          </h5>
          <div className="grid grid-cols-12 gap-5 w-full">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="vendor_id"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-normal">
                      {"Vendor Name"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Popover open={openPopover} onOpenChange={setOpenPopover}>
                      <PopoverTrigger className="w-full" asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            onClick={() => setVendorName("")}
                            className={cn(
                              "justify-between border-gray-300 font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <p>
                              {field.value
                                ? vendorList?.data?.find(
                                    (vendor) => vendor.id === field.value
                                  )?.name
                                : "Select Vendor"}
                            </p>
                            <ChevronDown className="w-4 h-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className=" p-0">
                        <Command>
                          <div className="flex items-center px-3 border-b">
                            <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
                            <Input
                              className="border-0"
                              placeholder="Search Vendor"
                              onChange={handleInputChange}
                            />
                          </div>
                          <CommandEmpty>No Vendors found.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-scroll">
                            {vendorList?.data?.map((vendor) => (
                              <CommandItem
                                value={vendor?.id}
                                key={vendor?.id}
                                onSelect={() => {
                                  form.setValue("vendor_id", vendor?.id);
                                  setOpenPopover(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    vendor?.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {vendor.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="po_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"PO Number "}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="PO Number"
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
                name="po_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"PO Amount"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="PO Amount"
                        {...field}
                        onKeyDown={handleKeyDownNumber}
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
                name="po_received_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {"PO Raised Date"}
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
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
                                <span>PO Raised Date</span>
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
                name="po_net"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">PO Net</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270 text-color"
                        placeholder="PO Net"
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
      <div className="flex items-center justify-end gap-7 mt-12">
        <Button
          variant={"secondary"}
          size={"lg"}
          type="button"
          onClick={() => router.push("/purchase-orders")}
        >
          Back
        </Button>
        <Button
          disabled={
            isAnyFieldEmpty(form.control._formValues, fieldNames) || disabled
          }
          className="w-[146px] p-0 h-[48px]"
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default PurchaseFormItems;
