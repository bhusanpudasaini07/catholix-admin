"use client";

import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/shared/components/ui/command";

import { Button } from "../ui/button";
import { cn } from "@/shared/utils/utils";

export const MultiSelect = ({
  dataList,
  placeholder,
  selected,
  setSelected,
  module,
  disabled,
}: any) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((data: any) => {
    setSelected((prev: any) => prev.filter((s: any) => s.id !== data.id));
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
    (data: any) => !selected.some((sel: any) => sel.id === data.id)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible relative bg-transparent"
    >
      <div
        className={cn(
          "px-2 py-2 min-h-9 text-sm rounded-md border shadow-sm border-zinc-200 group ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed pointer-events-none bg-zinc-100"
        )}
      >
        <div
          className={cn(
            "flex flex-wrap gap-1 h-full",
            disabled && "cursor-not-allowed pointer-events-none"
          )}
        >
          {selected.map((item: any) => {
            return (
              <Badge
                key={item.id}
                className="px-2 py-1 h-auto"
                variant="secondary"
              >
                <span className="text-xs font-medium capitalize">
                  {item?.name}
                </span>
                <Button
                  variant={"ghost"}
                  type="button"
                  className="p-0 h-auto rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-transparent"
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
            placeholder={disabled ? "" : placeholder}
            readOnly={disabled}
            className="flex-1 ml-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className={`absolute -bottom-1 w-full`}>
        {open &&
          (selectables?.length > 0 ? (
            <div className="absolute top-0 z-10 w-full bg-white rounded-md border shadow-md outline-none text-popover-foreground animate-in">
              <CommandGroup className="h-[250px] overflow-auto">
                {selectables.map((item: any) => {
                  return (
                    <CommandItem
                      key={item?.id}
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
                      {item?.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : (
            <div className="absolute top-0 z-10 w-full bg-white rounded-md border shadow-md outline-none text-popover-foreground animate-in">
              <CommandGroup className="overflow-auto p-3 h-full text-sm">
                No {module} available.
              </CommandGroup>
            </div>
          ))}
      </div>
    </Command>
  );
};
