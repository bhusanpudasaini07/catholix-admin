import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { Plus } from "lucide-react";
import FilterSearch from "@/shared/components/filter-search";
import ProjectFilters from "@/features/Projects/filters";
import NewProject from "@/features/Projects/new-project";
import ProjectForm from "@/features/Projects/new-project/new-project-form";
import { Button } from "@/shared/components/ui/button";

const Projects: NextPageWithLayout = () => {
  const [searchText, setSearchText] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div>
      {/* Page heading */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <div>
          <h1 className="mb-1.5 text-2xl font-medium text-zinc-700">
            All projects
          </h1>
          <p className="text-base text-zinc-500">
            The complete dashboard to get insights and overview of the projects.
          </p>
        </div>
        <Button onClick={() => setSheetOpen(true)}>
          <Plus width={20} height={20} />
          <span>Add New Project</span>
        </Button>

        <NewProject sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
        {/* <ProjectForm /> */}
      </div>

      {/* Filters */}
      <div className="flex items-end justify-between px-8 py-6 border-b bg-light-white border-b-slate-100">
        <FilterSearch setSearchText={setSearchText} />
        <ProjectFilters />
      </div>
    </div>
  );
};

export default Projects;

Projects.getLayout = (page) => {
  return <MainLayout title="Projects">{page}</MainLayout>;
};
