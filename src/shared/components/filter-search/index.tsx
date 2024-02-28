import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface IProps {
  setSearchText: (arg: string) => void;
  className?: string;
}

const FilterSearch = ({ setSearchText, className }: IProps) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2.5 w-full max-w-[240px] mw1024:max-w-[300px] border rounded-md shadow-sm border-zinc-200 text-zinc-700 bg-light-white ${className}`}
    >
      <SearchIcon
        width={20}
        height={20}
        stroke="#3F3F46"
        className="cursor-pointer"
      />
      <Input
        placeholder="Search Keyword"
        className="h-auto p-0 border-0 rounded-none shadow-none"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
