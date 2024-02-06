import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { Check, Search, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/shared/utils/utils";

// Define the props the component will accept
interface SearchSelectProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem?: string; // Previously id
  clearSelection: () => void; // Previously setVendorName with empty string
  itemList: Array<{ id: string; fullname: string }> | []; // Previously vendorList, added empty case
  selectedField: string; // Previously field
  onSelectItem: (id: string) => void; // Previously setVendorId
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  open,
  setOpen,
  selectedItem,
  clearSelection,
  itemList,
  selectedField,
  onSelectItem,
  handleInputChange,
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={!!selectedItem}
          onClick={clearSelection}
          className={cn(
            "justify-between w-full border-zinc-200 font-normal ",
            !selectedField && "text-muted-foreground"
          )}
        >
          <p>
            {selectedField
              ? itemList?.find((item) => item?.id === selectedField)?.fullname
              : "Select Item"}
          </p>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <div className="flex items-center px-3 border-b">
            <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
            <Input
              className="border-0"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div>
          <CommandEmpty>No Data Found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-scroll">
            {itemList?.map((item) => (
              <CommandItem
                value={item.id}
                key={item.id}
                onSelect={() => {
                  onSelectItem(item.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item.id === selectedField ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.fullname}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSelect;
