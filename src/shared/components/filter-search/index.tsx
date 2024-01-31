import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface IProps {
  //   searchText: string;
  setSearchText: (arg: string) => void;
}

const FilterSearch = ({ setSearchText }: IProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 w-[400px] border rounded-md shadow-sm border-zinc-200 text-zinc-700 bg-light-white">
      <SearchIcon
        width={20}
        height={20}
        stroke="#3F3F46"
        className="cursor-pointer"
      />
      <Input
        placeholder="Type here to search"
        className="h-auto p-0 border-0 rounded-none shadow-none"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
