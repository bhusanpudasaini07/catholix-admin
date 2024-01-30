import { ITeamMembers } from "@/interface/project-interface";
import { getTeamMembers } from "@/services/profile/profile-service";
import { MultiSelect } from "@/shared/components/multi-select";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

interface IProps {
  selected: { value: string; label: string; image: string; email: string }[];
  setSelected: (data: any) => void;
  projectId: string;
}

const UploadInvoiceMembers = ({ selected, setSelected, projectId }: IProps) => {
  const { data: teamMembersList } = useQuery<ITeamMembers>({
    queryFn: () => getTeamMembers(projectId, "project_id"),
    queryKey: ["teamMemberList", projectId],
    enabled: !!projectId,
  });

  return (
    <div>
      <h6 className="text-base text-black font-medium mb-4">
        Approval Members <span className="text-destructive">*</span>
      </h6>
      <div className={!projectId ? "pointer-events-none" : ""}>
        <MultiSelect
          selected={selected}
          setSelected={setSelected}
          dataList={teamMembersList?.data}
          placeholder={"Select Members"}
        />
      </div>
    </div>
  );
};

export default UploadInvoiceMembers;
