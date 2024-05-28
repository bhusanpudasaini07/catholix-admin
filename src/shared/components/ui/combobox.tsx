"use client";

import * as React from "react";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/utils";

interface IProps {
  selectables: { title: string; value: string }[];
  value: string;
  setValue: (arg: string) => void;
  module: string;
}

export function ComboBox({ selectables, value, setValue, module }: IProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter selectables based on the search term
  const filteredSelectables = selectables.filter((selectItem) =>
    selectItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"date_picker"}
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full font-normal"
        >
          <div className="flex gap-2 items-center min-w-0">
            <SearchIcon
              width={20}
              height={20}
              stroke="#71717A"
              className="cursor-pointer min-w-[20px]"
            />
            <span className="truncate">
              {" "}
              {value
                ? selectables.find((selectItem) => selectItem.value === value)
                    ?.title
                : `Select ${module}`}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={`Select ${module}`}
            value={searchTerm}
            onValueChange={(e: any) => {
              setSearchTerm(e);
            }}
          />
          {filteredSelectables.length === 0 && (
            <CommandEmpty>No {module} found.</CommandEmpty>
          )}
          <CommandGroup className="max-h-[300px] overflow-auto">
            {filteredSelectables.map((selectItem) => (
              <CommandItem
                key={selectItem.value}
                value={selectItem.title} // Display title but select based on value
                onSelect={() => {
                  setValue(selectItem.value); // Set the value using the item's ID
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    value === selectItem.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <p className="line-clamp-2">{selectItem.title}</p>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
