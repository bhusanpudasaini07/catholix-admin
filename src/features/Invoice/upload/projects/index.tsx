import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { cn } from "@/shared/utils/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
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

import { IAllProject } from "@/interface/project-interface";
import { getAllProject } from "@/services/project/projects-service";

import { Button } from "@/shared/components/ui/button";
import { Check, ChevronDown, Search } from "lucide-react";
import { useDebounce } from "@/hooks/debounce.hooks";
import { Input } from "@/shared/components/ui/input";

interface IProps {
  form: any;
  projectId: string;
  setProjectId: (arg: string) => void;
  setSelected: (arg: any) => void;
  disabled?: boolean;
}

const UploadInvoiceProjects = ({
  form,
  projectId,
  setProjectId,
  setSelected,
  disabled,
}: IProps) => {
  const queryClient = useQueryClient();

  const [openPopover, setOpenPopover] = useState(false);
  const [projectName, setProjectName] = useState("");
  const debouncedSearchValue = useDebounce(projectName, 300);
  // for selecting project
  const { data: projectsList, isLoading } = useQuery<IAllProject>(
    ["allProjects", debouncedSearchValue, projectId],
    () => getAllProject(projectName, projectId, "")
  );
  const handleInputChange = (e: any) => {
    setProjectName(e?.target.value);
  };

  // when clicking back hit projects all api
  const hitAllProject = () => {
    setProjectName("");
  };
  return (
    <FormField
      control={form.control}
      name="project_id"
      render={({ field }) => (
        <FormItem className="flex flex-col w-80">
          <h6 className="text-base text-black font-medium mb-2">
            Projects <span className="text-destructive">*</span>
          </h6>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  onClick={hitAllProject}
                  disabled={disabled}
                  className={cn(
                    "justify-between border-gray-300 font-normal disabled:bg-gray-250",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <p>
                    {field.value
                      ? projectsList?.data?.find(
                          (projects) => projects.id === field.value
                        )?.name
                      : "Select Project"}
                  </p>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </FormControl>
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
                  {projectsList?.data?.map((project) => (
                    <CommandItem
                      value={project.id}
                      key={project.id}
                      onSelect={() => {
                        form.setValue("project_id", project.id);
                        setProjectId(project.id);
                        setSelected([]);
                        setOpenPopover(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          project.id === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {project.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadInvoiceProjects;
