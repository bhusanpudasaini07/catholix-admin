import { ISalesRP } from "@/interface/project-interface";
import { getProjectSales } from "@/services/project/project-service";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useProjectSales = () => {
  const {
    query: { code },
  } = useRouter();
  // Sales RP Query
  const { data: salesRp, isLoading: salesLoading } = useQuery<ISalesRP>({
    queryFn: async () => {
      if (code) {
        const response = await getProjectSales(code);
        return response;
      }
    },
    queryKey: ["salesRp", code],
  });
  return { salesRp, salesLoading };
};

export default useProjectSales;
