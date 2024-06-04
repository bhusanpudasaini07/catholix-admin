import { SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "../ui/input";
import { cn } from "@/shared/utils/utils";

interface IProps {
  setSearchText: (arg: string) => void;
  searchText?: string;
  className?: string;
}

const FilterSearch = ({ setSearchText, className, searchText }: IProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center px-4 py-2 w-full rounded-md border shadow-sm border-zinc-200 focus-within:outline focus-within:outline-2 focus-within:outline-primary text-zinc-700 bg-light-white",
        className
      )}
    >
      {/* <SearchIcon
        width={20}
        height={20}
        stroke="#3F3F46"
        className="cursor-pointer"
      /> */}
      <Input
        placeholder="Search Input Text"
        value={searchText ? searchText : ""}
        className="p-0 h-auto rounded-none border-0 shadow-none"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
