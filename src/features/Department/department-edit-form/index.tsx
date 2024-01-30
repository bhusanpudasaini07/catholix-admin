import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";

import DepartmentSteps from "../department-form/department-steps";
import DepartmentDetailForm from "../department-form/forms/department-details";
import DepartmentAddMember from "../department-form/forms/add-members";

import { DepartmentSchema } from "@/schema/department-schema/department-schema";
import {
  IDepartmentDetail,
  IDepartmentFormInput,
} from "@/interface/department-interface";

import {
  getDepartmentDetail,
  updateDepartment,
} from "@/services/department/department-service";
import { Form } from "@/shared/components/ui/form";

const DepartmentEditForm = () => {
  const router = useRouter();
  const { id, sub_id } = router.query;
  const queryClient = useQueryClient();

  //   STATES
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [selected, setSelected] = useState<
    { value: string; label: string; image: string; email: string }[]
  >([]);

  //   FUNCTIONS
  const { data: departmentDetail, isLoading } = useQuery({
    queryFn: async () => {
      if (sub_id ? sub_id : id) {
        const response = await getDepartmentDetail(sub_id ? sub_id : id);
        return response;
      }
    },
    queryKey: ["departmentDetail", id, sub_id],
  });

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

  //   UPDATE DEPARTNMENT MUTATION
  const updateDepartmentMutation = useMutation({
    mutationFn: (data) => updateDepartment(data, sub_id ? sub_id : id),
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      queryClient.invalidateQueries(["departmentList"]);
      {
        sub_id
          ? router.push(`/departments/${id}/sub-departments`)
          : router.push("/departments");
      }
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
    updateDepartmentMutation.mutate(payload);
  };

  const renderForm = (stepForm: any) => {
    switch (currentForm) {
      case 1:
        return (
          <DepartmentDetailForm
            form={stepForm}
            goBack={() => goBack()}
            goForward={() => goForward()}
            disabled={departmentDetail?.data?.sub_department_names?.length > 0}
          />
        );
      case 2:
        return (
          <DepartmentAddMember
            form={stepForm}
            goBack={() => goBack()}
            selected={selected}
            setSelected={setSelected}
            loading={updateDepartmentMutation?.isLoading}
          />
        );
      default:
        return null;
    }
  };

  //   EFFECTS
  useEffect(() => {
    if (departmentDetail?.data) {
      /**
       * Setting default datas coming from api into form
       */
      form.reset({
        ...departmentDetail?.data,
        // parent_id: departmentDetail?.data?.parent_id,
      });
      setSelected(departmentDetail?.data?.department_members);
    }
  }, [departmentDetail?.data]);

  return (
    <>
      <DepartmentSteps stepCounter={currentForm} />
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

export default DepartmentEditForm;
