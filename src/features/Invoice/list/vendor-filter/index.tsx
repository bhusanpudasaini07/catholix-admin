import React, { useEffect, useState } from "react";
import { cn } from "@/shared/utils/utils";
import { useQuery } from "react-query";

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
import { Input } from "@/shared/components/ui/input";

import { Check, ChevronDown, Cross, Search, X } from "lucide-react";
import { getAllVendors } from "@/services/vendor/vendor-service";
import { IAllVendors } from "@/interface/vendor-interface";
import { useDebounce } from "@/hooks/debounce.hooks";

interface IProps {
  vendor: string;
  setVendor: (arg: string) => void;
  vendorName: string;
  setVendorName: (arg: string) => void;
}

const InvoiceVendorFilter = ({
  vendor,
  setVendor,
  vendorName,
  setVendorName,
}: IProps) => {
  // STATES
  const [openPopover, setOpenPopover] = useState(false);

  const debouncedSearchValue = useDebounce(vendorName, 300);
  //   FUNCTIONS
  const handleInputChange = (e: any) => {
    setVendorName(e?.target.value);
  };

  const { data: vendorList, isLoading } = useQuery<IAllVendors>({
    queryFn: () => getAllVendors(vendorName, vendor),
    queryKey: ["vendorList", debouncedSearchValue, vendor],
  });

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild className="w-40">
        <Button
          variant="outline"
          role="combobox"
          onClick={() => setVendorName("")}
          className={cn(
            "justify-start border-gray-300 font-normal disabled:bg-gray-250"
          )}
        >
          <p className="w-full truncate">
            {" "}
            {vendor
              ? vendorList?.data?.find((vendors: any) => vendors.id === vendor)
                  ?.name
              : "Select Vendor"}
          </p>
          {vendor && (
            <X
              className="ml-2 cursor-pointer"
              width={15}
              onClick={() => {
                setVendor("");
                setVendorName("");
              }}
            />
          )}
          {!vendor && <ChevronDown className="w-4 h-4 opacity-50" />}
        </Button>
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
          <CommandEmpty>No Projects found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-scroll">
            {vendorList?.data?.map((ven_item: any) => (
              <CommandItem
                value={ven_item.id}
                key={ven_item.id}
                onSelect={() => {
                  //   form.setValue("project_id", project.id);
                  setVendor(ven_item.id);
                  setOpenPopover(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ven_item.id === vendor ? "opacity-100" : "opacity-0"
                  )}
                />
                {ven_item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InvoiceVendorFilter;
