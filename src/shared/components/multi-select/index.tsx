"use client";

import * as React from "react";
import { User, X } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/shared/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Button } from "../ui/button";

export const MultiSelect = ({
  dataList,
  placeholder,
  selected,
  setSelected,
}: any) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((data: any) => {
    setSelected((prev: any) => prev.filter((s: any) => s.email !== data.email));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev: any) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  /**
   * Filters/removes the selected value from options.
   */
  const selectables = dataList?.filter(
    (data: any) => !selected.some((sel: any) => sel.email === data.email)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className=" px-2 py-4 text-sm border border-gray-300 rounded-md group ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap h-full gap-1">
          {selected.map((item: any) => {
            return (
              <Badge key={item.email} className="h-auto" variant="select">
                <span className="text-xs font-medium">
                  {item.first_name} {item.last_name} ({item.email})
                </span>
                <Button
                  variant={"ghost"}
                  type="button"
                  className="p-0 ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                </Button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="flex-1 ml-2 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open &&
          (selectables?.length > 0 ? (
            <div className="absolute top-0 z-10 w-full bg-white border rounded-md shadow-md outline-none text-popover-foreground animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item: any) => {
                  return (
                    <CommandItem
                      key={item?.email}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev: any) => [...prev, item]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {item.first_name} {item.last_name} ({item.email})
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : (
            <div className="absolute top-0 z-10 w-full bg-white border rounded-md shadow-md outline-none text-popover-foreground animate-in">
              <CommandGroup className="h-full overflow-auto text-sm p-3 ">
                No members available.
              </CommandGroup>
            </div>
          ))}
      </div>
    </Command>
  );
};
