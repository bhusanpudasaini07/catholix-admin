import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { IConsumptionData } from '@/interface/project-interface';
import { getRpSummary } from '@/services/project/project-service';

const useProjectRpSummary = () => {
  const router = useRouter();
  const { code } = router.query;
  // Default Call without other query params. For team wise and role wise consumption
  const { data: rpSummary, isLoading: rpLoading } = useQuery<IConsumptionData>({
    queryFn: async () => {
      if (code) {
        const response = await getRpSummary(code);
        return response;
      }
    },
    queryKey: ["defaultRpSummary", code],
  });
  return { rpSummary, rpLoading };
};

export default useProjectRpSummary;
