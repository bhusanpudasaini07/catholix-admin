import React, { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { useQuery, useQueryClient } from "react-query";

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

import { Check, ChevronDown, Search, X } from "lucide-react";
import { IAllProject } from "@/interface/project-interface";
import { getAllProject } from "@/services/project/projects-service";
import { useDebounce } from "@/hooks/debounce.hooks";

interface IProps {
  project: string;
  setProject: (arg: string) => void;
  projectName: string;
  setProjectName: (arg: string) => void;
  vendor: string;
}

const InvoiceProjectFilter = ({
  project,
  setProject,
  projectName,
  vendor,
  setProjectName,
}: IProps) => {
  // STATES
  const [openPopover, setOpenPopover] = useState(false);

  const debouncedSearchValue = useDebounce(projectName, 300);
  //   FUNCTIONS
  const handleInputChange = (e: any) => {
    setProjectName(e?.target.value);
  };
  const { data: projectsList, isLoading } = useQuery<IAllProject>({
    queryFn: () => getAllProject(projectName, project, vendor),
    queryKey: ["projectsList", debouncedSearchValue, project, vendor],
  });

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild className="w-40">
        <Button
          variant="outline"
          role="combobox"
          onClick={() => setProjectName("")}
          className={cn(
            "justify-start border-gray-300 font-normal disabled:bg-gray-250"
          )}
        >
          {/* {project
            ? projectsList?.data?.find(
                (projects: any) => projects.id === project
              )?.name
            : "Select Project"} */}
          <p className="w-full truncate">
            {" "}
            {project
              ? projectsList?.data?.find(
                  (projects: any) => projects.id === project
                )?.name
              : "Select Project"}
          </p>
          {project && (
            <X
              className="ml-2 cursor-pointer"
              width={15}
              onClick={() => {
                setProject("");
                setProjectName("");
              }}
            />
          )}
          {!project && <ChevronDown className="w-4 h-4 opacity-50" />}
        </Button>
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
          <CommandEmpty>No Projects found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-scroll">
            {projectsList?.data?.map((project_item: any) => (
              <CommandItem
                value={project_item.id}
                key={project_item.id}
                onSelect={() => {
                  //   form.setValue("project_id", project.id);
                  setProject(project_item.id);
                  setOpenPopover(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    project_item.id === project ? "opacity-100" : "opacity-0"
                  )}
                />
                {project_item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InvoiceProjectFilter;
