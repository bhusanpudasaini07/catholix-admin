// React
import { useState } from "react";

// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { ProjectSchema } from "@/schema/project-form/new-project.schema";

// UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

//Components
import RequiredField from "@/shared/components/required-form";

// Mutation
import { useMutation } from "react-query";

// Services
import { createNewProject } from "@/services/project/projectForm.services";

// Toasts
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

//Constant
import { constants } from "@/constants";
const { SOMETHING_WENT_WRONG } = constants.messages;

const ProjectForm = () => {
  // Form
  const form = useForm<formType>({
    resolver: zodResolver(ProjectSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  type formType = z.infer<typeof ProjectSchema>;

  // States
  const [activeItem, setActiveItem] = useState<string>("project");

  const createProjectMutation = useMutation({
    mutationFn: createNewProject,
    onSuccess: () => {
      form.reset();
      showToast(TOAST_TYPES.success, "Created in Successfully.");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail || SOMETHING_WENT_WRONG);
    },
  });

  const onSubmit: SubmitHandler<formType> = (values: formType) => {
    const payload = {
      ...values,
    };
    createProjectMutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Tabs
          value={activeItem}
          className="w-full h-full flex flex-col justify-start items-stretch"
        >
          <TabsList
            className={`!p-0 !rounded-none
            w-full bg-transparent border-0 border-b-2 border-solid border-zinc-200`}
          >
            <TabsTrigger
              className={` text-lg font-medium w-[25%] !cursor-default !shadow-none !border-0 !rounded-none !bg-white ${
                activeItem === "project"
                  ? "!text-blue-500 activeItem"
                  : "!text-zinc-700 "
              }`}
              value="project"
            >
              1.Project
            </TabsTrigger>
            <TabsTrigger
              className={` text-lg font-medium w-[25%] !cursor-default !shadow-none !border-0 !rounded-none !bg-white ${
                activeItem === "lead"
                  ? "!text-blue-500 activeItem"
                  : "!text-zinc-700"
              } `}
              value="lead"
            >
              2.Lead
            </TabsTrigger>
            <TabsTrigger
              className={` text-lg font-medium w-[25%] !cursor-default !shadow-none !border-0 !rounded-none !bg-white ${
                activeItem === "client"
                  ? "!text-blue-500 activeItem"
                  : "!text-zinc-700"
              }`}
              value="client"
            >
              3.Client
            </TabsTrigger>
            <TabsTrigger
              className={` text-lg font-medium w-[25%] !cursor-default !shadow-none !border-0 !rounded-none !bg-white ${
                activeItem === "resources"
                  ? "!text-blue-500 activeItem"
                  : "!text-zinc-700"
              }`}
              value="resources"
            >
              4.Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="project" className="h-full pt-4">
            <div className="h-full flex flex-col justify-start items-stretch">
              <h4 className="text-lg font-bold text-zinc-500 mb-3">
                Project Details
              </h4>

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Title
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">Description</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h4 className="text-lg font-bold text-zinc-500 mt-5 mb-3">
                Project Time
              </h4>
              {/* Start Date */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Start Date
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project Start Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      End Date
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project End Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grow flex items-end mt-auto">
                <Button
                  className="w-full"
                  onClick={() => setActiveItem("lead")}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="lead" className="h-full pt-4">
            <div className="h-full flex flex-col justify-start items-stretch">
              <h4 className="text-lg font-bold text-zinc-500 mb-3">
                Lead Details
              </h4>
              {/* Project Lead */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="project_lead"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Project Lead
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project Lead"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tech Lead */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="tech_lead"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Tech Lead
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Tech Lead"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-auto ">
                <Button
                  type="button"
                  variant={"outline"}
                  className="mb-3 w-full"
                  onClick={() => setActiveItem("project")}
                >
                  Back
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => setActiveItem("client")}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="client" className="h-full pt-4">
            <div className="h-full flex flex-col justify-start items-stretch">
              <h4 className="text-lg font-bold text-zinc-500 mb-3">
                Client Details
              </h4>
              {/* Source */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Source
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Source"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">Client</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Client"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Type */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="project_type"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Project Type
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Project Type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Market */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="market"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">
                      Market
                      <RequiredField />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Market"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-auto">
                <Button
                  type="button"
                  variant={"outline"}
                  className="mb-3 w-full"
                  onClick={() => setActiveItem("lead")}
                >
                  Back
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => setActiveItem("resources")}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="resources" className="h-full pt-4">
            <div className="h-full flex flex-col justify-start items-stretch">
              <h4 className="text-lg font-bold text-zinc-500 mb-3">
                Resources Details
              </h4>
              {/* Git URLs */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="git_urls"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">Git URLs</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Git URLs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tech Stack */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="tech_stack"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">Tech Stack</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Tech Stack"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resources */}
              {/* (similar structure for other fields) */}
              <FormField
                control={form.control}
                name="resources"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal">Resources</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-gray-270"
                        placeholder="Enter Resources"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-auto">
                <Button
                  type="button"
                  variant={"outline"}
                  className="mb-3 w-full"
                  onClick={() => setActiveItem("client")}
                >
                  Back
                </Button>

                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default ProjectForm;
