import React from "react";
import { IStepForms } from "@/interface/form-interface";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { MultiSelect } from "@/shared/components/multi-select";
import { useQuery } from "react-query";
import { getTeamMembers } from "@/services/profile/profile-service";
import { ITeamMembers } from "@/interface/project-interface";
import { useRouter } from "next/router";

interface IProps {
  form: any;
  goBack: () => void;
  selected: any;
  setSelected: any;
  loading: boolean;
}

const ProjectAddMembers = ({
  form,
  goBack,
  selected,
  setSelected,
  loading,
}: IProps) => {
  const router = useRouter();
  const isEdit = router.pathname.includes("/edit");

  const { data: teamMembersList, isLoading } = useQuery<ITeamMembers>({
    queryFn: () => getTeamMembers(),
    queryKey: ["teamMemberList"],
  });
  return (
    <>
      <Card className="px-8 py-10">
        <CardContent className="p-0">
          <h5 className="mb-3 text-2xl font-medium text-color">Add Members</h5>
          <div className="grid w-full grid-cols-12 gap-5">
            <div className="col-span-12">
              <MultiSelect
                selected={selected}
                setSelected={setSelected}
                dataList={teamMembersList?.data}
                placeholder={"Select Members"}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end mt-4 gap-7">
        <Button
          type="button"
          variant={"secondary"}
          onClick={goBack}
          className="w-[146px] p-0 h-[48px]"
        >
          Back
        </Button>
        <Button
          disabled={
            Object.entries(form?.formState.errors).length > 0 || loading
          }
          type="submit"
          className="w-[146px] p-0 h-[48px]"
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

export default ProjectAddMembers;
