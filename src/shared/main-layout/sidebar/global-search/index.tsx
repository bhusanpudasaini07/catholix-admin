import { FolderOpen, Search, SearchX, User } from "lucide-react";
import React, { useEffect, useState } from "react";

import FilterSearch from "@/shared/components/filter-search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useDebounce } from "@/hooks/debounce.hooks";
import { useRouter } from "next/router";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IProps {
  isExpanded: boolean;
}

const GlobalSearch = ({ isExpanded }: IProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchText, 300);
  const [projectListLoading, setProjectListLoading] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const navigateTo = (route: string, linkUrl: string) => {
    router.push(`/${route}/${linkUrl}`);
    setOpen(false);
  };

  //   Dummt project array
  const projectList = [
    { code: "project1", title: "Project 1" },
    { code: "project2", title: "Project 2" },
    { code: "project3", title: "Project 3" },
  ];

  const filterProject = () => {
    const filteredProjects = projectList.filter((project) => {
      return project.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredProjects(filteredProjects);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) {
      setProjectListLoading(true);
      // Simulate loading for 1 second
      const timeout = setTimeout(() => {
        setProjectListLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    filterProject();
  }, [debouncedSearchValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        {isExpanded ? (
          <div className="flex justify-start items-center p-2 mx-6 my-4 rounded-md border border-zinc-200 text-zinc-700">
            <Search size={20} />
            <p className="text-sm text-zinc-300 ms-3">Search</p>
            <p className="flex justify-start items-center text-sm text-zinc-300 ms-auto">
              Ctrl+K
            </p>
          </div>
        ) : (
          <div
            className={`hidden xl:block focus:outline-none hover:bg-zinc-100 
          px-[1.25rem] py-[0.75rem]`}
          >
            <Search size={20} />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[625px] gap-0 p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Global Search</DialogTitle>
          <DialogDescription>
            Type to find. ENTER to select, ESC to dismiss.
          </DialogDescription>
          <FilterSearch
            searchText={searchText}
            className="!max-w-full !mt-4"
            setSearchText={(value) => setSearchText(value)}
          />
        </DialogHeader>
        <div className="p-6 text-sm font-medium border-t border-zinc-200 text-zinc-500">
          {searchText?.length > 0 && (
            <>
              {projectListLoading ? (
                <div className="mb-6">
                  <Skeleton className="mb-2 w-56 h-4" />
                  <Skeleton className="mb-2 w-full h-4" />
                  <Skeleton className="mb-2 w-full h-4" />
                </div>
              ) : (
                <>
                  {filteredProjects?.length > 0 ? (
                    <>
                      <p className="">PROJECTS</p>
                      <ul className="overflow-auto mb-4 max-h-48">
                        {filteredProjects?.map(
                          (project: any, index: number) => (
                            <li
                              key={index}
                              onClick={() =>
                                navigateTo("projects", project?.code)
                              }
                              className="flex gap-3 justify-start items-center py-3 cursor-pointer hover:text-primary"
                            >
                              <FolderOpen />
                              <p>{project?.title}</p>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <p className="flex gap-2 justify-center items-center px-6 py-3 text-center text-zinc-500">
                      <SearchX size={20} />
                      <span>No Match Found</span>
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
