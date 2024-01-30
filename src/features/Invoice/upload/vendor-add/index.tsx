import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { cn } from "@/shared/utils/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import { Button } from "@/shared/components/ui/button";
import { Check, ChevronDown, Search } from "lucide-react";
import { useDebounce } from "@/hooks/debounce.hooks";
import { Input } from "@/shared/components/ui/input";
import { IAllVendors } from "@/interface/vendor-interface";
import { getAllVendors } from "@/services/vendor/vendor-service";
import { useRouter } from "next/router";

interface IProps {
  form: any;
  vendorId: string;
  setVendorId: (arg: string) => void;
}
const UploadVendor = ({ form, vendorId, setVendorId }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const [openPopover, setOpenPopover] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const debouncedSearchValue = useDebounce(vendorName, 300);

  const { data: vendorList, isLoading } = useQuery<IAllVendors>(
    ["allVendors", debouncedSearchValue, vendorId],
    () => getAllVendors(vendorName, vendorId)
  );
  const handleInputChange = (e: any) => {
    setVendorName(e?.target.value);
  };
  useEffect(() => {
    if (vendorId !== "") {
      form.setValue("vendor_id", vendorId);
    }
  }, [vendorId]);
  return (
    <FormField
      control={form.control}
      name="vendor_id"
      render={({ field }) => (
        <FormItem className="flex flex-col w-80">
          <h6 className="text-base text-black font-medium mb-2">
            Vendors <span className="text-destructive">*</span>
          </h6>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={id ? true : false}
                  onClick={() => setVendorName("")}
                  className={cn(
                    "justify-between border-gray-300 font-normal disabled:bg-gray-250",
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
                    placeholder="Search Project"
                    onChange={handleInputChange}
                  />
                </div>
                <CommandEmpty>No Vendor found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-scroll">
                  {vendorList?.data?.map((vendor) => (
                    <CommandItem
                      value={vendor.id}
                      key={vendor.id}
                      onSelect={() => {
                        form.setValue("vendor_id", vendor.id);
                        setVendorId(vendor.id);
                        setOpenPopover(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          vendor.id === field.value
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
  );
};

export default UploadVendor;
