import { Form } from "@/shared/components/ui/form";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DepartmentSteps from "./department-steps";

import DepartmentDetailForm from "./forms/department-details";
import DepartmentAddMember from "./forms/add-members";

import { DepartmentSchema } from "@/schema/department-schema/department-schema";
import { IDepartmentFormInput } from "@/interface/department-interface";

import { addDepartment } from "@/services/department/department-service";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

const DepartmentForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [selected, setSelected] = useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);
  //   FUNCTIONS
  const form = useForm<IDepartmentFormInput>({
    resolver: zodResolver(DepartmentSchema),
    mode: "onChange",
    reValidateMode: "onChange",
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
          <DepartmentDetailForm
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
          />
        );
      case 2:
        return (
          <DepartmentAddMember
            form={stepForm}
            goBack={() => goBack()}
            selected={selected}
            setSelected={setSelected}
            loading={addDepartmentMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  const addDepartmentMutation = useMutation({
    mutationFn: addDepartment,
    onSuccess: (data) => {
      showToast(
        TOAST_TYPES.success,
        data?.data?.message || "Department Added Successfully"
      );
      queryClient.invalidateQueries(["departmentList"]);
      router.push("/departments");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });

  const onSubmit: SubmitHandler<IDepartmentFormInput> = (data) => {
    const payload: any = {
      ...data,
      parent_id: data?.parent_id ?? "",
      department_members: selected.map((member) => member.email),
    };
    addDepartmentMutation.mutate(payload);
  };

  return (
    <>
      <DepartmentSteps stepCounter={currentForm} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{renderForm(form)}</form>
      </Form>
    </>
  );
};

export default DepartmentForm;
