import { SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "../ui/input";

interface IProps {
  setSearchText: (arg: string) => void;
  searchText?: string;
  className?: string;
}

const FilterSearch = ({ setSearchText, className, searchText }: IProps) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2.5 w-full max-w-[240px] md:max-w-[300px] border rounded-md shadow-sm border-zinc-200 focus-within:outline focus-within:outline-2 focus-within:outline-primary text-zinc-700 bg-light-white ${className}`}
    >
      <SearchIcon
        width={20}
        height={20}
        stroke="#3F3F46"
        className="cursor-pointer"
      />
      <Input
        placeholder="Search Keyword"
        value={searchText ? searchText : ""}
        className="p-0 h-auto rounded-none border-0 shadow-none"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
