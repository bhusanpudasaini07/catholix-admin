import React, { useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";

import ProjectSteps from "./project-steps";
import ProjectDetailForm from "./forms/project-detail";
import ProjectAddMembers from "./forms/add-members";

import { ProjectSchema } from "@/schema/project-schema/project-schema";
import { IProjectFormInput } from "@/interface/project-interface";
import { addProject } from "@/services/project/projects-service";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const ProjectForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<IProjectFormInput>({
    resolver: zodResolver(ProjectSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [selected, setSelected] = React.useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);
  //   FUNCTIONS

  /**
   * In order to go back to the previous step/form
   */
  const goBack = () => {
    setCurrentForm(currentForm - 1);
  };
  /**
   * In order to go forward to the next step/form
   */
  const goForward = () => {
    setCurrentForm(currentForm + 1);
  };

  const renderForm = (stepForm: any) => {
    switch (currentForm) {
      case 1:
        return (
          <ProjectDetailForm
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 2:
        return (
          <ProjectAddMembers
            form={stepForm}
            goBack={() => goBack()}
            selected={selected}
            setSelected={setSelected}
            loading={addProjectMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  const addProjectMutation = useMutation({
    mutationFn: addProject,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["projectsList"]);
      router.push("/projects");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });

  const onSubmit: SubmitHandler<IProjectFormInput> = (data) => {
    const payload = {
      ...data,
      ...(data?.start_date && {
        start_date: format(data?.start_date, "yyyy-MM-dd'T'HH:mm:ss"),
      }),
      ...(data?.end_date && {
        end_date: format(data?.end_date, "yyyy-MM-dd'T'HH:mm:ss"),
      }),
      project_members: selected.map((member) => member.email),
    };
    addProjectMutation.mutate(payload);
  };

  return (
    <>
      <ProjectSteps stepCounter={currentForm} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{renderForm(form)}</form>
      </Form>
    </>
  );
};

export default ProjectForm;
