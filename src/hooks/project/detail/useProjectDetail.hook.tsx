import { IProjectDetail } from "@/interface/project-interface";
import {
  getProjectDetail,
  getRpSummary,
} from "@/services/project/project-service";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  data: IProjectDetail;
}

const useProjectDetail = () => {
  const router = useRouter();
  const { code } = router?.query;

  // STATES
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const { data: projectDetail, isLoading } = useQuery<IProps>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectDetail(code);
        return response;
      }
    },
    queryKey: ["projectDetail", code],
  });

  // Default Call without other query params. For team wise and role wise consumption
  const { data: rpSummary, isLoading: rpLoading } = useQuery({
    queryFn: async () => {
      if (code) {
        const response = await getRpSummary(code);
        return response;
      }
    },
    queryKey: ["defaultRpSummary", code],
  });

  return {
    code,
    gitModalOpen,
    setGitModalOpen,
    memberModalOpen,
    setMemberModalOpen,
    projectDetail,
    isLoading,
    rpSummary,
    rpLoading,
  };
};

export default useProjectDetail;
