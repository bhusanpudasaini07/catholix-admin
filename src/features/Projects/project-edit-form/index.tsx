import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";

import { ProjectSchema } from "@/schema/project-schema/project-schema";
import { IProjectFormInput } from "@/interface/project-interface";
import {
  getProjectDetail,
  updateProject,
} from "@/services/project/projects-service";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

import ProjectDetailForm from "../project-form/forms/project-detail";
import ProjectAddMembers from "../project-form/forms/add-members";
import ProjectSteps from "../project-form/project-steps";

const ProjectEditForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [selected, setSelected] = React.useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);

  //   FUNCTIONS
  const { data: projectDetail, isLoading } = useQuery({
    queryKey: ["projectDetail", router.query.id],
    queryFn: async () => {
      if (router.query.id) {
        const response = await getProjectDetail(router.query.id);
        return response;
      }
    },
  });
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
            loading={updateProjectMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  //   update mutation
  const updateProjectMutation = useMutation({
    mutationFn: (data) => updateProject(data, router.query.id),
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
    const payload: any = {
      ...data,
      bill_count: Number(data?.bill_count),
      bill_amount: Number(data?.bill_amount),
      ...(data?.start_date && {
        start_date: format(data?.start_date, "yyyy-MM-dd'T'HH:mm:ss"),
      }),
      ...(data?.end_date && {
        end_date: format(data?.end_date, "yyyy-MM-dd'T'HH:mm:ss"),
      }),
      project_members: selected.map((member) => member.email),
    };
    updateProjectMutation.mutate(payload);
  };

  const form = useForm<IProjectFormInput>({
    resolver: zodResolver(ProjectSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...projectDetail?.data,
    },
  });

  //EFFECTS
  useEffect(() => {
    if (projectDetail?.data) {
      /**
       * Setting default datas coming from api into form
       */
      form.reset({
        ...projectDetail?.data,
        bill_count: projectDetail?.data?.bill_count?.toString(),
        bill_amount: projectDetail?.data?.bill_amount?.toString(),
        start_date:
          projectDetail?.data?.start_date &&
          new Date(projectDetail?.data?.start_date),
        end_date:
          projectDetail?.data?.end_date &&
          new Date(projectDetail?.data?.end_date),
      });
      setSelected(projectDetail?.data?.project_members);
    }
  }, [projectDetail]);

  return (
    <>
      <ProjectSteps stepCounter={currentForm} />
      {isLoading ? (
        "Loading"
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>{renderForm(form)}</form>
        </Form>
      )}
    </>
  );
};

export default ProjectEditForm;
